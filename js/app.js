//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp
function createCard (){
  	//generate suit
	var suits = ['diamonds','hearts','spades','clubs'];
	var randomSuit = Math.floor(Math.random() * 4);

	//generate card number
	var cards = ['ace','one','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
	var randomCard = Math.floor(Math.random() * 13) + 1;

	//your card is ...
	return cards[randomCard] + " of " + suits[randomSuit];
	//console.log(cards[randomCard] + " of " + suits[randomSuit])
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
