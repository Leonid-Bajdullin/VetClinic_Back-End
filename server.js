// Connecting express server, cors, body-parser, jwt
const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const bcrypt = require('bcrypt');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

// Connecting MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/VetClinic');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Defining routes
const userRoutes = require('./routes/user_routes');
const orderRoutes = require('./routes/order_routes');
const serviceRoutes = require('./routes/service_routes');

// Importing mongoose Schemas
const User = require("./models/user");
const Order = require("./models/order");
const Service = require("./models/service");
// ======================================================================


// =======================REST Routes===============================
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/services", serviceRoutes);
// app.use("/services", serviceRoutes);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));