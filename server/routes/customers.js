const express = require('express');
const {body, validationResult} = require('express-validator');
const bodyParser = require('body-parser');
const {sequelize, Customer} = require('../models');
const { Sequelize } = require('sequelize');
const router = express.Router()

router.post('/customers', bodyParser.json(),
    body("email")
        .isEmail()
        .custom(async value => {
            console.log("Log test" + value);
            const existingCustomer = await Customer.findOne({where : {email : value}});
            if (existingCustomer) {
                console.log("exists test" + "" + value);
                throw new Error('A user already exists with this e-mail address');
            }
        }),
    
    async(req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        };

        try {
            let newCustomer = await populateCustomer(req);
            res.json(newCustomer);
        } catch (error){
            res.status(400).send(error.message);
        };
})

async function populateCustomer(req) {
    await Customer.create({
        email : req.body.email,
        password : req.body.password,
        last_name : req.body.last_name,
        first_name : req.body.first_name,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        zip : req.body.zip
    }).then(function(newCustomer){
        return newCustomer;
    }).catch(function (error) {
        throw new Error(`Cannot create account: ${error.message}`);
    });
}

router.get('/customers', bodyParser.json(), async (req, res) => {
    const whereClause = buildWhereClause(req);
    const customer = await Customer.findOne(whereClause);

    if (customer === null) {
        res.status(404).send("Not Found");
    } else {
        res.json(customer);
    };
    console.log("end of get");
    console.log(customer);
})

function buildWhereClause(req){
    const email = req.body.email;
    const password = req.body.password;

    let whereClause = {
        where: {
            email: email,
            password: password
        }
    };
    
    console.log(whereClause);
    return whereClause;
}

module.exports = router;