const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var serviceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    name: String,
    duration: Number,
    price: Number
}, {
    collection: 'services'
});
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;