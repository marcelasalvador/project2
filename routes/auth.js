const express = require('express')
const router = express.Router();

const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')

const saltRounds = 10


router.get('/login', (req, res, next) => {
    res.render('auth-views/login')
})

router.post('/login', (req, res, next) => {

    if (!req.body.email|| !req.body.password) {
        res.render('auth-views/login', {message : "Both fields are required"})
        return;
    } 
    
    User.findOne({email: req.body.email})
    .then((foundUser) => {
        if (!foundUser) {
            res.render('auth-views/login', {message: "User does not exist. Please register."})
        } else {
            let correctPassword = bcryptjs.compareSync(req.body.password, foundUser.password);
            if(correctPassword) {
                req.session.user = foundUser;
                res.render('index', {message: "You have logged in"})
            } else {
                res.render('auth-views/login', {message: "Incorrect Password or Email"})
            }
        }z
    })    
})

router.get('/register', (req, res, next) => {
    res.render('auth-views/register')
})


router.post('/register', (req, res, next) => {

    if (!req.body.fullName || !req.body.email || !req.body.password)
    {
        res.render('auth-views/register', {message: "Please fill out all fields"})
        return;
    }

    const salt = bcryptjs.genSaltSync(saltRounds)
    const hashedPass = bcryptjs.hashSync(req.body.password, salt)


    User.findOne({email: req.body.email})
        .then((foundUser) => {
            if (foundUser){
            res.render('auth-views/register', {message: "You have already registered"})
            return
        } else {
                User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPass
                })
                .then(() => {
                    res.redirect('/auth/login')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })

})


router.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.render('auth-views/index', {message: "You have logged out"})
})

module.exports = router