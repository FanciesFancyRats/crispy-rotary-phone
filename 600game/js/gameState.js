

var gameState = {
	init:function(){
		highScore = highScore;	
	},

	preload:function() {
		this.game.load.image('hold', 'images/placeholder.jpg');
		this.game.load.image("endButton","images/endButton.png");
		this.game.load.image('back', 'images/back.png');
		this.game.load.image('star', 'images/star.png');
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
		this.game.load.image('backHover', 'images/backHover.png');
		this.game.load.image('endHover', 'images/endHover.png');



		this.game.load.audio("ding", "sounds/ding.mp3");
		this.game.load.audio("win", "sounds/win.mp3");
		this.game.load.audio('hover', 'sounds/click5.mp3');
		this.game.load.audio('click', 'sounds/click4.mp3');
		this.game.load.audio('submit', 'sounds/submit.mp3');
		this.game.load.audio('back', 'sounds/close.mp3');

		//this.game.load.image('options', 'images/options.png');
		//this.game.load.image('highScore', 'images/highScore.png');
		//this.game.load.image('start', 'images/start.png');
		

},

	create:function() {
		this.game.add.image(0, 0, 'BG');
		this.gameScore = 0;
		this.displayString = this.game.add.text(this.game.world.centerX, 10, '',{font: "144px Arial", fill:"#ffffff"});
		this.displayString.inputEnabled = true;

		this.dingSound = this.game.add.audio('ding');
		this.fanFare = this.game.add.audio('win');
		this.hoverMp3 = this.game.add.audio('hover');
		this.clickMp3 = this.game.add.audio('click');
		this.submitMp3 = this.game.add.audio('submit');
		this.backMp3 = this.game.add.audio('back');

		this.scoreDisplay = this.game.add.text(1150 , 650, this.gameScore,{font:'40px Arial', fill:'#ffffff'});
		this.scoreDisplay.anchor.setTo(0.5);

		//this.checkDictImg = this.game.add.sprite(0, 720 - 157, 'hold');
		//this.checkDictImg.inputEnabled = true;
		//this.checkDictImg.events.onInputDown.add(this.checkDict, this);

		this.backButton = this.game.add.sprite(1280 - 240, 0, 'back');
		this.backButton.inputEnabled = true;
		this.backButton.events.onInputDown.add(this.removeLetter, this);
		this.backButton.events.onInputOver.add(this.hoverBack, this);
		this.backButton.events.onInputOut.add(this.stopHoverBack, this);
		
		this.displayScore();
		this.displayString.events.onInputDown.add(this.submit, this);

		this.letters = game.add.group();
		this.hand = [];
		this.displayArray = [];

		this.scoreText = this.game.add.text(1150 ,600, 'Score:',{font: '50px Arial', fill:'#ffffff'});
		this.scoreText.anchor.setTo(0.5);
		this.scoreText.stroke = '#1b0088'
		this.scoreText.strokeThickness = 5;
		
		this.cons = "BCDFGHJKLMNPQRSTVWXYZ";
		this.cons = this.cons.split("");
		this.vowel = "AEIOU";
		this.vowel = this.vowel.split("");
		this.endButton = this.game.add.sprite(0,0,"endButton");
		this.endButton.inputEnabled = true;
		this.endButton.events.onInputDown.add(this.end, this);
		this.endButton.events.onInputOver.add(this.hoverEnd, this);
		this.endButton.events.onInputOut.add(this.stopHoverEnd, this);

		var rawText = game.cache.getText("words");
		this.dictionary = rawText.split("\n");
		this.dealHand(32);

		this.createHand();

		this.s = '';
		this.displayArray = [];
		this.guessArray = [];

		this.scoreAnimate = 0;


},

	update:function() {
		

},
	checkWord:function(guess){
		//Takes the word [guess] and returns true or false wether or not it is in this.dictionary
		return(this.dictionary.includes(guess));
},
	checkDict:function(){
		//When called this function will check if a word can still be made with the avaliable hand
		console.log('click');	
		var x;
		this.hand = [];
		for(i = 0; i < this.letters.length; i++){
			x = this.letters.getChildAt(i);
			if(x.alive){
				this.hand.push(x.value);	
			}
		}
		console.log(this.hand);


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
			letter.events.onInputOver.add(this.hover, this);
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
		this.clickMp3.play();
		letter.kill();
		this.displayArray.push(letter.value);
		this.guessArray.push(letter.name);
		this.displayGuess();

},
	removeLetter:function(){
		this.backMp3.play();
		if(this.guessArray.length > 0){
		var i = this.guessArray.length - 1;
		target = this.letters.getChildAt(this.guessArray[i]);
		this.guessArray.length--;
		target.revive();
		this.displayArray.length--;
		this.displayGuess();
		}
		else{
		return;	
		}
		
		
	
},

	displayGuess:function(){
		//Displays the current letters from displayArray
		this.displayString.kill();
		this.s = this.displayArray.join('');
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.s,{font: "144px Arial", fill:"#ffffff"});
		this.displayString.anchor.setTo(0.5);
		this.displayString.inputEnabled = true;
		this.displayString.events.onInputOver.add(this.hoverGuess, this);
		this.displayString.events.onInputOut.add(this.stopHoverGuess, this);
		this.displayString.events.onInputDown.add(this.submit, this);
		
	},
	displayScore:function(){
		//TODO Make the final arangements to the layout
		this.scoreDisplay.kill();
		this.scoreDisplay = this.game.add.text(1150 , 660, this.gameScore,{font:'60px Arial', fill:'#ffffff'});
		this.scoreDisplay.anchor.setTo(0.5);
		this.scoreDisplay.stroke = '#1b0088';
		this.scoreDisplay.strokeThickness = 5;


	
},
	animateScore:function(add){
		//TODO I think I have a better way to impliment this, use a for loop and timer.add(displayscore()) or something along those lines
		console.log('animating');
		this.game.time.events.loop(Phaser.Timer.QUARTER/4, this.updateText, this);

			

	},
	updateText:function(){
		this.animateScoreNum--;
		if(this.animateScoreNum > 0){	
			
			this.dingSound.play();
			this.scoreDisplay.kill();
			this.scoreDisplay = this.game.add.text(1150 , 660, this.gameScore-this.animateScoreNum,{font:'60px Arial', fill:'#ffffff'});
			this.scoreDisplay.anchor.setTo(0.5);
			this.scoreDisplay.stroke = '#1b0088';
			this.scoreDisplay.strokeThickness = 5;

			//this.scoreDisplay.kill();
			//this.scoreDisplay = this.game.add.text(1200 , 20, this.gameScore-this.animateScoreNum,{font: '40px Arial', fill:'#ffffff'});
			//this.scoreDisplay.anchor.setTo(0.5);

			//this.scoreText = this.game.add.text(1100 , 20, 'Score:',{font: '40px Arial', fill:'#ffffff'});
			//this.scoreText.anchor.setTo(0.5);

			console.log('updating text', this.animateScoreNum);
		}
		else{
			this.scoreDisplay.kill();
			this.scoreDisplay = this.game.add.text(1150 , 660, this.gameScore,{font:'60px Arial', fill:'#ffffff'});
			this.scoreDisplay.anchor.setTo(0.5);
			this.scoreDisplay.stroke = '#1b0088';
			this.scoreDisplay.strokeThickness = 5;

			return;	
		}

	},
	wait:function(){
		console.log('wait');	
	},
	submit:function(){
		//Called when displayString is clicked, checks this.string is a word and then kills the word
		//if true gets score and begin moving the letters
		//if false revives letters

		var target;
		if(this.checkWord(this.s)){
			this.displayString.kill();
			this.getScore();
			this.submitMp3.play();
			//this.displayScore();
			this.s = '';
			this.displayArray = [];
			this.moveLetters();
			this.guessArray = [];
			
		
		}	
		else{
			this.backMp3.play();
			this.displayString.kill();	
			for (i = 0; i < this.guessArray.length; i++){
				target = this.letters.getChildAt(this.guessArray[i]);
				target.revive();
			}
			this.s = '';
			this.displayArray = [];
			this.guessArray = [];

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
			else if(['F' , 'H' ,'V', 'W' , 'Y'].indexOf(this.displayArray[i]) >= 0){
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
		if(this.displayArray.length > 4){
			wordScore+=wordScore;
			this.moveLetters();

		}
		else{
			wordScore++;		
		}

		////console.log('for ',wordScore, 'points');
		this.gameScore+=wordScore;
		this.animateScoreNum = wordScore;
		this.animateScore(wordScore);
		//console.log('Total: ', this.gameScore);
	},
	moveLetters:function(){
		this.guessArray.sort(function(a, b){
			return a - b;	
		});	
		//console.log('Did it sort?', this.guessArray);
		for(i = 0; i < this.guessArray.length; i++){
			swapTarget = 0;
			swapOrign = 0
			//console.log(this.guessArray[i]);	
			//console.log(this.guessArray);
			if(this.guessArray[i] + 8 < 32){
				//console.log(this.letters.getChildAt(this.guessArray[i]), 'needs moved');
				//TODO
				//while guessArray.length > 0
				//	while target(guessArray(i + 8)) 
				//This we can modify the .length of an array
				//so something like i = array.length; i > 0; i--j
				while(this.guessArray.length > 0){
					swapOrgin = (this.guessArray[this.guessArray.length - 1]);
					swapTarget = (this.guessArray[this.guessArray.length - 1] + 8);


					while(swapTarget < 32) {
						letter = this.letters.getChildAt(swapOrgin);
						target = this.letters.getChildAt(swapTarget);
						test = this.letters.getChildAt(swapOrgin + 8);
						//console.log('letter:', letter.value, 'target:', target.value);
						swapX = letter.x;
						swapY = letter.y;
						if(target.alive){
						////console.log('swap orgin: ', swapOrgin, 'swap target: ', swapTarget);
						moveLetter = game.add.tween(this.letters.getChildAt(swapTarget));
						moveLetter.to({x:swapX, y:swapY}, 0, Phaser.Easing.Bounce.Out, true);
						if(test.alive){
						swapOrgin = swapTarget;	
							}
						else{
							swapOrgin += 8;
							}
						}
						swapTarget += 8;
						
					}
					this.guessArray.length--;	
				}
			}
			else{
				//console.log('nothing to move');	
			}
		}			
	},

	//
	//TODO this is broken now, copy and pasted the animate function to try and animate the bonus but, not sure what went wrong but need to get back to work
	//
	end:function(){
	//Calculating Bonus	
		var bonus = 0;
	//Finding the number of letters unused		
		var left = 0; 
		for (i = 0; i < this.hand.length; i++){
			target = this.letters.getChildAt(i);
			if(target.alive){
				left++;		
			}
		}
	//Calculating bonus	
		bonus = 45 - (left * 5);
		if (bonus < 0){
			bonus = 0;	
		}
		this.gameScore += bonus;
		
		this.bonusAnimate = bonus;	
		
	//Kill 'Score: '
		this.scoreText.kill();
	//Remove Letters		
		this.letters.removeAll(true);
	//Kill score at bottom right
		this.scoreDisplay.kill();


		this.scoreDisplayBonus= this.game.add.text(this.game.world.centerX , this.game.world.centerY + 50, this.gameScore - this.bonusAnimate,{font:'144px Arial', fill:'#ffffff'});
		this.scoreDisplayBonus.stroke = '#1b0088';
		this.scoreDisplayBonus.strokeThickness = 10;
		this.scoreDisplayBonus.anchor.setTo(0.5);

		if(this.gameScore > highScore){
			this.highScoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'New High Score!', {font:'100px Arial', fill:'#ffffff'});
			this.highScoreText.stroke = '#1b0088';
			this.highScoreText.strokeThickness = 10;
			this.highScoreText.anchor.setTo(0.5);
			highScore = this.gameScore;
			console.log('updating highScore');
			this.fanFare.play();
		}
		else{
			this.highScoreText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, 'Your Score:', {font:'100px Arial', fill:'#ffffff'});
			this.highScoreText.stroke = '#1b0088';
			this.highScoreText.strokeThickness = 10;
			this.highScoreText.anchor.setTo(0.5);
		}
		console.log('this.bonusAnimate: ', this.bonusAnimate);
		if(this.bonusAnimate > 1){
			this.bonusText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 170, left + ' letters left bonus', {font: '60px Arial', fill:'#ffffff'});
			this.bonusText.anchor.setTo(0.5);
			this.bonusText.stroke = '#1b0088';
			this.bonusText.strokeThickness = 10;
			this.animateScoreBonus();

		}	
		else{
			this.scoreDisplayBonus.kill();
			this.scoreDisplayBonus= this.game.add.text(this.game.world.centerX , this.game.world.centerY + 50, this.gameScore,{font:'144px Arial', fill:'#ffffff'});
			this.scoreDisplayBonus.stroke = '#1b0088';
			this.scoreDisplayBonus.strokeThickness = 10;
			this.scoreDisplayBonus.anchor.setTo(0.5);
			this.scoreDisplayBonus.inputEnabled = true;
			this.scoreDisplayBonus.events.onInputDown.add(this.changeState, this);
		}	


		this.endButton.kill();
		this.endButton = this.game.add.sprite(0,0,"endButton");
		this.endButton.inputEnabled = true;
		this.endButton.events.onInputDown.add(this.changeState, this);


		//this.scoreDisplayBonus.kill();	
		//this.scoreDisplayBonus= this.game.add.text(this.game.world.centerX , this.game.world.centerY + 50, this.gameScore,{font:'144px Arial', fill:'#ffffff'});
		//this.scoreDisplayBonus.inputEnabled = true;
		//this.scoreDisplayBonus.events.onInputDown.add(this.changeState, this);
			
		

	},
	animateScoreBonus:function(){
		console.log('Animating bonus');
		console.log(this.gameScore - this.bonusAnimate);
		
		this.game.time.events.loop(Phaser.Timer.QUARTER/4, this.updateTextBonus, this);

	},
	updateTextBonus:function(){
		this.bonusAnimate--;
		if(this.bonusAnimate > 0){
			this.dingSound.play();
			this.scoreDisplayBonus.kill();
			this.scoreDisplayBonus= this.game.add.text(this.game.world.centerX , this.game.world.centerY + 50, this.gameScore - this.bonusAnimate ,{font:'144px Arial', fill:'#ffffff'});
		this.scoreDisplayBonus.stroke = '#1b0088';
		this.scoreDisplayBonus.strokeThickness = 10;
		this.scoreDisplayBonus.anchor.setTo(0.5);

		}
		else{
			this.scoreDisplayBonus.kill();
			this.scoreDisplayBonus= this.game.add.text(this.game.world.centerX , this.game.world.centerY + 50, this.gameScore,{font:'144px Arial', fill:'#ffffff'});
			this.scoreDisplayBonus.stroke = '#1b0088';
			this.scoreDisplayBonus.strokeThickness = 10;
			this.scoreDisplayBonus.anchor.setTo(0.5);
			this.scoreDisplayBonus.inputEnabled = true;
			this.scoreDisplayBonus.events.onInputDown.add(this.changeState, this);
			return;	
		}
		
	},


	changeState:function(){
		this.state.start('bootState', true, false, highScore);
	},
	hover:function(){
		//plays the hover sound
		this.hoverMp3.play();
	},
	hoverGuess:function(){
		this.hoverMp3.play();
		this.displayString.stroke = "#1b0088";
		this.displayString.strokeThickness = 16;

	},
	stopHoverGuess:function(){
		this.displayString.strokeThickness = 0;	
	},
	hoverEnd:function(){
		this.hoverMp3.play();
		this.endButton.loadTexture('endHover', 0);	
	},
	stopHoverEnd:function(){
		this.endButton.loadTexture('endButton', 0);	
	},
	hoverBack:function(){
		this.hoverMp3.play();
		this.backButton.loadTexture('backHover', 0);	
	},
	stopHoverBack:function(){
		this.backButton.loadTexture('back', 0);	
	}


	


}
//var game = new Phaser.Game(1280, 720, Phaser.AUTO);
//game.state.add("gameState", gameState);
//game.state.start("gameState");
