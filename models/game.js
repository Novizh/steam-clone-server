const mongoose = require('mongoose');
mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const GameSchema = new mongoose.Schema({
    game_id: { type: String, required: [true, 'Please enter the game id!'] },
    imageUrl: { type: String },
    platforms: [String], 
    metascore: { type: Number },
    title: { type: String },
    user_id: { type: String, required: [true, 'Please enter the user_id!'] }
})
const Game = mongoose.model('Game', GameSchema);

module.exports = Game;