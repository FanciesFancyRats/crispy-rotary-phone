console.log('Good luck');

var buttonState = {
	preload:function(){
		this.game.load.image('button', 'images/blankButton.png');
		this.game.load.image('buttonDown', 'images/blankButtonDown.png');
		this.game.load.audio('click', 'sounds/click4.mp3');
	},

	create:function(){

		this.click = this.game.add.audio('click');

		game.stage.backgroundColor = '#000000';

		this.clickCount = 0;

		this.title = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, 'ENJOY!',{fill:'#ffffff', font:'100px Arial'});
		this.title.anchor.setTo(0.5);
		
		
		this.clickDisplay = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, this.clickCount, {fill:'#ffffff', font:'100px Arial'});
		this.clickDisplay.anchor.setTo(0.5);

		this.onlyButton = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'button');
		this.onlyButton.inputEnabled = true;
		this.onlyButton.anchor.setTo(0.5);
		this.onlyButton.events.onInputDown.add(this.count, this);
		this.onlyButton.events.onInputUp.add(this.release, this);
		
		
	},
	update:function(){
	
	},
	count:function(){
		
		this.clickCount++;

		this.clickDisplay.kill();
		this.clickDisplay = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, this.clickCount, {fill:'#ffffff', font:'100px Arial'});
		this.onlyButton.loadTexture('buttonDown', 0);

		this.clickDisplay.anchor.setTo(0.5);
		this.click.play();

		console.log('click');	
		
	},
	release:function(){
		console.log('release');	
		this.onlyButton.loadTexture('button', 0);
	}
};
