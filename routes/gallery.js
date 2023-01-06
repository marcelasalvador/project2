var express = require('express');
var router = express.Router();
var Product = require("../models/Product.model")

const { isLoggedIn } = require('../middleware/route-guard.js');

router.get('/gallery', isLoggedIn, (req, res, next) => {
   Product.find()
   .then((products) => {
    console.log("found products", products)
    
    res.render('gallery.hbs', { userInSession: req.session.user }, {products} );
    console.log(req.session.user)
   })
.catch((err) => {
    console.log(err)
})
});

module.exports = router;