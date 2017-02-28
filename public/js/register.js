function init(){
    function validateRegister() {
        if (document.getElementById("fName").value === "") {
            document.getElementById("fName").style = "background-color:#99ff99";
            document.getElementById("fName").placeholder = "Requiered";
        }
        if (document.getElementById("lName").value === "") {
            document.getElementById("lName").style = "background-color:#99ff99";
            document.getElementById("lName").placeholder = "Requiered";
        }
        if (document.getElementById("uName").value === "") {
            document.getElementById("uName").style = "background-color:#99ff99";
            document.getElementById("uName").placeholder = "Requiered";
        }
        if (document.getElementById("email").value === "") {
            document.getElementById("email").style = "background-color:#99ff99";
            document.getElementById("email").placeholder = "Requiered";
        }
        if (document.getElementById("pwd").value === "") {
            document.getElementById("pwd").style = "background-color:#99ff99";
            document.getElementById("pwd").placeholder = "Requiered";
        }
        if (document.getElementById("rPwd").value === "") {
            document.getElementById("rPwd").style = "background-color:#99ff99";
            document.getElementById("rPwd").placeholder = "Requiered";
        }

    }//end validate user

    function clearFnameErr() {
        document.getElementById("fNameErr").innerHTML = "";        
    }
    function clearLnameErr() {
        document.getElementById("lNameErr").innerHTML = "";        
    }
    function clearUnameErr() {
        document.getElementById("uNameErr").innerHTML = "";        
    }
    function clearEmailErr() {
        document.getElementById("emailErr").innerHTML = "";        
    }
    function clearPwdErr() {
        document.getElementById("pwdErr").innerHTML = "";        
    }
    function clearRpwdErr() {
        document.getElementById("rPwdErr").innerHTML = "";        
    }
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
    $('#btnRegister').on('click', validateRegister);
    $('#fName').on('click', clearFnameErr);
    $('#lName').on('click', clearLnameErr);
    $('#uName').on('click', clearUnameErr);
    $('#email').on('click', clearEmailErr);
    $('#pwd').on('click', clearPwdErr);
    $('#rPwd').on('click', clearRpwdErr);


}
$(document).on('ready', init);