pokemon.Pokemon = function(intSpecies, intLevel) {
	// Declare Variables
	var nature = {
		deStat: 0,
		inStat: 0
	}, i, version,
		versionsTried = [],
		self = this,
		max = 2
	// Verify Species Number
	if (!Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Not a valid Pokémon number!")
	}
	if (!pokemon.data.pokemon[intSpecies]) {
		throw TypeError("Not a valid Pokémon number!")
	}
	// Verify Valid Level
	if (!Number.isInteger(intLevel) || intLevel <= 1) {
		throw TypeError("Not a valid Pokémon Level!")
	}
	// Copy Pokémon from Pokédex
	for (i in pokemon.data.pokemon[intSpecies]) {
		Object.defineProperty(this, i, {
			value: pokemon.data.pokemon[intSpecies][i],
			enumerable: true
		})
	}
	// Set Common Values
	this.name = this.species
	Object.defineProperty(this, 'number', {
		value: intSpecies,
		enumerable: true
	})
	Object.defineProperty(this, 'lvl', {
		// TODO: Need to calculate this based upon experience points
		get: function() { return intLevel },
		enumerable: true
	})
	// Personalize Pokémon
	for (i in nature) {
		switch (Math.randInt()) {
		case 0:
			nature[i] = 'atk'
			break;
		case 1:
			nature[i] = 'def'
			break;
		case 2:
			nature[i] = 'spatk'
			break;
		case 3:
			nature[i] = 'spdef'
			break;
		case 4:
			nature[i] = 'spd'
			break;
		}
	}
	Object.defineProperty(this, 'nature', {
		enumerable: true,
		value: nature
	})
	this.evs = {hp: 0, atk: 0, def: 0, spatk: 0, spdef: 0, spd: 0};
	this.ivs = {};
	pokemon.data.statKeys.forEach(function(stat) {
		self.ivs[stat] = Math.randInt(31)
	})
	Object.defineProperty(this, 'maxhp', {
		get: function() {
			return Math.floor(Math.floor(2 * self.baseStats.hp + self.ivs.hp + Math.floor(self.evs.hp / 4) + 100) * self.lvl / 100 + 10);
		},
		enumerable: true
	})
	this.hp = this.maxhp
	// Set Pokémon Version
	switch (pokemon.player.generation) {
	case 1:
		max = 2
		break;
	case 2:
		max = 4
		break;
	case 3:
		max = 7
		break;
	case 4:
		max = 10
		break;
	case 5:
		max = 12
		break;
	case 6:
		max = 14
		break;
	}
max=2
	version = Math.randInt(pokemon.data.generations.pokemonFirstSeenIn(this.number), max)
	if (version > 11) version += 2
	Object.defineProperty(this, 'version', {
		enumerable: true,
		value: version
	})
	// Give Pokémon Moves
	this.moves = new pokemon.PokemonMoveset(this)
console.log(this.number + ' moves:', this.moves)
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
			// TODO: Look up Pokémon in Pokédex by name
		} else if (typeof arguments[i] === 'number' && Number.isInteger(arguments[i])) {
			// TODO: Look up Pokémon in Pokédex by number
		}
	}
	// Return the number of Pokémon added!
	return i
}
