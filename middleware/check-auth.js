const jwt = require('jsonwebtoken');
const config = 'secret';


module.exports = (req, res, next) => {
    try {
        const token = req.body.token;
        jwt.verify(token, config);
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};