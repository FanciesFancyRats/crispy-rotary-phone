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
		this.game.load.image('start', 'images/highScore.png');
		this.game.load.image('highScore', 'images/highScore.png');
		this.game.load.image('options', 'images/highScore.png');
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
		this.startText = this.game.add.text(0, 0, 'Start', {font: "144px Arial", fill:"#fff"});
		this.startText.alignIn(this.startButton, Phaser.CENTER, 0, 0,)
		this.startText.stroke = '#1b0088';
		this.startText.strokeThickness = 10;
		
		this.aboutText = this.game.add.text(0, 0, 'About', {font: "144px Arial", fill:"#fff"});
		this.aboutText.alignIn(this.optionsButton, Phaser.CENTER, 0, 0,)
		this.aboutText.stroke = '#1b0088';
		this.aboutText.strokeThickness = 10;



		this.highScoreDisplay = this.game.add.text(0,0 , highScore, {font: "144px Arial", fill:"#fff"});
		this.highScoreDisplay.alignIn(this.highScoreLayout, Phaser.BOTTOM_CENTER, 0, -20,)
		this.highScoreDisplay.stroke = '#1b0088';
		this.highScoreDisplay.strokeThickness = 10;
		this.highScoreText = this.game.add.text(0, 0, 'High Score:', {font: "100px Arial", fill:"#fff"});
		this.highScoreText.alignIn(this.highScoreLayout, Phaser.TOP_CENTER, 0, -20);
		this.highScoreText.stroke = '#1b0088';
		this.highScoreText.strokeThickness = 10;


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
