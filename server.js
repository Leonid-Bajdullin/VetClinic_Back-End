// Connecting express server, graphql, cors
const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');

// Defining GraphQL schema + creating endpoint 

// const schema = buildSchema(`
// type Query {
//     getOrder(id: ID!): Order
//     getUser(id: ID!): User
// }
// type User {
//     id: ID,
//     name: String,
//     lastName: String,
//     orders: [Order]
// }
// type Order {
//     id: ID,
//     user: User
// }`);
// app.use('/graphql', express_graphql({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));

// const resolvers = {
//     Query: {
//         getOrder: async (root, {id}) => {
//             return await Order.findById(id)
//         },
//         getUser: async (root, {id}) => {
//             return await User.findById(id)
//         }
//     }
// }

// var root = {
//     resolvers
// };

// Connecting MongoDB
// import {MongoClient, ObjectId} from 'mongodb'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VetClinic');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ======================================================================
// Defining mongoose Schemas
const Schema = mongoose.Schema;

const userSchema = Schema({
    id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    type: String,
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
}, {
    collection: 'users'
});
const User = mongoose.model('User', userSchema);

const orderSchema = Schema({
    id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    collection: 'orders'
});
const Order = mongoose.model('Order', orderSchema);

const orders = [{}, {}]
app.get('/orderslist', (req, res) => res.send(orders))
app.post('/orders', (req, res) => {
    var myData = new Order({user: req.body.user});
    myData.save()
        .then(item => {
            res.status(201).send(req.body);
        })
        .catch(err => {
            res.status(400).send({nick: undefined, message: "no message sent" });
        });
}); 

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



app.listen(port, () => console.log(`Example app listening on port ${port}!`))