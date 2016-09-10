Zepto.fn.delayShow = function(classname) {
	this.show()
	setTimeout(function(self) {
		self.addClass(classname)
	}, 10, this)
	return this
}
pokemon.data = pokemon.data || {}
pokemon.data.getPokemonImageClass = function(intSpecies){
	if (!intSpecies || !Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Need a positive integer in pokemon.data.getPokemonImageClass")
	}
	switch (pokemon.player.generation) {
	case 1:
		if (intSpecies <= 151) {
		}
	case 6:
		if (intSpecies <= 721) {
			return 'oras'
		}
	}
}
Math.randInt = function() {
	if (!arguments || arguments.length === 0)
		return Math.floor(Math.random() * 10)
	else if (arguments.length === 1)
		return Math.floor(Math.random() * arguments[0])
	else if (arguments.length >= 2)
		return Math.floor(Math.random() * (arguments[1] - arguments[0]) + arguments[0])
}
pokemon.data.statKeys = [ 'hp', 'atk', 'def', 'spatk', 'spdef', 'spd' ];

pokemon.data.versions = {
	getForGeneration:function(generation){
		var vg = pokemon.storage.get('versions_generations'),
			versions = []
		vg.forEach(function(row) {
			if (row.generation == generation) {
				versions[row.id] = row
			}
		})
		return versions
	}
}

pokemon.db = null

// Build Databases for Pokémon Move Sets
if (window.indexedDB) pokemon.db = (function(){
	return false
	var db,
		request = window.indexedDB.open('pokemon', 1)
	request.onsuccess = function(e) {
		db = e.target.result
	}
	request.onupgradeneeded = function(e) {
		db = e.target.result
		var strPkmnMoves = db.createObjectStore('pkmn_moves'),
			strMoves = db.createObjectStore('moves', { keyPath: 'id' })
		strPkmnMoves.createIndex('pokemon_id', 'pokemon_id', { unique: false })
		strMoves.createIndex('identifier', 'identifier', { unique: true })
		strPkmnMoves.createIndex('move_id', 'move_id', { unique: false })
	}
	return db
})();

pokemon.storage = {
	get:function(k){
		return JSON.parse(localStorage[k] || '[]')
	},
	append:function(k,d){
		var data = pokemon.storage.get(k)
		if (typeof data == 'object' && data.constructor === Array) {
			data.push(d)
		} else {
			data = [ data, d ]
		}
		pokemon.storage.set(k, data)
	},
	set:function(k,d){
		localStorage[k] = JSON.stringify(d)
	}
}

pokemon.data.moves = {
	getByPkmn:function(pkmn, version){
		version = version || 1
		var all_pkmn_moves = pokemon.storage.get('pkmn_moves_v' + version),
			all_moves = pokemon.storage.get('moves'),
			pkmn_moves = []
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
			if (m.id == id) move = m
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

window.onReady(function(){
	Papa.SCRIPT_PATH = 'res/papaparse.min.js'
	var csvFiles = ['moves','pkmn_moves_v1','pkmn_moves_v2','versions_generations'],
		index = 0,
	onComplete = function() {
		$(document).trigger('csv-loaded')
		if (index < csvFiles.length)
			loadFile()
	},
	loadFile = function() {
		var file = csvFiles[index++]
		console.log('Want to load ' + file + '.csv')
		if (!localStorage[file] || !localStorage[file].length)
		Papa.parse('../pokédex/csv/' + file + '.csv', {
			header:true,
			worker:true,
			download:true,
			dynamicTyping:true,
			skipEmptyLines:true,
			step:function(row){
				if (pokemon.db) {
					pokemon.db.transaction([file], 'readwrite').objectStore(file).add(row.data[0])
				} else {
					pokemon.storage.append(file, row.data[0])
				}
			},
			complete:onComplete
		}); else onComplete()
	}
	loadFile()
})
