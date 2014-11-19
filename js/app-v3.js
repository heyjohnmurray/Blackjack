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
		receiveCard: function(card){ // this should receive an object.
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
		buildCard: function(){
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
			console.log(randomCard); // tells you about each card created :: HOW DO I ACCESS THIS VALUE
			return randomCard;
		},

		dealCards: function(user, number){
			for (var i = 0; i < number; i++) {
				this.buildCard();
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
		updateWager: function(value){
			this.playerWager += parseInt(value, 10);
			return this.playerWager;
		},
		cashOnHand: function(){
			this.cashLeftOver = this.maxCashToStart - this.playerWager;
			return this.cashLeftOver;
		},
	};

//////////////////////////
// :: GAMEPLAY LOGIC :: //
//////////////////////////
	function GameController() {
		// everything related to the game that doesn't directly touch the DOM
		this.myDeck = new Deck();
		this.betObj = new Betting();
		this.playerOne = new Player('John');
		this.playerRender = new PlayerUI();
		this.gameDealer = new Player('Dealer');
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
		this.renderStartingTotalCash();
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
			this.gameController.playerOne.setCardDom('.player-cards');
			this.gameController.playerOne.setScoreDom('.player-box .score');
			this.gameController.gameDealer.setCardDom('.dealer-cards');
			this.gameController.gameDealer.setScoreDom('.dealer-box .score');
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
		renderUpdatedWager: function(){
			document.querySelector('.wager-total .bet').innerHTML = this.gameController.betObj.playerWager;
		},
		renderCashOnHand: function(){
		  	document.querySelector('.wager-total .cash').innerHTML = this.gameController.betObj.cashLeftOver;
		},
		renderStartingTotalCash: function(){
		  	document.querySelector('.wager-total .cash').innerHTML = this.gameController.betObj.maxCashToStart;
		},
		renderDisableBets: function(){
			var newDiv = document.createElement('div');
			newDiv.className ='bets-off';
			var firstItem = document.querySelector('.bets').firstChild;
			document.querySelector('.bets').insertBefore(newDiv, firstItem);
		},
		createCard: function(){ // this just creates the html card in the DOM
		  	var newDiv = document.createElement('div');
		  	newDiv.className = 'card';
		  	document.querySelector(this.gameController.playerOne.cardDom).appendChild(newDiv);
		},
		renderCard: function(){
			// this should receive a card obj and render the values into the html. HOW DO I ACCESS THE CARD OBJECT FROM THE DECK?!?!?
			//var cardValues = '<div class="number ' + obj.color + '">' + obj.face + '</div>' + '<div class="suit ' + obj.color +'">' + obj.symbol + '</div>';
		  	this.createCard(); // builds physical card
		  	//document.querySelector(this.gameController.playerOne.cardDom).lastChild.innerHTML = cardValues;
		},
		wagerEvents: function(e){
			var chipValue = e.target.dataset.value;
			this.primaryButtonsShown(); // deal button becomes visible
			this.gameController.betObj.updateWager(chipValue);
			this.renderUpdatedWager();
			this.gameController.betObj.cashOnHand();
			this.renderCashOnHand();

			if(this.gameController.betObj.cashLeftOver <= 0){ // if you don't have any money left ...
				this.renderDisableBets();
				document.querySelector('.wager-total .cash').classList.add('warning');
				document.querySelector('.wager-total .cash').innerHTML = 0;
				document.querySelector('.wager-total .bet').innerHTML = this.gameController.betObj.maxCashToStart;
			}

			e.preventDefault();
		},
		dealEvent: function(e){ // what happens when you click the deal button?
	  		this.secondaryButtonsShown();
		  	this.gameController.myDeck.dealCards(this.gameController.playerOne,2); // cards are dealt to player and dealer
		  	this.renderCard();
		  	this.renderDisableBets();
		},
		hitEvent: function(){
			console.log('hit me!');
			// deal one card
		},
		stayEvent: function(){ // what happens when you click the stay button 
			console.log('stay!');
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