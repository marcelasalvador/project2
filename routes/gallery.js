var express = require('express');
var router = express.Router();
var Product = require("../models/Product.model")

router.get('/', function(req, res, next) {
   Product.find()
   .then((products) => {
    console.log("found products", products)
    res.render('gallery.hbs', {products});
   })
.catch((err) => {
    console.log(err)
})
});

module.exports = router;