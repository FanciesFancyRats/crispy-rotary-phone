

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
		this.gameScore = 0;
		this.displayString = this.game.add.text(this.game.world.centerX, 10, '',{font: "144px Arial", fill:"#ffffff"});
		this.displayString.inputEnabled = true;

		this.scoreDisplay = this.game.add.text(1200 , 10, this.gameScore,{font:'40px Arial', fill:'#ffffff'});

	
		
		this.displayScore();
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
		//Generates a hand(array of letters) based on handSize
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
		//Takes the contents of this.hand and makes game object letters
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
		//Kills the block the user clicked on and adds it's value to an array to be displayed and an array of the letters
		//currently being guessed
		//Then calls the function to display the currently guessed letters

		letter.kill();
		this.displayArray.push(letter.value);
		this.guessArray.push(letter.name);
		this.displayGuess();

},
	displayGuess:function(){
		//Displays the current letters from displayArray
		this.displayString.kill();
		this.s = this.displayArray.join('');
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.s,{font: "144px Arial", fill:"#ffffff"});
		this.displayString.anchor.setTo(0.5);
		this.displayString.inputEnabled = true;
		this.displayString.events.onInputDown.add(this.submit, this);
		
	},
	displayScore:function(){
		//TODO Make the final arangements to the layout
		this.scoreDisplay.kill();
		this.scoreDisplay = this.game.add.text(1200 , 20, this.gameScore,{font: '40px Arial', fill:'#ffffff'});
		this.scoreDisplay.anchor.setTo(0.5);

		this.scoreText = this.game.add.text(1100 , 20, 'Score:',{font: '40px Arial', fill:'#ffffff'});
		this.scoreText.anchor.setTo(0.5);
},
	submit:function(){
		//Called when displayString is clicked, checks this.string is a word and then kills the word
		//if true gets score and begin moving the letters
		//if false revives letters

		var target;
		if(this.checkWord(this.s)){
			this.displayString.kill();
			this.getScore();
			this.displayScore();
			this.s = '';
			this.displayArray = [];
			this.moveLetters();
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

		}
	
	},
	getScore:function(){
		//Takes a word and calculates the score and stores it in this.gameScore
		wordScore = 0;
		for(i = 0; i < this.displayArray.length; i++){
			if(['A' , 'E' , 'I' , 'L' , 'N' , 'O' , 'R' , 'S' , 'T' , 'U'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 1;
			}

			else if(['D' , 'G'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 2;	
			}
			else if(['B' , 'C' , 'M' , 'P'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 3;	
			}
			else if(['F' , 'H' , 'U' ,'V', 'W' , 'Y'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 4;
			}
			else if(['K'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 5;	

			}
			else if(['J' , 'X'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 8;	

			}
			else if(['Q' , 'Z'].indexOf(this.displayArray[i]) >= 0){
				wordScore+= 10;	
			}


		}
		if((7*this.displayArray.length+1) - 3*((32/2)-this.displayArray.length+1) > 1){
			wordScore+=((7*this.displayArray.length+1) - 3*((32/2)-this.displayArray.length+1))
			this.moveLetters();

		}
		else{
			wordScore++;		
		}
		console.log('for ',wordScore, 'points');
		this.gameScore+=wordScore;
		console.log('Total: ', this.gameScore);
	},
	moveLetters:function(){
		//
		for(i = 0; i < this.guessArray.length; i++){
			swapTarget = 0;
			swapOrign = 0
			console.log(this.guessArray[i]);	
			if(this.guessArray[i] + 8 < 32){
				console.log(this.letters.getChildAt(this.guessArray[i]), 'needs moved');
				//TODO
				//while guessArray.length > 0
				//	while target(guessArray(i + 8)) 
				//This we can modify the .length of an array
				//so something like i = array.length; i > 0; i--j
				while(this.guessArray.length > 0){
					swapOrgin = (this.guessArray[this.guessArray.length - 1]);
					swapTarget = (this.guessArray[this.guessArray.length - 1] + 8);


					while(swapTarget < 32) {
						console.log(this.letters.getChildAt(swapTarget));
						swapTarget += 8;
						
					}
					this.guessArray.length--;	
				}
			}
			else{
				console.log('nothing to move');	
			}
		}			
	}


	


}
var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add("GameState", GameState);
game.state.start("GameState");
