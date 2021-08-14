const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam-clone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Please enter a username!'], unique: [true, 'This username has already been taken!'] },
    email: { type: String, required: [true, 'Please enter a valid email!'], unique: [true, 'This email has already been taken!'] },
    password: { type: String, required: [true, 'Please enter a password!'] }
})
const User = mongoose.model('User', UserSchema);

module.exports = User;