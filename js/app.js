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
	console.log(cards[randomCard] + " of " + suits[randomSuit])
}

//when you hit the deal button :: not sure if this needs to be wrapped in a function
var dealButton = document.getElementById('deal-button');

dealButton.addEventListener('click', function(){
	
	//cards to the dealer
	document.getElementById('dealer-cards').innerHTML = createCard();

	//cards to the player
	document.getElementById('player-cards').innerHTML = createCard();

}, false);
