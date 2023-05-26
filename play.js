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
    for (let i = 2 ; i <= 14 ; i++) {
      if (i <= 10) {
        this._cards.push(new Card(`${i}`, i, '♦'));
        this._cards.push(new Card(`${i}`, i, '♣'));
        this._cards.push(new Card(`${i}`, i, '♥'));
        this._cards.push(new Card(`${i}`, i, '♠'));
      } else {
        if (i === 11) {
          this._cards.push(new Card('J', 11, '♦'));
          this._cards.push(new Card('J', 11, '♣'));
          this._cards.push(new Card('J', 11, '♥'));
          this._cards.push(new Card('J', 11, '♠'));
        } else if (i === 12) {
          this._cards.push(new Card('Q', 12, '♦'));
          this._cards.push(new Card('Q', 12, '♣'));
          this._cards.push(new Card('Q', 12, '♥'));
          this._cards.push(new Card('Q', 12, '♠'));
        } else if (i === 13) {
          this._cards.push(new Card('K', 13, '♦'));
          this._cards.push(new Card('K', 13, '♣'));
          this._cards.push(new Card('K', 13, '♥'));
          this._cards.push(new Card('K', 13, '♠'));
        } else {
          this._cards.push(new Card('A', 14, '♦'));
          this._cards.push(new Card('A', 14, '♣'));
          this._cards.push(new Card('A', 14, '♥'));
          this._cards.push(new Card('A', 14, '♠'));
        }
      }
    }
    this.#shuffle();
  }
  #shuffle() {
    let currentIndex = this._cards.length, randomIndex;
    
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
  getNumCards() {
    return this._cards.length;
  }
}
class Pile {
  _cards = [];
  _lastPlayedCards = [];
  _lastPlayed;
  
  addCard(card) {
    this._cards.unshift(card);
  }
  addLastPlayedCard(card) {
    this._lastPlayedCards.push(card);
  }
  clearPile() {
    const oldCards = [... this._cards];
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
  get lastPlayed() {
    return this._lastPlayed;
  }
  set lastPlayed(value) {
    this._lastPlayed = value;
  }
  numLastPlayedCards() {
    return this._lastPlayedCards.length;
  }
}
class Player {
  _playerID;
  _username;
  _hand = [];
  
  constructor(username, playerID) {
    this._username = username;
    this.playerID = playerID;
  }
  get playerID() {
    return this._playerID;
  }
  set playerID(value) {
    this._playerID = value;
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
  addToHand(card) {
    this._hand.push(card);
  }
  removeFromHand(index) {
    delete this._hand[index];
    this._hand = this._hand.filter((card) => {
      return card !== undefined;
    });
  }
  getCard(index) {
    return this._hand[index];
  }
}
class Game {
  _card = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
  ]
  _deck;
  _pile;
  _players = [];
  _currPlayerID = 0;
  _currCardIndex = 0;
  
  constructor() {
    this._deck = new Deck();
    this._pile = new Pile();
    
    // instantiate player
    this.addPlayer(new Player(localStorage.getItem('userName'), 0));
    let playerNameEl = document.querySelector('#player1 > .player-name');
    playerNameEl.textContent = this.getPlayer(0).username;
    
    //instantiate opponents
    const oppsString = localStorage.getItem('oppUsernames');
    let opps = JSON.parse(oppsString);
    for (let i = 0 ; i < opps.length ; i++) {
      this.addPlayer(new Player(opps[i], i + 1));
      playerNameEl = document.querySelector(`#player${i + 2} > .player-name`);
      playerNameEl.textContent = this.getPlayer(i + 1).username;
    }
    
    //divide deck for all players' hands
    let start = 0
    let numCards;
    let end = numCards = Math.floor((this._deck.getNumCards() / this.getNumPlayers()));
    for (let i = 0 ; i < this.getNumPlayers() ; i++) {
      this.getPlayer(i).hand = this._deck.cards.slice(start, end)
        .sort((a, b) => (a.val > b.val ? 1 : -1));
      const playerNumCardsEl = document.querySelector(`#player${i + 1} > .cards-in-hand`);
      playerNumCardsEl.textContent = `${this.getPlayer(i).numCardsInHand()} cards`;
      start = end;
      end = start + numCards;
    }
    
    //show player's cards
    updateHand(this._players[0]);
    
    //set BS button functionality
    const bsBtn = document.getElementById('bsBtn');
    bsBtn.onclick = () => {
      return this.callBluff(this.getPlayer(0));
    };
    
    //show starting game info
    this.setGameInfo();
  }
  playerPlay(player = this.getPlayer(0)) {
    const btn = document.getElementById('playBtn');
    btn.onclick = async () => {
      if (this.currentPlayer().playerID === 0) {
        let cardEls = [];
        document.querySelectorAll('li.selected')
          .forEach((cardEl) => {
            const cardIndex = cardEl.getAttribute('index');
            cardEls.push(cardToCardEl(cardElToCard(cardEl), +cardIndex));
          });
        if (cardEls.length === 0) {
          return;
        }
        this._pile.lastPlayedCards = [];
        cardEls.forEach((cardEl) => {
          addCardToPile(this._pile, cardEl);
          const index = cardEl.getAttribute('index');
          delete player.hand[+index];
        });
        player.hand = player.hand.filter((card) => {
          return card !== undefined;
        });
        this._pile.lastPlayed = player;
        updateHand(player);
        this.endTurn(player);
      }
    };
  }
  async computerPlay(player) {
    document.getElementById('playBtn').onclick = null;
    await delay(2000);
    
    //computer play mechanics start
    let cards = player.hand.filter((card) => {
      return card.num === this.currentCard();
    });
    player.hand = player.hand.filter((card) => {
      return card.num !== this.currentCard();
    })
    this._pile.lastPlayedCards = [];
    if (cards.length === 0) {
      const max = player.numCardsInHand() >= 4 ? 5 : player.numCardsInHand() + 1;
      const randomCardAmount = generateRandom(max, 1);
      for (let i = 0; i < randomCardAmount; i++) {
        const randomCardIndex = generateRandom(player.numCardsInHand());
        const cardEl = cardToCardEl(player.getCard(randomCardIndex));
        addCardToPile(this._pile, cardEl);
        player.removeFromHand(randomCardIndex);
      }
    }
    else {
      cards.forEach((card) => { addCardToPile(this._pile, cardToCardEl(card)); });
    }
    this._pile.lastPlayed = player;
    updatePlayerCardInfo(player);
    //computer play mechanics end
    
    this.endTurn(player);
  }
  callBluff(player) {
    if ((this._pile.lastPlayed !== null) && (this._pile.numLastPlayedCards() !== 0)) {
      const cards = this._pile.clearPile();
      for (const card of this._pile.lastPlayedCards) {
        if (card.num !== this.currentCard()) {
          cards.forEach((card) => { this._pile.lastPlayed.addToHand(card); })
          this._pile.lastPlayedCards = [];
          updatePile(this._pile);
          this.updateCurrentPlayer(this._pile.lastPlayed.playerID);
          this.updateCurrentCard();
          this._pile.lastPlayed = null;
          this.setGameInfo();
          if (this.currentPlayer().playerID === 0) {
            updateHand(this.currentPlayer());
          }
          else {
            updatePlayerCardInfo(this.currentPlayer());
          }
          return;
        }
      }
      cards.forEach((card) => { player.addToHand(card); });
      this._pile.lastPlayedCards = [];
      this._pile.lastPlayed = null;
      updatePile(this._pile);
      this.updateCurrentPlayer(player.playerID);
      this.updateCurrentCard();
      this.setGameInfo();
      if (this.currentPlayer().playerID === 0) {
        updateHand(this.currentPlayer());
      }
      else {
        updatePlayerCardInfo(this.currentPlayer());
      }
    }
  }
  computerCallsBluff() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (Math.random() >= 0.58) {
          const compPlayerID = generateRandom(4, 1);
          if (compPlayerID !== this._currPlayerID) {
            const compPlayer = this.getPlayer(compPlayerID);
            this.callBluff(compPlayer);
            resolve(true);
          }
          else {
            resolve(false);
          }
        }
        resolve(false);
      }, 5000);
    });
  }
  async endTurn(player) {
    this.setGameInfo();
    const result = await this.computerCallsBluff();
    if (player.numCardsInHand() === 0) {
      await this.endGame();
    } else {
      if (result === false) {
        this.updateCurrentPlayer();
        this.updateCurrentCard();
        this.setGameInfo();
      }
      if (this.currentPlayer().playerID === 0) {
        this.playerPlay(this.currentPlayer());
      }
      else {
        this.computerPlay(this.currentPlayer());
      }
    }
  }
  async endGame() {
    document.querySelector('.game-info .info').remove();
    const gameInfo = document.querySelector('.game-info');
    const span = document.createElement('span');
    const username = this.currentPlayer().username;
    span.textContent = `${username} Wins!!!`;
    span.style.fontSize = 'x-large';
    span.style.color = '#00a11c';
    gameInfo.appendChild(span);
    await delay(3000);
    recordWin(this.currentPlayer().username);
    window.location.href = "lobby.html";
  }
  setGameInfo() {
    const currPlayer = document.getElementById('currPlayer');
    currPlayer.style.color = '#850707';
    const username = this.currentPlayer().username;
    currPlayer.textContent = `${username}`;
    const numCards = document.getElementById('num-cards-in-pile');
    numCards.style.color = '#850707';
    numCards.textContent = `${this._pile.numCards()}`;
    const currCard = document.getElementById('currCard');
    currCard.style.color = '#850707';
    currCard.textContent = `${this.currentCard()}`;
    const discard = document.getElementById('discard');
    discard.style.color = '#850707';
    discard.textContent = `${this._pile.numLastPlayedCards()}`;
  }
  addPlayer(player) {
    this._players.push(player);
  }
  getPlayer(playerID) {
    return this._players[playerID];
  }
  getNumPlayers() {
    return this._players.length;
  }
  currentCard() {
    return this._card[this._currCardIndex];
  }
  currentPlayer() {
    return this.getPlayer(this._currPlayerID);
  }
  updateCurrentPlayer(playerID = null) {
    if (playerID === null) {
      this._currPlayerID = (++this._currPlayerID) % this._players.length;
    }
    else {
      this._currPlayerID = playerID;
    }
  }
  updateCurrentCard() {
    this._currCardIndex = (++this._currCardIndex) % this._card.length;
  }
}

function updatePlayerCardInfo(player) {
  const playerNumCardsEl = document.querySelector(`#player${player.playerID + 1} > .cards-in-hand`);
  playerNumCardsEl.textContent = `${player.numCardsInHand()} cards`;
}
function updateHand(player) {
  updatePlayerCardInfo(player);
  document.getElementById('hand').remove();
  const hand = document.createElement('ul');
  hand.id = 'hand';
  document.querySelector('.player-cards').appendChild(hand);
  player.hand.sort((a, b) => (a.val > b.val ? 1 : -1));
  for (let i = 0 ; i < player.numCardsInHand() ; i++) {
    displayCardInHand(player, i);
  }
}
function displayCardInHand(player, cardIndex) {
  const cardInHandEl = cardToCardEl(player.getCard(cardIndex), cardIndex);
  const num = Math.floor(player.numCardsInHand() / 2) * 30;
  cardInHandEl.style.transform = `translate(${cardIndex * 30 - num}px)`;
  cardInHandEl.onclick = selectCard;
  const hand = document.getElementById('hand');
  hand.appendChild(cardInHandEl);
}
function updatePile(gamePile) {
  document.getElementById('pile').remove();
  const pile = document.createElement('ul');
  pile.id = 'pile';
  document.querySelector('.pile').appendChild(pile);
  for (const card of gamePile.cards) {
    addCardToPile(gamePile, cardToCardEl(card));
  }
}
function addCardToPile(pile, cardEl) {
  let i = pile.numCards();
  cardEl.style.transform = `translate(${2 * (i++)}px)`;
  document.getElementById('pile').appendChild(cardEl);
  const card = cardElToCard(cardEl);
  pile.addCard(card);
  pile.addLastPlayedCard(card);
}
function cardElToCard(cardEl) {
  const data = cardEl.getAttribute('data-value').split(' ');
  return new Card(data[0], numToVal(data[0]), data[1]);
}
function cardToCardEl(card, cardIndex) {
  const cardEl = document.createElement('li');
  cardEl.setAttribute('data-value', `${card.num} ${card.suit}`);
  cardEl.setAttribute('index', `${cardIndex}`);
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
function generateRandom(max, min = 0) {
  //min inclusive, max exclusive
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor( rand * difference);
  rand = rand + min;
  return rand;
}
function recordWin(username) {
  let winRecords = [];
  const winRecordsText = localStorage.getItem('winRecords');
  if (winRecordsText) {
    winRecords = JSON.parse(winRecordsText);
  }
  winRecords = updateWinRecords(username, winRecords);
  localStorage.setItem('winRecords', JSON.stringify(winRecords));
}
function updateWinRecords(username, winRecords) {
  const date = new Date().toLocaleDateString();
  const record = winRecords.filter((record) => {
    return record.username === username;
  });
  const wins = record.length !== 0 ? record[0].wins + 1 : 1;
  const newRecord = { username: username, wins: wins, date: date };
  
  let found = false;
  for (const [i, prevRecord] of winRecords.entries()) {
    if (wins > prevRecord.wins) {
      winRecords.splice(i, 0, newRecord);
      found = true;
      break;
    }
  }
  
  if (!found) {
    winRecords.push(newRecord);
  }
  if (winRecords.length > 10) {
    winRecords.length = 10;
  }
  
  return winRecords;
}

const game = new Game();
game.playerPlay();
