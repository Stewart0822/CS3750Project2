var express = require('express');
var router = express.Router();
var io = require("socket.io");
var db = require('../db');

router.get("/", function(request, response, next) {
    response.render("login");
});




module.exports = router;