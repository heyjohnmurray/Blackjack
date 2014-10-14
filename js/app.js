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

function createCardValue(){
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

	return	'<div class="number ' + suits[suitType]['color'] + '">' + cards[cardNumber]['face'] + '</div>' + '<div class="suit ' + suits[suitType]['color'] +'">' + suits[suitType]['symbol'] + '</div>';
}// close createCardValue()

function createCard(whichUser) {
	var newCard = document.createElement('div');
	newCard.className = 'card';
	whichUser.appendChild(newCard);
	whichUser.lastChild.innerHTML = createCardValue();
}

function dealCards(whichUser, cardsDealt){ // should accept user and number parameters	

	for (var i = 0; i < cardsDealt; i++) {
		var children = whichUser.children;

		// whenever i try to use createCard() instead of the code below my browser dies.
		var newCard = document.createElement('div');
		newCard.className = 'card';
		whichUser.appendChild(newCard);

		// this prints to multiple cards but only lets 'dealCards' deal one at a time
		for (var i = 0; i < children.length; i++) {
			children[i].innerHTML = createCardValue();
			console.log(children.length); 
		}
		// the problem is that it thinks each  user div only has one child
	}
}

// Deal Button Click :: Only hit once. Hide after click. Can deal multiple cards
dealButton.addEventListener('click', function(e){

	// Deal mutliple cards 
	dealCards(dealer, 1);
	dealCards(player, 2);
	
	e.target.style.display = "none"; // Hide after click

}, false);

// Hit Button Click :: Only deal one card at a time
hitButton.addEventListener('click', function(e){

	createCard(player);

}, false);

// Stay Button Click
stayButton.addEventListener('click', function(e){
	// this should do math. create custom function to add up card values
}, false);
