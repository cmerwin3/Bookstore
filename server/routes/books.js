const express = require('express');
const {sequelize, Book} = require('../models');
const { where, Op } = require('sequelize');
const router = express.Router()

router.get('/books', async (req, res) => {
    const whereClause = buildWhereClause(req);
    const bookList = await Book.findAll(whereClause);
    res.json(bookList);
})

router.get('/genres', async (req, res)=>{
    const genreList = await Book.findAll({
        attributes: ['genre'],
        group: ['genre']
    });
    res.json(genreList);
})

function buildWhereClause(req){
    const genreParm = req.query.genre;
    const keywordParm = req.query.keyword;
    
    let genreClause = {};
    let keywordClause = {};
    
    if(genreParm != undefined) {
        genreClause = {genre: genreParm};
    }
    if(keywordParm != undefined) {
        keywordClause = {[Op.or] : [
            {author_lastname: {[Op.like] : ('%' + keywordParm + '%')}},
            {author_firstname: {[Op.like] : ('%' + keywordParm + '%')}},
            {title: {[Op.like] : ('%' + keywordParm + '%')}}
        ]}
    }
    
    let whereClause = {
        where: {
            ...genreClause,
            ...keywordClause
        }
    };
    
    console.log(whereClause);
    return whereClause;
}

module.exports = router;