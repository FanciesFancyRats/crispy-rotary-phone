guessedLetters = ['A', 'B', 'C'];

var GameState = {

	preload:function() {
		this.keyboardPressedNum = 0;
		this.zz = 0;
		this.misses = 0;

		this.game.load.image('sun','images/placeholder.jpg');
		this.game.load.text('words','words/words.txt');
		this.game.load.image('item', 'images/item.png');
		//can't find the image, trying to make the health ui and logic
		//
		this.game.load.image('heart', 'images/health.png');
},

	create:function() {
		this.health = 6;
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
		this.sun= this.game.add.sprite(0,0,'sun');
		this.sun.inputEnabled = true;
		this.sun.events.onInputDown.add(this.testing, this);
		//this.gessedLetters = ['A', 'B', 'C'];
		//console.log(this.gessedLetters);
		this.displayArray = this.displayWord();
		this.showWord();
		this.showHand();
		this.showHealth();
		
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
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, '');
		this.s = this.displayArray.join(''); 
		this.displayString = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.s);
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
			item = this.items.create(0, 0, 'item');
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
		//this.items.cursorIndex = 22;	
		//item = this.items.next();
		this.items.cursorIndex = item.name;
		item.kill();
		guessedLetters.push(item.letter);
		//console.log(guessedLetters);
		this.displayString.kill();
		this.displayArray = this.displayWord();
		this.showWord();
		var delay = 700;
		this.moveLetters(item, delay);
	},
	moveLetters:function(item, delay){
		if (item.name + 8 < this.hand.length){
			var swapX = item.x;
			var swapY = item.y;
			this.items.cursorIndex = item.name + 8;
			item = this.items.next();	
			item = this.items.previous();

			moveLetter = game.add.tween(item);
			moveLetter.to({x:swapX, y:swapY}, delay, Phaser.Easing.Bounce.Out, true);


			
			//this.items.cursorIndex = item.name + 8;
			console.log(this.items.cursorIndex);
			//item
			//this.items.kill();
			

			console.log('moving');
			if (item.name + 8 < this.hand.length){
				delay += 100;
				this.moveLetters(item, delay);		
			}

			
		}
	},
	showHealth:function(){
		var heart;
		for(i = 0; i < health; i++){
			this.hearts.create(0,0,"heart");
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
