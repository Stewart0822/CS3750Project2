function init() {
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

    $('#logout').on('click', logoutNow)

}
$(document).on('ready', init);