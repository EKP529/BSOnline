class Lobby{
    players;
    opponents = ['liar23', 'ImGoOd7', 'player68'];

    constructor() {
        this.players = [this.getUserName()];
        const usernameEl = document.querySelector('.currUser > .username');
        usernameEl.textContent = this.getUserName();
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Mystery player';
    }
    async getOpponents() {
        let opps = [];
        let i = 0;
        for (const el of document.querySelectorAll('.opponent > .username')) {
            await delay(1000);
            el.textContent = this.opponents[i];
            opps.push(this.opponents[i]);
            i++;
        }
        localStorage.setItem('oppUsernames', JSON.stringify(opps));
    }
}

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}
const lobby = new Lobby();
lobby.getOpponents();