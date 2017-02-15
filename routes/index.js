var express = require('express');
var router = express.Router();
var io = require("socket.io");


router.get("/", function(request, response, next) {
    response.render("index");
});

router.get("/Chat", function(request, response, next) {
    response.render("chatroom.jade");
});

router.get("/Login", function(request, response, next) {
    response.render("login.jade");
});

router.get("/Register", function(request, response, next) {
    response.render("register.jade");
});

module.exports = router;