const { verify } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(request, response, next) {
    try {
        if (!request.headers.access_token) {
            next({ code: 401, message: 'Please login first!' });
        } else {
            let decoded = verify(request.headers.access_token);
            let user = await User.findByPk(decoded.id);
            if(user) {
                request.user = {
                    id: decoded.id,
                    username: decoded.username
                }
                next();
            } else {
                next({ code: 401, message: 'You are not authorized!'});
            }
        }
    } catch (error) {
        next({ code: 500, message: error });
    }
}

module.exports = authentication;