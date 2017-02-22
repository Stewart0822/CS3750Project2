function init() {

    function loginNow() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: '/Users/login',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ username: username, password: password }),
            success: function(data, textStatus, jqXHR) {
                window.location = '../chat';
            },
            error: function(err) { //On Error will need to popup banner that there was an error. from Adam's code
                console.log(err);
            }

        });
    }

    function logoutNow() {
        $.ajax({
            url: '/Users/logout',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({}),
            success: function(data, textStatus, jqXHR) {
                window.location = '../'
            }
        });
    }

    $('#login').on('click', loginNow)
    $('#logout').on('click', logoutNow)
}
$(document).on('ready', init);