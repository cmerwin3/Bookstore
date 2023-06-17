const express = require('express');
const bodyParser = require('body-parser');
const {sequelize, Order, OrderItem} = require('../models');
const { where, Op } = require('sequelize');
const router = express.Router()

router.post('/orders', bodyParser.json(), async(req, res) => {
    let newOrder = await populateAndSaveOrder(req);
    let orderId = newOrder.id;
    let newItems = await populateAndSaveItems(req, orderId);
    let bodyResult = {
        order: newOrder,
        items: newItems
    };
    res.json(bodyResult);
})

async function populateAndSaveOrder(req) {
    
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
        let newItem = await OrderItem.create({
            order_id : orderId,
            book_id : itemList[index].book_id,
            quantity : itemList[index].quantity,
            price : itemList[index].price,
        });
        newItems.push(newItem);
    }
    return newItems;
}

//TODO Add get for orders for customers previous orders

// router.get('/orders', bodyParser.json(), async(req, res) => {
//     // const customer =  await Customer.findOne({where : {id : req.body.customer_id}});
//     // console.log("customer class" + "" + customer);
//     let order_list = await Order.findAll({where : {customer_id : req.body.customer_id}});
//     console.log("customer class" + "" + order_list);

// });


module.exports = router;