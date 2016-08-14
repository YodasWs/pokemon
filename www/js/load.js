// Functions to Preload Game Resources and Start Game
pokémon.Boot = function(){};
pokémon.Load = function(){};
pokémon.Boot.prototype.preload = function() {
	// TODO: Load Splash Screen Images
};
pokémon.Boot.prototype.create = function() {
	this.game.stage.backgroundColor = '#ffffff';
	// TODO: Display Splash Screen
	// TODO: Set Game Settings
	this.state.start('Load');
};
pokémon.Load.prototype.preload = function() {
	// TODO: Load Game Images
	// Load Terrain Images
//	pokémon.phaser.load.image('tile', '/img/tile.png');
};
pokémon.Load.prototype.create = function() {
	pokémon.phaser.state.start('MainMenu');
};
