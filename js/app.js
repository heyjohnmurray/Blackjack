//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

function createCard(){

	//generate suit
  	function cardSuit (){
  	
		var suits = ['&diamondsuit;','&heartsuit;','&spadesuit;','&clubsuit;'];
		var randomSuit = Math.floor(Math.random() * 4);

		return suits[randomSuit];	
	}

	//generate card number
	function cardNumber (){
		var cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		var randomCard = Math.floor(Math.random() * 13) + 1;

		return cards[randomCard];
	}

	return '<div class="number">' + cardNumber() + '</div><div class="suite">' + cardSuit() + '</div> ';
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
		console.log(dealtCards[i].innerHTML);
	};

}, false);