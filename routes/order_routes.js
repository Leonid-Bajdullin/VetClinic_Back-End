const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Order = require("../models/order");

const config = 'secret';

router.get("/orderlist", checkAuth, async (request, response) => {
    try {
        var result = await Order.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/new_order", checkAuth, async (request, response) => {
    try {
        var order = new Order({
            _id: new mongoose.Types.ObjectId(),
            user: request.body.user
        });
        var result = await order.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;