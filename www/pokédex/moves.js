pokemon.data = pokemon.data || {}
pokemon.data.moves = {
	getByPkmn:function(pkmn){
		if (!pkmn.version) return []
		var all_pkmn_moves = pokemon.storage.get('pkmn_moves_v' + pkmn.version),
			all_moves = pokemon.storage.get('moves'),
			pkmn_moves = []
		// Collect Moves for Pokémon
		all_pkmn_moves.forEach(function(pm){
			if (pkmn.number != pm['pokemon_id']) return
			if (pm['pokemon_move_method_id'] != 1) return // 1 == Learned Naturally
			if (pkmn.lvl >= pm['level']) pkmn_moves.push(pm)
		})
		return pkmn_moves
	},
	getById:function(id){
		var moves = pokemon.storage.get('moves'),
			move = null
		moves.forEach(function(m){
			if (m.id == id) {
				move = m
				return false
			}
		})
		return move
	},
	getByName:function(name){
		var moves = pokemon.storage.get('moves'),
			move = null
		moves.forEach(function(m){
			if (m.identifier == name) move = m
		})
		return move
	}
}

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
		if (pm.version_group_id != pkmn.version) return
		if (self.indexOf(pm.move_id) >= 0) return
		if (pkmn.lvl >= pm.level) self.push(pm)
		if (self.length >= 4) return false
	})
}
pokemon.PokemonMoveset.prototype = Object.create(Array.prototype)
pokemon.PokemonMoveset.prototype.constructor = pokemon.PokemonMoveset
pokemon.PokemonMoveset.prototype.indexOf = function(move_id) {
	var intIndex = -1
	if (typeof move_id !== 'number') move_id = Number.parseInt(move_id, 10)
	if (Number.isInteger(move_id) && move_id > 0) {
		this.forEach(function(move, i){
			if (move.id == move_id) {
				intIndex = i
				return false
			}
		})
	}
	return intIndex
}
pokemon.PokemonMoveset.prototype.replace = function(index, move) {
	if (Number.isInteger(move) && move > 0) {
		move = pokemon.data.moves.getById(move)
	}
	return this.splice(index, 1, move)
}
pokemon.PokemonMoveset.prototype.push = function() {
	var self = this, move_data, move_id
	for (var i=0; i<arguments.length; i++) {
		if (self.length >= 4) break
		move_data = {}
		if (arguments[i].move_id) {
			move_id = arguments[i].move_id
			move_data = arguments[i]
		}
		// Add Data from moves.csv
		pokemon.storage.get('moves').forEach(function(move){
			if (move.id !== move_id) return
			self[self.length] = $.extend(move_data, move)
			self.length++
		})
	}
	return self.length
}
