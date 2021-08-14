const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam-clone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = require('../models/user');

class UserController {
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
            response.status(200).json({user});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async create(request, response, next) {
        try {
            let user = await User.find({"email": request.body.email})
            if (user.length === 1) {
                next({ code: 400, message: `This email is already registered!` });
            } else {
                let newUser = {
                    username: request.body.username,
                    email: request.body.email,
                    password: request.body.password
                }
                let user = await User.create(newUser);
                response.status(201).json({message: `User created successfully!`, user});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async update(request, response, next) {
        try {
            let user = await User.findById(request.params.id)
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
            let user = await User.findById(request.params.id)
            if (user) {
                let user = await User.deleteOne({_id: request.params.id})
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