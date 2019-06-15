const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    worker: Schema.Types.ObjectId,
    service: String,
    price: Number,
    startTime: Number
}, {
    collection: 'orders'
});
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;