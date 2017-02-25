//login.jade//
function init() {

    function validateLogin() {
        if (document.getElementById("name").value === "") {
            document.getElementById("nameErr").innerHTML = "Requiered";
            nameErr.style = "color:blue";
        }
        if (document.getElementById("pwd").value === "") {
            document.getElementById("pwdErr").innerHTML = "Requiered";
            pwdErr.style = "color:blue";
        }
    }

    function clearNameErr() {
        document.getElementById("nameErr").innerHTML = "";
        document.getElementById("name").value = "";
    }

    function clearPwdErr() {
        document.getElementById("pwdErr").innerHTML = "";
        document.getElementById("pwd").value = "";
    }

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

    function loginUser() {
        $.ajax({
            url: '/Users/Register/NewUser',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({ name: 'Fred', password: 'Password', email: 'FredEmail' })
        });
    }



    $('#btnLogin').on('click', loginUser);
    $('#btnLogin').on('click', validateLogin);
    $('#name').on('click', clearNameErr);
    $('#pwd').on('click', clearPwdErr);


}


$(document).on('ready', init);