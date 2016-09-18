Zepto.fn.delayShow = function(classname) {
	this.show()
	setTimeout(function(self) {
		self.addClass(classname)
	}, 10, this)
	return this
}
pokemon.data = pokemon.data || {}
pokemon.data.getPokemonImageClass = function(pkmn){
	if (Number.isInteger(pkmn)) switch (pokemon.player.generation) {
	case 1:
		if (pkmn <= 151) {
		}
	case 6:
		if (pkmn <= 721) {
			return 'oras'
		}
	} else if (pkmn.version) switch(pkmn.version) {
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 14:
	case 15:
	case 16:
		return 'oras';
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
pokemon.data.generations = {
	maxPokemonNumber:function(generation){
		switch (generation) {
		case 1:
			return 151;
		case 2:
			return 251;
		case 3:
			return 386;
		case 4:
			return 493;
		case 5:
			return 649;
		case 6:
			return 721;
		}
	},
	pokemonFirstSeenIn:function(pkmn){
		var num = pkmn
		if (typeof pkmn == 'object' && pkmn.number) {
			num = pkmn.number
		}
		if (pkmn <= 151) return 1;
		if (pkmn <= 251) return 2;
		if (pkmn <= 386) return 3;
		if (pkmn <= 493) return 4;
		if (pkmn <= 649) return 5;
		if (pkmn <= 721) return 6;
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
		var data = localStorage[k] || '[];0'
		return JSON.parse(data.substring(0, data.lastIndexOf(';')))
	},
	checkTime:function(k){
		var data = localStorage[k] || '[];0'
		return Number.parseFloat(data.substring(data.lastIndexOf(';') + 1))
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
		localStorage[k] = JSON.stringify(d) + ';' + (new Date()).getTime()
	}
}

window.onReady(function(){
	// TODO: Need to move this to the server
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
