pokemon.Pokemon = function(intSpecies, intLevel) {
	// Declare Variables
	var nature = {
		deStat: 0,
		inStat: 0
	}, i, prop, version,
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
		prop = pokemon.data.pokemon[intSpecies][i]
		if (typeof prop === 'object') this[i] = Object.create(prop)
		else this[i] = prop
	}
	// Set Common Values
	this.name = this.species
	Object.defineProperty(this, 'number', {
		get: function() { return intSpecies },
		enumerable: true
	})
	Object.defineProperty(this, 'lvl', {
		// TODO: Need to calculate this based upon experience points
		get: function() { return intLevel },
		enumerable: true
	})
	Object.defineProperty(this, 'maxhp', {
		get: function() {
			return Math.floor(Math.floor(2 * this.baseStats.hp + this.ivs.hp + Math.floor(this.evs.hp / 4) + 100) * this.lvl / 100 + 10);
		},
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
		get: function() { return nature },
		enumerable: true
	})
	this.evs = {hp: 0, atk: 0, def: 0, spatk: 0, spdef: 0, spd: 0};
	this.ivs = {};
	pokemon.data.statKeys.forEach(function(stat) {
		self.ivs[stat] = Math.randInt(31)
	})
	// Give Pokémon Moves
	switch (pokemon.player.generation) {
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
//	do {
//		do {
			version = Math.randInt(1, max)
			if (version > 11) version += 2
version = 1
//		} while (versionsTried.indexOf(version) >= 0 && versionsTried.length < 14)
//		versionsTried.push(version)
//		if (versionsTried.length >= 14) version = 0
		this.moves = pokemon.data.moves.getByPkmn(this, version)
		this.moves.sort(function(a, b){
			return b.level - a.level
		})
		this.moves = this.moves.slice(0,4)
//	} while (!this.moves.length)
	Object.defineProperty(this, 'version', {
		get: function() { return version },
		enumerable: true
	})
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
