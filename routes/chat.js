module.exports = function(io, User) {

    var express = require('express');
    var router = express.Router();


    router.all('/chat*', function(request, response, next) {
        //if not req.session.userID redirect to login page
        if (request.session.myName === null || request.session.myName === undefined) {
            response.redirect('/Users/Login');
            return;
        }
        //else invoke next
        next();
    })

    router.get("/chat", function(request, response, next) {
        console.log(request.session.myName);
        response.render("chatroom.jade", { username: request.session.myName });
    });


    router.post("/chat/message", function(request, response) {
        if (request.body.message == undefined || request.body.message.trim() == "") {
            return response.status(400).json({ error: "Message is invalid" });
        }
        if (message.charAt(0) == '/') {
            response.status(200).json({ message: "Taco Salad" });
        } else {
            var name = request.body.name;
            io.sockets.emit("incomingMessage", { message: message, name: name });
            //save message to users file in DB

            User.findOne({ name: name }, function(err, user) { //change this to be the current user ID from the session variable

                user.messages.push({ dateTime: thisDate(), message: message });
                user.save();

                console.log(user);
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

//module.exports = router;