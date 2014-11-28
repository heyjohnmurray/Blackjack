// still need to:
	//  add wager math for future hands
			/*
				click stay
					if win:
						* read saved bet value
						* add bet value to cash
						* update bet value
						* render new bet value to cash div
					if lose:
						* read saved bet value
						* subtract bet value from cash
						* update be value
						* render new bet value to cash div
			*/
	//	remove duplicate card creation (check suit and face or name of each card in the array to the one created, force new card creation if duplicate) -- game controller logic / game ui render
	//		source: http://stackoverflow.com/a/23663867/945517
	//	if ace exists in the array, then make second ace worth 1 point (either that or prompt player for desired value -- 11 or 1?)
	//	make dealer ask for more cards if need be. right now he only ever gets one.
	//	prompt user for name so you can write it on the table and pass it around for the winner-is value
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
		totalCardValues: function(card){
			this.cardValues.push(card.value); // use this value to track player card points and add them later
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

/////////////////////////
// :: RESULTS LOGIC :: //
/////////////////////////
	function Result (){
		this.playerScore = undefined;
		this.dealerScore = undefined;
		this.playerName = undefined;
		this.dealerName = undefined;
	}

	Result.prototype = {
		constructor: Result,
		decision: function(){
			// the comparisons to 21 seemed to have to be added first for this logic to work as desired. strange!
			if (this.playerScore > 21) {

				winner = this.dealerName;

			} else if (this.dealerScore > 21) {

				winner = this.playerName;

			} else if (this.playerScore < this.dealerScore) {

				winner = this.dealerName;

			} else if (this.playerScore > this.dealerScore){

				winner = this.playerName;

			} else {
				winner = false;
			}

			return winner;
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
		wagerWin: function(){
			this.maxCashToStart = this.playerWager + this.maxCashToStart;
			this.cashLeftOver = this.maxCashToStart;
			return this.cashLeftOver;
		},
		wagerLose: function(){
			//this.cashLeftOver = this.maxCashToStart;
			console.log(this.cashLeftOver);
			return this.cashLeftOver;
		},
	};

//////////////////////////
// :: GAMEPLAY LOGIC :: //
//////////////////////////
	function GameController() {
		// everything related to the game that doesn't directly touch the DOM
		this.myDeck = new Deck();
		this.betting = new Betting();
		this.playerOne = new Player('John','playerOne');
		this.gameDealer = new Player('Dealer','gameDealer');
		this.result = new Result();
	}

	function GameUI(){ // this gets the ball rolling a new instance of GameUI is called at the bottom of this page
		this.gameController = new GameController();
		this.registerDomElements();
		this.renderStartingTotalCash();
		this.registerWagerEvents();
		this.registerDealButtonEvent();
		this.registerHitButtonEvent();
		this.registerStayButtonEvent();
		this.registerNewGameEvent();
	}

	GameUI.prototype = {
		constructor: GameUI,
		registerDomElements: function(){
			this.actionButtons 		= document.querySelector('.js-actions');
		  	this.dealButton			= document.getElementById('deal-button');
			this.hitButton 			= document.getElementById('hit-me');
			this.stayButton 		= document.getElementById('stay');
			this.newGameButton 		= document.getElementById('new-game');
			this.betAnchors 		= document.querySelector('.bets').getElementsByTagName('a');
			this.secondaryButtons 	= document.querySelector('.js-secondary-actions');
			this.gameController.playerOne.setCardDom('.player-cards');
			this.gameController.playerOne.setScoreDom('.player-box .score');
			this.gameController.gameDealer.setCardDom('.dealer-cards');
			this.gameController.gameDealer.setScoreDom('.dealer-box .score');
		},
		///////////////////////////////////
		// :: SHARED BUTTON FUNCTIONS :: //
		///////////////////////////////////
		actionButtonsShown: function(){
			this.actionButtons.classList.add('is-shown');
		},
		actionButtonsHidden: function(){
			this.actionButtons.classList.remove('is-shown');
		},
		dealButtonShown: function(){
			this.dealButton.classList.add('is-shown');
		},
		dealButtonHidden: function(){
			this.dealButton.classList.remove('is-shown');
		},
		secondaryButtonsShown: function(){
			this.secondaryButtons.classList.add('is-shown');
		},
		secondaryButtonsHidden: function(){
			this.secondaryButtons.classList.remove('is-shown');
		},
		newGameButtonShown: function(){
		  	this.newGameButton.classList.add('is-shown');
		},
		newGameButtonHidden: function(){
		  	this.newGameButton.classList.remove('is-shown');
		},
		///////////////////////////
		// :: WAGER FUNCTIONS :: //
		///////////////////////////
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
		renderUpdatedWager: function(){
			document.querySelector('.wager-total .bet').innerHTML = this.gameController.betting.playerWager;
		},
		renderCashOnHand: function(){
			document.querySelector('.wager-total .cash').innerHTML = this.gameController.betting.cashLeftOver;
		},
		renderStartingTotalCash: function(){
			document.querySelector('.wager-total .cash').innerHTML = this.gameController.betting.maxCashToStart;
		},
		renderDisableBets: function(){
			var newDiv = document.createElement('div');
			var firstItem = document.querySelector('.bets').firstChild;

			newDiv.className ='bets-off';
			document.querySelector('.bets').insertBefore(newDiv, firstItem);
		},
		wagerEvents: function(e){
			var chipValue = e.target.dataset.value;

			this.actionButtonsShown();
			this.dealButtonShown();
			this.gameController.betting.updateWager(chipValue);
			this.renderUpdatedWager();
			this.gameController.betting.cashOnHand();
			this.renderCashOnHand();

			if(this.gameController.betting.cashLeftOver <= 0){ // if you don't have any money left ...
				this.renderDisableBets();
				document.querySelector('.wager-total .cash').classList.add('warning');
				document.querySelector('.wager-total .cash').innerHTML = 0;
				document.querySelector('.wager-total .bet').innerHTML = this.gameController.betting.maxCashToStart;
			}

			e.preventDefault();
		},
		/////////////////////////////////
		// :: SHARED CARD FUNCTIONS :: //
		/////////////////////////////////
		renderCard: function(user){ // this just creates the html card in the DOM
			var newDiv = document.createElement('div');
			newDiv.className = 'card';
			document.querySelector(this.gameController[user.id].cardDom).appendChild(newDiv);
		},
		createCard: function(newCard, user){
			var cardAttributes = '<div class="number ' + newCard.color + '">' + newCard.face + '</div>' + '<div class="suit ' + newCard.color +'">' + newCard.symbol + '</div>';

			this.renderCard(user); // builds physical card
			document.querySelector(this.gameController[user.id].cardDom).lastChild.innerHTML = cardAttributes; // applies card attribute to physical card
			this.gameController[user.id].totalCardValues(newCard); // put totalCardValues into .receiveCard() instead. then call it then remove the next line of code.
			this.gameController[user.id].getScore();
		},
		/////////////////////////////
		// :: SCORING FUNCTIONS :: //
		/////////////////////////////
		renderUpdatedScore: function(){
			var playerScore = this.gameController.playerOne.getScore();
			var dealerScore = this.gameController.gameDealer.getScore();

			document.querySelector(this.gameController.playerOne.scoreDom).innerHTML = playerScore;
			document.querySelector(this.gameController.gameDealer.scoreDom).innerHTML = dealerScore;
		},
		/////////////////////////////////
		// :: DEAL BUTTON FUNCTIONS :: //
		/////////////////////////////////
		registerDealButtonEvent: function(){
			var scope = this;

			function localDealEvent(e){
				scope.dealEvent(e);
			}
			this.dealButton.addEventListener('click', localDealEvent);
		},
		dealEvent: function(){
			// get card arrays for each user
			var playerCards = this.gameController.playerOne.getCards();
			var dealerCards = this.gameController.gameDealer.getCards();
			
			this.dealButtonHidden();
			this.secondaryButtonsShown();
			// deal cards for each user
			this.gameController.myDeck.dealCards(this.gameController.gameDealer,1); 
			this.gameController.myDeck.dealCards(this.gameController.playerOne,2); 
			// render cards for each user
			this.createCard(playerCards[0], this.gameController.playerOne);
			this.createCard(playerCards[1], this.gameController.playerOne);
			this.createCard(dealerCards[0], this.gameController.gameDealer);
			this.renderUpdatedScore();
			this.renderDisableBets();
		},
		/////////////////////////////////
		// :: HIT BUTTON FUNCTIONS :: //
		/////////////////////////////////
		registerHitButtonEvent: function(){
			var scope = this;

			function localHitEvent(e){
				scope.hitEvent(e);
			}
			this.hitButton.addEventListener('click', localHitEvent);
		},
		hitEvent: function(){
			var playerCards = this.gameController.playerOne.getCards();

			this.gameController.myDeck.dealCards(this.gameController.playerOne,1);  // deal playerOne another card
			this.createCard(playerCards[playerCards.length-1], this.gameController.playerOne); // render a card for the last item created in the array
			this.renderUpdatedScore();
		},
		/////////////////////////////////
		// :: STAY BUTTON FUNCTIONS :: //
		/////////////////////////////////
		registerStayButtonEvent: function(){
			var scope = this;

			function localStayEvent(e){
				scope.stayEvent(e);
			}
			this.stayButton.addEventListener('click', localStayEvent);
		},
		announceWinner: function(){
			var winner = this.gameController.result.decision();
			if (winner === false) {
				document.querySelector('.winner-is p').innerHTML = 'Looks like it\'s a draw';
			} else {
				document.querySelector('.winner-is p').innerHTML = winner + ' wins!';
			}
		},
		stayEvent: function(){
			var dealerCards = this.gameController.gameDealer.getCards();

			this.dealButtonHidden();
			this.secondaryButtonsHidden();
			this.newGameButtonShown();
			this.gameController.myDeck.dealCards(this.gameController.gameDealer,1);
			this.createCard(dealerCards[dealerCards.length-1], this.gameController.gameDealer);
			this.renderUpdatedScore();

			// need to assign these variables after the final card has been dealt to the dealer otherwise it won't register all the dealer's points and player one will always win.
			this.gameController.result.playerScore = this.gameController.playerOne.getScore();
			this.gameController.result.dealerScore = this.gameController.gameDealer.getScore();
			this.gameController.result.playerName = this.gameController.playerOne.name;
			this.gameController.result.dealerName = this.gameController.gameDealer.name;
			this.announceWinner();
			// update wagers
			if (this.gameController.result.decision() != this.gameController.gameDealer.name) {
				this.gameController.betting.wagerWin();
				this.renderStartingTotalCash();
				this.gameController.betting.cashLeftOver = this.gameController.betting.maxCashToStart;
			} else {
				this.gameController.betting.wagerLose();
				this.renderCashOnHand();
				this.gameController.betting.cashLeftOver = this.gameController.betting.maxCashToStart;
			}

			this.gameController.betting.playerWager = 0;
			this.renderUpdatedWager();
		},
		//////////////////////////////
		// :: NEW GAME FUNCTIONS :: //
		//////////////////////////////
		registerNewGameEvent: function(){
		  	var scope = this;

		  	function localNewGameEvent(e){
				scope.newGameEvent(e);
		  	}
		  	this.newGameButton.addEventListener('click', localNewGameEvent);
		},
		newGameEvent: function(){
			this.newGameButtonHidden();
			this.secondaryButtonsHidden();
			document.querySelector('.bets').removeChild(document.querySelector('.bets-off')); // re-enable bets
			document.querySelector('.winner-is p').innerHTML = '';
			// take the cards off the table
		  	document.querySelector(this.gameController.playerOne.scoreDom).innerHTML = '';
			document.querySelector(this.gameController.gameDealer.scoreDom).innerHTML = '';
			document.querySelector(this.gameController.playerOne.cardDom).innerHTML = '';
			document.querySelector(this.gameController.gameDealer.cardDom).innerHTML = '';
			this.gameController.playerOne.cards = []; // empty out card arrays
			this.gameController.gameDealer.cards = []; // for each user
			this.gameController.playerOne.cardValues = []; // empty card value arrays
			this.gameController.gameDealer.cardValues = []; // for each
		}
	};

	var myGame = new GameUI();
})();