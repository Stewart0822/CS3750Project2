var express = require('express');
var router = express.Router();

var loggedin = false;

router.all('/*', function(request, response, next) {
    //if the user is logged in send true
    console.log(request.session.myName + " " + loggedin);
    if (request.session.myName != null && request.session.myName != undefined) {
        loggedin = true;
    } else {
        loggedin = false;
    }
    //else invoke next

    next();
})

router.get("/", function(request, response, next) {
    response.render("index", { loggedIn: loggedin });
});


router.get("/About", function(request, response, next) {
    response.render("about.jade", { loggedIn: loggedin });
});

module.exports = router;