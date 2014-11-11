////////////////////////
// :: PLAYER LOGIC :: //
////////////////////////
(function(undefined){

	function Player(name) {
		this.name = name;
		this.cards = [];
		this.score = 0;
		this.wager = 0;
		this.playerUI = new PlayerUI();
	}

	function PlayerUI(){
	  	this.cardDom = undefined;
	  	this.scoreDom = undefined;
	}

	Player.prototype = {
		constructor: Player,
		receiveCard: function(card){
			this.card.push(card);
		},
		setCardDom: function(element){
		  	this.cardDom = element;
		},
		setScoreDom: function(element){
		  	this.scoreDom = element;
		}
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
			var newDiv = document.createElement('div');
			newDiv.className ='bets-off';
			var firstItem = document.querySelector('.bets').firstChild;
			document.querySelector('.bets').insertBefore(newDiv, firstItem);
		},
		updateWager: function(value){
			this.playerWager += parseInt(value, 10);
			return this.playerWager;
		},
		renderUpdatedWager: function(){
			document.querySelector('.wager-total .bet').innerHTML = this.playerWager;
		},
		cashOnHand: function(){
			this.cashLeftOver = this.maxCashToStart - this.playerWager;
			return this.cashLeftOver;
		},
		renderCashOnHand: function(){
		  	document.querySelector('.wager-total .cash').innerHTML = this.cashLeftOver;
		},
		renderStartingTotalCash: function(){
		  	document.querySelector('.wager-total .cash').innerHTML = this.maxCashToStart;
		}
	};

//////////////////////////
// :: GAMEPLAY LOGIC :: //
//////////////////////////
	function GameController() {
		// everything related to the game that doesn't directly touch the DOM
		this.myDeck = new Deck();
		this.betObj = new Betting();
		this.playerOne = new Player();
		this.playerRender = new PlayerUI();
		this.gameDealer = new Player();
		this.dealerRender = new PlayerUI();
	}

	function GameUI(){
		// this gets the ball rolling
		// a new instance of GameUI is called at the bottom of this page
		this.gameController = new GameController();
		this.registerDomElements();
		this.registerWagerEvents();
		this.registerDealButtonEvent();
		this.registerHitButtonEvent();
		this.registerStayButtonEvent();
		this.gameController.betObj.renderStartingTotalCash();
	}

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
			var chipValue = e.target.dataset.value;
			// deal button becomes visible
			this.primaryButtonsShown();
			this.gameController.betObj.updateWager(chipValue);
			this.gameController.betObj.renderUpdatedWager();
			this.gameController.betObj.cashOnHand();
			this.gameController.betObj.renderCashOnHand();

			if(this.gameController.betObj.cashLeftOver <= 0){
				// if you don't have any money left ...
				this.gameController.betObj.disableBets();

				document.querySelector('.wager-total .cash').classList.add('warning');
				document.querySelector('.wager-total .cash').innerHTML = 0;
				document.querySelector('.wager-total .bet').innerHTML = this.gameController.betObj.maxCashToStart;
			}

			e.preventDefault();
		},
		dealEvent: function(e){
		  	// what happens when you click the deal button?
	  		// other UI elements appear
	  		this.secondaryButtonsShown();
		  	// cards are dealt to player and dealer
<<<<<<< HEAD
		  	//Deck.dealRandomCard('Player',2); // this isn't working yet but i know why
=======
		  	// Deck.dealRandomCard('Player',2); // this isn't working yet but i know why
>>>>>>> test
		  	// wagering is disabled
		  	this.gameController.betObj.disableBets();
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