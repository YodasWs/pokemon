pokemon.Pokemon = function(intSpecies, intLevel, trainer) {
	// Declare Variables
	var nature = {
		deStat: 0,
		inStat: 0
	}, i, version,
		versionsTried = [],
		self = this,
		max = 2,
		hp = 0
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
		get: () => { return intLevel },
		enumerable: true
	})
	Object.defineProperty(this, 'trainer', {
		value: trainer || 'foe',
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
	this.ivs = {}
	pokemon.data.statKeys.forEach((stat) => {
		self.ivs[stat] = Math.randInt(31)
	})
	this.evs = {}
	pokemon.data.statKeys.forEach((stat) => {
		self.evs[stat] = 0
	})
	// Set Pokémon Stats
	var stats = {}
	pokemon.data.statKeys.forEach((i) => {
		var stat = i
		Object.defineProperty(stats, stat, {
			enumerable: true,
			get: () => {
				return Math.floor(Math.floor(2 * self.baseStats[stat] + self.ivs[stat] + Math.floor(self.evs[stat] / 4)) * self.lvl / 100 + 5)
			}
		})
	})
	Object.defineProperty(this, 'stats', {
		enumerable: true,
		value: stats
	})
	Object.defineProperty(this, 'maxhp', {
		get: () => {
			return Math.floor(Math.floor(2 * self.baseStats.hp + self.ivs.hp + Math.floor(self.evs.hp / 4) + 100) * self.lvl / 100 + 10);
		},
		enumerable: true
	})
	hp = new Number(this.maxhp)
	Object.defineProperty(this, 'hp', {
		enumerable: true,
		get: () => { return hp },
		set: (i) => {
			hp = Math.max(0, i)
			if (self.html) {
				self.html.find('progress.hp').attr('value', hp)
			}
			if (!hp) {
				// TODO: Fainted!
			}
		}
	})
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
