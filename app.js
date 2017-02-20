var express = require("express"),
    app = express(),
    http = require("http").createServer(app);
var path = require('path');
var io = require("socket.io").listen(http);
var bodyParser = require('body-parser');
var socketController = require('./controllers/chatController');
socketController(io);
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url)
var UserSchema = new mongoose.Schema( 
{
    name: String,
    password: String,
    email: String
});

var User = mongoose.model('users', UserSchema);


var index = require('./routes/index');
var chat = require('./routes/chat');

app.set("ipaddr", "127.0.0.1");
app.set("port", 3000);
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname + '/public')));

//my views

// Home
//app.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

// Chat room   -I think this is handled by a seperate controller
//app.get('/Chat', function(req, res) {
//    res.render('chatroom', { title: 'Express' });
//});

app.post("/message", function(request, response) {
    var message = request.body.message;
    if (request.body.message == undefined || request.body.message.trim() == "") {
        return response.status(400).json({ error: "Message is invalid" });
    }
    var name = request.body.name;
    io.sockets.emit("incomingMessage", { message: message, name: name });

    response.status(200).json({ message: "Message received" });
});

app.post("/login", function(request,response){
    
        console.log("in the login post func");
        authenticate(request.body.username, request.body.password, function (err, user){
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
        function (err, user){
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
app.use('/', index);
app.use('/', chat);





http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("server up and running. Got to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

module.exports = app;