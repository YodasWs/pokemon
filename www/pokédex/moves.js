pokemon.PokemonMoveset = function(pkmn) {
	this.length = 0
	Object.defineProperty(this, 'pokemon', {
		get: function() { return pkmn },
		enumerable: true
	})
	var all_pkmn_moves = pokemon.storage.get('pkmn_moves_v' + pkmn.version),
		pkmn_moves = [], self = this
	// Collect Moves for Pokémon
	all_pkmn_moves.forEach(function(pm){
		if (pkmn.number != pm['pokemon_id']) return
		pkmn_moves.push(pm)
	})
	Object.defineProperty(this, 'all_pkmn_moves', {
		get: function() { return pkmn_moves },
		enumerable: true
	})
	// Initialize Pokémon with 4 Moves
	pkmn_moves.sort(function(a, b){
		return b.level - a.level
	})
	pkmn_moves.forEach(function(pm) {
		if (pm.pokemon_move_method_id != 1) return // 1 == Learned Naturally
		if (pkmn.lvl >= pm.level) self.push(pm.move_id)
		if (self.length >= 4) return false
	})
}
pokemon.PokemonMoveset.prototype = Object.create(Array.prototype)
pokemon.PokemonMoveset.prototype.constructor = pokemon.PokemonMoveset
pokemon.PokemonMoveset.prototype.indexOf = function(move_id) {
}
pokemon.PokemonMoveset.prototype.replace = function(index, move_id) {
}
pokemon.PokemonMoveset.prototype.splice = function(move_id) {
}
pokemon.PokemonMoveset.prototype.slice = function(move_id) {
}
pokemon.PokemonMoveset.prototype.push = function(move_id) {
	var self = this
	for (var i=0; i<arguments.length; i++) {
		if (self.length >= 4) break
		// Add Data from moves.csv
		pokemon.storage.get('moves').forEach(function(move){
			if (move.id !== move_id) return
			self[self.length] = move
			self.length++
		})
	}
	return self.length
}
