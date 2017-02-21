function init() {

    function loginNow() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ username: username, password: password }),
            success: function(data, textStatus, jqXHR) {
                //Should set session variable here once authenticated. Chat will eventually not load without it. 
                window.location = '../chat'

            },
            error: function(err) { //On Error will need to popup banner that there was an error. from Adam's code
                console.log(err);
            }

        });
    }

    $('#login').on('click', loginNow)
}
$(document).on('ready', init);