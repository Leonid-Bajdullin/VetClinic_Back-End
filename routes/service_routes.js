const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const Service = require("../models/service");

router.post('/check_price', async (req, res, next) => {
    const price = await Service.find(
        {name: req.body.service}, 
        {price: true, _id: 0}
    ).exec()
    res.json(price);
})

module.exports = router;