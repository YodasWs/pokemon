pokemon.battle = {
	start:function(){
		console.log('Starting battle')
		var fldBattle = $('#battle')
		$(fldBattle.find('.pokemon-img').get(0)).addClass('pkmn-' + pokemon.battle.foe.pokemon[0].number)

		switch (pokemon.player.generation) {
		case 5:
			fldBattle.find('.pokemon-img').addClass('oras')
			break;
		}
		$('#battle').addClass('show')
	},
	foe:{}
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
