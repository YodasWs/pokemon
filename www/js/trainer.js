pokemon.Trainer = function(name){
	Object.defineProperty(this, 'name', {
		get: function() { return name },
		enumerable: true
	})
	this.pokemon = new pokemon.PokemonList()
}

pokemon.Pokemon = function(intSpecies, intLevel){
	// Verify Species Number
	if (!Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Not a valid Pokémon number!")
	}
	// Verify Valid Level
	if (!Number.isInteger(intLevel) || intLevel <= 1) {
		throw TypeError("Not a valid Pokémon Level!")
	}
	// TODO: Look up Pokémon in Pokedex
}

pokemon.PokemonList = function(){
}
pokemon.PokemonList.prototype = Object.create(Array.prototype)
pokemon.PokemonList.prototype.indexOf = function(name) {
	for (var i=0; i<this.length; i++) {
		if (this[i].name == name) return i
	}
	return false
}
pokemon.PokemonList.prototype.push = function(p) {
	if (typeof p === 'object' && p.constructor === pokemon.Pokemon) {
		this[this.length] = p
	} else if (typeof p === 'string') {
		// TODO: Look up Pokémon in Pokedex by name
	} else if (typeof p === 'number' && Number.isInteger(p)) {
		// TODO: Look up Pokémon in Pokedex by number
	} else {
		throw TypeError("Can only add Pokémon to PokemonList!")
	}
}

pokemon.player = new pokemon.Trainer('Sam');
console.log(pokemon.player.name)
