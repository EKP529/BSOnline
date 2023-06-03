localStorage.setItem('loggedIn', 'f');

(async () => {
  const username = localStorage.getItem('userName');
  if (username) {
    document.querySelector('#playerName').textContent = username;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

let usernameEl;
let passwordEL;

function checkInputs() {
    usernameEl = document.querySelector("#username");
    passwordEL = document.querySelector("#password");
    return (usernameEl.value !== '') && (passwordEL.value !== '');

}
async function login() {
  loginOrCreate(`/api/auth/login`);
}

async function register() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  if (checkInputs()) {
    const username = usernameEl.value;
    const password = passwordEL.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    
    if (response.ok) {
      localStorage.setItem('username', username);
      localStorage.setItem('loggedIn', 't');
      play();
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
}
function play() {
  window.location.href = 'lobby.html';
}
function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}
async function getUser(username) {
  // See if we have a user with the given username.
  const response = await fetch(`/api/user/${username}`);
  if (response.status === 200) {
    return response.json();
  }
  return null;
}
function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
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