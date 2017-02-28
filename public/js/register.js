function init(){
    
    function validateRegister(event) {

        var firstNameRegex = /^[a-zA-Z]+$/;
        var lastNameRegex = /^[a-zA-Z]+$/;
        var userNameRegex = /^[a-zA-Z0-9]+$/;
        var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var firstNameInput = $('#fName').val();
        var lastNameInput = $('lName').val();
        var userNameInput = $('#uName').val();
        var passwordInput = $('#pwd').val();
        var emailInput = $('#email').val();
        var userresult = userNameRegex.test(userNameInput);
        var lnameresult = lastNameRegex.test(lastNameInput);
        var fnameresult = firstNameRegex.test(firstNameInput);
        var passresult = userNameRegex.test(passwordInput);
        var emailresult = emailRegex.test(emailInput); 
        
        if (document.getElementById("fName").value === "" || fnameresult == false) {
            if (document.getElementById("fName").value === ""){
                document.getElementById("fName").style = "background-color:#99ff99";
                document.getElementById("fName").placeholder = "Requiered";
            }
            else{
               document.getElementById("fName").value = "";
               document.getElementById("fName").style = "background-color:#99ff99";
               document.getElementById("fName").placeholder = "Invalid First Name";
            }
        }
        if (document.getElementById("lName").value === "" || lnameresult == false) {
            if (document.getElementById("lName").value === "") {
                document.getElementById("lName").style = "background-color:#99ff99";
                document.getElementById("lName").placeholder = "Requiered";
            }
            else{
               document.getElementById("lName").value = "";
               document.getElementById("lName").style = "background-color:#99ff99";
               document.getElementById("lName").placeholder = "Invalid Last Name";
            }
        }
        if (document.getElementById("uName").value === "" || userresult == false) {
            if(document.getElementById("uName").value === ""){
                document.getElementById("uName").style = "background-color:#99ff99";
                document.getElementById("uName").placeholder = "Requiered";
            }
            else{
               document.getElementById("uName").value = "";
               document.getElementById("uName").style = "background-color:#99ff99";
               document.getElementById("uName").placeholder = "Invalid Username";
            }        
        }
        if (document.getElementById("email").value === "" || emailresult == false) {
            if(document.getElementById("email").value === ""){
                document.getElementById("email").style = "background-color:#99ff99";
                document.getElementById("email").placeholder = "Requiered";
            }
            else{
                document.getElementById("email").value = "";
                document.getElementById("email").style = "background-color:#99ff99";
                document.getElementById("email").placeholder = "Invalid Email Address";
            }
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
        document.getElementById("fName").placeholder = "";
        document.getElementById('fName').style = "background-color:#ffffff";        
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
    // function registerNow(){
    //     var firstname = $('#fName').val();
    //     var lastname = $('#lName').val(); 
    //     var password = $('#pwd').val();
    //     var username = $('#uName').val();
    //     $.ajax({
    //         url: '/Users/register',
    //         type: 'POST',
    //         contentType: 'application/json',
    //         dataType: 'json',
    //         data: JSON.stringify({ fisrtname: fName, lastname: lName, username: username, password: password }),
    //         success: function(data, textStatus, jqXHR) {
    //             window.location = '../chat';
    //         },
    //         error: function(err) { //On Error will need to popup banner that there was an error. from Adam's code. Need to know error codes :)
    //             console.log(err);
    //         }
    //     });
    // }
    function handleEnterKey(event){
         if (event.keyCode == 13) {
            validateRegister();
        }
    }

 
    $('#btnRegister').on('click', validateRegister);
    $('#fName').on('focus', clearFnameErr);
    $('#lName').on('focus', clearLnameErr);
    $('#uName').on('focus', clearUnameErr);
    $('#email').on('focus', clearEmailErr);
    $('#pwd').on('focus', clearPwdErr);
    $('#rPwd').on('focus', clearRpwdErr);
    //-----------------------------------------------------------------------------
    $('#login').on('click', registerNow);
    //$('#btnRegister').on('click', validateForm);
    $('#fName').on('keydown', handleEnterKey);
    $('#lName').on('keydown',handleEnterKey);
}
$(document).on('ready', init);