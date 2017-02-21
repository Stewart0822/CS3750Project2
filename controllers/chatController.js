module.exports = function(io) {

    var participants = [];


    io.on("connection", function(socket) {
        socket.on("newUser", function(data) {
            participants.push({ id: data.id, name: data.name });
            io.sockets.emit("newConnection", { participants: participants })
        });



        socket.on("disconnect", function() {
            participants = participants.filter(function(data) {
                return data.id != socket.id;
            });
            io.sockets.emit("userDisconnected", { id: socket.id, sender: "system" });
        });


    });
}