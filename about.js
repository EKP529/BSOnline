let newGame = document.getElementById("newGame");

if (localStorage.getItem('loggedIn') === 'f') {
    newGame.parentElement.removeChild(newGame);
}
else {
    if (newGame === null) {
        newGame = document.createElement('li');
        newGame.className = "nav-item";
        newGame.id = "newGame";
        const newGameA = document.createElement('a');
        newGameA.className = "nav-link";
        newGameA.href = "lobby.html";
        newGameA.textContent = 'New Game';
        newGame.appendChild(newGameA);
        const parentEl = document.querySelector('.navbar-nav');
        parentEl.appendChild(newGame);
    }
}

