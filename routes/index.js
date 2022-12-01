var express = require('express');
var router = express.Router();
// var Products = require("../models/Products.model")


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.hbs', { title: 'los andes' });
  });
  
  module.exports = router;
  
