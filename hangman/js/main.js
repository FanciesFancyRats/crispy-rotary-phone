

var GameState = {

	preload:function() {
		this.game.load.image('sun','images/sun.png');
		this.game.load.text('words','words/words.txt');
},

	create:function() {
		x = Math.floor(Math.random()*83667);
		var text = game.cache.getText('words');	
		console.log(text[3]);
		var words = text.split(' ');
		console.log(words[x]);
		this.secretWord = words[x]
		this.sun= this.game.add.sprite(0,0,'sun');
		this.sun.inputEnabled = true;
		this.sun.events.onInputDown.add(this.testing, this);
		this.secretCharacters = this.secretWord.split('');
		
		console.log('create');

		game.input.keyboard.addCallbacks(this, null, null, this.keyPress);
},

	update:function() {

},
	keyPress:function(char) {
		var misses = 0;
		
		console.log(this.secretCharacters[1]);

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
		console.log('click');	
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
