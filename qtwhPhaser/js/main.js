var game = new Phaser.Game(1280, 720, Phaser.AUTO);
game.state.add("mainState", mainState);
game.state.add("optionState", optionState);
game.state.add("timerState", timerState);
game.state.start("optionState", true, false);
