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

// Importing mongoose Schemas
const User = require("./models/user");
const Order = require("./models/order");
const Service = require("./models/service");
// ======================================================================
// JWT
// const config = {
//     secret: `free2play` //тот самый секретный ключ, которым подписывается каждый токен, выдаваемый клиенту
// }

// function jwtWare() {
//     const { secret } = config;
//     return expressJwt({ secret }).unless({ //блюдет доступ к приватным роутам
//         path: [
//             // public routes that don't require authentication
//             '/authenticate'
//         ]
//     });
// }

// function errorHandler(err, req, res, next) {
//     if (typeof (err) === 'string') {
//         // custom application error
//         return res.status(400).json({ message: err });
//     }

//     if (err.name === 'UnauthorizedError') { 
//         // jwt authentication error
//         return res.status(401).json({ message: 'Invalid Token' });
//     }

//     // default to 500 server error
//     return res.status(500).json({ message: err.message });
// }


// // мо
// const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

// async function authenticate({ username, password }) { //контроллер авторизации
//     console.log(username, password)
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//         const token = jwt.sign({ sub: user.id }, config.secret); //подписывам токен нашим ключем
//         const { password, ...userWithoutPassword } = user;
//         return { //отсылаем интересную инфу
//             ...userWithoutPassword,
//             token
//         };
//     }
// }

// // use JWT auth to secure the api

// // api routes
// app.use(jwtWare());

// app.post('/authenticate', function (req, res, next) {
//     authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// });

// // global error handler
// app.get('/', (req, res, next) => {
//     res.json({all: 'ok'})
//     //next()
// });

// app.use(errorHandler);

// =======================REST Routes===============================
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
// app.use("/services", serviceRoutes);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));