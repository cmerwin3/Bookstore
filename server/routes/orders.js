const express = require('express');
const bodyParser = require('body-parser');
const {sequelize, Order, OrderItem,Book} = require('../models');
const { where, Op } = require('sequelize');
const router = express.Router()

router.post('/orders', bodyParser.json(), async(req, res) => {
    try {
        let newOrder = await populateAndSaveOrder(req);
        console.log(JSON.stringify(newOrder));
        let orderId = newOrder.id;
        let newItems = await populateAndSaveItems(req, orderId);
        let bodyResult = {
            order: newOrder,
            items: newItems
        };
        res.json(bodyResult);
    } catch(error){
        console.log(error);
        res.status(400).send({errors: 'Unable to create order'})
    }
})

async function populateAndSaveOrder(req) {
    // let newOrder = await Order.create({
    //     timestamp : (new Date()).toISOString(),
    //     customer_id : req.body.order.customer_id,
    //     status : "pending",
    //     subtotal : req.body.order.subtotal,
    //     tax : req.body.order.tax,
    //     total : req.body.order.total
    //     })
    //     .then(function(newOrder) {
    //         console.log(JSON.stringify(newOrder));
    //         return newOrder
    //     }, function(error){
    //         console.log(error);
    //         throw new Error('Failure in Save Order');
    //     })
    // console.log('end of save order function');

    let newOrder = await Order.create({
        timestamp : (new Date()).toISOString(),
        customer_id : req.body.order.customer_id,
        status : "pending",
        subtotal : req.body.order.subtotal,
        tax : req.body.order.tax,
        total : req.body.order.total,
    });
    
    return newOrder;
}

async function populateAndSaveItems(req, orderId) {
    let itemList = req.body.items;
    let newItems = [];
    for (let index = 0; index < itemList.length; index++) {
        await OrderItem.create({
            order_id : orderId,
            book_id : itemList[index].book_id,
            quantity : itemList[index].quantity,
            price : itemList[index].price,
        }).then(function(newItem){
            newItems.push(newItem)
        }, function(error){
            console.log(error);
            throw new Error('Failure in Save Order Item');
        })
    }
    return newItems;
}


async function addBookDetails(order_list) {
    let bodyAsJson = JSON.stringify(order_list);
    let bodyAsObject = JSON.parse(bodyAsJson);

    await Promise.all(bodyAsObject.map(async (order)=>{
        await Promise.all(order.items.map(async (item)=>{
           const book = await Book.findByPk(item.book_id);
           item.book_details = book;
           console.log('item = ' + JSON.stringify(item))
        }))
    }))
    console.log('body = ' + JSON.stringify(bodyAsObject))
    return bodyAsObject;
}

router.get('/orders', bodyParser.json(), async(req, res) => {
    let order_list = await Order.findAll({where : 
        {customer_id : req.query.customer_id},
        include: ["items"]
    });
    if (order_list.length === 0) {
        res.status(404).send("Not Found");
        return;
    }
    order_list = await addBookDetails(order_list);

    res.json(order_list);
});


module.exports = router;