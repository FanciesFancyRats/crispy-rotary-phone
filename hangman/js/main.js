guessedLetters = ['A', 'B', 'C'];

var GameState = {

	preload:function() {
		this.zz = 0;
		this.misses = 0;

		this.game.load.image('sun','images/placeholder.jpg');
		this.game.load.text('words','words/words.txt');
},

	create:function() {
		
		this.secretWord = this.pickAWord();	
		this.secretCharacters = this.secretWord.split('');
		//This makes an interactiable placeholder
		this.sun= this.game.add.sprite(0,0,'sun');
		this.sun.inputEnabled = true;
		this.sun.events.onInputDown.add(this.testing, this);
		//this.gessedLetters = ['A', 'B', 'C'];
		console.log(this.gessedLetters);
		this.displayWord();
		//Overshoots by 1?
		//Seems to work for the moment.
		//Needs to actually display text on screen though
		
		this.display = [];
		this.displayObj = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'');
		this.displayObj.anchor.setTo(0.5);
		for(i = 0; i < this.secretCharacters.length; i++)
			this.display[i] = '_';
		console.log('create');

		game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
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
		console.log(guessedLetters);
		//updates the display, assumes everything is correct
		this.returnWord = [];
		for(i=0;i<this.secretCharacters.length;i++){
			//ifguessedletter indexOf secret character > 1A
			//syntax is a little odd, check note
			console.log(guessedLetters);
			if (guessedLetters.indexOf(this.secretCharacters[i]) > 0){
				this.returnWord[i] = this.secretCharacters[i];
			}
			else{
				this.returnWord[i] = "_";	
			}
		}
		console.log(this.returnWord);
		console.log(this.secretCharacters);

},

	update:function() {

},
	keyPress:function(char) {
		var AlreadyGuessed = false;
		var hit = false;
		char = char.toUpperCase();
		console.log(this.lettersGuessed);
		for(characters = 0; characters < this.lettersGuessed.length; characters++){
			if (char == this.lettersGuessed[characters]){
				AlreadyGuessed = true;
				console.log('Already guessed!');
			}
			else{
				this.lettersGuessed[this.zz] = char;
				this.zz += 1;
			}
		}			
		if(AlreadyGuessed == false){
			for (i = 0; i < this.secretCharacters.length; i++){
				if(this.secretCharacters[i] == char){
					this.display[i] = char;	
				}	
			}
		}
		console.log(char.toUpperCase());
		for(i = 1; i < this.secretCharacters.length; i++){
			if(char.toUpperCase() == this.secretCharacters[i]){
				
				console.log('HIT!');		
				break;
			}	
			else{
				console.log('MISS!');
				misses += 1;
				console.log(misses);
				break;

			}
		}
	},

	testing:function(){
		this.displayText();
		console.log('click');	
	},
	displayText:function(){
		var currentDisplay = '';
		//Make a string of the 'display' arrary, then clear the previous display, and update
		console.log(this.display);
		for(i = 1; i < this.display.length; i++){
			currentDisplay = currentDisplay.concat(this.display[i]);			
		}	
		this.displayObj.text = currentDisplay;
		console.log(currentDisplay);
		
		
			
	}

}
var config = {
	width: 800,
	height: 600,
	renderer: Phaser.AUTO,
	backgroundColor:'#fff000'
}
var game = new Phaser.Game(config);
game.state.add('GameState', GameState);
game.state.start('GameState');
