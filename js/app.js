//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

function createCard(){

	//generate suit
  	function cardSuit (){
  	
		var suits = ['diamonds','hearts','spades','clubs'];
		var randomSuit = Math.floor(Math.random() * 4);

		return suits[randomSuit];	
	}

	//generate card number
	function cardNumber (){
		var cards = ['one','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king', 'ace'];
		var randomCard = Math.floor(Math.random() * 13) + 1;

		return cards[randomCard];
	}

	return '<div class="suite">' + cardSuit() + '</div> <div class="number">' + cardNumber() + '</div>';
}

//when you hit the deal button :: not sure if this needs to be wrapped in a function
var dealButton = document.getElementById('deal-button');

dealButton.addEventListener('click', function(e){

	//cards to the dealer :: start with one card
	document.querySelector('.dealer-cards .card-0').innerHTML = createCard();

	//cards to the player :: start with two cards
	document.querySelector('.player-cards .card-0').innerHTML = createCard();
	document.querySelector('.player-cards .card-1').innerHTML = createCard();

}, false);
