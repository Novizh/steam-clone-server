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
                            password: hash(request.body.password),
                            role: 0, // User role
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
                        if (user.username === process.env.ADMIN_USERNAME && user.email === process.env.ADMIN_EMAIL) {
                            let access_token = sign({ id: user._id, username: user.username, role: user.role });
                            response.status(200).json({ message: `Login successful!`, access_token });
                        } else {
                            let access_token = sign({ id: user._id, username: user.username });
                            response.status(200).json({ message: `Login successful!`, access_token });
                        }
                    } else {
                        throw { code: 400, message: 'Email or password incorrect!' };
                    }
                } else {
                    throw { code: 400, message: 'Email or password incorrect!' };
                }
            } else {
                throw { code: 503, message: `Can't connect to the database!` };
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
                throw { code: 503, message: `Can't connect to the database!` };
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
                throw { code: 503, message: `Can't connect to the database!` };
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
                    let updatedData = {
                        username: request.body.username,
                        email: request.body.email,
                        password: hash(request.body.password),
                        role: 0
                    }
                    let user = await User.updateOne({ _id: request.params.id }, updatedData);
                    response.status(200).json({ message: `User updated successfully!`, user });
                } else {
                    throw { code: 404, message: `User not found!` };
                }
            } else {
                throw { code: 503, message: `Can't connect to the database!` };
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
                throw { code: 503, message: `Can't connect to the database!` };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;