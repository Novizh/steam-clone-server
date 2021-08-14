const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hash(userInput) {
    return bcrypt.hashSync(userInput, salt);
}

function compare(userInput, databaseHashed) {
    return bcrypt.compareSync(userInput, databaseHashed);
}

module.exports = {
    hash,
    compare
}