const express = require('express');
const {sequelize, Tax, Book, Customer, Order, OrderItem} = require('../models');
const app = express();

const books = require('./books');
const customers = require('./customers');
const orders = require('./orders');

app.use(books);
app.use(customers);
app.use(orders);
app.use(express.static(__dirname + '/../static'));



app.get('/tax', async (req, res) => {
    const TaxTable = await Tax.findAll();
    res.json(TaxTable);
})


app.listen(8000, function(){
    console.log("server is running on localhost8000")
})