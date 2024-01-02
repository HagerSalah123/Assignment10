var user_name = document.getElementById("name");
var user_email = document.getElementById("email");
var user_password = document.getElementById("password");
var btn_signin = document.querySelector(".signin");
var login_email = document.getElementById("login_email");
var login_password = document.getElementById("login_password");
var message = document.getElementById("exist");
var message_login = document.getElementById("exist_login");

var paths = location.pathname.split("/");
var url = "";
for (var i = 0; i < paths.length - 1; i++) {
  url += "/" + paths[i];
}
var owner = localStorage.getItem("welcomeowner");
if (owner) {
  document.getElementById("owner").innerHTML = "Welcome " + owner;
}
var users = [];

if (localStorage.getItem("Users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("Users"));
}

// Sign_UP Code
function signup() {
  if (checkdata_empty() == false) {
    message.style.color = "red";
    message.innerHTML = "All inputs are required";
    return false;
  }

  var member = {
    name: user_name.value,
    email: user_email.value,
    password: user_password.value,
  };

  if (checkdata_exist() == false) {
    message.style.color = "red";
    message.innerHTML = "Email already exists";
    return false;
  }

  users.push(member);
  localStorage.setItem("Users", JSON.stringify(users));
  message.style.color = "green";
  message.innerHTML = "Success";
  return true;
}

function checkdata_empty() {
  if (
    user_name.value.trim() === "" ||
    user_email.value.trim() === "" ||
    user_password.value.trim() === ""
  ) {
    return false;
  }
  return true;
}

function checkdata_exist() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() === user_email.value.toLowerCase()) {
      return false;
    }
  }
  return true;
}

// For checking if login inputs are empty or not
function checkdatalogin_empty() {
  if (login_password.value.trim() === "" || login_email.value.trim() === "") {
    return false;
  }
  return true;
}

function login() {
  if (checkdatalogin_empty() == false) {
    message_login.style.color = "red";
    message_login.innerHTML = "All inputs are required";
    return false;
  }

  var password = login_password.value;
  var email = login_email.value;

  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email.toLowerCase() === email.toLowerCase() &&
      users[i].password === password
    ) {
      localStorage.setItem("welcomeowner", users[i].name);
      if (url == "/") {
        location.replace("https://" + location.hostname + "/index.html");
      } else {
        location.replace(url + "/index.html");
      }

      return true;
    }
  }
  message_login.style.color = "red";
  message_login.innerHTML = "Incorrect email or password";

  return false;
}

function logout() {
  localStorage.removeItem("welcomeowner");
}
