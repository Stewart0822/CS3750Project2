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


    socket.on('incomingMessage', function(data) {
        showMessage(data.name, data.message);
        /*var message = data.message;
        var name = data.name;
        
        var messageDiv = document.createElement('div');
        messageDiv.style.clear = 'both';
        var messageDivName = document.createElement('div');
        messageDivName.style.fontSize = '12';
        messageDivName.style.cssFloat = 'left';
        var messageDivMessage = document.createElement('div');
        messageDivMessage.style.cssFloat = 'left';
        messageDivName.innerHTML = '' + name + ': ';
        messageDivMessage.textContent = ' ' + message;
        messageDiv.appendChild(messageDivName);
        messageDiv.appendChild(messageDivMessage);
        $('#messages').append(messageDiv);
        scrollDown();*/
    });

    socket.on('error', function(reason) {
        console.log('Unable to connect to server', reason);
    });

    function sendMessage() {
        var outgoingMessage = $('#outgoingMessage').val();
        console.log(outgoingMessage);
        $('#outgoingMessage').val("");
        var name = $('#name').val();
        $.ajax({
            url: '/chat/message',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ message: outgoingMessage, name: name }),
            success: function(res) {
                if (res.message != 'Message received') {
                    showMessage('<b style="color:blue;">Administrator:</b>', res.message);
                }
            }
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



    $('#outgoingMessage').on('keydown', outgoingMessageKeyDown);
    $('#outgoingMessage').on('keyup', outgoingMessageKeyUp);

    $('#send').on('click', sendMessage);

}
$(document).on('ready', init);

function scrollDown() {
    var objDiv = document.getElementById("messages");
    if (objDiv.scrollHeight != null) {
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}

function showMessage(name, message) {
    var messageDiv = document.createElement('div');
    messageDiv.style.clear = 'both';
    var messageDivName = document.createElement('div');
    messageDivName.style.fontSize = '12';
    messageDivName.style.cssFloat = 'left';
    var messageDivMessage = document.createElement('div');
    messageDivMessage.style.cssFloat = 'left';
    messageDivName.innerHTML = '' + name + ':&nbsp&nbsp';
    messageDivMessage.textContent = '' + message;
    messageDiv.appendChild(messageDivName);
    messageDiv.appendChild(messageDivMessage);
    $('#messages').append(messageDiv);
    scrollDown();
}