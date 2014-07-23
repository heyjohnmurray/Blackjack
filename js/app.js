//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

//NEXT STEPS:

/* 

	[fixed] right now the cards are hard-coded, 

			but you should probably create a function that checks for the number of 
			cards in the dealer-cards and player-cards divs, then if no cards
			exist deal cards, then check the value of the cards dealt every time
			the deal button is hit until the value of one of them is 21 or higher.

	after that you'll need a 'stay' button to and then add in betting and what not.

*/

var dealerCards = document.querySelector('.dealer-cards');
var playerCards = document.querySelector('.player-cards');
var cardValues = [];

//have we dealt any cards yet?
function cardCheck(a){	
	var newDiv = document.createElement('div');

	//if not, then create cards
	if (a.firstChild == null) {

		newDiv.className = 'card';
		return a.appendChild(newDiv);

	} else {
		
		//I need to do something here. Just not sure what.

	}
}

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

	//GENERATE RANDOM CARD NUMBER
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

	cardValues.push(cards[randomCardNumber]['value']);
	//console.log(cardValues);

	return '<div class="number ' + suits[randomSuit]['color'] + '">' + cards[randomCardNumber]['value'] + '</div><div class="suit ' + suits[randomSuit]['color'] +'">' + suits[randomSuit]['symbol'] +'</div> ';
}

//when you hit the deal button :: not sure if this needs to be wrapped in a function
var dealButton = document.getElementById('deal-button');

dealButton.addEventListener('click', function(e){

	//deal cards!
	cardCheck(dealerCards);
	cardCheck(playerCards);

	//cards to the dealer :: start with one card
	document.querySelector('.dealer-cards .card').innerHTML = createCard();

	//cards to the player :: start with two cards
	document.querySelector('.player-cards .card').innerHTML = createCard();

}, false);