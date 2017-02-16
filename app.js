var express = require("express"),
    app = express(),
    http = require("http").createServer(app);
var path = require('path');
const io = require("socket.io").listen(http);
var bodyParser = require('body-parser');
var socketController = require('./controllers/chatController');
socketController(io);



var index = require('./routes/index');
var chat = require('./routes/chat')(io);


app.set("ipaddr", "127.0.0.1");
app.set("port", 3000);
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname + '/public')));



app.use('/', index);
app.use('/', chat);





http.listen(app.get("port"), app.get("ipaddr"), function() {
    console.log("server up and running. Got to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

module.exports = app;