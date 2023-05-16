class Card {
    _num;
    _val;
    _suit;

    constructor(num, val, suit) {
        this._num = num;
        this._val = val;
        this._suit = suit;
    }

    get num() {
        return this._num;
    }

    get val() {
        return this._val;
    }

    get suit() {
        return this._suit;
    }
}
class Deck {
    _cards = [];

    constructor() {
        for (let i = 2; i <= 14; i++) {
            if (i <= 10) {
                this._cards.push(new Card(`${i}`, i,'♦'));
                this._cards.push(new Card(`${i}`, i,'♣'));
                this._cards.push(new Card(`${i}`, i,'♥'));
                this._cards.push(new Card(`${i}`, i,'♠'));
            }
            else {
                if (i === 11) {
                    this._cards.push(new Card('J',11,'♦'));
                    this._cards.push(new Card('J',11,'♣'));
                    this._cards.push(new Card('J',11,'♥'));
                    this._cards.push(new Card('J',11,'♠'));
                }
                else if (i === 12) {
                    this._cards.push(new Card('Q',12,'♦'));
                    this._cards.push(new Card('Q',12,'♣'));
                    this._cards.push(new Card('Q',12,'♥'));
                    this._cards.push(new Card('Q',12,'♠'));
                }
                else if (i === 13) {
                    this._cards.push(new Card('K',13,'♦'));
                    this._cards.push(new Card('K',13,'♣'));
                    this._cards.push(new Card('K',13,'♥'));
                    this._cards.push(new Card('K',13,'♠'));
                }
                else {
                    this._cards.push(new Card('A',14,'♦'));
                    this._cards.push(new Card('A',14,'♣'));
                    this._cards.push(new Card('A',14,'♥'));
                    this._cards.push(new Card('A',14,'♠'));
                }
            }
        }
        this.#shuffle();
    }

    #shuffle() {
        let currentIndex = this._cards.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this._cards [currentIndex], this._cards [randomIndex]] = [
                this._cards [randomIndex], this._cards [currentIndex]];
        }
    }

    get cards() {
        return this._cards;
    }
}
class Pile {
    _cards = [];
    _lastPlayedCards = [];

    addCard(card) {
        this._cards.unshift(card);
    }

    clearPile() {
        const oldCards = [...this._cards];
        this._cards = [];
        return oldCards;
    }

    get cards() {
        return this._cards;
    }

    set cards(value) {
        this._cards = value;
    }

    numCards() {
        return this.cards.length;
    }

    get lastPlayedCards() {
        return this._lastPlayedCards;
    }

    set lastPlayedCards(value) {
        this._lastPlayedCards = value;
    }
}
class Player {
    _username;
    _hand = [];

    constructor(username) {
        this._username = username;
    }

    get username() {
        return this._username;
    }

    get hand() {
        return this._hand;
    }
    set hand(cards) {
        this._hand = cards;
    }
    numCardsInHand() {
        return this._hand.length;
    }

    addToHand(cards) {
        this._hand.push(cards);
    }
}
class Game {
    _nums = [
        '2','3','4','5','6','7','8','9','10','J','Q','K','A'
    ]
    _deck;
    _pile;
    _players = [];
    _currPlayer = 0;
    _currNumIndex = 0;

    constructor() {
        this._deck = new Deck();
        this._pile = new Pile();

        // instantiate player
        this._players.push(new Player(localStorage.getItem('userName')));
        let playerNameEl = document.querySelector('#player1 > .player-name');
        playerNameEl.textContent = this._players[0].username;

        //instantiate opponents
        const oppsString = localStorage.getItem('oppUsernames');
        let opps = JSON.parse(oppsString);
        for (let i = 0; i < opps.length; i++) {
            this._players.push(new Player(opps[i]));
            playerNameEl = document.querySelector(`#player${i + 2} > .player-name`);
            playerNameEl.textContent = this._players[i + 1].username;
        }

        //divide deck for all players' hands
        let start = 0
        let numCards;
        let end = numCards = Math.floor((this._deck.cards.length / this._players.length));
        for (let i = 0; i < this._players.length; i++) {
            this._players[i].hand = this._deck.cards.slice(start, end)
                .sort((a,b) => (a.val > b.val ? 1:-1));
            const playerNumCardsEl = document.querySelector(`#player${i + 1} > .cards-in-hand`);
            // await delay(1000);
            playerNumCardsEl.textContent = `${this._players[i].numCardsInHand()} cards`;
            start = end;
            end = start + numCards;
        }

        //show player's cards
        updateHand(this._players[0]);
    }
    playerPlay() {
        this.setGameInfo();
        const player = this._players[this._currPlayer];
        const btn = document.getElementById('playBtn');
        btn.onclick = async () => {
            if (this._currPlayer === 0) {
                let cardEls = [];
                for (const cardEl of document.querySelectorAll('li.selected')) {
                    cardEls.push(cardToCardEl(cardElToCard(cardEl)));
                }
                if (cardEls.length === 0) {
                    return;
                }
                const pileEl = document.getElementById('pile');
                const lastPlayedCards = [];
                for (const cardEl of cardEls) {
                    let i = this._pile.numCards();
                    cardEl.style.transform = `translate(${2 * (i++)}px)`;
                    pileEl.appendChild(cardEl);
                    const card = cardElToCard(cardEl);
                    this._pile.addCard(card);
                    lastPlayedCards.push(card);
                    const index = cardEl.getAttribute('index');
                    delete player.hand[+index];
                }
                player.hand = player.hand.filter((card) => {
                    return card !== undefined;
                });
                updateHand(player);
                this._pile.lastPlayedCards = lastPlayedCards;
                if (player.numCardsInHand() === 0) {
                    await this.endGame();
                }
                else {
                    this._currPlayer = (++this._currPlayer) % this._players.length;
                    this._currNumIndex = (++this._currNumIndex) % this._nums.length;
                    this.computerPlay(this._players[this._currPlayer]);
                }
            }
        };
    }
    async computerPlay() {
        document.getElementById('playBtn').onclick = null;
        this.setGameInfo();
        await delay(5000);
        const player = this._players[this._currPlayer];
        if (player.numCardsInHand() === 0) {
            await this.endGame();
        }
        else {
            this._currPlayer = (++this._currPlayer) % this._players.length;
            this._currNumIndex = (++this._currNumIndex) % this._nums.length;
            if (this._currPlayer === 0) {
                this.playerPlay(this._players[this._currPlayer]);
            }
            else {
                this.computerPlay(this._players[this._currPlayer]);
            }
        }
    }
    callBluff() {

    }
    async endGame() {
        document.querySelector('.game-info .info').remove();
        const gameInfo = document.querySelector('.game-info');
        const span = document.createElement('span');
        const username = this._players[this._currPlayer].username;
        span.textContent = `${username} Wins!!!`;
        span.style.fontSize = 'x-large';
        span.style.color = '#00a11c';
        gameInfo.appendChild(span);
        await delay(3000);
        window.location.href = "lobby.html";
    }
    setGameInfo() {
        const currPlayer = document.getElementById('currPlayer');
        currPlayer.style.color = '#850707';
        const username = this._players[this._currPlayer].username;
        currPlayer.textContent = `${username}`;
        const numCards = document.getElementById('num-cards-in-pile');
        numCards.style.color = '#850707';
        numCards.textContent = `${this._pile.numCards()}`;
        const currCard = document.getElementById('currCard');
        currCard.style.color = '#850707';
        currCard.textContent = `${this._nums[this._currNumIndex]}`;
        const discard = document.getElementById('discard');
        discard.style.color = '#850707';
        discard.textContent = `${this._pile.lastPlayedCards.length}`;
    }
}

const game = new Game();
game.playerPlay();
function updateHand(player) {
    document.getElementById('hand').remove();
    const hand = document.createElement('ul');
    hand.id = 'hand';
    document.querySelector('.player-cards').appendChild(hand);
    for (const card of player.hand) {
        displayCardInHand(card, player);
    }
}
function displayCardInHand(card, player) {
    const cardInHandEl = cardToCardEl(card);
    const index = document.querySelectorAll('#hand > li').length;
    cardInHandEl.setAttribute('index', `${index}`);
    const num = Math.floor(player.numCardsInHand()/2) * 30;
    cardInHandEl.style.transform = `translate(${index * 30 - num}px)`;
    cardInHandEl.onclick = selectCard;
    const hand = document.getElementById('hand');
    hand.appendChild(cardInHandEl);
}
function cardElToCard(cardEl) {
    const data = cardEl.getAttribute('data-value').split(' ');
    return new Card(data[0], numToVal(data[0]), data[1]);
}
function cardToCardEl(card) {
    const cardEl = document.createElement('li');
    cardEl.setAttribute('data-value', `${card.num} ${card.suit}`);
    const pEl = document.createElement('p');
    pEl.setAttribute('data-suit', `${card.suit}`);
    const numEl = document.createElement('span');
    numEl.textContent = `${card.num}`;
    const suitEl = document.createElement('span');
    suitEl.textContent = `${card.suit}`;
    pEl.appendChild(numEl);
    pEl.appendChild(suitEl);
    cardEl.appendChild(pEl);
    return cardEl;
}
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}
function selectCard(e) {
    e.target.closest('li').classList.toggle('selected');
}
function numToVal(num) {
    switch (num) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            return 11;
        default:
            return +num;
    }
}
