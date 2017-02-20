function init(){

function loginNow() {
    var username = $('#username').val();
    var password = $('#password').val();
    $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({username: username, password: password}),
        success: function(data, textStatus, jqXHR) {
                if (typeof data.redirect == 'string'){
                    window.location = data.redirect
                }
        }
    });
}

$('#login').on('click', loginNow )
}
$(document).on('ready', init);