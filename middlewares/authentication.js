const { verify } = require('../helpers/jwt');
const User = require('../models/user');

async function authentication(request, response, next) {
    try {
        if (!request.headers.access_token) {
            throw { code: 401, message: 'Please login first!' }
        } else {
            let decoded = verify(request.headers.access_token);
            let user = await User.findById(decoded.id);
            if (user) {
                request.user = {
                    id: decoded.id,
                    username: decoded.username,
                    role: decoded.role
                }
                next();
            } else {
                throw { code: 403, message: 'Access forbidden!' };
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;