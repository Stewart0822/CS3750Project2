module.exports = function(User) {

    var express = require('express');
    var router = express.Router();

    let loggedin = false;

    router.all('/*', function(request, response, next) {
        //if the user is logged in send true
        if (request.session.myName != null && request.session.myName != undefined) {
            loggedin = true;
        } else {
            loggedin = false;
        }
        //else invoke next

        next();
    })

    router.get("/Users/Login", function(request, response, next) {
        response.render("login.jade", { loggedIn: loggedin });
    });

    router.get("/Users/Register", function(request, response, next) {
        response.render("register.jade", { loggedIn: loggedin });
    });

    router.post("/Users/Register/NewUser", function(request, response, next) {
        //console.log(request.body.name);
        var anewone = new User;
        anewone.name = request.body.name;
        anewone.password = request.body.password;
        anewone.email = request.body.email;
        console.log(anewone);
        anewone.save();
        //console.log(User.find({ name: 'Fred' }));
    });


    router.post("/Users/login", function(request, response) {
        var username = request.body.username;
        var password = request.body.password;

        //console.log("in the login post func %S %S", username, password);
        authenticate(request.body.username, request.body.password, function(err, user) {
            if (user) {
                request.session.myName = user.name;
                response.status(200).json({ message: "Message received" }); //Changed these out to status codes
            } else {
                //console.log('in the else');
                response.status(301).json({ message: "Invalid Login Details Supplied" });
            }
        })
    });

    router.post("/Users/logout", function(request, response) {
        request.session.myName = null;
        response.status(200).json({ message: "Message received" }); //Changed these out to status codes

    });


    function authenticate(name, pass, fn) {
        if (!module.parent) console.log('auth');
        //console.log(name);
        //console.log(pass);

        User.findOne({
                name: name
            },
            //this right here is where it needs (user), but I'm not understanding how that can be "true" and run the pass==user.password
            function(err, user) {
                if (user) {
                    if (err) return fn(new Error('cannot find user'));
                    console.log('user found');
                    if (pass == user.password) {
                        return fn(null, user);
                    }
                    console.log('password does not match');
                } else {
                    console.log("here1?")
                    return fn(new Error('cannot find user'));
                }
            });
    }


    return router;
}