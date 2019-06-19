const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Order = require("../models/order");

const config = 'secret';

router.get("/orderlist", async (req, res) => {
    try {
        var result = await Order.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/save_order", checkAuth, async (req, res) => {
  try {
    var order = new Order({
      _id: new mongoose.Types.ObjectId(),
      user: req.body.userId,
      service: req.body.service_name,
      price: req.body.price,
      worker: req.body.worker,
      start_time: req.body.start_time,
    });
    await order.save();
    res.send({
      message: 'Order succesfully saved'
    });
  } catch (error) {
      res.status(500).send(error);
  }
});

module.exports = router;