console.log('We are looking in bootState');

var bootState = {
	init:function(){
		if(highScore){
		highScore = highScore;
		}
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

	},

	preload:function(){
		this.game.load.image('BG', 'images/BG.png');
		console.log('we are in create');
	},

	create:function(){
		this.game.add.image(0, 0, 'BG');
		this.startButton = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Click here to beign', {font: "144px Arial", fill:"#fff"});
		this.startButton.anchor.setTo(0.5);
		this.startButton.inputEnabled = true;

		this.startButton.events.onInputDown.add(this.startGame, this);
		console.log('We started the bootState');
		this.game.stage.backgroundColor	= '#fff';
		if(highScore){
			this.highScoreDisplay = this.game.add.text(this.game.world.centerX + 144, this.game.world.centerY, highScore);
		}
		//this.state.start('gameState');
		//TODO you still need a main.js that adds the state
	},
	startGame:function(){
		this.state.start('gameState');	
	}
};
