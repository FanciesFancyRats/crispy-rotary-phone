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
		this.game.load.image('hold', 'images/placeholder.jpg');
		this.game.load.image('start', 'images/highScore.png');
		this.game.load.image('highScore', 'images/highScore.png');
		this.game.load.image('highScoreHover', 'images/highScoreHover.png');
		this.game.load.image('options', 'images/highScore.png');
		this.game.load.image('optionsHover', 'images/highScoreHover.png');
		this.game.load.image('overlay', 'images/overlay.png');
		console.log('we are in create');
	},

	create:function(){

	
		this.game.add.image(0, 0, 'BG');
		
		this.secretCount = 0;	

		this.secretCountDebug = this.game.add.text(0, 0, '', {font: "", fill:"#fff"});

		
		this.startButton = this.game.add.sprite(320, 10, 'start');
		this.startButton.inputEnabled = true;
		this.startButton.events.onInputDown.add(this.startGame, this);
		this.startButton.events.onInputOver.add(this.highlightStart, this);
		this.startButton.events.onInputOut.add(this.unhighlightStart,this);


		//this.secret = this.game.add.sprite(0,0,'hold');
		//this.secret.inputEnabled = true;
		//this.secret.efents.onInputDown.add(this.startSecret, this);
		
		
		this.highScoreLayout = this.game.add.image(10, 380, 'highScore');
		this.optionsButton = this.game.add.sprite(650, 380, 'options');
		this.optionsButton.inputEnabled = true;
		this.optionsButton.events.onInputDown.add(this.options, this);
		this.optionsButton.events.onInputOver.add(this.highlightOptions, this);
		this.optionsButton.events.onInputOut.add(this.unhighlightOptions, this);
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
		this.secretCount++;
		this.secretCountDebug.kill();
		if((this.secretCount > 12)&&(this.secretCount < 90)){
		this.secretCountDebug = this.game.add.text(1100, 0, this.secretCount, {font: "144px Arial", fill:"#fff"});
		}
		if(this.secretCount > 104){
		this.secretCountDebug = this.game.add.text(1050, 0, this.secretCount, {font: "144px Arial", fill:"#fff"});
		}

		console.log('click');
		
		this.startButton.inputEnabled = false; 
		this.optionsButton.inputEnabled = false;

		if((this.secretCount % 5)!=0){
			this.overlay = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'overlay');
			this.overlay.anchor.setTo(0.5);
			
			this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Sound provided by:\n\n"Interface Sounds Starter Pack" by p0ss \nlicensed CC-BY 3.0, GPL 2.0, GPL 3.0:\n https://opengameart.org/content/interface-sounds-starter-pack\n\n"JRPG Style UI Sounds" by KillaMaaki\nlicensed CC-BY 3.0: \nhttps://opengameart.org/content/jrpg-style-ui-sounds\n\n"UI Sound Effects Library" by Little Robot Sound Factory \nlicensed CC-BY 3.0: \nwww.littlerobotsoundfactory.com\n\n"Glass ding" by Counter-gamer \n licensed CC0 1.0: \nhttps://freesound.org/people/Counter-gamer/sounds/404104/', {font:"22px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);

			this.overlay.inputEnabled = true;
			this.overlay.events.onInputDown.add(this.creditsCont, this);
		}
		else{


			this.overlay = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'overlay');
			this.overlay.anchor.setTo(0.5);
				
			this.secretStory();

			this.continueText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'continue', {font:'40px Arial', fill:'#fff'});
			this.continueText.anchor.setTo(0.5);
			this.continueText.inputEnabled = true;
			this.continueText.events.onInputDown.add(this.closeAboutCont, this);
			this.continueText.events.onInputOver.add(this.highlightContinue, this);
			this.continueText.events.onInputOut.add(this.unhighlightContinue, this);
		}

		
	},
	startSecret:function(){

		this.state.start('buttonState', true, false);	
	},
	closeAbout:function(){
		this.credits.kill();
		this.overlay.kill();	
		this.startButton.inputEnabled = true; 
		this.optionsButton.inputEnabled = true;

		
	},
	closeAboutCont:function(){
		this.credits.kill();
		this.continueText.kill();
		this.overlay.kill();	
		this.startButton.inputEnabled = true; 
		this.optionsButton.inputEnabled = true;

		
	},
	creditsCont:function(){
			this.credits.kill();
			this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Made with Phaser v2.6.2\nlicensed: MIT license: \n http://phaser.io\n\nBase on "6.0001 Word Game"\nCreated by: Kevin Luu <luuk> and Jenna Wiens <jwiens>\nhttps://ocw.mit.edu/courses/electrical-engineering-and-computer-science/\n6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016\n\nEverything else\nWould inevitably occur with an infinte number of rats\nambling on an infinite number of computers\nhttps://github.com/FanciesFancyRats', {font:"22px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);

			this.overlay.inputEnabled = true;
			this.overlay.events.onInputDown.add(this.closeAbout, this);

	},
	secretStory:function(){
		if(this.secretCount === 5){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Click', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}	
		if(this.secretCount === 10){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Click...\nClick...', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}
		if(this.secretCount === 15){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Okay I get it.', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}
		if(this.secretCount === 20){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You really like clicking...', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}

		if(this.secretCount === 25){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'that', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}

		if(this.secretCount === 30){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'button', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}

		if(this.secretCount === 35){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You know,\n there is an actual game for you to play,\n if you just pressed the other button', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);


		}
		if(this.secretCount === 40){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'It would mean a lot to me if you played that,\nI worked really hard on it', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 45){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Unlinke this,\n which is the credits\nIf you didn't notice", {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 50){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Are you really this bored?', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 55){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You know what would help that?\nHitting the start button and\n playing the game I acutally made', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 60){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '...', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 65){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'maybe', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 70){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'stop', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 75){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'clicking', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}

		if(this.secretCount === 80){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'that', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 85){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'BUTTON', {font:"300px Arial", fill:"#000"});
				this.credits.rotation = 0.19;
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 90){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Okay I'm just going to stop counting now", {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 95){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '...', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 100){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '...', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 105){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'seriuosly?', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 110){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Congratulations you made it to 110', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 115){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You won a prize for your tenacity\nCan you guess what it is?', {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 120){
				this.credits = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "I'm going to give you exactly what you want.\nA whole new game!", {font:"30px Arial", fill:"#fff"});
			this.credits.anchor.setTo(0.5);
		}
		if(this.secretCount === 125){
			this.state.start('buttonState');
		}
		






	},
	highlightContinue:function(){
		this.continueText.stroke = '#000000';
		this.continueText.strokeThickness = 8;
	},
	unhighlightContinue:function(){
		this.continueText.strokeThickness = 0;	
	},
	highlightOptions:function(){
		this.optionsButton.loadTexture('optionsHover',0);	
	},
	unhighlightOptions:function(){
		this.optionsButton.loadTexture('options',0);
	},
	highlightStart:function(){
		this.startButton.loadTexture('optionsHover',0);	
	},
	unhighlightStart:function(){
		this.startButton.loadTexture('options',0);
	}
};
////

