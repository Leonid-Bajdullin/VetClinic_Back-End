const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    email: {type: String, required: true, unique: true},
    phoneNumber: String,
    password: {type: String, required: true},
    type: String,
    orders: [Object]
}, {
    collection: 'users'
});
const User = mongoose.model('User', userSchema);

module.exports = User;