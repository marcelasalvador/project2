var express = require('express');
var router = express.Router();
// var Products = require("../models/Products.model")


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  module.exports = router;
  
// /* GET home page. */
// router.get('/', function(req, res, next) {
//     var products = Products.find();
//   res.render('shop/gallery', { title: 'Shopping Cart', products: products });
// });

// module.exports = router;
