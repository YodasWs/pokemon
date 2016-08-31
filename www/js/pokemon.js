pokemon.Pokemon = function(intSpecies, intLevel){
	// Verify Species Number
	if (!Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Not a valid Pokémon number!")
	}
	// Verify Valid Level
	if (!Number.isInteger(intLevel) || intLevel <= 1) {
		throw TypeError("Not a valid Pokémon Level!")
	}
	var i, prop
	// TODO: Look up Pokémon in Pokedex
	for (i in pokemon.data.pokemon[intSpecies]) {
		prop = pokemon.data.pokemon[intSpecies][i]
		if (typeof prop === 'object') this[i] = Object.create(prop)
		else this[i] = prop
	}
	this.name = this.species
	Object.defineProperty(this, 'lvl', {
		get: function() { return intLevel },
		enumerable: true
	})
	Object.defineProperty(this, 'number', {
		get: function() { return intSpecies },
		enumerable: true
	})
}

pokemon.PokemonList = function(){
	this.length = 0
}
pokemon.PokemonList.prototype = Object.create(Array.prototype)
pokemon.PokemonList.prototype.constructor = pokemon.PokemonList
pokemon.PokemonList.prototype.indexOf = function(name) {
	for (var i=0; i<this.length; i++) {
		if (this[i].name == name) return i
	}
	return false
}
pokemon.PokemonList.prototype.push = function() {
	for (var i=0; i<arguments.length; i++) {
		if (this.length >= 6) break
		if (typeof arguments[i] === 'object' && arguments[i].constructor === pokemon.Pokemon) {
			this[this.length] = arguments[i]
			this.length++
		} else if (typeof arguments[i] === 'string') {
			// TODO: Look up Pokémon in Pokedex by name
		} else if (typeof arguments[i] === 'number' && Number.isInteger(arguments[i])) {
			// TODO: Look up Pokémon in Pokedex by number
		}
	}
	// Return the number of Pokémon added!
	return i
}
