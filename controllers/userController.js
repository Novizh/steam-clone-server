const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam-clone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = require('../models/user');
const { sign } = require('../helpers/jwt');
const { hash, compare } = require('../helpers/bcrypt');

class UserController {
    static async register(request, response, next) {
        try {
            let user = await User.findOne({"email": request.body.email});
            if (user) {
                next({ code: 400, message: `This email has been registered!` });
            } else {
                let user = await User.findOne({"username": request.body.username});
                if (user) {
                    next({ code: 400, message: `This username has been taken!` });
                } else {
                    let newUser = {
                        username: request.body.username,
                        email: request.body.email,
                        password: hash(request.body.password)
                    }
                    let user = await User.create(newUser);
                    response.status(201).json({message: `User created successfully!`, user});
                }
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async login(request, response, next) {
        try {
            let user = await User.findOne({"username": request.body.username});
            if (user) {
                if (compare(request.body.password, user.password)) {
                    let access_token = sign({id: user._id, username: user.username});
                    response.status(200).json({message: `Login successful!`, access_token});
                } else {
                    next({ code: 400, message: 'Email or password incorrect!'});
                }
            } else {
                next({ code: 400, message: 'Email or password incorrect!'});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async getAll(request, response, next) {
        try {
            let users = await User.find({});
            response.status(200).json({users});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async getById(request, response, next) {
        try {
            let user = await User.findById(request.params.id);
            if (user) {
                response.status(200).json({user});
            } else {
                next({code:404, message: `User not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async update(request, response, next) {
        try {
            let user = await User.findById(request.params.id);
            if (user) {
                let newUser = {
                    username: request.body.username,
                    email: request.body.email,
                    password: request.body.password
                }
                let user = await User.updateOne({_id: request.params.id}, newUser);
                response.status(200).json({message: `User updated successfully!`, user});
            } else {
                next({code:404, message: `User not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async delete(request, response, next) {
        try {
            let user = await User.findById(request.params.id);
            if (user) {
                let user = await User.deleteOne({_id: request.params.id});
                response.status(200).json({message: `User deleted successfully!`, user});
            } else {
                next({code:404, message: `User not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }
}

module.exports = UserController;