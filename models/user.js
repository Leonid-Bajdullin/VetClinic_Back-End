const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    id: Schema.Types.ObjectId,
    name: String,
    lastName: String,
    type: String,
    orders: [Object]
}, {
    collection: 'users'
});
const User = mongoose.model('User', userSchema);

export default User;