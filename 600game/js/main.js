var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add("buttonState", buttonState);
game.state.add("gameState", gameState);
game.state.add("bootState", bootState);
highScore = 0;
game.state.start("bootState", true, false, highScore);
