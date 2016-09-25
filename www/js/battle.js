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
}

pokemon.Battle = function(){
	this.player = pokemon.player
	this.isWild = false
	this.foe = {}
	this.activePokemon = {
		player:[null],
		foe:[null]
	}
	this.actions = {
		player:[],
		foe:[]
	}
}
pokemon.Battle.prototype.start = function(){
	var fldBattle = $('#battle')

	// Add Pokémon
	;['player','foe'].forEach(function(t){
		pokemon.battle[t].pokemon.forEach(function(p,i){
			p.battleStats = new pokemon.BattleStats(p)
			p.html = $('<div class="pokemon-html">')
			p.html.img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
			p.html.img.addClass(pokemon.data.getPokemonImageClass(p)).appendTo(p.html)
			p.html.append('<progress class="hp" min="0" max="' + p.maxhp + '" value="' + p.hp + '">')
			fldBattle.find('.trainer.' + t + ' .inactive.pokemon').append(p.html)
		})
	})
$("progress[name='hp']").on('change',function(){console.log($(this).val())})

	// Open Menus
	$('[data-action="pkmn"], [data-action="fight"]').off('click').on('click', function() {
		$(this).parents('li').siblings().find('[data-action].active').removeClass('active')
		$(this).toggleClass('active')
	})

	// Attack
	$('[data-action="fight"] + ul').off('click').on('click', '[data-action]', pokemon.battle.setAction)

	// Start
	fldBattle.addClass('show')
	setTimeout(function() { // Wait for fadein
		// Activate Pokémon
		;['player','foe'].forEach(function(t) {
			while (pokemon.battle.activePokemon[t].length > pokemon.battle[t].pokemon.length) {
				pokemon.battle.activePokemon[t].pop()
			}
			for (var i=0; i<pokemon.battle.activePokemon[t].length; i++) {
				pokemon.battle.activatePokemon(t, pokemon.battle[t].pokemon[i], i)
			}
		})
		if (fldBattle.is('.wild') && pokemon.battle.foe.pokemon.length > 1) {
			pokemon.battle.foe.pokemon.forEach(function(p, i) {
				pokemon.battle.activatePokemon('foe', p, i)
			})
		}
		setTimeout(function() {
			// Start Round
			pokemon.battle.startRound()
		}, 1000)
	}, 500)
}
pokemon.Battle.prototype.activatePokemon = function(trainer, pkmn, i){
	if (!pkmn) return false
	if (i > pokemon.battle.activePokemon[trainer]) return false
	pokemon.battle.activePokemon[trainer][i] = pkmn
	pkmn.html.addClass('active').prependTo($('#battle .trainer.' + trainer + ' .active.pokemon'))
}
pokemon.Battle.prototype.startRound = function(){
	pokemon.battle.actions.foe = []
	pokemon.battle.actions.player = []
	pokemon.battle.activePokemon.foe.forEach(function(pkmn){
		// TODO: Select foe's action
		pkmn.moves.sort()
		console.log('Foe Pkmn Moves:', pkmn.moves)
		pokemon.battle.actions.foe.push(pkmn.moves[0])
	})
	pokemon.battle.readyPkmn(0)
}
pokemon.Battle.prototype.readyPkmn = function(pkmn){
	pkmn = pokemon.battle.activePokemon.player[pkmn]
	var $moves = $('#battle ul.moves'),
		$menu = $('#battle').find('.menu'),
	cb = function() {
		// Update View
		$('.pokemon-html.ready').removeClass('ready')
		$('.pokemon-name').text(pkmn.name)
		// List Pokémon Moves
		$moves.children().remove()
		pkmn.moves.forEach(function(move) {
			$moves.append('<li><button data-action="' + move.id + '">' + move.identifier)
		})
		pkmn.html.addClass('ready')
		$menu.delayShow('show')
	}
	if ($menu.is('.show')) {
		// Hide Menu first!
		$menu.removeClass('show')
		setTimeout(cb, 1000)
	} else cb()
}
pokemon.Battle.prototype.setAction = function(e){
	var btn = $(e.target),
		menu = btn.parents('.menu, .pokemon'),
		activePkmn = pokemon.battle.activePokemon.player[pokemon.battle.actions.player.length],
		action = null
	$('#battle').find('[data-action].active').removeClass('active')
	if (!activePkmn) {
		// Set Action without an Active Pokémon? Something's wrong!
		pokemon.battle.runRound()
		return
	}
	if (menu.is('.menu')) {
		action = activePkmn.moves.indexOf(btn.attr('data-action'))
		if (action == -1) {
			pokemon.battle.readyPkmn(pokemon.battle.actions.player.length)
			return
		}
		action = activePkmn.moves[action]
		action.target = pokemon.data.moves.selectTarget(action)
	} else if (menu.is('.pokemon')) {
		action = 'pokemon'
	}
	pokemon.battle.actions.player.push(action)
	if (pokemon.battle.actions.player.length < pokemon.battle.activePokemon.player.length) {
		pokemon.battle.readyPkmn(pokemon.battle.actions.player.length)
		return
	}
	pokemon.battle.runRound()
}
pokemon.Battle.prototype.runRound = function(){
	$('.pokemon-html.ready').removeClass('ready')
	$('#battle').find('.menu').removeClass('show')
	pokemon.battle.actions = pokemon.battle.actions.player.concat(pokemon.battle.actions.foe)
	pokemon.battle.actions.sort(function(a, b) {
		if (a.priority != b.priority) return b.priority - a.priority
		return b.pokemon.stats.spd - a.pokemon.stats.spd
	})
	pokemon.battle.actions.forEach(function(action) {
		var damage = 0, efficacy = 1
		console.log('Action',action)
		// This is a Move
		if (action.move_id) {
			var move = action
			// TODO: Check Pokémon Status
			// Deduct PP
			move.pp--
			// TODO: Check Efficacy
			if (move.damage_class != 'status') {
				if (move.target && move.target.forEach) move.target.forEach(function(def) {
					efficacy *= pokemon.data.moves.calcEfficacy(move, def)
				})
				if (efficacy) {
					// TODO: Calculate Accuracy
					if (Math.random(100) > move.accuracy) {
					} else {
						// TODO: Give Damage
						if (move.target && move.target.forEach) move.target.forEach(function(def) {
							damage = pokemon.battle.calcDamage(move, def)
						}); else switch (move.target) {
						}
					}
				} else {
					console.log(move.identifier + ' has no effect')
				}
			}
			// TODO: Check Attacker Ability
			// TODO: Check Defender Ability
			// TODO: Check Effect
		}
	})
}
pokemon.Battle.prototype.calcDamage = function(move, def) {
	var intAtk = 0, intDef = 0, damage = 0,
		modifier = Math.random() * ( 1 - 0.85 ) + 0.85
	// Get Attack and Defense Stats
	switch (move.damage_class) {
	case 'phsyical':
		intAtk = move.pokemon.stats.atk
		intDef = def.stats.def
		break;
	case 'special':
		intAtk = move.pokemon.stats.spatk
		intDef = def.stats.spdef
		break;
	default:
		return 0
	}
console.log(intAtk + ' vs ' + intDef)
	// TODO: Calculate Modifier
console.log('modifier', modifier)
	// Calculate Damage
	damage = (2 * move.pokemon.lvl + 10) / 250
	damage *= intAtk / intDef
	damage *= move.power
	damage += 2
	damage *= modifier
console.log('damage', damage)
	return damage
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
	pokemon.battle.isWild = true

	console.log(pokemon.battle.foe)

	pokemon.battle.start()
}
pokemon.battle = {}
