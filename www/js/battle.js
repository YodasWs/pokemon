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
			fldBattle.find('.trainer.' + t + ' .pokemon').append(p.img)
			if (i === 0) pokemon.battle.activatePokemon(t, p)
		})
	})

	// Start
	fldBattle.addClass('show')
}
pokemon.Battle.prototype.activatePokemon = function(trainer, pkmn){
	pokemon.battle.activePokemon[trainer] = pkmn
	pokemon.battle[trainer].pokemon.forEach(function(p){
		if (p.img && p.img.removeClass) p.img.removeClass('active')
	})
	if (trainer == 'player') $('.pokemon-name').text(pkmn.name)
	pkmn.img.addClass('active')
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
