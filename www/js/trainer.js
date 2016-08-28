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
		get: function() { return 6 },
		enumerable: true
	})
}
pokemon.Player.prototype = Object.create(pokemon.Trainer.prototype)
pokemon.Player.prototype.constructor = pokemon.Player
