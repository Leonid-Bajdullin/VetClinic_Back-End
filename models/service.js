const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var serviceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    order: {type: Schema.Types.ObjectId, ref: 'Order'},
    duration: Number,
    price: Number
}, {
    collection: 'services'
});
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;