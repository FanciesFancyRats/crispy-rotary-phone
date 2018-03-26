

var GameState = {

	preload:function() {
		this.keyboardPressedNum = 0;
		this.zz = 0;
		this.misses = 0;
		this.lettersGuessed = [' '];

		this.game.load.image('sun','images/placeholder.jpg');
		this.game.load.text('words','words/words.txt');
},

	create:function() {
		x = Math.floor(Math.random()*83667);
		var text = game.cache.getText('words');	
		//console.log(text[3]);
		var words = text.split(' ');
		console.log(words[x]);
		this.secretWord = words[x]
		this.sun= this.game.add.sprite(0,0,'sun');
		this.sun.inputEnabled = true;
		this.sun.events.onInputDown.add(this.testing, this);
		this.secretCharacters = this.secretWord.split('');
		this.display = [];
		this.displayObj = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'');
		this.displayObj.anchor.setTo(0.5);
		for(i = 0; i < this.secretCharacters.length; i++)
			this.display[i] = '_';
		//console.log('create');

		game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
},

	update:function() {

},
	keyPress:function(char) {
		this.keyboardPressedNum += 1;
		console.log('KeyboardPressed:')
		console.log(keyboardPressedNum);
		var AlreadyGuessed = false;
		var hit = false;
		char = char.toUpperCase();
		//console.log(this.lettersGuessed);
		for(characters = 0; characters < this.lettersGuessed.length; characters++){
			if (char == this.lettersGuessed[characters]){
				console.log('Why is this ==?');
				console.log(this.lettersGuessed[characters]);
				console.log(char);
				AlreadyGuessed = true;
				console.log('Already guessed!');
			}
			else{
				this.lettersGuessed[this.zz] = char;
				this.zz += 1;
			}
		}			
		console.log(this.lettersGuessed);
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
				
				console.log('HIT!');		
				break;
			}	
			else{
				console.log('MISS!');
				//misses += 1;
				//console.log(misses);
				break;

			}
		}
	},

	testing:function(){
		this.displayText();
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
