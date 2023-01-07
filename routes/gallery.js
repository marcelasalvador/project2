var express = require('express');
var router = express.Router();
var Product = require("../models/Product.model")

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard")

router.get('/', isLoggedOut, (req, res, next) => {
    // res.send("gallery hit")
    // console.log('/gallery route hit')
   Product.find()
   
   .then((products) => {
    console.log("found products", products)
    
    res.render('gallery.hbs', { products, userInSession: req.session.user } );
    // console.log(req.session.user)
   })
.catch((err) => {
    console.log("error",err)
})
});

module.exports = router;