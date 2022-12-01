var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('shop-views/cart')
});

module.exports = router;