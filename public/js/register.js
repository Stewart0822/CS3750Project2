function init() {


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

    function registerUser() {
        $.ajax({
            url: '/Users/Register/NewUser',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ name: 'Fred', password: 'Password', email: 'FredEmail' })
        });
    }



    $('#register').on('click', registerUser);

}
console.log("dsfsd");
$(document).on('ready', init);