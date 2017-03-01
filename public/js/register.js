function init() {

    function validateRegister(event) {

        var firstNameRegex = /^[a-zA-Z]+$/;
        var lastNameRegex = /^[a-zA-Z]+$/;
        var userNameRegex = /^[a-zA-Z0-9]+$/;
        var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var firstNameInput = $('#fName').val();
        var lastNameInput = $('#lName').val();
        var userNameInput = $('#uName').val();
        var passwordInput = $('#pwd').val();
        var emailInput = $('#email').val();
        var userresult = userNameRegex.test(userNameInput);
        var lnameresult = lastNameRegex.test(lastNameInput);
        var fnameresult = firstNameRegex.test(firstNameInput);
        var passresult = userNameRegex.test(passwordInput);
        var emailresult = emailRegex.test(emailInput);
        var fname = document.getElementById("fName");
        var lname = document.getElementById("lName");
        var uname = document.getElementById("uName");
        var email = document.getElementById("email");
        var pass = document.getElementById("pwd");
        var rpass = document.getElementById("rPwd");
        var continueLogin = true;

        if (fname.value === "" || fnameresult == false) {
            continueLogin = false;
            if (fname.value === "") {
                fname.style = "background-color:#99ff99";
                fname.placeholder = "Required";
            } else {
                fname.value = "";
                fname.style = "background-color:#99ff99";
                fname.placeholder = "Invalid First Name";
            }
        }
        if (lname.value === "" || lnameresult == false) {
            continueLogin = false;
            if (lname.value === "") {
                lname.style = "background-color:#99ff99";
                lname.placeholder = "Required";
            } else {
                lname.value = "";
                lname.style = "background-color:#99ff99";
                lname.placeholder = "Invalid Last Name";
            }
        }
        if (uname.value === "" || userresult == false) {
            continueLogin = false;
            if (uname.value === "") {
                uname.style = "background-color:#99ff99";
                uname.placeholder = "Required";
            } else {
                uname.value = "";
                uname.style = "background-color:#99ff99";
                uname.placeholder = "Invalid Username";
            }
        }
        if (email.value === "" || emailresult == false) {
            continueLogin = false;
            if (email.value === "") {
                email.style = "background-color:#99ff99";
                email.placeholder = "Required";
            } else {
                email.value = "";
                email.style = "background-color:#99ff99";
                email.placeholder = "Invalid Email Address";
            }
        }
        if (pass.value === "" || (pass.value != rpass.value)) {
            continueLogin = false;
            if(pass.value === ""){
                pass.style = "background-color:#99ff99";
                pass.placeholder = "Required";
            }
            else{
                pass.value = "";
                pass.style = "background-color:#99ff99";
                pass.placeholder = "Passwords Do Not Match";
            }
        }
        if (rpass.value === "" || (pass.value != rpass.value)) {
            continueLogin = false;
            if(rpass.value === ""){
                rpass.style = "background-color:#99ff99";
                rpass.placeholder = "Required";
            }
            else{
                rpass.value = "";
                rpass.style = "background-color:#99ff99";
                rpass.placeholder = "Passwords Do Not Match";
            }
        }


        /*
            If user is valid fire Register User
        */
        if (continueLogin) {
            registerUser();
        }

    } //end validate user
    function clearFnameErr() {
        document.getElementById("fName").placeholder = "";
        document.getElementById("fName").style = "background-color:#ffffff";
    }

    function clearLnameErr() {
        document.getElementById("lName").placeholder = "";
        document.getElementById('lName').style = "background-color:#ffffff";
    }

    function clearUnameErr() {
        document.getElementById("uName").placeholder = "";
        document.getElementById('uName').style = "background-color:#ffffff";
    }

    function clearEmailErr() {
        document.getElementById("email").placeholder = "";
        document.getElementById('email').style = "background-color:#ffffff";
    }

    function clearPwdErr() {
        document.getElementById("pwd").placeholder = "";
        document.getElementById('pwd').style = "background-color:#ffffff";
    }

    function clearRpwdErr() {
        document.getElementById("rPwd").placeholder = "";
        document.getElementById('rPwd').style = "background-color:#ffffff";
    }



    function registerUser() {
        var fname = document.getElementById("fName");
        var lname = document.getElementById("lName");
        var uname = document.getElementById("uName");
        var email = document.getElementById("email");
        var pass = document.getElementById("pwd");
        $.ajax({
            url: '/Users/Register/NewUser',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                name: uname,
                firstname: fname,
                lastname: lname,
                password: pass,
                email: email
            })
        });
    }

    /*$('#register').on('click', registerUser);
    function handleEnterKey(event){
         if (event.keyCode == 13) {
            validateRegister();
        }
    }*/


    $('#btnRegister').on('click', validateRegister);
    $('#fName').on('focus', clearFnameErr);
    $('#lName').on('focus', clearLnameErr);
    $('#uName').on('focus', clearUnameErr);
    $('#email').on('focus', clearEmailErr);
    $('#pwd').on('focus', clearPwdErr);
    $('#rPwd').on('focus', clearRpwdErr);
    // $('#fName').on('keydown', handleEnterKey);
    // $('#lName').on('keydown', handleEnterKey);
}
$(document).on('ready', init);