const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    console.log("🚀 ~ auth.js:7 ~ process.env.JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
}

module.exports = generateToken;
