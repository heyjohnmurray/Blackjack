// James, I've put comments with your name on parts of code that I have questions for.
// Some of the logic issues I have involve where the betting functions need to be stored. Their own prototype? On the playerOne
// instance but not on the Dealer instance? etc ...
/*
  @james-huston my initial thought on the betting would be to have it as something seperate that way the player logic could all
  be shared between the player/dealer. You might consider a game "controller" class like your game UI that you attach the dealer
  and any players to. when the UI needs to do something like place a bet it asks the game controller to handle it and the game
  controller to make a bet for that player or something like that.
*/
// I created a GameUI constructor b/c it seems weird to not have those similar items stored somewhere
// even if that may change down the line. What do I do with all of the eventListeners and stuff? Can that code go 
// down at the bottom of the page just sort of loose and unassociated with a prototype.
/*
  @james-huston I would attach all of the event listeners to your gameui prototype
*/

// Overall, I feel confident with how and why my code needs to be structured this way. I understand why and how the code I've writtien
// works. I just know that the decision-making and organization are skills that will come with time.

// setCardDom method 
// 		James, why does this need to be a method?
//		Why can't it just be assigned like a variable?
/*
  @james-huston the reason to do this is so you have a chance to validate it and make sure that it is actually
  a dom element you can manipulate. remember you don't have jquery doing all of it's "magical" silent checking
  on elements when you try to modify them so you need to make sure you have a valid element that you can work
  with whatever way you plan to work with it. Maybe not 100% relevent for your project but in shared/reusable
  code it would be a good thing to be safe with.
*/

// James, I'm starting to combine methods under one prototype. I saw this syntax and it makes sense to me. It also 
// kind of answers my question about the use of "constructor: 'constructorName' " as a syntax
/*
  @james-huston this if fine if you are more comfortable with it and working in your own project/setting your
  own coding standards. Just make sure you are comfortable with other styles so you recognize them and can
  work with other code comfortably and you are good.
*/
/*
  @james-huston so these things right now are kinda disparent "things" that just happen. These would be things
  handled by your game controller constructor if you had one.
*/

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

// constructor
function GameUI(){
	this.dealButton = document.getElementById('deal-button');
	this.hitButton = document.getElementById('hit-me');
	this.stayButton = document.getElementById('stay');
	this.resetButton = document.getElementById('reset');
}

GameUI.prototype = {
	constructor: GameUI,
	makeWager: function(){
		// what happens when you click the chips?
		// deal button shows
		// calculations are done : methods related to Wager proto
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

// create Player 1
var playerOne = new Player();
var playerRender = new PlayerUI('John');

// create Dealer instance
var gameDealer = new Player();
var dealerRender = new PlayerUI('Dealer');

// create Deck instance
var myDeck = new Deck();
myDeck.dealCards(Player, 2);
