//Begining of loop here...
var mainState = {
	preload:function(){
		this.game.load.text('lorem', 'text/lorem.txt');	
		this.game.load.image('textBox', 'images/textBox.png');
	},
	create:function(){
		var style = {font:"15px Arial", fill:"#19de65" }
		var loremRawText = game.cache.getText('lorem');
		
		var loremTextArray = loremRawText.split(' ');

		var loremText = this.game.add.text(0, 0, loremRawText, style);

		loremText.wordWrap = true;
		var textBox = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'textBox');

		loremText.wordWrapWidth = textBox.width;
		textBox.inputEnabled = true;
		textBox.events.onInputDown.add(this.cont, this);
		startText(0, textBox.length, textBox.x, textBox.y);
	},
	cont:function(){
		console.log('Click');	
	},
	startText:function(place, length, x, y){
		displayString = this.game.add.text(x, y, '', style);
		textSum = 0;
		i = 0;
		while(textSum < length){
			displayString = this.game.add.text(x, y, 
				//TODO This should call to a string variable that will concatinate the next string then make that string and test if it too large, I wonder if I can make a theoretical object without actually creating it to see if I can test that before actually commiting to this.game.add.text
		}
	}
}
