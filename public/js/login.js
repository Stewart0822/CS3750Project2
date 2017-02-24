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

    function validateForm(event){
        var userNameRegex = /^[a-zA-Z0-9]+$/;
        var userNameInput = $('#username').val();
        var passwordInput = $('#password').val();
        var userresult = userNameRegex.test(userNameInput);
        var passresult = userNameRegex.test(passwordInput);
        //var validUsername = document.frm.userName.username.match(userNameRegex);
        if(userresult == false && passresult == true){
            alert("Your user name is not valid.\nOnly include letters or numbers");
            //document.frm.userName.focus();
        }
        else if(userresult == false && passresult == false) {
            alert("Your user name and password are not valid.\nOnly include letters or numbers");
        }
        else if(passresult == false && userresult == true) {
            alert("Your password is not valid.\nOnly include letters or numbers.");
        }
        else {
            loginNow();
        }

    }

    function handleEnterKey(e){
         if (e.keyCode == 13) {
            validateForm();
        }
    }
    //$('#login').on('click', validateForm)
    //if (validateForm() == false) {

    //}
    //else {
        //$('#login').on('click', loginNow)
        //$('#logout').on('click', logoutNow)
    //}
     //('#login').on('click', loginNow)
     $('#login').on('click', loginNow);
     $('#logout').on('click', logoutNow);
     $('#login').on('click', validateForm);
     $("#username").keydown(handleEnterKey);
     $("#password").keydown(handleEnterKey);
}

$(document).on('ready', init);