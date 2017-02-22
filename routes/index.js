var express = require('express');
var router = express.Router();

var loggedin = false;

router.all('/*', function(request, response, next) {

    if (request.session.myName != null && request.session.myName != undefined) {
        loggedin = true;
    } else {
        loggedin = false;
    }
    next();
})

router.get("/", function(request, response, next) {
    response.render("index", { loggedIn: loggedin });
});

router.get("/About", function(request, response, next) {
    response.render("about.jade", { loggedIn: loggedin });
});

module.exports = router;