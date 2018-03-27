

var GameState = {

	preload:function() {
		this.game.load.image('placeholder','images/placeholder.jpg');
	},

	create:function() {
		this.place = this.game.add.image(0,0,'placeholder');
		this.place.inputEnabled = true;
		this.place.customParams = 0;
		var x = 10;
		this.place.events.onInputDown.add(this.functionA, this);
		
		console.log('create');
	},

	update:function() {
		console.log(this.place.customParams);
		debugger;
	},

	functionA:function(x) {
		x += 10;
		console.log(x);
		return(x);
			
	},

}
var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState', GameState);
game.state.start('GameState');
