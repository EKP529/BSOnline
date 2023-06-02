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

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
          const containerEl = document.querySelector('#quote');
          
          const quoteEl = document.createElement('p');
          quoteEl.classList.add('quote');
          const authorEl = document.createElement('p');
          authorEl.classList.add('author');
          
          quoteEl.textContent = data.content;
          authorEl.textContent = data.author;
          
          containerEl.appendChild(quoteEl);
          containerEl.appendChild(authorEl);
      });
}

displayQuote();