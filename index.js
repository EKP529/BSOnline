function login() {
    const usernameEl = document.querySelector("#username");
    const passwordEL = document.querySelector("#password");
    localStorage.setItem("userName", usernameEl.value);
    localStorage.setItem("password", passwordEL.value);
    window.location.href = "lobby.html";
}