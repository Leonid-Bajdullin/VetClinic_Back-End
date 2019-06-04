const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    services: [{type: Schema.Types.ObjectId, ref: 'Service'}]
}, {
    collection: 'orders'
});
const Order = mongoose.model('Order', orderSchema);

export default Order;