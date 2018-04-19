guessedLetters = [];

var GameState = {

	preload:function() {
		this.keyboardPressedNum = 0;
		this.zz = 0;
		this.misses = 0;

		this.game.load.image('bg', 'images/BG.png');
		this.game.load.image('sun','images/placeholder.jpg');
		this.game.load.text('words','words/words.txt');
		this.game.load.image('item', 'images/A.png');
		this.game.load.image('A', 'images/A.png');
		this.game.load.image('B', 'images/B.png');
		this.game.load.image('C', 'images/C.png');
		this.game.load.image('D', 'images/D.png');
		this.game.load.image('E', 'images/E.png');
		this.game.load.image('F', 'images/F.png');
		this.game.load.image('G', 'images/G.png');
		this.game.load.image('H', 'images/H.png');
		this.game.load.image('I', 'images/I.png');
		this.game.load.image('J', 'images/J.png');
		this.game.load.image('K', 'images/K.png');
		this.game.load.image('L', 'images/L.png');
		this.game.load.image('M', 'images/M.png');
		this.game.load.image('N', 'images/N.png');
		this.game.load.image('O', 'images/O.png');
		this.game.load.image('P', 'images/P.png');
		this.game.load.image('Q', 'images/Q.png');
		this.game.load.image('R', 'images/R.png');
		this.game.load.image('S', 'images/S.png');
		this.game.load.image('T', 'images/T.png');
		this.game.load.image('U', 'images/U.png');
		this.game.load.image('V', 'images/V.png');
		this.game.load.image('W', 'images/W.png');
		this.game.load.image('X', 'images/X.png');
		this.game.load.image('Y', 'images/Y.png');
		this.game.load.image('Z', 'images/Z.png');


		//can't find the image, trying to make the health ui and logic
		//
		this.game.load.image('heart', 'images/health.png');
},

	create:function() {
		
		this.game.add.sprite(0,0,'bg');
		this.health = 6;
		//this.game.add.sprite(0,0,'heart');
		this.items = game.add.group();
		this.hearts = game.add.group();
		
		this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";	
		this.hand = this.alphabet.split('');
		this.secretWord = this.pickAWord();	
		this.secretCharacters = this.secretWord.split('');

		this.secretCharacters.splice(0, 1);
		//console.log(this.secretCharacters);
		//This makes an interactiable placeholder
		x = Math.floor(Math.random()*83667);
		var text = game.cache.getText('words');	
		//console.log(text[3]);
		var words = text.split(' ');
		//console.log(words[x]);
		this.secretWord = words[x]
		//this.bg = this.game.add.image(0,0,'bg');
		//this.sun= this.game.add.sprite(0,0,'bg');
		//
		//this.sun.inputEnabled = true;
		//this.sun.events.onInputDown.add(this.testing, this);
		//this.gessedLetters = ['A', 'B', 'C'];
		//console.log(this.gessedLetters);
		this.displayArray = this.displayWord();
		this.showWord();
		this.showHand();
		this.showHealth(1);
		
		//Overshoots by 1?
		//Seems to work for the moment.
		//Needs to actually display text on screen though
		
		//this.display = [];
		//this.displayObj = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'');
		//Not sure if I should keep this or not?
		//this.displayObj.anchor.setTo(0.5);
		//for(i = 0; i < this.secretCharacters.length; i++)
		//	this.display[i] = '_';
		//console.log('create');

		game.input.keyboard.addCallbacks(this, null, null, this.GameStart);
},
	pickAWord:function(){
		//Splits dictionary by ' ' and picks a random word, returns that word
		x = Math.floor(Math.random()*83667);
		var rawText = game.cache.getText('words');
		var words = rawText.split(' ');
		var secretWord = words[x];
		return(secretWord);

},
	displayWord:function(){
		//console.log(guessedLetters);
		//updates the display, assumes everything is correct
		this.returnWord = [];
		for(i=0;i<this.secretCharacters.length;i++){
			//ifguessedletter indexOf secret character > 1A
			//syntax is a little odd, check note
			//console.log(guessedLetters);
			if (guessedLetters.indexOf(this.secretCharacters[i]) >=  0){
				//debugger;
				//console.log(' ');
				//console.log(guessedLetters.indexOf(this.secretCharacters[i]));
				this.returnWord[i] = this.secretCharacters[i];
			}
			else{
				this.returnWord[i] = "_";	
			}
		}
		//console.log(this.returnWord);
		//console.log(this.secretCharacters);
		return(this.returnWord);

},

	update:function() {

},
	keyPress:function(char) {
		this.keyboardPressedNum += 1;
		////console.log('KeyboardPressed:')
		////console.log(keyboardPressedNum);
		var AlreadyGuessed = false;
		var hit = false;
		char = char.toUpperCase();
		//console.log(this.lettersGuessed);
		for(characters = 0; characters < this.lettersGuessed.length; characters++){
			if (char == this.lettersGuessed[characters]){
				//console.log('Why is this ==?');
				//console.log(this.lettersGuessed[characters]);
				//console.log(char);
				AlreadyGuessed = true;
				//console.log('Already guessed!');
			}
			else{
				this.lettersGuessed[this.zz] = char;
				this.zz += 1;
			}
		}			
		//console.log(this.lettersGuessed);
		if(AlreadyGuessed == false){
			for (i = 0; i < this.secretCharacters.length; i++){
				if(this.secretCharacters[i] == char){
					this.display[i] = char;	
				}	
			}
		}
		//console.log(char.toUpperCase());
		for(i = 1; i < this.secretCharacters.length; i++){
			if(char.toUpperCase() == this.secretCharacters[i]){
				
				//console.log('HIT!');		
				break;
			}	
			else{
				//console.log('MISS!');
				//misses += 1;
				//console.log(misses);
				break;

			}
		}
	},

	showWord:function(){
		// Ideally this would seperate out each idividual letter, for animation, will test this
		// later, there probably is some group aligment function, search docs
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, '', {font: "144px Arial", fill: "#ffffff"});
			this.s = this.displayArray.join(''); 
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.s, {font: "144px Arial", fill: "#ffffff"});
		this.displayString.stroke = "#3b07d7";
		this.displayString.strokeThickness = 16;
		this.displayString.setShadow(2, 2, "#333333", 2, false, true);
	
	
		this.displayString.anchor.setTo(0.5);
	},

	testing:function(){
		//this.displayText();
		//console.log('click');	
	},
	displayText:function(){
		var currentDisplay = '';
		//Make a string of the 'display' arrary, then clear the previous display, and update
		//console.log(this.display);
		for(i = 1; i < this.display.length; i++){
			currentDisplay = currentDisplay.concat(this.display[i]);			
		}	
		this.displayObj.text = currentDisplay;
		//console.log(currentDisplay);
		
		
			
	},
	showHand:function(){
//		//console.log(this.hand);
		
		var item;
		//this.items.cursorIndex = 0;
		//console.log(this.items.cursorIndex);
		for (i = 0; i < this.hand.length; i++){
			item = this.items.create(0, 0, this.hand[i]);
			//item = this.items.create(0, 0, 'item');
			item.name = i;
			item.letter = this.hand[i]; 
			item.anchor.setTo(0.5);
			item.inputEnabled = true;
			item.events.onInputDown.add(this.guessLetter, this);

		}
		this.items.align(8, -1, 100, 100);
		this.items.x = (this.game.world.centerX - 400);
		this.items.y = (this.game.world.centerY - 50);
	},
	guessLetter:function(item){
		if(this.health < 0){
			console.log('You are dead');
			return(0);
		}
		var target = {
			x : 0,
			y : 0,
			name : 0,
		};
		//this.items.cursorIndex = 22;	
		//item = this.items.next();
		console.log('Item name: ', item.name);
		this.items.cursorIndex = item.name;
		item.kill();
		guessedLetters.push(item.letter);
		this.calcDamage(item.letter);
		//console.log(guessedLetters);
		this.displayString.kill();
		this.displayArray = this.displayWord();
		this.showWord();
		if(this.health < 0){
			console.log('You are dead');
		}
		else if(item.name + 8 < this.hand.length){
		console.log('Item name: ', item.name);
		target = this.items.getChildAt(item.name + 8);
		}
		else{
		target = this.items.getChildAt(item.name);	
		}
		var delay = 700;
		this.moveLetters(item,target, delay);
	},
	moveLetters:function(item,target, delay){
		//Add a check for target.name being more than hand length maybe... I don't know rethink this
		//
		//this works...
		//xa = this.items.getChildAt(5);
		//console.log(xa);
		//
			
		console.log('current item is: ', item.name);
		console.log('current target is: ', target.name);
		// if target == item, then nothing needs to be done.
		if(target.name === item.name) {
			console.log('Nothing to move');	
		}
		else if (target.alive){
			var swapX = item.x;
			var swapY = item.y;

			console.log('Target is alive');	
			moveLetter = game.add.tween(target);
			moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			if((target.name + 8) < this.hand.length){
			item = this.items.getChildAt(target.name);
			target = this.items.getChildAt(target.name + 8);
			this.moveLetters(item,target,delay);
			}
			else{
			console.log('Nothing to move');	
			}
			

		}
		else if (target.alive === false){
			console.log('Target is dead');	
			if((target.name + 8) < this.hand.length){
			target = this.items.getChildAt(target.name + 8);
			this.moveLetters(item,target,delay);
			}
			else{
			console.log('Nothing to move');	
			}
		}
	
				
	},
			 

		//Current idea:A
		// function (guess, "guess + x", delay)
		//check if guess + 8 > hand.length
		//	if it is then we are at the last row and no other action is needed.
		//if guess + 8 < hand.length and guess + 8 is alive
		//	then we need to move that item to guess's position and recurse with guess + 8
		//if guess + 8 < hand.length and guess + 8 is dead
		//	then we need to recurse with the current guess but some how to target is now + 16 of the original?
		//
		/*
		if (item.name + 8 < this.hand.length){
			this.items.curorIndex = item.name + 8;
			item = this.items.next();
			item = this.items.previous();
			if(item.alive){
				this.items.curorIndex = item.name - 8;
				item = this.items.next();
				item = this.items.previous();
				var swapX = item.x;
				var swapY = item.y;
				this.items.cursorIndex = item.name + 8;
				item = this.items.next();	
				item = this.items.previous();
				moveLetter = game.add.tween(item);
				moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			}
			else{
				this.items.cursorIndex = item.name - 8;
				item = this.items.next();
				item = this.items.previous();
			}
		}
		if (item.name + 16 < this.hand.length){
			this.items.curorIndex = item.name + 16;
			item = this.items.next();
			item = this.items.previous();
			if(item.alive){
				this.items.curorIndex = item.name - 16;
				item = this.items.next();
				item = this.items.previous();
				var swapX = item.x;
				var swapY = item.y;
				this.items.cursorIndex = item.name + 16;
				item = this.items.next();	
				item = this.items.previous();
				moveLetter = game.add.tween(item);
				moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			}
			else{
				this.items.cursorIndex = item.name - 16;
				item = this.items.next();
				item = this.items.previous();
			}
		}
		if (item.name + 24 < this.hand.length){
			this.items.curorIndex = item.name + 24;
			item = this.items.next();
			item = this.items.previous();
			if(item.alive){
				this.items.curorIndex = item.name - 24;
				item = this.items.next();
				item = this.items.previous();
				var swapX = item.x;
				var swapY = item.y;
				this.items.cursorIndex = item.name + 24;
				item = this.items.next();	
				item = this.items.previous();
				moveLetter = game.add.tween(item);
				moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			}
			else{
				this.items.cursorIndex = item.name - 24;
				item = this.items.next();
				item = this.items.previous();
			}
		}



		
		if (item.name + 8 < this.hand.length){
			//console.log("!!!!!!!!!!!!!!!");
			//console.log(item.exist);
			swapX = item.x;
			swapY = item.y;
			this.items.cursorIndex = item.name + 8;
			item = this.items.next();	
			item = this.items.previous();

			moveLetter = game.add.tween(item);
			moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			}
		if (item.name + 8 < this.hand.length){
			//console.log("!!!!!!!!!!!!!!!");
			swapX = item.x;
			swapY = item.y;
			this.items.cursorIndex = item.name + 8;
			item = this.items.next();	
			item = this.items.previous();

			moveLetter = game.add.tween(item);
			moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);
			}
	

			
			//this.items.cursorIndex = item.name + 8;
			////console.log(this.items.cursorIndex);
			//item
			//this.items.kill();
			

			////console.log('moving');
			if (item.name + 8 < this.hand.length){
				delay += 100;
				this.moveLetters(item, delay);		
			}
			else if (item.name + 16 < this.hand.length){
				delay += 100;	
				this.moveLetters(item, delay);
			}
		*/
			
		
	showHealth:function(n){
		//Have this function take a parameter to decide if it needs to work for the initial setup
		//or if it needs to remove or add a heart.
		if(n === 1){
		console.log(this.health);
		var heart;
		for(j = 0; j < this.health; j++){
			heart = this.hearts.create(0, 0, 'heart');
			heart.anchor.setTo(0.5);
			console.log('Made a heart');
			//heart.y = (j*10);
		
		}
		this.hearts.align(1, -1, 100, 100);
		}
		else{
			if(this.health < 0){
				var pushAll = this.alphabet.split('');
				this.items.removeAll(true);
				for(i = 0; i < pushAll.length; i++){
					guessedLetters.push(pushAll[i]);	
				} 
				this.displayString.kill();
				this.displayArray = this.displayWord();
				this.showWord();


			}
			else{
			heart = this.hearts.getChildAt(this.health);
			heart.kill();	
			console.log(heart, 'did we see that?');	
			}
			
		}
		
	},
	calcDamage:function(guess){
		var hit = true;

		for(i = 0; i < this.secretCharacters.length; i++){
			if(this.secretCharacters.indexOf(guess) < 1){
				hit = false;			
			}
		}	
		if(hit){
			console.log('Hit');	
		}
		else{
			console.log('Miss');	
			this.health -= 1;

			console.log(this.health);
			this.showHealth(2);
			
			
		}

	}
 
}
var config = {
	width: 1280,
	height: 720,
	renderer: Phaser.AUTO,
	backgroundColor:'#fff000'
}
var game = new Phaser.Game(config);
game.state.add('GameState', GameState);
game.state.start('GameState');
