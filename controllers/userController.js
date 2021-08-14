const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/steam-clone-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const User = require('../models/user');

class UserController {
    static async getAll(req, res, next) {
        try {
            let users = await User.find({});
            res.status(200).json({users});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async getById(req, res, next) {
        try {
            let user = await User.findById(req.params.id);
            res.status(200).json({user});
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async create(req, res, next) {
        try {
            let user = await User.find({"email": req.body.email})
            if (user.length === 1) {
                next({ code: 400, message: `This email is already registered!` });
            } else {
                let newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
                let user = await User.create(newUser);
                res.status(201).json({message: `User created successfully!`, user});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async update(req, res, next) {
        try {
            let user = await User.findById(req.params.id)
            if (user) {
                let newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }
                let user = await User.updateOne({_id: req.params.id}, newUser);
                res.status(200).json({message: `User updated successfully!`, user});
            } else {
                next({code:404, message: `User not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }

    static async delete(req, res, next) {
        try {
            let user = await User.findById(req.params.id)
            if (user) {
                let user = await User.deleteOne({_id: req.params.id})
                res.status(200).json({message: `User deleted successfully!`, user});
            } else {
                next({code:404, message: `User not found!`});
            }
        } catch (error) {
            next({code:400, message: error.message});
        }
    }
}

module.exports = UserController;