console.log('We are looking in bootState');

var bootState = {
	init:function(){
		highScore = highScore;
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;


	},

	preload:function(){
		this.game.load.image('BG', 'images/BG.png');
		this.game.load.image('start', 'images/start.png');
		this.game.load.image('highScore', 'images/highScore.png');
		this.game.load.image('options', 'images/options.png');
		console.log('we are in create');
	},

	create:function(){
	
		this.game.add.image(0, 0, 'BG');
		this.startButton = this.game.add.sprite(320, 10, 'start');
		this.startButton.inputEnabled = true;
		this.startButton.events.onInputDown.add(this.startGame, this);
		
		
		this.highScoreLayout = this.game.add.image(10, 380, 'highScore');
		this.optionsButton = this.game.add.sprite(650, 380, 'options');
		this.optionsButton.inputEnabled = true;
		this.optionsButton.events.onInputDown.add(this.options, this);
		//this.startButton = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Click here to beign', {font: "144px Arial", fill:"#fff"});
		//this.startButton.anchor.setTo(0.5);
		//this.startButton.inputEnabled = true;

		//this.startButton.events.onInputDown.add(this.startGame, this);
		console.log('We started the bootState');
		this.game.stage.backgroundColor	= '#fff';
		console.log('BootState was updated');
		this.highScoreDisplay = this.game.add.text(0,0 , highScore, {font: "144px Arial", fill:"#fff"});
		this.highScoreDisplay.alignIn(this.highScoreLayout, Phaser.BOTTOM_CENTER, 0, -20,)
		this.highScoreText = this.game.add.text(0, 0, 'High Score:'
		//this.state.start('gameState');
		//TODO you still need a main.js that adds the state
	},
	startGame:function(){
		this.state.start('gameState', true, false, highScore);	
	
	},
	options:function(){
		console.log('click');	
	}
};
