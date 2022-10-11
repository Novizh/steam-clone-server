const { getDatabase } = require('../config/database');
const Game = require('../models/game');

class GameController {
    static async wishlist(request, response, next) {
        try {
            if (getDatabase()) {
                let gameDetails = {
                    game_id: request.body.game_id,
                    imageUrl: request.body.imageUrl,
                    platforms: request.body.platforms.split(', '),
                    metascore: request.body.metascore,
                    title: request.body.title,
                    user_id: request.user.id
                }
                let whishlist = await Game.create(gameDetails);
                response.status(201).json({ message: `Game added to wishlist successfully!`, whishlist });
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getAllWishlist(request, response, next) {
        try {
            if (getDatabase()) {
                let games = await Game.find({ user_id: request.user.id });
                response.status(200).json({ games });
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getById(request, response, next) {
        try {
            if (getDatabase()) {
                let game = await Game.findById(request.params.id);
                if (game) {
                    response.status(200).json({ game });
                } else {
                    throw { code: 404, message: `Game not found!` };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async removeWishlist(request, response, next) {
        try {
            if (getDatabase()) {
                let game = await Game.findById(request.params.id);
                if (game) {
                    let game = await Game.deleteOne({ _id: request.params.id });
                    response.status(200).json({ message: `Game removed from wishlist successfully!`, game });
                } else {
                    throw { code: 404, message: `Game not found!` };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = GameController;