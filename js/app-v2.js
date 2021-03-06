// http://jsbin.com/jisukibenaqo/2/edit?js
//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

// wager vars
var playerWager = 0;
var maxCashToStart = 1500;
var betAnchors = document.querySelector('.bets').getElementsByTagName('a');
var newDiv = document.createElement('div');

// buttons
var dealButton = document.getElementById('deal-button');
var hitButton = document.getElementById('hit-me');
var stayButton = document.getElementById('stay');
var resetButton = document.getElementById('reset');

// I need more advice on how this logic will work
var Player = {
cards: [],
cardDomElement: document.querySelector('.player-cards'),
scoreDomElement: document.querySelector('.player-box .score')
};

var Dealer = {
cards: [],
cardDomElement: document.querySelector('.dealer-cards'),
scoreDomElement: document.querySelector('.dealer-box .score')
};

/**
 * [Card description]
 * @param {Object} definedCard
 */
function Card(definedCard) {
if (definedCard !== undefined && 'object' !== typeof definedCard) {
throw new Error('');
}

definedCard = definedCard || {};

this.suit = definedCard.suit;
this.symbol = undefined;
this.color = undefined;
this.face = undefined;
this.name = undefined;
this.value = undefined;
}

function Deck() {
// possible suits
this.suits = { // originally this was an array, but an object lets me store more info for this
0: {
'suit': 'diamonds',
'symbol': '&diamondsuit;',
'color': 'red'
},

1: {
'suit': 'hearts',
'symbol': '&heartsuit;',
'color': 'red'
},

2: {
'suit': 'clubs',
'symbol': '&clubsuit;',
'color': 'black'
},

3: {
'suit': 'spades',
'symbol': '&spadesuit;',
'color': 'black'
}
};

// possible cards
this.cards = {
1: {
'name': 'ace',
'face': 'A',
'value': 1
},

2: {
'name': 'two',
'face': '2',
'value': 2
},

3: {
'name': 'three',
'face': 3,
'value': 3
},

4: {
'name': 'four',
'face': '4',
'value': 4
},

5: {
'name': 'five',
'face': '5',
'value': 5
},

6: {
'name': 'six',
'face': '6',
'value': 6
},

7: {
'name': 'seven',
'face': '7',
'value': 7
},

8: {
'name': 'eight',
'face': '8',
'value': 8
},

9: {
'name': 'nine',
'face': '9',
'value': 9
},

10: {
'name': 'ten',
'face': '10',
'value': 10
},

11: {
'name': 'jack',
'face': 'J',
'value': 10
},

12: {
'name': 'queen',
'face': 'Q',
'value': 10
},

13: {
'name': 'king',
'face': 'K',
'value': 10
},

14: {
'name': 'ace',
'face': 'A',
'value': 11
}
};
}

Deck.prototype.getRandomCard = function () {
// choose random suit
var suitType = Math.floor(Math.random() * 4); // generate random number between 0 and 3

// chose random card number
var cardNumber = Math.floor(Math.random() * 14) + 1; // generate random number between 1 and 14

var myCard = new Card({ // saved as 'var cardObj'
suit: this.suits[suitType].suit,
symbol: this.suits[suitType].symbol,
color: this.suits[suitType].color,
face: this.cards[cardNumber].face,
name: this.cards[cardNumber].name,
value: this.cards[cardNumber].value,
});
};

var myDeck = new Deck();

function cardPoints(whichUser, obj) { // consider changing this to an updating variable like you did with bet()
whichUser['cards'].push(obj.value);
return whichUser['cards'];
}

function aceValChoice(whichUser, obj) { // still working on this :: make it only apply to Player
// if (obj.name == 'ace') {
// 
var aceAnswer = prompt('Do you want your ace to count as one point or 11?');
// 
parseInt(aceAnswer);
// 
if(aceAnswer == 1){
// 
alert('One point, then!');
// 
} else if(aceAnswer == 11){
// 
alert('Eleven points, cool!');
// 
} else {
// 
prompt('Please enter the number 1 or 11?');
// 
}
// };
}

function scoreRender(whichUser) {
var userScore = whichUser['cards'].reduce(function(prev, curr){ // reduce works for IE9+. for loop is an alternate
 
return prev + curr;
});
return userScore;
}

function createCard(whichUser) {
var newDiv = document.createElement('div'); // working code has this
var cardObj = myDeck.getRandomCard(); // return card info object, by being here it will be called every time in the loop when you call dealCards().

newDiv.className = 'card';
whichUser['cardDomElement'].appendChild(newDiv);
whichUser['cardDomElement'].lastChild.innerHTML = cardRender(cardObj);
cardPoints(whichUser, cardObj);
aceValChoice(whichUser, cardObj);
whichUser.scoreDomElement.innerHTML = scoreRender(whichUser);
}

function cardRender(obj) {
return
'<div class="number ' + obj.color + '">' + obj.face + '</div>' + '<div class="suit ' + obj.color +'">' + obj.symbol + '</div>';
}

function dealCards(whichUser, cardsDealt){
for (var i = 0; i < cardsDealt; i++) {
createCard(whichUser);
}
}

// Betting
function disableBetting() { // creates a transparent div over the chips to prevent user from clicking
newDiv.className ='bets-off';
var firstItem = document.querySelector('.bets').firstChild;
document.querySelector('.bets').insertBefore(newDiv, firstItem);
}

function betUpdate(value) { // update the scoreboard with chip wager
document.querySelector('.wager-total .bet').innerHTML = playerWager;
}

function cashOnHand(value) { // compute player's cash on hand
cashLeftOver = maxCashToStart - playerWager;
return cashLeftOver; // this doesn't seem to need a 'return' valeu to work. why?
}

function cashUpdate(value) { // dynamically update cash on hand
document.querySelector('.wager-total .cash').innerHTML = cashLeftOver;
}

document.querySelector('.wager-total .cash').innerHTML = maxCashToStart; // set default cash on hand value

for (var i = 0; i < betAnchors.length; i++) { // prevent default on all anchor tags in "bets" list
betAnchors[i].addEventListener('click', function(e){
document.querySelector('.js-actions').classList.add('is-shown');

// this was in a function called bet but it didn't work unless 'e' was a param of the function and that seemed wrong
chipValue = e.target.dataset.value;
playerWager += parseInt(chipValue, 10);

// i broke these functions out, but maybe they don't need to be individual functions.
betUpdate(playerWager);
cashOnHand(playerWager);
cashUpdate(cashLeftOver);

if(cashLeftOver <= 0){
// if you don't have anymore money left ...
disableBetting();

// instead of letting wagers go into negative values
// just set bet and cash values to max and 0, respectively
document.querySelector('.wager-total .cash').classList.add('warning');
document.querySelector('.wager-total .cash').innerHTML = 0;
document.querySelector('.wager-total .bet').innerHTML = maxCashToStart;
}
//console.log(cashLeftOver);
e.preventDefault();
});
};

// Deal Button Click :: Only clicked once. Can deal multiple cards
dealButton.addEventListener('click', function(e){
disableBetting();
dealCards(Dealer, 1);
dealCards(Player, 2);
document.querySelector('.js-secondary-actions').classList.add('is-shown'); // display 'hit me' and 'stay' buttons
this.classList.add('is-hidden'); // hide 'deal' button so it can't be clicked more than once
});

// Hit Button Click :: Only deal one card at a time
hitButton.addEventListener('click', function(e){

dealCards(Player, 1); // right now this is passing through an entire object and that seems unnecessary. what should i do?

}, false);

// Stay Button Click
stayButton.addEventListener('click', function(e){

// still need to add dealer card creation logic
// the dealer needs to get at least one card but how do i make this actually challenging?

}, false);