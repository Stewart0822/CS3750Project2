var express = require("express"),
    app = express(),
    http = require("http").createServer(app);
var path = require('path');
var io = require("socket.io").listen(http);
var bodyParser = require('body-parser');
var socketController = require('./controllers/chatController');
socketController(io);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ForP2')
var models = require('./models');

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

app.use('/', index);
app.use('/', chat);





http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("server up and running. Got to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

module.exports = app;