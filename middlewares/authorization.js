const Game = require('../models/game');

async function authorization(request, response, next) {
    try {
        let game = await Game.findById(request.params.id);
        if (game) {
            if (game.user_id == request.user.id) {
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