function Player() {
this.cards = [];
this.score = 0;
}

Player.prototype.receiveCard(card) {
this.cards.push(card);
this.updateScore();
}

Player.prototype.updateScore() {
this.score = 1; // some calculating logic here
}

function PlayerUI(myPlayer) {
this.player = myPlayer;
this.cardDom = undefined;
this.scoreDom = undefined;
}

PlayerUI.prototype.setCardDom = function (domElement) {
this.cardDom = domElement;
};

PlayerUI.prototype.setScoreDom = function (domElement) {
this.scoreDom = domElement
};

PlayerUI.prototype.renderCards = function () {
var cards = this.player.cards;
}

var player = new Player();
var playerRender = new PlayerUI(player);
playerRender.setCardDom(document.query...);
playerRender.setScoreDom(document.query...);

var dealer = new Player();
var dealerRender = new PlayerUI(dealer);
dealerRender.setCardDoome(document.quer...);
dealerRender.setScoreDom(document.query...);