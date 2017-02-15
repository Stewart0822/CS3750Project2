var express = require('express');
var router = express.Router();


router.get("/chat", function(request, response, next) {
    response.render("chatroom.jade");
});


module.exports = router;