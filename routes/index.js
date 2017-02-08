var express = require('express');
var router = express.Router();
var io = require("socket.io");


router.get("/", function(request, response, next) {
    response.render("index");
});




module.exports = router;