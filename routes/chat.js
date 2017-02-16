module.exports = function(io) {

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


    router.post("/message", function(request, response) {
        var message = request.body.message;
        if (request.body.message == undefined || request.body.message.trim() == "") {
            return response.status(400).json({ error: "Message is invalid" });
        }
        var name = request.body.name;
        io.sockets.emit("incomingMessage", { message: message, name: name });

        response.status(200).json({ message: "Message received" });
    });

    return router
}

//module.exports = router;