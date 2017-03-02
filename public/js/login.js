//login.jade//
function init() {

    function validateLogin() {

        var userNameRegex = /^[a-zA-Z0-9]+$/;
        var userNameInput = $('#name').val();
        var passwordInput = $('#pwd').val();
        var userresult = userNameRegex.test(userNameInput);
        var passresult = userNameRegex.test(passwordInput);
        var name = document.getElementById("name");
        var pass = document.getElementById("pwd");
        var continueLogin = true;

        if (name.value === "" || userresult == false) {
            continueLogin = false;
            if (name.value === "") {
                name.style = "background-color:#99ff99";
                name.placeholder = "Required";
            } else {
                name.value = "";
                name.style = "background-color:#99ff99";
                name.placeholder = "Invalid Username";
            }

        }
        if (pass.value === "" || passresult == false) {
            continueLogin = false;
            if (pass.value === "") {
                pass.style = "background-color:#99ff99";
                pass.placeholder = "Required";
            }
        }

        /*
        if form validates fire loginNow event
        */
        if (continueLogin) {
            loginNow();
        }
    }

    function clearNameErr() {
        document.getElementById("name").placeholder = "";
        document.getElementById('name').style = "background-color:#ffffff";
    }

    function clearPwdErr() {
        document.getElementById("pwd").placeholder = "";
        document.getElementById('pwd').style = "background-color:#ffffff";
    }



    function loginNow() {

        var username = $('#name').val();
        var password = $('#pwd').val();
        $.ajax({
            url: '/Users/login',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            cashe: false,
            data: JSON.stringify({ username: username, password: password }),
            success: function(data, textStatus, jqXHR) {
                window.location = '../chat';
            },
            error: function(err) {
                //if (err.responseJSON.message == "Invalid Login Details Supplied") { //does not work in Edge browser
                $('#name,#pwd').val("");
                document.getElementById("name").style = "background-color:#ff0000";
                document.getElementById("name").placeholder = "LOGIN INVALID";
                document.getElementById("pwd").style = "background-color:#ff0000";
                document.getElementById("pwd").placeholder = "Please, try again.";
                //}
            }

        });
    }

    function handleEnterKey(e) {
        if (e.keyCode == 13) {
            validateForm();
        }
    }

    //$('#login').on('click', loginNow);
    //$("#username").keydown(handleEnterKey);
    //$("#password").keydown(handleEnterKey);
    $('#btnLogin').on('click', validateLogin);
    $('#name').on('focus', clearNameErr);
    $('#pwd').on('focus', clearPwdErr);
}


$(document).on('ready', init);