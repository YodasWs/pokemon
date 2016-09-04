Zepto.fn.delayShow = function(classname) {
	this.show()
	setTimeout(function(self) {
		self.addClass(classname)
	}, 10, this)
	return this
}
pokemon.data = pokemon.data || {}
pokemon.data.getPokemonImageClass = function(intSpecies){
	if (!intSpecies || !Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Need a positive integer in pokemon.data.getPokemonImageClass")
	}
	switch (pokemon.player.generation) {
	case 1:
		if (intSpecies <= 151) {
		}
	case 6:
		if (intSpecies <= 721) {
			return 'oras';
		}
	}
}
Math.randInt = function(min, max) {
	if (!arguments || arguments.length === 0)
		return Math.floor(Math.random() * 10)
	else if (arguments.length === 1)
		return Math.floor(Math.random() * arguments[0])
	else if (arguments.length >= 2)
		return Math.floor(Math.random() * (arguments[1] - arguments[0]) + arguments[0])
}
pokemon.data.statKeys = [ 'hp', 'atk', 'def', 'spatk', 'spdef', 'spd' ];
