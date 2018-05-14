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
		
		var textBox = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'textBox');

		var loremText = this.game.add.text(0, 0, loremRawText, style);
		var display = this.game.make.text(0, 0, '', style);

		loremText.wordWrap = true;
		
		loremText.wordWrapWidth = textBox.width;
		textBox.inputEnabled = true;
		console.log(loremText.height);
		
		this.displayScript(textBox, loremTextArray, 0, style, '', display)
		//console.log('textBox.width: ', textBox.width);
//		this.startText(0, textBox.width, textBox.height, textBox.x, textBox.y, loremTextArray, style);
		//this.displayScript(textBox, textBox.x, textBox.y, loremTextArray, 0, style);
	},
	/*
	cont:function(){
		//console.log('Click');	
	},
	startText:function(place, width, height, x, y, textArray, style){
		displayString = this.game.add.text(x, y, '', style);
		nextString = this.game.make.text(x, y, '', style);
		//console.log('width: ', width, 'displayString.width: ', displayString.width);
		line = '';
		nextLine = '';
		i = place;
		while(nextString.width < width){
			displayString = this.game.add.text(x, y, line, style);
			nextString = this.game.make.text(x, y, nextLine, style);

			if (nextString.width < width){
				//console.log('Adding a word');
				line = line + textArray[i]+' ';
				nextLine = line + textArray[i+1];
				i++;
			}
	
			
				//TODO This should call to a string variable that will concatinate the next string then make that string and test if it too large, I wonder if I can make a theoretical object without actually creating it to see if I can test that before actually commiting to this.game.add.text
		}
		if(i < textArray.length){
			console.log(displayString.height*1.5 + y, y + height);
			if(displayString.height*1.5 + y < y + height){
			this.startText(i, width, height, x, (y+displayString.height*1.5), textArray, style);
			}
		}

	},
	displayScript:function(textBox, xDisplay, yDisplay, scriptArray, scriptLocation, style){
		this.displayString = this.game.add.text(xDisplay, yDisplay, '', style);
		nextString = this.game.make.text(xDisplay, yDisplay, '', style);
		line = '';
		nextLine = '';
		i = scriptLocation;

		while(nextString.width < textBox.width){
			this.displayString.kill();
			this.displayString = this.game.add.text(xDisplay, yDisplay, line, style);
			nextString = this.game.make.text(xDisplay, yDisplay, nextLine, style);

			if (nextString.width < textBox.width){
				line = line + scriptArray[i]+' ';	
				nextLine = line + scriptArray[i+1];
				i++;
			}
		}
		//TODO this isn't working, look up method chaining tommorw and see if you can get a clearer picture I think it's just a matter of getting the syntax right
		//among other things.
		console.log('deciding wether or not to recurse');
		if (i < scriptArray.length){
			console.log('string height * 2 + y: ', this.displayString.height*2 + yDisplay, 'textBox.y + textBox.height', textBox.y + textBox.height);
			
			if(this.displayString.height*2 + yDisplay < textBox.y + textBox.height){
				
				console.log('Recursing', this.displayString.height);
				this.displayScript(textBox, xDisplay, this.displayString.height*2 + yDisplay, scriptArray, i, style);
			}	
			else{
			console.log("Need to click to continue");	
			textBox.inputEnabled = true;
			textBox.events.onInputDown.add(this.continueScript, this);
			}
		}
	
	},

	continueScript:function(sprite, scriptLocation, displayString){
		console.log('Click');
		this.displayString.kill();
	},
	*/
	displayScript:function(textBox, scriptArray, postion, style, string, display){
		display.kill();
		display = this.game.make.text(textBox.x, textBox.y, string, style);
		var nextString = string + scriptArray[postion] + " ";
		var nextDisplay = this.game.make.text(textBox.x, textBox.y, nextString, style);
		display.wordWrap = true;
		display.wordWrapWidth = textBox.width;
		nextDisplay.wordWrap = true;
		nextDisplay.wordWrapWidth = textBox.width;
		if(nextDisplay.height > textBox.height){
			display = this.game.add.text(textBox.x, textBox.y, string, style);
			display.wordWrap = true;
			display.wordWrapWidth = textBox.width;
			console.log('need to wait for input');
			textBox.inputEnabled = true;
			textBox.events.onInputDown.add(this.nextLine, this);
		}
		else{
			postion++;
			string = nextString;
			display = nextDisplay;
			this.displayScript(textBox, scriptArray, postion, style, string, display);
		}

	},
	nextLine:function(sprite, event){
		//Might have to just make scriptArray, position, style, and display global, since I can't figure that out right now?
		console.log('click');		
		console.log(sprite.x);
		this.displayScript(sprite, scriptArray, postion, style, string, display);

	}


}
