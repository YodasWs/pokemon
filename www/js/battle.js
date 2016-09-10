pokemon.BattleStats = function(pkmn){
	this.isInfatuated = false
	this.isConfused = false
	this.status = null
	this.boosts = {
		accuracy: 0,
		evasion: 0,
		spatk: 0,
		spdef: 0,
		atk: 0,
		def: 0,
		spd: 0
	}
	this.ppMoves = []
	this.stats = {
		spatk: 0,
		spdef: 0,
		atk: 0,
		def: 0,
		spd: 0
	}
	for (var i in this.stats) {
		this.stats[i] = Math.floor(Math.floor(2 * pkmn.baseStats[i] + pkmn.ivs[i] + Math.floor(pkmn.evs[i] / 4)) * pkmn.lvl / 100 + 5)
	}
}

pokemon.Battle = function(){
	this.player = pokemon.player
	this.foe = {}
	this.activePokemon = {
		player:[null],
		foe:[null]
	}
}
pokemon.Battle.prototype.start = function(){
	var fldBattle = $('#battle')

	// Add Pokémon
	;['player','foe'].forEach(function(t){
		pokemon.battle[t].pokemon.forEach(function(p,i){
			p.battleStats = new pokemon.BattleStats(p)
			p.img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
			p.img.addClass(pokemon.data.getPokemonImageClass(p))
			fldBattle.find('.trainer.' + t + ' .inactive.pokemon').append(p.img)
		})
	})

	// Open Menus
	$('[data-action="pkmn"], [data-action="fight"]').off('click').on('click', function() {
		$(this).parents('li').siblings().find('[data-action].active').removeClass('active')
		$(this).toggleClass('active')
	})

	// Attack
	$('[data-action="fight"] + ul').off('click').on('click', '[data-action]', function(e) {
		console.log($(e.target).attr('data-action'))
	})

	// Start
	fldBattle.addClass('show')
	setTimeout(function() {
		// Activate Pokémon
		;['player','foe'].forEach(function(t){
			pokemon.battle.activatePokemon(t, pokemon.battle[t].pokemon[0])
		})
		if (fldBattle.is('.wild') && pokemon.battle.foe.pokemon.length > 1) {
			pokemon.battle.foe.pokemon.forEach(function(p) {
				pokemon.battle.activatePokemon('foe', p)
			})
		}
		setTimeout(function() {
			// Start Round
			pokemon.battle.startRound()
		}, 1000)
	}, 500)
}
pokemon.Battle.prototype.activatePokemon = function(trainer, pkmn){
	pokemon.battle.activePokemon[trainer] = [pkmn]
	pokemon.battle[trainer].pokemon.forEach(function(p){
		if (trainer !== 'foe' || !$('#battle').is('.wild')) {
			if (p.img && p.img.removeClass) p.img.removeClass('active')
		}
	})
	pkmn.img.addClass('active').prependTo($('#battle .trainer.' + trainer + ' .active.pokemon'))
}
pokemon.Battle.prototype.startRound = function(){
	pokemon.battle.activePokemon.foe.forEach(function(){
		// TODO: Select foe's action
	})
	pokemon.battle.readyPkmn(0)
}
pokemon.Battle.prototype.readyPkmn = function(pkmn){
	pkmn = pokemon.battle.activePokemon.player[pkmn]
	$('.pokemon-img.ready').removeClass('ready')
	$('.pokemon-name').text(pkmn.name)
	pkmn.img.addClass('ready')
	$('#battle').find('.menu').delayShow('show')
}

pokemon.wildEncounter = function(intSpecies) {
	if (!intSpecies || !Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Need a positive integer in pokemon.wildEncounter")
	}
	if (!pokemon.data.pokemon[intSpecies]) {
		throw TypeError("Unknown Pokémon " + intSpecies)
	}
	pokemon.battle = new pokemon.Battle()
	pokemon.battle.foe = new pokemon.Trainer()

	var intLevel = Math.floor(Math.random() * pokemon.player.level * 5) + 2

	for (var i=0; i<1; i++) {
		pokemon.battle.foe.pokemon.push(new pokemon.Pokemon(intSpecies, intLevel))
	}

	$('#battle').addClass('wild')

	console.log(pokemon.battle.foe)

	pokemon.battle.start()
}
pokemon.battle = {}
