////////////////////////
// :: PLAYER LOGIC :: //
////////////////////////
(function(undefined){

	function Player() {
		this.cards = [];
		this.score = 0;
		this.wager = 0;
	}

	Player.prototype.receiveCard = function(card){
		this.card.push(card);
	};

	// constructor
	function PlayerUI(name){
		this.name = name;
	  	this.cardDom = undefined;
	  	this.scoreDom = undefined;
	}

	PlayerUI.prototype.setCardDom = function(element){
	  	this.cardDom = element;
	};

	PlayerUI.prototype.setScoreDom = function(element){
	  	this.scoreDom = element;
	};

//////////////////////
// :: CARD LOGIC :: //
//////////////////////
	function Card(definedCard) {
		// this ensures that if we're not passed an object, we throw an error
		if (definedCard !== undefined && 'object' !== typeof definedCard) {
			throw new Error('');
		}

		this.suit = definedCard.suit;
		this.symbol = definedCard.symbol;
		this.color = definedCard.color;
		this.face = definedCard.face;
		this.name = definedCard.name;
		this.value = definedCard.value;
	}

	Card.prototype = {
		constructor: Card,
		// card methods next ...
	};

//////////////////////
// :: DECK LOGIC :: //
//////////////////////	
	function Deck(){
		this.suits = {
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
		}; // close suits

		this.cards = {
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
		}; // close cards
	}

	Deck.prototype = {
		constructor: Deck,
		dealRandomCard: function(){
			var suitType = Math.floor(Math.random() * 4);
			var cardNumber = Math.floor(Math.random() * 13) + 1;

			var randomCard = new Card({
				suit: this.suits[suitType].suit,
				symbol: this.suits[suitType].symbol,
				color: this.suits[suitType].color,
				face: this.cards[cardNumber].face,
				name: this.cards[cardNumber].name,
				value: this.cards[cardNumber].value
			});

			return randomCard;
		},
		dealCards: function(user, number){
			// James, this function needs to tie in 
			// GameController's reference to Player1 and Dealer.
			// How do I do this? I feel like I need to develop
			// Game Controller a little more.
			for (var i = 0; i < number; i++) {
				this.dealRandomCard(user);
			}
		}
	};

///////////////////////
// :: WAGER LOGIC :: //
///////////////////////

	function Betting (){
		this.maxCashToStart = 1500;
		this.cashLeftOver = undefined;
		this.playerWager = 0;
	}

	Betting.prototype = {
		constructor: Betting,
		disableBets: function(){
			// create new div element
			// var newDiv = document.createElement('div');
			// rewrite this ...
			// newDiv.className ='bets-off';
			// var firstItem = document.querySelector('.bets').firstChild;
			// document.querySelector('.bets').insertBefore(newDiv, firstItem);
		},
		updateWager: function(value){
			this.playerWager += parseInt(value, 10);
			console.log(this.playerWager);
			return this.playerWager;
		},
		renderUpdatedWager: function(){
			document.querySelector('.wager-total .bet').innerHTML = this.playerWager;
		},
		cashOnHand: function(number){
			this.cashLeftOver = this.maxCashToStart - this.playerWager;
			console.log('cash left over' + this.cashLeftOver); // this works
			// the value will be correct once this.playerWager updates correctly
			return this.cashLeftOver;
		},
		renderCashOnHand: function(number){
		  	document.querySelector('.wager-total .cash').innerHTML = this.cashLeftOver;
		},
		updateCashLeftOver: function(){
			
		},
		renderUpdatedCashLeftOver: function(){
			
		},
		renderStartingTotalCash: function(){
		  	document.querySelector('.wager-total .cash').innerHTML = this.maxCashToStart;
		}
	};

//////////////////////////
// :: GAMEPLAY LOGIC :: //
//////////////////////////
	function GameController() {
		// create Player 1
		var playerOne = new Player();
		var playerRender = new PlayerUI('John');

		// create Dealer instance
		var gameDealer = new Player();
		var dealerRender = new PlayerUI('Dealer');

		// create Deck instance
		var myDeck = new Deck();
	}

	function GameUI(){
		// this gets the ball rolling
		// a new instance of GameUI is called at the bottom of this page
		this.registerDomElements();
		this.registerWagerEvents();
		this.registerDealButtonEvent();
		this.registerHitButtonEvent();
		this.registerStayButtonEvent();
		this.betObj = new Betting(); // this should be in controller after the functions are put there
		this.betObj.renderStartingTotalCash(); // put a reference to game controller in here then move betting and its methods to game controller
	}

	// attach all event listeners to this prototype
	GameUI.prototype = {
		constructor: GameUI,
		registerDomElements: function(){
		  	this.dealButton = document.getElementById('deal-button');
			this.hitButton = document.getElementById('hit-me');
			this.stayButton = document.getElementById('stay');
			this.betAnchors = document.querySelector('.bets').getElementsByTagName('a');
			this.resetButton = document.getElementById('reset');
			this.primaryButtons = document.querySelector('.js-actions');
			this.secondaryButtons = document.querySelector('.js-secondary-actions');
		},
		registerWagerEvents: function(){
			// keep 'this' scoped to GameUI prototype instead of the click target
			var scope = this;
			function localWager(e) {
				scope.wagerEvents(e);
			}
			for (var i = 0; i < this.betAnchors.length; i++) {
				this.betAnchors[i].addEventListener('click', localWager);
			}
		},
		registerDealButtonEvent: function(){
			var scope = this;
			function localDealEvent(e){
			  	scope.dealEvent(e);
			}
			this.dealButton.addEventListener('click', localDealEvent);
		},
		registerHitButtonEvent: function(){
		  	var scope = this;
		  	function localHitEvent(e){
		  		scope.hitEvent(e);
		  	}
		  	this.hitButton.addEventListener('click', localHitEvent);
		},
		registerStayButtonEvent: function(){
		  	var scope = this;
		  	function localStayEvent(e){
		  		scope.stayEvent(e);
		  	}
		  	this.stayButton.addEventListener('click', localStayEvent);
		},
		wagerEvents: function(e){
			var chipValue = e.target.dataset.value; // this should be in gameUI
			// deal button shows
			this.primaryButtonsShown();  // this should be in gameUI
			this.betObj.updateWager(chipValue); // this should be in controller
			this.betObj.cashOnHand(); // this should be in controller
			e.preventDefault();
		},
		dealEvent: function(e){
		  	// what happens when you click the deal button?
	  		// other UI elements appear
	  		this.secondaryButtonsShown();
		  	// cards are dealt to player and dealer
		  	// Deck.dealRandomCard('Player',2); // this isn't working yet but i know why
		  	// wagering is disabled
		},
		hitEvent: function(){
			console.log('hit me!');
			// deal one card
		},
		stayEvent: function(){
			console.log('stay!');
			// NOTES:
		  	// what happens when you click the stay button 
		  	// save user player points value
			// give dealer a card then test whether it's greater or less than player's score
		},
		primaryButtonsShown: function(){
			this.primaryButtons.classList.add('is-shown');
		},
		secondaryButtonsShown: function(){
		  	this.secondaryButtons.classList.add('is-shown');
		}
	};

	var myGame = new GameUI();
})();