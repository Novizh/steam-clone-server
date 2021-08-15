const Game = require('../models/game');

async function authorization(request, response, next) {
    try {
        let game = await Game.findById(request.params.id);
        if (game) {
            if (game.user_id == request.user.id) {
                next();
            } else {
                next({ code: 401, message: 'You are not authorized!'})
            }
        } else {
            next({ code: 404, message: 'Data not found!'})
        }
    } catch (error) {
        next({ code: 500, message: error})
    }
}

module.exports = authorization;