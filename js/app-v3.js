////////////////////////
// :: PLAYER LOGIC :: //
////////////////////////

// constructor :: controls Player and Dealer attributes
function Player() {
	this.cards = [];
	this.score = 0;
	this.wager = 0;
}

Player.prototype.receiveCard = function(card){
	this.card.push(card);
};

// constructor
function PlayerUI(name){
	this.name = name;
  	this.cardDom = undefined;
  	this.scoreDom = undefined;
}

PlayerUI.prototype.setCardDom = function(element){
  	this.cardDom = element;
};

PlayerUI.prototype.setScoreDom = function(element){
  	this.scoreDom = element;
};

///////////////////////
// :: WAGER LOGIC :: //
///////////////////////

// constructor
function Betting (){
	this.maxCashToStart = 1500;
	this.cashLeftOver = undefined;
	this.playerWager = undefined;
}

// betting actions
Betting.prototype = {
	constructor: Betting,
	disableBets: function(){
		// rewrite this ...
		newDiv.className ='bets-off';
		var firstItem = document.querySelector('.bets').firstChild;
		document.querySelector('.bets').insertBefore(newDiv, firstItem);
	},
	updateWager: function(){
		// rewrite this ...
		document.querySelector('.wager-total .bet').innerHTML = playerWager;
	}
};

function GameController() {

}

//////////////////////////
// :: GAMEPLAY LOGIC :: //
//////////////////////////

// constructor
function GameUI(){
	this.dealButton = document.getElementById('deal-button');
	this.hitButton = document.getElementById('hit-me');
	this.stayButton = document.getElementById('stay');
	this.betAnchors = document.querySelector('.bets').getElementsByTagName('a');
	this.resetButton = document.getElementById('reset');
}

// attach all event listeners to this prototype
GameUI.prototype = {
	constructor: GameUI,
	preventDefault: function(){
		// modular e.preventDefault function
	},
	makeWager: function(){
		// what happens when you click the chips?
		for (var i = 0; i < betAnchors.length; i++) {
			// deal button shows
			// calculations are done : methods related to Wager proto
		}
	},
	dealAction: function(){
	  	// what happens when you click the deal button?
	  	// other UI elements appear
	  	// cards are dealt to player and dealer
	  	// wagering is disabled
	},
	stayAction: function(){
	  	// what happens when you click the stay button 
	  	// save user player points value
		// give dealer a card then test whether it's greater or less than player's score
	}
};

// constructor
function Card(definedCard) {
	// this ensures that if we're not passed an object, we throw an error
	if (definedCard !== undefined && 'object' !== typeof definedCard) {
		throw new Error('');
	}

	this.suit = definedCard.suit;
	this.symbol = definedCard.symbol;
	this.color = definedCard.color;
	this.face = definedCard.face;
	this.name = definedCard.name;
	this.value = definedCard.value;
}

Card.prototype = {
	constructor: Card,
	// card methods next ...
};

// constructor
function Deck(){
	this.suits = {
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
	}; // close suits

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
	}; // close cards
}

Deck.prototype = {
	constructor: Deck,
	dealRandomCard: function(){
		var suitType = Math.floor(Math.random() * 4);
		var cardNumber = Math.floor(Math.random() * 13) + 1;

		var randomCard = new Card({
			suit: this.suits[suitType].suit,
			symbol: this.suits[suitType].symbol,
			color: this.suits[suitType].color,
			face: this.cards[cardNumber].face,
			name: this.cards[cardNumber].name,
			value: this.cards[cardNumber].value
		});

		console.log(randomCard);
		return randomCard;
	},
	dealCards: function(user, number){
		for (var i = 0; i < number; i++) {
			this.dealRandomCard(user);
		}
	}
};

// NOTE:: Eventually add the below to the Game Controller

// create Player 1
var playerOne = new Player();
var playerRender = new PlayerUI('John');

// create Dealer instance
var gameDealer = new Player();
var dealerRender = new PlayerUI('Dealer');

// create Deck instance
var myDeck = new Deck();
myDeck.dealCards(Player, 2);
