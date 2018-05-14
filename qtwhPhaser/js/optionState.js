//Start of "game", make list, set variables, load date hopefully
var optionState = {
	init:function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	},
	preload:function(){
		this.game.load.image("BG", "images/bg.png");	
	},
	create:function(){
		var style = {font:'60px Arial', fill:'#000'}
		this.game.add.image(0, 0, 'BG');
		this.startText = this.game.add.text(100,100, 'start', style);
		this.startText.anchor.setTo(0.5);
		this.startText.inputEnabled = true;
		this.startText.events.onInputDown.add(this.switchToMainState, this);
		this.startText.events.onInputOver.add(this.hoverText, this);
		this.startText.events.onInputOut.add(this.unHoverText, this);
		this.saveText = this.game.add.text(20, 200, 'save', style);
		this.loadText = this.game.add.text(20, 300, 'load', style);
		this.optionsText = this.game.add.text(20, 400, 'options', style);
	},
	update:function(){
	
	},
	switchToMainState:function(){
		this.state.start('mainState', true, false);	
	},
	hoverText:function(text, event){
		text.stroke = '#1b0088';
		text.strokeThickness = 6;
	},
	unHoverText:function(text, event){
		text.strokeThickness = 0;	
	}

}
