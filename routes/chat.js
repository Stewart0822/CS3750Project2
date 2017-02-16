var express = require('express');
var router = express.Router();

router.all(function(request, response, next) {
    //if not req.session.userID redirect to login page
    //else invoke next
    next();
})

router.get("/chat", function(request, response, next) {
    response.render("chatroom.jade");
});


module.exports = router;