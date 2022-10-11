const User = require('../models/user');

async function authorization(request, response, next) {
    try {
        let user = await User.findById(request.params.id);
        if (user) {
            if (user._id.toString() === request.user.id) {
                next();
            } else {
                throw { code: 401, message: 'You are not authorized!' };
            }
        } else {
            throw { code: 404, message: 'Data not found!' };
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authorization;