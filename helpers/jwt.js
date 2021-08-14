const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

function sign(payload) {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}

function verify(access_token) {
    return jwt.verify(access_token, secret);
}

module.exports = {
    sign,
    verify
}