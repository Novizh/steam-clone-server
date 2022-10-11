const { getDatabase } = require('../config/database');
const User = require('../models/user');
const { sign } = require('../helpers/jwt');
const { hash, compare } = require('../helpers/bcrypt');

class UserController {
    static async register(request, response, next) {
        try {
            if (getDatabase()) {
                let user = await User.findOne({ "email": request.body.email });
                if (user) {
                    throw { code: 400, message: `This email has been registered!` };
                } else {
                    let user = await User.findOne({ "username": request.body.username });
                    if (user) {
                        throw { code: 400, message: `This username has been taken!` };
                    } else {
                        let newUser = {
                            username: request.body.username,
                            email: request.body.email,
                            password: hash(request.body.password)
                        }
                        let user = await User.create(newUser);
                        response.status(201).json({ message: `User created successfully!`, user });
                    }
                }
            } else {
                console.error(`Can't connect to the database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async login(request, response, next) {
        try {
            if (getDatabase()) {
                let user = await User.findOne({ "username": request.body.username });
                if (user) {
                    if (compare(request.body.password, user.password)) {
                        let access_token = sign({ id: user._id, username: user.username });
                        response.status(200).json({ message: `Login successful!`, access_token });
                    } else {
                        throw { code: 400, message: 'Email or password incorrect!' };
                    }
                } else {
                    throw { code: 400, message: 'Email or password incorrect!' };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getAllUsers(request, response, next) {
        try {
            if (getDatabase()) {
                let users = await User.find({});
                response.status(200).json({ users });
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(request, response, next) {
        try {
            if (getDatabase()) {
                let user = await User.findById(request.params.id);
                if (user) {
                    response.status(200).json({ user });
                } else {
                    throw { code: 404, message: `User not found!` };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(request, response, next) {
        try {
            if (getDatabase()) {
                let user = await User.findById(request.params.id);
                if (user) {
                    let newUser = {
                        username: request.body.username,
                        email: request.body.email,
                        password: request.body.password
                    }
                    let user = await User.updateOne({ _id: request.params.id }, newUser);
                    response.status(200).json({ message: `User updated successfully!`, user });
                } else {
                    throw { code: 404, message: `User not found!` };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(request, response, next) {
        try {
            if (getDatabase()) {
                let user = await User.findById(request.params.id);
                if (user) {
                    let user = await User.deleteOne({ _id: request.params.id });
                    response.status(200).json({ message: `User deleted successfully!`, user });
                } else {
                    throw { code: 404, message: `User not found!` };
                }
            } else {
                console.error(`Can't connect to Cart database!`);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;