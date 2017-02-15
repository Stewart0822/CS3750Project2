function init() {

    var serverBaseUrl = document.domain;

    /*
     On client init, try to connect to the socket.IO server.
     Note we don't specify a port since we set up our server
     to run on port 8080
    */
    var socket = io.connect(serverBaseUrl + ":3000");

    //We'll save our session ID in a variable for later
    var sessionId = '';

    function updateParticipants(participants) {
        $('#participants').html('');
        participants.forEach(function(element) {
            $('#participants').append('<span id="' + element.id + '">' +
                element.name + ' ' + (element.id === sessionId ? '(You)' : '') + '<br /></span>');
        });
    }

    //when new user logs on
    socket.on('connect', function() {
        sessionId = socket.io.engine.id;
        socket.emit('newUser', { id: sessionId, name: $('#name').val() }); //send the newUser massage to all users
    });

    //When a new user announces they have connected
    socket.on('newConnection', function(data) {
        updateParticipants(data.participants); // update the participants array
    });

    socket.on('userDisconnected', function(data) {
        $('#' + data.id).remove();
    });
    socket.on('nameChanged', function(data) {
        $('#' + data.id).html(data.name + ' ' + (data.id === sessionId ? '(You)' : '') + '<br />');
    });
    socket.on('incomingMessage', function(data) {
        var message = data.message;
        var name = data.name;
        $('#messages').prepend('<b>' + name + '</b><br >' + message + '<hr />');
    });
    socket.on('error', function(reason) {
        console.log('Unable to connect to server', reason);
    });

    function sendMessage() {
        var outgoingMessage = $('#outgoingMessage').val();
        var name = $('#name').val();
        $.ajax({
            url: '/message',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ message: outgoingMessage, name: name })
        });
    }

    function outgoingMessageKeyDown(event) {
        if (event.which == 13) {
            event.preventDefault();
            if ($('#outgoingMessage').val().trim().length <= 0) {
                return;
            }
            sendMessage();
            $('#outgoingMessage').val('');
        }
    }

    function outgoingMessageKeyUp() {
        var outgoingMessageValue = $('#outgoingMessage').val();
        $('#send').attr('disabled', (outgoingMessageValue.trim()).length > 0 ? false : true);
    }

    function nameFocusOut() {
        var name = $('#name').val();
        socket.emit('nameChange', { id: sessionId, name: name });
    }

    $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
    $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);
    $('#name').on('focusout', nameFocusOut);
    $('#send').on('click', sendMessage);

}
console.log('test1');
$(document).on('ready', init);