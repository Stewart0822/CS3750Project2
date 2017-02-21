var express = require('express');
var router = express.Router();

router.get("/", function(request, response, next) {
    response.render("index");
});


router.get("/About", function(request, response, next) {
    response.render("about.jade");
});

module.exports = router;