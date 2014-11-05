// constructor
function Player(name) {
	this.name = name;
	this.cards = [];
	this.score = 0;
}

// constructor
function PlayerUI(){
  	this.cardDom = undefined;
  	this.scoreDom = undefined;
}

function Card(definedCard) {
	if (definedCard !== undefined && 'object' !== typeof definedCard) {
		throw new Error('');
	}

	this.suit = undefined;
	this.symbol = undefined;
	this.color = undefined;
	this.face = undefined;
	this.name = undefined;
	this.value = undefined;
}

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

Deck.prototype.getRandomCard = function(){
	var scope = this;
	var suitType = Math.floor(Math.random() * 4);
	var cardNumber = Math.floor(Math.random() * 13) + 1;

	var randomCard = new Card({
		suit: scope.suits[suitType].suit,
		symbol: scope.suits[suitType].symbol,
		color: scope.suits[suitType].color,
		face: scope.cards[cardNumber].face,
		name: scope.cards[cardNumber].name,
		value: scope.cards[cardNumber].value
	});

	console.log(suitType);
	console.log(cardNumber);
	console.log(randomCard);
};

var playerOne = new Player('John');
var myDeck = new Deck();

myDeck.getRandomCard();