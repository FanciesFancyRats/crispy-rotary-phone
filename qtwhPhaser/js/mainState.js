//Begining of loop here...
var mainState = {
	preload:function(){
		this.game.load.text('lorem', 'text/lorem.txt');	
	},
	create:function(){
		var style = {font:"15px Arial", fill:"#19de65" }
		var loremRawText = game.cache.getText('lorem');
		var loremText = this.game.add.text(0, 0, loremRawText, style);
	},
}
