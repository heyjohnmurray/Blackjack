//inspiration: http://www.addictinggames.com/puzzle-games/blackjack.jsp

//generate suit
var suits = ['diamonds','hearts','spades','clubs'];
var randomSuit = Math.floor(Math.random() * 4);

//generate card number
var cards = ['ace','one','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king'];
var randomCard = Math.floor(Math.random() * 13) + 1;

//your card is ...
console.log(cards[randomCard] + " of " + suits[randomSuit]);

//deal function
