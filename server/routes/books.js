const express = require('express');
const {sequelize, Book} = require('../models');
const { where, Op } = require('sequelize');
const router = express.Router()

router.get('/books', async (req, res) => {
    const whereClause = buildWhereClause(req);
    const bookList = await Book.findAll(whereClause);
    res.json(bookList);
})

function buildWhereClause(req){
    const genreParm = req.query.genre;
    const titleParm = req.query.title;
    const authorParm = req.query.author;
    
    let genreClause = {};
    let titleClause = {};
    let authorClause = {};
    
    if(genreParm != undefined) {
        genreClause = {genre: genreParm};
    }
    if(titleParm != undefined) {
        titleClause = {title: {[Op.like] : ('%' + titleParm + '%')}}
    }
    if(authorParm != undefined) {
        authorClause = {[Op.or] : [
            {author_lastname: {[Op.like] : ('%' + authorParm + '%')}},
            {author_firstname: {[Op.like] : ('%' + authorParm + '%')}}
        ]}
    }
    
    let whereClause = {
        where: {
            ...genreClause,
            ...titleClause,
            ...authorClause
        }
    };
    
    console.log(whereClause);
    return whereClause;
}

module.exports = router;