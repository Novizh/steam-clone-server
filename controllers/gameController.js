const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam-clone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Game = require('../models/game');

class GameController {
    static async wishlist(request, response, next) {
        try {
            let gameDetails = {
                game_id: request.body.game_id,
                imageUrl: request.body.imageUrl,
                platforms: request.body.platforms.split(', '),
                metascore: request.body.metascore,
                title: request.body.title,
                user_id: request.user.id
            }
            let whishlist = await Game.create(gameDetails);
            response.status(201).json({message: `Game added to wishlist successfully!`, whishlist});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async getAllWishlist(request, response, next) {
        try {
            let games = await Game.find({user_id: request.user.id});
            response.status(200).json({games});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async getById(request, response, next) {
        try {
            let game = await Game.findById(request.params.id);
            if (game) {
                response.status(200).json({game});
            } else {
                next({code:404, message: `Game not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async removeWishlist(request, response, next) {
        try {
            let game = await Game.findById(request.params.id);
            if (game) {
                let game = await Game.deleteOne({_id: request.params.id});
                response.status(200).json({message: `Game removed from wishlist successfully!`, game});
            } else {
                next({code:404, message: `Game not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }
}

module.exports = GameController;