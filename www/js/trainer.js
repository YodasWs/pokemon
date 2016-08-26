pokemon.Trainer = function(pokemonList){
	this.pokemon = null
	if (typeof pokemonList === 'undefined' || pokemonList === null) {
		this.pokemon = new pokemon.PokemonList()
	} else if (typeof pokemonList === 'object' && pokemonList.constructor !== pokemon.PokemonList) {
		this.pokemon = new pokemon.PokemonList()
		if (pokemonList.constructor === Array) {
			pokemonList.forEach(function(i){
				this.pokemon.push(i)
			})
		}
	} else if (pokemonList.constructor === pokemon.PokemonList) {
		this.pokemon = pokemonList
	}
}
pokemon.Player = function(name, pokemonList){
	pokemon.Trainer.call(this, pokemonList)
	Object.defineProperty(this, 'name', {
		get: function() { return name },
		enumerable: true
	})
	Object.defineProperty(this, 'generation', {
		get: function() { return 5 },
		enumerable: true
	})
}
pokemon.Player.prototype = Object.create(pokemon.Trainer.prototype)
pokemon.Player.prototype.constructor = pokemon.Player

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
		} else if (typeof arguments[i] === 'string') {
			// TODO: Look up Pokémon in Pokedex by name
		} else if (typeof arguments[i] === 'number' && Number.isInteger(arguments[i])) {
			// TODO: Look up Pokémon in Pokedex by number
		}
	}
	// Return the number of Pokémon added!
	return i
}

pokemon.player = new pokemon.Player('Sam');
pokemon.player.level = 1;
console.log(pokemon.player.name)
