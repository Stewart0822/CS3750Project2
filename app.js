var express = require("express"),
    app = express(),
    http = require("http").createServer(app);
var path = require('path');
var io = require("socket.io").listen(http);
var bodyParser = require('body-parser');
var db = require('./db');
var mongoose = require(mongoose);
var participants = [];

//var User = mongoose.model('User', UserSchema);

var index = require('./routes/index');
var login = require('./routes/login');

app.set("ipaddr", "127.0.0.1");
app.set("port", 3000);
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname + '/public')));

app.post("/message", function(request, response) {
    var message = request.body.message;
    if (request.body.message == undefined || request.body.message.trim() == "") {
        return response.status(400).json({ error: "Message is invalid" });
    }
    var name = request.body.name;
    io.sockets.emit("incomingMessage", { message: message, name: name });

    response.status(200).json({ message: "Message received" });
});

app.post("/login", function(request, response){
    var login = request.body.login;
    if (request.body.login == undefined || request.body.login.trim() == ""){
        return response.status(400).json({error: "Login is invalid"});
    }
    var password = request.body.password;
    if (request.body.password == undefined || request.body.password.trim() == ""){
        return response.status(400).json({error: "Login is invalid"});
    }
    
    var User = mongoose.model('User', UserSchema);

    User.find({name: login, password: password}, callback)
    //db.collection('users').find({name: login, password: password}) != null)
    //{
      //  return app.use('/',index);
   // }
    


});

app.use('/', login);

io.on("connection", function(socket) {
    socket.on("newUser", function(data) {
        participants.push({ id: data.id, name: data.name });
        io.sockets.emit("newConnection", { participants: participants })
    });

    socket.on("nameChange", function(data) {
        participants.forEach(function(e) {
            if (e.id == data.id)
                e.name = data.name;
        });
        io.sockets.emit("nameChanged", { id: data.id, name: data.name });
    });

    socket.on("disconnect", function() {
        participants = participants.filter(function(data) {
            return data.id != socket.id;
        });
        io.sockets.emit("userDisconnected", { id: socket.id, sender: "system" });
    });


});

http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("server up and running. Got to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

module.exports = app;
