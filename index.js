localStorage.setItem('loggedIn', 'f');

let usernameEl;
let passwordEL;

function checkInputs() {
    usernameEl = document.querySelector("#username");
    passwordEL = document.querySelector("#password");
    return (usernameEl.value !== '') && (passwordEL.value !== '');

}
function login() {
    if (checkInputs()) {
        localStorage.setItem("userName", usernameEl.value);
        localStorage.setItem("password", passwordEL.value);
        localStorage.setItem('loggedIn', 't');
        window.location.href = "lobby.html";
    }
}