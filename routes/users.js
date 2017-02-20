var express = require('express');
var router = express.Router();


router.get("/users/login", function(request, response, next) {
    response.render("login.jade");
});


module.exports = router;