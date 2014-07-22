//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

function createCard(){
	//originally this was two separate functions but I couldn't echo out the values 
	//after I returned objects for each function. Getting rid of the functions made
	//it possible

	//GENERATE RANDOM SUIT
	//generate random number between 0 and 3
	var randomSuit = Math.floor(Math.random() * 4);
  		
	//match random number to suit within the object
	//originally this was an array, but an object lets me store more info for this
	var suits = {
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
	}

	//pull all values of random object index chosen
	for (i in suits){
		 suits[randomSuit];
	}

	//GENERATE RANDOME CARD NUMBER
	//generate random number between 2 and 15
	var randomCardNumber = Math.floor(Math.random() * 13) + 2;

	var cards = {
		2: {
			'name': 'two',
			'value': 2
		},

		3: {
			'name': 'three',
			'value': 3
		},

		4: {
			'name': 'four',
			'value': 4
		},

		5: {
			'name': 'five',
			'value': 5
		},

		6: {
			'name': 'six',
			'value': 6
		},

		7: {
			'name': 'seven',
			'value': 7
		},

		8: {
			'name': 'eight',
			'value': 8
		},

		9: {
			'name': 'nine',
			'value': 9
		},

		10: {
			'name': 'ten',
			'value': 10
		},

		11: {
			'name': 'jack',
			'value': 10
		},

		12: {
			'name': 'queen',
			'value': 10
		},

		13: {
			'name': 'king',
			'value': 10
		},

		14: {
			'name': 'ace',
			'value': 11
		}
	}

	for(i in cards){
		cards[randomCardNumber];
	}

	return '<div class="number">' + cards[randomCardNumber]['value'] + '</div><div class="suit">' + suits[randomSuit]['symbol'] +'</div> ';
}


//when you hit the deal button :: not sure if this needs to be wrapped in a function
var dealButton = document.getElementById('deal-button');

dealButton.addEventListener('click', function(e){

	//cards to the dealer :: start with one card
	document.querySelector('.dealer-cards .card-0').innerHTML = createCard();

	//cards to the player :: start with two cards
	document.querySelector('.player-cards .card-0').innerHTML = createCard();
	document.querySelector('.player-cards .card-1').innerHTML = createCard();

	var dealtCards = document.querySelectorAll('.player-cards .card .number');
	for (var i = 0; i < dealtCards.length; i++) {
		//console.log(dealtCards[i].innerHTML);
	};

}, false);