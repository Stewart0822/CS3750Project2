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

    socket.on('')
    socket.on('error', function(reason) {
        console.log('Unable to connect to server', reason);
    });

    function login() {
        var login = $('#login').val();
        var password = $('#password').val();
        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ login: login, password: password })
        });
    }

    function loginKeyDown(event) {
        if (event.which == 13) {
            event.preventDefault();
            if ($('#login').val().trim().length <= 0) {
                return;
            }
            login();
            $('#login').val('');
        }
    }

    function loginKeyUp() {
        var loginValue = $('#login').val();
        $('#loginButton').attr('disabled', (loginValue.trim()).length > 0 ? false : true);
    }

    $('#login').on('keydown', loginKeyDown);
    $('#login').on('keyup', loginKeyUp);
    $('#loginButton').on('click', login);

}

$(document).on('ready', init);