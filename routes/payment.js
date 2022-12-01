var express = require('express');
var router = express.Router();

router.get('/payment', function(req, res, next) {
    res.render('shop-views/payment')
});

module.exports = router;