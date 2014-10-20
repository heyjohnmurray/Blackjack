// http://jsbin.com/jisukibenaqo/2/edit?js
//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

// buttons
var dealButton = document.getElementById('deal-button');
var hitButton = document.getElementById('hit-me');
var stayButton = document.getElementById('stay');

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

var Deck = {

};

function cardInfo(){
	// choose random suit
	var suitType = Math.floor(Math.random() * 4); // generate random number between 0 and 3

	// possible suits
	var suits = { // originally this was an array, but an object lets me store more info for this
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

	return { // saved as 'var cardObj'
		suit: suits[suitType]['suit'],
		symbol: suits[suitType]['symbol'],
		color: suits[suitType]['color'],
		face: cards[cardNumber]['face'],
		name: cards[cardNumber]['name'],
		value: cards[cardNumber]['value'],
	};

}// close cardInfo()


///////////////////////////////////////////////////////
////  NOTE :: make score update on every 'hit me'  ////
///////////////////////////////////////////////////////

function cardPoints(whichUser, obj) {
	whichUser['cards'].push(obj.value);
	return whichUser['cards'];
}

function aceValChoice(whichUser, obj) { // still working on this :: make it only apply to Player
	if (obj.name == 'ace') {
		var aceAnswer = prompt('Do you want your ace to count as one point or 11?');
		parseInt(aceAnswer);
		if(aceAnswer == 1){
			alert('One point, then!');
			//console.log(aceAnswer);
		} else if(aceAnswer == 11){
			alert('Eleven points, cool!');
			//console.log(aceAnswer);
		} else {
			prompt('Please enter the number 1 or 11?');
		}
	};
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
	whichUser['cardDomElement'].appendChild(newCard);
	whichUser['cardDomElement'].lastChild.innerHTML = cardRender(cardObj);
	cardPoints(whichUser, cardObj);
	aceValChoice(whichUser, cardObj);
	whichUser.scoreDomElement.innerHTML = scoreRender(whichUser);
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

	// still need to add dealer card creation logic

}, false);
