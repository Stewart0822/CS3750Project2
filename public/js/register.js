function init(){
    function validateRegister() {
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


    $('#btnRegister').on('click', validateRegister);
    $('#name').on('click', clearNameErr);
    $('#pwd').on('click', clearPwdErr);


}
$(document).on('ready', init);