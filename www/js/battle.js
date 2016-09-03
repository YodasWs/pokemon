pokemon.BattleStats = function(){
	this.spatk = 0
	this.spdef = 0
	this.atk = 0
	this.def = 0
	this.spd = 0
	this.hp = 0
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
			p.battleStats = new pokemon.BattleStats()
			p.img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
			p.img.addClass(pokemon.data.getPokemonImageClass(p.number))
			fldBattle.find('.trainer.' + t + ' .inactive.pokemon').append(p.img)
		})
	})

	$('[data-action="pkmn"], [data-action="fight"]').off('click').on('click', function() {
		$(this).parents('li').siblings().find('[data-action].active').removeClass('active')
		$(this).toggleClass('active')
	})

	// Start
	fldBattle.addClass('show')
	setTimeout(function() {
		// Activate Pokémon
		;['player','foe'].forEach(function(t){
			pokemon.battle.activatePokemon(t, pokemon.battle[t].pokemon[0])
		})
		setTimeout(function() {
			// Start Round
			pokemon.battle.startRound()
		}, 1000)
	}, 500)
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
pokemon.Battle.prototype.activatePokemon = function(trainer, pkmn){
	pokemon.battle.activePokemon[trainer] = [pkmn]
	pokemon.battle[trainer].pokemon.forEach(function(p){
		if (p.img && p.img.removeClass) p.img.removeClass('active')
	})
	pkmn.img.addClass('active').prependTo($('#battle .trainer.' + trainer + ' .active.pokemon'))
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
