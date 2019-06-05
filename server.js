// Connecting express server, cors, body-parser
const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))

// Connecting MongoDB
// import {MongoClient, ObjectId} from 'mongodb'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VetClinic');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Importing mongoose Schemas

// ======================================================================
// Defining mongoose Schemas
// const Schema = mongoose.Schema;
const Schema = mongoose.Schema;

const userSchema = Schema({
    id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    type: String,
    orders: [Object]
}, {
    collection: 'users'
});
const User = mongoose.model('User', userSchema);

const orderSchema = Schema({
    id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    services: [Object]
}, {
    collection: 'orders'
});
const Order = mongoose.model('Order', orderSchema);

var serviceSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    order: {type: Schema.Types.ObjectId, ref: 'Order'},
    duration: Number,
    price: Number
}, {
    collection: 'services'
});
const Service = mongoose.model('Service', serviceSchema);

// =======================REST Endpoints===============================
// -------------------GET--------------
app.get("/orderlist", async (request, response) => {
    try {
        var result = await Order.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/userlist", async (request, response) => {
    try {
        var result = await User.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
// ------------------POST-----------------
app.post("/orders", async (request, response) => {
    try {
        var order = new Order({user: request.body.user});
        var result = await order.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.post("/users", async (request, response) => {
    try {
        var user = new User(
            {
                name: request.body.name,
                lastName: request.body.lastName,
                email: request.body.email,
                phoneNumber: request.body.phone
            }
        );
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))