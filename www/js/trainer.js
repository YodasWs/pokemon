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

pokemon.player = new pokemon.Player('Sam');
pokemon.player.level = 1;
pokemon.player.pokemon.push(
//	new pokemon.Pokemon(1, 9),
//	new pokemon.Pokemon(2, 9),
//	new pokemon.Pokemon(3, 9),
//	new pokemon.Pokemon(4, 10),
//	new pokemon.Pokemon(5, 20),
//	new pokemon.Pokemon(6, 30),
//	new pokemon.Pokemon(7, 10),
//	new pokemon.Pokemon(8, 10),
//	new pokemon.Pokemon(9, 10),
//	new pokemon.Pokemon(10, 8),
//	new pokemon.Pokemon(11, 8),
//	new pokemon.Pokemon(12, 8),
//	new pokemon.Pokemon(13, 8),
//	new pokemon.Pokemon(14, 8),
//	new pokemon.Pokemon(15, 8),
//	new pokemon.Pokemon(16, 8),
//	new pokemon.Pokemon(17, 8),
//	new pokemon.Pokemon(18, 8),
//	new pokemon.Pokemon(19, 8),
//	new pokemon.Pokemon(20, 8),
//	new pokemon.Pokemon(21, 8),
//	new pokemon.Pokemon(22, 8),
//	new pokemon.Pokemon(23, 8),
//	new pokemon.Pokemon(24, 8),
	new pokemon.Pokemon(25, 8),
	new pokemon.Pokemon(26, 8),
	new pokemon.Pokemon(27, 8),
	new pokemon.Pokemon(28, 8),
	new pokemon.Pokemon(29, 8),
	new pokemon.Pokemon(30, 10)
)
console.log(pokemon.player.pokemon)
