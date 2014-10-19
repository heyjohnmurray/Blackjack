// dom manipulation in one function
// business logic in another
// http://jsbin.com/jisukibenaqo/2/edit?js

// Necessary Ojbects
	// deck		:: 52 cards : 14cards : 4 suits : 2 red [clubs, spades] : 2 black [hearts, diamonds] 
				//	:: Ace has 2 values (1, 11)
	// dealt	:: check if cards have been dealt, then deal 2 cards
	// value	:: sum the value of the cards you have [this can be reused]
	// hit		:: generate random new card that hasn't been dealt yet add its value to the existing cards
	// stay		:: give dealer random numer of cards

	// bet		:: allow user to choose value to wager
				//	:: keep track of amount wagered (add multiple token clicks)
				//	:: subtract wager from existing cash in hand (start out with 1500)

//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

// players
var dealer = document.querySelector('.dealer-cards');
var player = document.querySelector('.player-cards');

// buttons
var dealButton = document.getElementById('deal-button');
var hitButton = document.getElementById('hit-me');
var stayButton = document.getElementById('stay');

// I need more advice on how this logic will work
var Player = {
	cards: [],
	domElement: document.querySelector('.player-cards')
};

var Dealer = {
	cards: [],
	domElement: document.querySelector('.dealer-cards')
};

var Deck = {

};
// close new logic

function cardInfo(){
	// choose random suit
	var suitType = Math.floor(Math.random() * 4); // generate random number between 0 and 3

	// possible suits
	var suits = { // originally this was an array, but an object lets me store more info for this
		0: {
			'name': 'diamonds',
			'symbol': '&diamondsuit;',
			'color': 'red'
		},

		1: {
			'name': 'hearts',
			'symbol': '&heartsuit;',
			'color': 'red'
		},

		2: {
			'name': 'clubs',
			'symbol': '&clubsuit;',
			'color': 'black'
		},

		3: {
			'name': 'spades',
			'symbol': '&spadesuit;',
			'color': 'black'
		}
	};

	// chose random card number
	var cardNumber = Math.floor(Math.random() * 14) + 1; // generate random number between 1 and 14

	// possible cards
	var cards = {
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

	return { // cardObj
		color: suits[suitType]['color'],
		face: cards[cardNumber]['face'],
		suit: suits[suitType]['name'],
		value: cards[cardNumber]['value'],
		symbol: suits[suitType]['symbol']
	};

}// close cardInfo()


///////////////////////////////////////////////////////
////  NOTE :: make score update on every 'hit me'  ////
///////////////////////////////////////////////////////

function cardPoints(whichUser, obj) { // .push() works. not sure if 'return' makes sense
	whichUser['cards'].push(obj.value);
	//console.log(whichUser['cards']);
	return whichUser['cards'];
}

function aceValChoice(whichUser, obj) { // still working on this
	//console.log(obj.name);
	
	// if (obj.name == 'ace') {
	// 	alert('do you want 1 point or 11?');
	// };
}

function scoreRender(whichUser) {
	var userScore = whichUser['cards'].reduce(function(prev, curr){ // reduce works for IE9+. for loop is an alternate
	  	return prev + curr;
	});
	return userScore;
}

function createCard(whichUser) {
	var newCard = document.createElement('div');
	var cardObj = cardInfo(); // return card info object, by being here it will be called every time in the loop when you call dealCards().

	newCard.className = 'card';
	whichUser['domElement'].appendChild(newCard);
	whichUser['domElement'].lastChild.innerHTML = cardRender(cardObj);
	cardPoints(whichUser, cardObj);
	aceValChoice(whichUser, cardObj);
}

function cardRender(obj) {
	return	'<div class="number ' + obj.color + '">' + obj.face + '</div>' + '<div class="suit ' + obj.color +'">' + obj.symbol + '</div>';
}

function dealCards(whichUser, cardsDealt){
	for (var i = 0; i < cardsDealt; i++) {
		createCard(whichUser);
	}
}

// Deal Button Click :: Only clicked once. Can deal multiple cards
dealButton.addEventListener('click', function(e){

	// Deal mutliple cards 
	dealCards(Dealer, 1);
	dealCards(Player, 2);
	
	e.target.style.display = "none";

}, false);

// Hit Button Click :: Only deal one card at a time
hitButton.addEventListener('click', function(e){

	dealCards(Player, 1); // right now this is passing through an entire object and that seems unnecessary. what should i do?

}, false);

// Stay Button Click
stayButton.addEventListener('click', function(e){

	document.querySelector('.dealer-box .score').innerHTML = scoreRender(Dealer);
	document.querySelector('.player-box .score').innerHTML = scoreRender(Player);

	// still need to add dealer card creation logic

}, false);
