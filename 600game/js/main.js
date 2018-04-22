

var GameState = {

	preload:function() {
		this.game.load.image("hold","images/placeholder.jpg");
		this.game.load.text("words", "words/words.txt");
		this.game.load.image("BG", "images/bg.png");
		this.game.load.image("A", "images/A.png");
		this.game.load.image("B", "images/B.png");
		this.game.load.image("C", "images/C.png");
		this.game.load.image("D", "images/D.png");
		this.game.load.image("E", "images/E.png");
		this.game.load.image("F", "images/F.png");
		this.game.load.image("G", "images/G.png");
		this.game.load.image("H", "images/H.png");
		this.game.load.image("I", "images/I.png");
		this.game.load.image("J", "images/J.png");
		this.game.load.image("K", "images/K.png");
		this.game.load.image("L", "images/L.png");
		this.game.load.image("M", "images/M.png");
		this.game.load.image("N", "images/N.png");
		this.game.load.image("O", "images/O.png");
		this.game.load.image("P", "images/P.png");
		this.game.load.image("Q", "images/Q.png");
		this.game.load.image("R", "images/R.png");
		this.game.load.image("S", "images/S.png");
		this.game.load.image("T", "images/T.png");
		this.game.load.image("U", "images/U.png");
		this.game.load.image("V", "images/V.png");
		this.game.load.image("W", "images/W.png");
		this.game.load.image("X", "images/X.png");
		this.game.load.image("Y", "images/Y.png");
		this.game.load.image("Z", "images/Z.png");
		

},

	create:function() {
		this.letters = game.add.group();
		this.hand = [];
		this.cons = "BCDFGHJKLMNPQRSTVWXYZ";
		this.cons = this.cons.split("");
		this.vowel = "AEIOU";
		this.vowel = this.vowel.split("");
		this.game.add.image(0,0,"hold");
		var rawText = game.cache.getText("words");
		this.dictionary = rawText.split("\n");
		this.dealHand(32);

		this.createHand();

},

	update:function() {
		

},
	checkWord:function(guess){
		//Takes the word [guess] and returns true or false wether or not it is in this.dictionary
		return(this.dictionary.includes(guess));
},
	dealHand:function(handSize){
		//Generates a hand based on handSize
		vowelNum = Math.ceil(handSize/3);
		constNum = handSize - vowelNum;
		for (i = 0; i < vowelNum; i++){
			this.hand.push(this.vowel[Math.floor(Math.random()*5)]);
		}
		for (i = 0; i < constNum; i++){
			this.hand.push(this.cons[Math.floor(Math.random()*(this.cons.length))]);
		}	
},
	createHand:function(){
		//Takes the contents of this.hand and makes game objects letters
		var letter;
		for( i = 0; i < this.hand.length; i++){
			letter = this.letters.create(0, 0, this.hand[i]);
			letter.anchor.setTo(0.5);
			letter.inputEnabled = true;
			letter.events.onInputDown.add(this.addLetter, this);
			letter.name = (this.hand[i] + i);
		}
		this.letters.align(8, -1, 100, 100);
		this.letters.x = (this.game.world.centerX - 400);
		this.letters.y = (this.game.world.centerY - 50);

},
	addLetter:function(letter){
		//Adds clicked letter to the displayArray
		console.log(letter.name)		
		letter.kill();
	}

	


}
var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add("GameState", GameState);
game.state.start("GameState");
