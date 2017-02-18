//login.jade//

document.getElementById("btnLogin").onclick = function() {validateLogin();};
document.getElementById("name").onclick = function() {clearNameErr();};
document.getElementById("pwd").onclick = function() {clearPwdErr();};

function validateLogin() {
  if(document.getElementById("name").value === ""){
    document.getElementById("nameErr").innerHTML = "Requiered";
    nameErr.style = "color:blue";
  }
  if(document.getElementById("pwd").value === ""){
    document.getElementById("pwdErr").innerHTML = "Requiered";
    pwdErr.style = "color:blue";
  }
}
function clearNameErr(){
  document.getElementById("nameErr").innerHTML = "";
  document.getElementById("name").value = "";
}
function clearPwdErr(){
  document.getElementById("pwdErr").innerHTML = "";
  document.getElementById("pwd").value = "";
}
