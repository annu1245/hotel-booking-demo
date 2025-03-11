const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    return token;
}

const getTokenValue = (request) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const { userId } = jwt.decode(token) || {};
    return userId;
}

module.exports = {
    generateToken,
    getTokenValue,
};
