module.exports = function(User) {

    var express = require('express');
    var router = express.Router();



    router.get("/Users/Login", function(request, response, next) {
        response.render("login.jade");
    });

    router.get("/Users/Register", function(request, response, next) {
        response.render("register.jade");
    });

    router.post("/Users/Register/NewUser", function(request, response, next) {
        console.log(request.body.name);
        var anewone = new User;
        anewone.name = request.body.name;
        anewone.password = request.body.password;
        anewone.email = request.body.email;
        console.log(anewone);
        anewone.save();
        //console.log(User.find({ name: 'Fred' }));
    });


    router.post("/login", function(request, response) {

        console.log("in the login post func");
        authenticate(request.body.username, request.body.password, function(err, user) {
            if (user) {

                response.redirect('/chat');
            } else {
                response.redirect('/users/login');
            }
        })
    });

    function authenticate(name, pass, fn) {
        if (!module.parent) console.log('auth');

        User.findOne({
                name: name
            },
            //this right here is where it needs (user), but I'm not understanding how that can be "true" and run the pass==user.password
            function(err, user) {
                if (user) {
                    if (err) return fn(new Error('cannot find user'));
                    if (pass == user.password) return fn(null, user);
                } else {
                    console.log("here1?")
                    return fn(new Error('cannot find user'));
                }
            });
    }

    /*app.post("/login", function(request, response) {
        response.send('this work?1');
        var username = request.body.username;
        if (request.body.username == undefined || request.body.message.trim()=="") {
            return response.status(400).json({error: "Username invalid"});
        }
        var password = request.body.password;
        if (request.body.password == undefined || request.body.password.trim() == "") {
            return response.status(400).json({error: "Password invalid"});
        }
        response.send('this work?2');
        io.sockets.emit("loggedIn", {username: username, password: password });

        response.status(200).json({ message: "received"});
        
    });
    */
    return router;
}