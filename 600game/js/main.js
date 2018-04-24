

var GameState = {

	preload:function() {
		this.game.load.image("hold","images/placeholder.jpg");
		this.game.load.text("words", "words/words.txt");
		this.game.load.image("BG", "images/BG.png");
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
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, '',{font: "144px Arial", fill:"#ffffff"});
		this.displayString.inputEnabled = true;
		this.displayString.events.onInputDown.add(this.submit, this);

		this.letters = game.add.group();
		this.hand = [];
		this.displayArray = [];
		this.cons = "BCDFGHJKLMNPQRSTVWXYZ";
		this.cons = this.cons.split("");
		this.vowel = "AEIOU";
		this.vowel = this.vowel.split("");
		this.game.add.image(0,0,"hold");
		var rawText = game.cache.getText("words");
		this.dictionary = rawText.split("\n");
		this.dealHand(32);

		this.createHand();

		this.s = '';
		this.displayArray = [];
		this.guessArray = [];


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
			letter.name = (i);
			letter.value = (this.hand[i]);
		}
		this.letters.align(8, -1, 100, 100);
		this.letters.x = (this.game.world.centerX - 400);
		this.letters.y = (this.game.world.centerY - 50);

},
	addLetter:function(letter){
		//Adds clicked letter to the displayArray
		//console.log(letter.name)		
		letter.kill();
		this.displayArray.push(letter.value);
		this.guessArray.push(letter.name);
		this.displayGuess();

},
	displayGuess:function(){
		//Clears the current displayed letters and then prints out the current displayArray
		//look at showWord() in hangman
		//TODO
		this.displayString.kill();
		this.s = this.displayArray.join('');
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.s,{font: "144px Arial", fill:"#ffffff"});
		this.displayString.anchor.setTo(0.5);
		this.displayString.inputEnabled = true;
		this.displayString.events.onInputDown.add(this.submit, this);
		
	},
	submit:function(){
		//Called when displayString is clicked, checks this.string is a word and then kills the word
		//if true gets score
		//if false revives letters

		var target;
		//console.log(this.s);
		//console.log(this.checkWord(this.s));
		if(this.checkWord(this.s)){
			this.displayString.kill();
			//console.log('you get points');
			this.getScore();
			this.s = '';
			this.displayArray = [];
			this.guessArray = [];
		}	
		else{
			this.displayString.kill();	
			for (i = 0; i < this.guessArray.length; i++){
				target = this.letters.getChildAt(this.guessArray[i]);
				target.revive();
			}
			this.s = '';
			this.displayArray = [];
			//console.log('Should be back');

		}
	
	},
	// 'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10
	getScore:function(){
		//TODO:
		//Add a this.gameScore variable
		//add other conditionals into the scoring, (hand size and possibly time)
		//
		//
		//If the word is valid find the score of the word
		wordScore = 0;
		//console.log('yay points');
		console.log(['A'].indexOf(this.displayArray[1]));
		for(i = 0; i < this.displayArray.length; i++){
			if(['A' , 'E' , 'I' , 'L' , 'N' , 'O' , 'R' , 'S' , 'T' , 'U'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 1;
				console.log(this.displayArray[i], ['A' , 'E' , 'I' , 'L' , 'N' , 'O' , 'R' , 'S' , 'T' , 'U'].indexOf(this.displayArray[i]));
			}

			else if(['D' , 'G'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 2;	
				console.log(this.displayArray[i], 'for 2');
			}
			else if(['B' , 'C' , 'M' , 'P'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 3;	
				console.log(this.displayArray[i], 'for 3');
			}
			else if(['F' , 'H' , 'U' , 'W' , 'Y'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 4;
				console.log(this.displayArray[i], 'for 4');
			}
			else if(['K'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 5;	
				console.log(this.displayArray[i], 'for 5');

			}
			else if(['J' , 'X'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 8;	
				console.log(this.displayArray[i], 'for 8');

			}
			else if(['Q' , 'Z'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 10;	
				console.log(this.displayArray[i], 'for 10');

			}


		}
		console.log('for ',wordScore, 'points');


	}

	


}
var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add("GameState", GameState);
game.state.start("GameState");
