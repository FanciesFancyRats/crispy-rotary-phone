

var GameState = {

	preload:function() {
		this.game.load.image('hold','images/placeholder.jpg');
		this.game.load.text('words', 'words/words.txt');
},

	create:function() {
		this.game.add.image(0,0,'hold');
		var rawText = game.cache.getText('words');
		this.dictionary = rawText.split('\n');
		var myword = 'AAH';
		this.checkWord(myword);

},

	update:function() {
		

},
	checkWord:function(guess){
		for(i = 0; i < 7; i++){
			console.log(this.dictionary[i])
			if(guess === this.dictionary[i]){
				console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');	
			}
		}
		console.log(this.dictionary.includes(guess));
},
	


}
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
