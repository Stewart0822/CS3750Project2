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

    }

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

   
    



    function clearPwdErr() {
        document.getElementById("pwdErr").innerHTML = "";
        document.getElementById("pwd").value = "";
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