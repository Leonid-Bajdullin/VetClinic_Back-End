const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const User = require("../models/user");

const config = 'secret';

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              lastName: req.body.lastName,
              phoneNumber: req.body.phone,
              role: 'guest'
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/signin", async (req, res, next) => {
  const user = await User.find({ email: req.body.email }).exec()
  if (user.length < 1) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });
  }
    try {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed",
            success: false
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user[0].email,
              userId: user[0]._id },
            config,
            { expiresIn: "3h" }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token,
            name: user[0].name,
            success: true
          });
        }
          res.status(401).json({
            message: "Authentication failed",
            success: false
          });
      });
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: err });
    }
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/userlist", async (request, response) => {
    try {
        var result = await User.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;