//login.jade//
function init() {

    function validateLogin() {
        
        var userNameRegex = /^[a-zA-Z0-9]+$/;
        var userNameInput = $('#name').val();
        var passwordInput = $('#pwd').val();
        var userresult = userNameRegex.test(userNameInput);
        var passresult = userNameRegex.test(passwordInput);

        if (document.getElementById("name").value === "" || userresult == false) {
            if(document.getElementById("name").value === ""){
                document.getElementById("name").style = "background-color:#99ff99";
                document.getElementById("name").placeholder = "Requiered";
            }
            else{
               document.getElementById("name").value = "";
               document.getElementById("name").style = "background-color:#99ff99";
               document.getElementById("name").placeholder = "Invalid Username";
            }
        
        }
        if (document.getElementById("pwd").value === "" || emailresult == false) {
            if(document.getElementById("pwd").value === ""){
                document.getElementById("pwd").style = "background-color:#99ff99";
                document.getElementById("pwd").placeholder = "Requiered";
            }
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

    
    
  
    $('#btnLogin').on('click', validateLogin);
    $('#name').on('focus', clearNameErr);
    $('#pwd').on('focus', clearPwdErr);
}


$(document).on('ready', init);