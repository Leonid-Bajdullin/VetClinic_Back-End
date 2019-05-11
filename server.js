// Connecting MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VetClinic');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Defining mongoose Schemas
var Schema = mongoose.Schema;


var userSchema = new Schema({
    userID: Number,
    name: String,
    lastName: String
}, {
    collection: 'users'
});
const User = mongoose.model('User', userSchema);

var doctorSchema = new Schema({
    doctorID: Number,
    name: String,
    lastName: String
}, {
    collection: 'doctors'
});
const Doctor = mongoose.model('Doctor', doctorSchema)