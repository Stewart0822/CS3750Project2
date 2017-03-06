module.exports = function(io, User) {

    var express = require('express');
    var router = express.Router();

    let loggedin = false;

    router.all('/chat*', function(request, response, next) {
        if (request.session.myName === null || request.session.myName === undefined) {
            loggedin = false;
            response.redirect('/Users/Login');
            return;
        } else {
            loggedin = true;
        }
        next();
    })

    router.get("/chat", function(request, response, next) {
        response.render("chatroom.jade", { username: request.session.myName, loggedIn: loggedin });
    });

    router.post("/chat/message", function(request, response) {
        var message = request.body.message;
        if (request.body.message == undefined || request.body.message.trim() == "") {
            return response.status(400).json({ error: "Message is invalid" });
        }
        if (message.charAt(0) == '/') {
            var commands = message.split(" ");
            response.status(200).json({ message: "Missing Command" });
        } else {
            var name = request.session.myName;
            io.sockets.emit("incomingMessage", { message: message, name: name });
            //save message to users file in DB
            User.findOne({ name: name }, function(err, user) {

                user.messages.push({ dateTime: thisDate(), message: message });
                user.save();
                //console.log(user);
            });
            response.status(200).json({ message: "Message received" });
        }
    });

    function thisDate() {
        var today = new Date;
        return today.getFullYear() +
            ":" + today.getMonth() +
            ":" + today.getDate() +
            ":" + today.getHours() +
            ":" + today.getMinutes() +
            ":" + today.getSeconds()
    };

    return router
}