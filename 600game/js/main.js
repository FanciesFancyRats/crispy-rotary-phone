

var GameState = {

	preload:function() {
		this.game.load.image('hold','images/placeholder.jpg');
		this.game.load.text('words', 'words/words.txt');
},

	create:function() {
		this.cons = 'BCDFGHJKLMNPQRSTVWXYZ';
		this.cons = this.cons.split('');
		this.vowl = 'AEIOU';
		this.vowl = this.vowl.split('');
		this.game.add.image(0,0,'hold');
		var rawText = game.cache.getText('words');
		this.dictionary = rawText.split('\n');
		var myword = 'AAH';
		console.log(this.checkWord(myword));
		this.dealHand(32);

},

	update:function() {
		

},
	checkWord:function(guess){
		//Takes the word [guess] and returns true or false wether or not it is in this.dictionary
		return(this.dictionary.includes(guess));
},
	dealHand:function(handSize){
		//Generates a hand based on handSize
			
	}
	


}
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
