pokemon.battle = {
	start:function(){
		console.log('Starting battle')
		var fldBattle = $('#battle')

console.log(pokemon.battle.foe.pokemon)
		// Add Foe's Pokémon to Field
		;['player','foe'].forEach(function(t){
			(t == 'foe' ?  pokemon.battle[t] : pokemon[t]).pokemon.forEach(function(p){
				var $img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
				$img.addClass(pokemon.data.getPokemonImageClass(p.number))
				fldBattle.find('.trainer.' + t + ' .pokemon').append($img)
			})
		})

		$('#battle').addClass('show')
	},
	foe:{}
}

pokemon.data = pokemon.data || {}
pokemon.data.getPokemonImageClass = function(intSpecies){
	if (!intSpecies || !Number.isInteger(intSpecies) || intSpecies <= 0) {
		throw TypeError("Need a positive integer in pokemon.wildEncounter")
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
	console.log(pokemon.battle.foe)
	pokemon.battle.start()
}
