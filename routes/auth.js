const express = require('express')
const router = express.Router();

const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')

const saltRounds = 10

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');




router.get('/register', isLoggedOut, (req, res, next) => {
    res.render('auth-views/register.hbs')
})


router.post('/register', isLoggedOut, (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password)
    {
        res.render('auth-views/register', {message: "Please fill out all fields"})
        return;
    }

    const salt = bcryptjs.genSaltSync(saltRounds)
    const hashedPass = bcryptjs.hashSync(req.body.password, salt)


    User.findOne({email: req.body.email})
        .then((foundUser) => {
            if (foundUser){
            res.render('auth-views/register', {message: "User exists. Please login."})
            return
    
        } else {

            console.log("trying to create user")
                User.create({
                    _id: req.body._id,
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass
                },
                {new: true}
                )
                .then((createdUser) => {
                    console.log("this is the user we created", createdUser)
                    res.render('auth-views/login', {message: "Registration successful.Please login."})
                    console.log(message)
               
                  
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

router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth-views/login')
   
})

router.post('/login', isLoggedOut, (req, res, next) => {
    console.log('SESSION =====> ', req.session);
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
                console.log({ userInSession: req.session.user })
                res.render('index', {message: `You have logged in ${req.session.user }`})
               
            } else {
                res.render('auth-views/login.hbs', {message: "Incorrect Password or Email"})
            }
        }
        
    })    
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy()
    res.redirect('/', {message: "logged out"})
})

module.exports = router