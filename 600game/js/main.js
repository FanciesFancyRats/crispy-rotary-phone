

var GameState = {

	preload:function() {
		this.game.load.image('hold','images/placeholder.jpg');
},

	create:function() {
		this.game.add.image(0,0,'hold');
		console.log('create');
},

	update:function() {

},

}
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
