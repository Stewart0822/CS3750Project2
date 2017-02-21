var express = require("express"),
    app = express(),
    http = require("http").createServer(app);
var path = require('path');
var io = require("socket.io").listen(http);
var bodyParser = require('body-parser');
var socketController = require('./controllers/chatController');
socketController(io);

//database stuff
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to db');
});
mongoose.connect(dbConfig.url);
var User = require('./models/mongoModels')(mongoose);


var index = require('./routes/index');
var user = require('./routes/user')(User);
var chat = require('./routes/chat');

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


app.use('/', index);
app.use('/', chat);
app.use('/', user)





http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("server up and running. Got to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

module.exports = app;