const express = require("express")
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Add new user
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
        res.status(500)
        return next(err)
    }
    if (user) {
        res.status(403)
        return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.favorites = []
    console.log(newUser)
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({token, user: savedUser.withoutPassword()})
    })
})
})

// login
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!user) {
            res.status(403)
            return next(new Error("Username or Password are Incorrect"))
        } 
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error("Username or Password are Incorrect"))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error("Username or Password are Incorrect"))  
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({token, user: user.withoutPassword()})
        })
    })
})



module.exports = authRouter