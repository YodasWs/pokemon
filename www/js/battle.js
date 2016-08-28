pokemon.battle = {
	start:function(){
		console.log('Starting battle')
		var fldBattle = $('#battle')

console.log(pokemon.battle.foe.pokemon)
		// Add Foe's Pokémon to Field
		;['player','foe'].forEach(function(t){
			var trainer = (t == 'foe' ?  pokemon.battle[t] : pokemon[t])
			trainer.pokemon.forEach(function(p,i){
				p.img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
				p.img.addClass(pokemon.data.getPokemonImageClass(p.number))
				fldBattle.find('.trainer.' + t + ' .pokemon').append(p.img)
				if (i === 0) pokemon.battle.activatePokemon(trainer, p)
			})
		})
		$('#battle').addClass('show')
	},
	foe:{},
	activatePokemon:function(trainer, pkmn){
		trainer.pokemon.forEach(function(p){
			if (p.img && p.img.removeClass) p.img.removeClass('active')
		})
		if (trainer === pokemon.player) $('.pokemon-name').text(pkmn.name)
		pkmn.img.addClass('active')
	}
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
			return 'oras';
		}
	}
}

pokemon.wildEncounter = function(intSpecies) {
	if (!intSpecies || !Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Need a positive integer in pokemon.wildEncounter")
	}
	var list = new pokemon.PokemonList(),
		intLevel = Math.floor(Math.random() * pokemon.player.level * 5) + 2
	for (var i=0; i<1; i++) {
		list.push(new pokemon.Pokemon(intSpecies, intLevel))
	}
	pokemon.battle.foe = new pokemon.Trainer(list)
	$('#battle').addClass('wild')
	console.log(pokemon.battle.foe)
	pokemon.battle.start()
}
