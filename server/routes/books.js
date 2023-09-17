const express = require('express');
const {sequelize, Book} = require('../models');
const { where, Op} = require('sequelize');
const router = express.Router()

router.get('/books', async (req, res) => {
    const whereClause = buildWhereClause(req);
    const orderClause = buildOrderClause(req);
    const limitClause = buildLimitClause(req);
    
    const totalClause= {
        ...whereClause,
        ...orderClause,
        ...limitClause
    };
    
    const bookList = await Book.findAll(totalClause);
    // if (bookList.length === 0){
    //     res.json("No results found.")
    // };
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
        genreClause = {genre: decodeURIComponent(genreParm)}
    }
    if(keywordParm != undefined) {
        keywordClause = {[Op.or] : [
            {author_lastname: {[Op.like] : ('%' + decodeURIComponent(keywordParm) + '%')}},
            {author_firstname: {[Op.like] : ('%' + decodeURIComponent(keywordParm) + '%')}},
            {title: {[Op.like] : ('%' + decodeURIComponent(keywordParm) + '%')}}
        ]}
    }
    
    let whereClause = {
        where: {
            ...genreClause,
            ...keywordClause
        }
    };
    return whereClause;
}

function buildOrderClause(req){
    const orderParm = req.query.order;
    let orderClause = {};

    if(orderParm === 'random') {
        orderClause = {
            order: sequelize.random()
        }
    }
    else if(orderParm === 'author') {
        orderClause = {
            order: [['author_lastname', 'ASC']]
        }
    }
    else if(orderParm === 'title') {
        orderClause = {
            order: [['title', 'ASC']]
        }
    }
    else if(orderParm === 'genre') {
        orderClause = {
            order: [['genre', 'ASC']]
        }
    }
    return orderClause; 
}

function buildLimitClause(req) {
    const limitParm = req.query.limit;
    let limitClause = {};

    if (limitParm != undefined) {
        limitClause = {
            limit: limitParm
        }
    }
    return limitClause;
}

module.exports = router;