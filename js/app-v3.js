// constructor
function Player() {
	this.cards = [];
	this.score = 0;
	this.wager = 0;
}

Player.prototype.receiveCard = function(card){

};

// constructor
function PlayerUI(name){
	this.name = name;
  	this.cardDom = undefined;
  	this.scoreDom = undefined;
}

// setCardDom method 
// 		James, why does this need to be a method?
//		Why can't it just be assigned like a variable?
PlayerUI.prototype.setCardDom = function(element){
  	this.cardDom = element;
};

PlayerUI.prototype.setScoreDom = function(element){
  	this.scoreDom = element;
};

// constructor
function GameUI(){
	this.dealButton = document.getElementById('deal-button');
	this.hitButton = document.getElementById('hit-me');
	this.stayButton = document.getElementById('stay');
	this.resetButton = document.getElementById('reset');
}

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

		// console.log(randomCard);
		return randomCard;
	},
	dealCards: function(user, number){
		for (var i = 0; i < number; i++) {
			this.dealRandomCard(user);
		}
	}
};

var playerOne = new Player();
var playerRender = new PlayerUI('John');

var gameDealer = new Player();
var dealerRender = new PlayerUI('Dealer');

var myDeck = new Deck();

myDeck.dealRandomCard();
myDeck.dealCards(Player, 2);