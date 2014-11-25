// still need to:
	//	declare a winner (auto declare if one or more player goes over 21) -- game controller logic / game ui render
	//	declare a draw if one occurs -- game controller logic / game ui render
	//	manipulate dom after winner declared -- game ui
	//	update player score after 'stay' is hit and winner is determined -- game ui logic
	//	declare playerOne 'winner' if they draw 21 immediately after 'deal'
	//	remove duplicate card creation (check suit and face or name of each card in the array to the one created, force new card creation if duplicate) -- game controller logic / game ui render
	//	if ace exists in the array, then make second ace worth 1 point (either that or prompt player for desired value -- 11 or 1?)
	//	make dealer ask for more cards if need be. right now he only ever gets one.
	//		so : 	save user player points value
	//				give dealer a card then test whether it's greater or less than player's score
	//	enhance the UI a bit by  adding animations and stuff on the front end. basically, spruce it up a bit.
	//	find a way to add/remove event listeners instead of ghetto disableBets() method. that way you can play several hands in a row much easier.

////////////////////////
// :: PLAYER LOGIC :: //
////////////////////////
(function(undefined){

	function Player(name, id) {
		this.name = name;
		this.id = id;
		this.cards = [];
		this.cardValues = [];
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
			this.cards.push(card);
		},
		getCards: function(){
			return this.cards;
		},
		totalCardValues: function(card){ // stores the values of all the cards a player has
			this.cardValues.push(card.value);
		},
		getCardValues: function(){ // returns the value of all the cards a player has
			return this.cardValues;
		},
		getScore: function(){ // adds the values and reports the score
			var score = this.getCardValues().reduce(function(prev, curr){
			  	return prev + curr;
			});

			return score;
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

			return randomCard;
		},

		checkCard: function(){
			// this function will check the builtcard vs existing cards in the array and create another if there's a duplicate
		},

		dealCards: function(user, number){
			for (var i = 0; i < number; i++) {
				user.receiveCard(this.buildCard()); // fyi, this.buildCard() == randomCard
			}

			return user;
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
		this.playerOne = new Player('John','playerOne');
		//this.playerRender = new PlayerUI(); // not sure why i created this. they don't do anything
		this.gameDealer = new Player('Dealer','gameDealer');
		// this.dealerRender = new PlayerUI(); // not sure why i created this. they don't do anything
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
		renderUpdatedScore: function(){
			var playerScore = this.gameController.playerOne.getScore();
			var dealerScore = this.gameController.gameDealer.getScore();
			document.querySelector(this.gameController.playerOne.scoreDom).innerHTML = playerScore;
			document.querySelector(this.gameController.gameDealer.scoreDom).innerHTML = dealerScore;
		},
		renderCard: function(user){ // this just creates the html card in the DOM
		  	var newDiv = document.createElement('div');
		  	newDiv.className = 'card';
		  	document.querySelector(this.gameController[user.id].cardDom).appendChild(newDiv);
		},
		createCard: function(newCard, user){
			var cardAttributes = '<div class="number ' + newCard.color + '">' + newCard.face + '</div>' + '<div class="suit ' + newCard.color +'">' + newCard.symbol + '</div>';
			this.renderCard(user); // builds physical card
			document.querySelector(this.gameController[user.id].cardDom).lastChild.innerHTML = cardAttributes; // applies card attribute to physical card
			this.gameController[user.id].totalCardValues(newCard);
			this.gameController[user.id].getScore();
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
		dealEvent: function(){ // what happens when you click the deal button?
			// get card arrays for each user
			var playerCards = this.gameController.playerOne.getCards();
			var dealerCards = this.gameController.gameDealer.getCards();

			this.secondaryButtonsShown();

			// deal cards for each user
			this.gameController.myDeck.dealCards(this.gameController.gameDealer,1); 
			this.gameController.myDeck.dealCards(this.gameController.playerOne,2); 

			// render cards for each user
		  	this.createCard(playerCards[0], this.gameController.playerOne);
		  	this.createCard(playerCards[1], this.gameController.playerOne);
		  	this.createCard(dealerCards[0], this.gameController.gameDealer);

		  	this.renderUpdatedScore();

		  	console.log('The Dealer has ' + this.gameController.gameDealer.getScore() + ' points.');
		  	console.log('Player One has ' + this.gameController.playerOne.getScore() + ' points.');

		  	this.renderDisableBets();
		  	this.dealButton.style.display = 'none';
		},
		hitEvent: function(){
			var playerCards = this.gameController.playerOne.getCards();
			this.gameController.myDeck.dealCards(this.gameController.playerOne,1);  // deal playerOne another card
			this.createCard(playerCards[playerCards.length-1], this.gameController.playerOne); // render a card for the last item created in the array

			this.renderUpdatedScore();

			console.log('The Dealer has ' + this.gameController.gameDealer.getScore() + ' points.');
		  	console.log('Player One has ' + this.gameController.playerOne.getScore() + ' points.');
		},
		stayEvent: function(){
			var dealerCards = this.gameController.gameDealer.getCards();

			this.hitButton.style.display = 'none';
			this.stayButton.style.display = 'none';
			this.gameController.myDeck.dealCards(this.gameController.gameDealer,1);
			this.createCard(dealerCards[dealerCards.length-1], this.gameController.gameDealer);
			console.log('The Dealer has ' + this.gameController.gameDealer.getScore() + ' points.');

			this.renderUpdatedScore();
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