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
            const existingCustomer = await Customer.findOne({where : {email : value}});
            if (existingCustomer) {
                throw new Error('A user already exists with this e-mail address');
            }
        }),
    
    async(req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        };

        await Customer.create(req.body)
          .then(function(newCustomer){
            res.json(newCustomer);
        }).catch(function (error) {
            res.status(400).send({errors: error});
        });
})

router.get('/customers', async (req, res) => {
    const whereClause = buildWhereClause(req);
    await Customer.findOne(whereClause)
        .then((newCustomer) => {
            if (newCustomer === null) {
                res.status(404).send({errors: "Not Found"})
            } else {
                res.json(newCustomer)
            }
        }, (error) => {
            res.status(404).send({errors: error})
        })
})

function buildWhereClause(req){
    const email = decodeURIComponent(req.query.email);
    const password = decodeURIComponent(req.query.password);

    let whereClause = {
        where: {
            email: email,
            password: password
        }
    };
    return whereClause;
}

module.exports = router;