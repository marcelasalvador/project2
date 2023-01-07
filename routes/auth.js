const express = require ("express")
const router = express.Router();
const bcryptjs = require('bcryptjs')
const app = require ("../app")
const User = require('../models/User.model')



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
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPass
                },

                )
                .then((createdUser) => {
                    console.log("this is the user we created", createdUser)
                    res.redirect('/auth/login')
                
                })
                .catch((err) => {
                    console.log(err)
                    // res.render(err)
                })
            }

        })
        

})

router.get('/login', (req, res, next) => {
    res.render('auth-views/login')
   
})

router.post('/login', (req, res, next) => {
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
                res.redirect('/gallery')
               
            } else {
                res.render('auth-views/login.hbs', {message: "Incorrect Password or Email"})
            }
        }
        
    })  
    .catch((err) => {
        console.log(err)
    })  
    .finally(() => {
        console.log("These are RES locals", res.locals)
    })
})

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy()
    res.redirect('/auth/login')
})

module.exports = router