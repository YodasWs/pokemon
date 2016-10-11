"use strict";
const timing = 1200
pokemon.BattleStats = function(pkmn){
	this.isInfatuated = false
	this.isConfused = false
	this.pokemon = pkmn
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
pokemon.BattleStats.prototype.stat = function(stat) {
	let multiplier = 1
	// Battle Boost
	switch (this.boosts[stat]) {
	case -6:
		multiplier *= 2/8
		break;
	case -5:
		multiplier *= 2/7
		break;
	case -4:
		multiplier *= 2/6
		break;
	case -3:
		multiplier *= 2/5
		break;
	case -2:
		multiplier *= 2/4
		break;
	case -1:
		multiplier *= 2/3
		break;
	case 1:
		multiplier *= 1.5
		break;
	case 2:
		multiplier *= 2
		break;
	case 3:
		multiplier *= 2.5
		break;
	case 4:
		multiplier *= 3
		break;
	case 5:
		multiplier *= 3.5
		break;
	case 6:
		multiplier *= 4
		break;
	}
	// Now for the actual stat
	if (this.pokemon.stats[stat] !== undefined) {
		multiplier *= this.pokemon.stats[stat]
	}
	return multiplier
}
pokemon.BattleStats.prototype.adjust = function(stat, change = 0) {
	let msg = ''
	if (this.boosts[stat] + change > 6) {
		change = 6 - this.boosts[stat]
	}
	if (this.boosts[stat] + change < -6) {
		change = -6 - this.boosts[stat]
	}
	this.boosts[stat] += change
	if (change === 0) {
		msg = pokemon.data.statToString(stat) + "couldn't change!"
	} else if (change < 0) {
		msg = 'Lowered ' + pokemon.data.statToString(stat)
	} else if (change > 0) {
		msg = 'Raised ' + pokemon.data.statToString(stat)
	}
	pokemon.battle.log(msg)
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
	let fldBattle = $('#battle')

	// Add Pokémon
	;['player','foe'].forEach((t) => {
		pokemon.battle[t].pokemon.forEach((p,i) => {
			p.battleStats = new pokemon.BattleStats(p)
			p.html = $('<div class="pokemon-html">')
			p.html.img = $('<div class="pokemon-img">').addClass('pkmn-' + p.number)
			p.html.img.addClass(pokemon.data.getPokemonImageClass(p)).appendTo(p.html)
			p.html.append('<progress class="hp" min="0" max="' + p.maxhp + '" value="' + p.hp + '">')
			fldBattle.find('.trainer.' + t + ' .inactive.pokemon').append(p.html)
		})
	})

	// Open Menus
	$('[data-action="pkmn"], [data-action="fight"]').off('click').on('click', function() {
		$(this).parents('li').siblings().find('[data-action].active').removeClass('active')
		$(this).toggleClass('active')
	})

	// Attack
	$('[data-action="fight"] + ul').off('click').on('click', '[data-action]', pokemon.battle.setAction)

	// Start
	fldBattle.addClass('show')
	setTimeout(() => { // Wait for fadein
		// Activate Pokémon
		;['player','foe'].forEach((t) => {
			while (pokemon.battle.activePokemon[t].length > pokemon.battle[t].pokemon.length) {
				pokemon.battle.activePokemon[t].pop()
			}
			for (let i=0; i<pokemon.battle.activePokemon[t].length; i++) {
				pokemon.battle.activatePokemon(t, pokemon.battle[t].pokemon[i], i)
			}
		})
		if (fldBattle.is('.wild') && pokemon.battle.foe.pokemon.length > 1) {
			pokemon.battle.foe.pokemon.forEach((p, i) => {
				pokemon.battle.activatePokemon('foe', p, i)
			})
		}
		setTimeout(() => {
			// Start Round
			pokemon.battle.startRound()
		}, timing)
	}, timing / 2)
}
pokemon.Battle.prototype.activatePokemon = function(trainer, pkmn, i = 0){
	if (!pkmn) return false
	if (i > pokemon.battle.activePokemon[trainer]) return false
	pokemon.battle.activePokemon[trainer][i] = pkmn
	pkmn.html.addClass('active').prependTo($('#battle .trainer.' + trainer + ' .active.pokemon'))
}
pokemon.Battle.prototype.startRound = function(){
	pokemon.battle.actions.foe = []
	pokemon.battle.actions.player = []
	pokemon.battle.activePokemon.foe.forEach((pkmn) => {
		// TODO: Select foe's action
		pkmn.moves.sort()
		console.log('Foe Pkmn Moves:', pkmn.moves)
		pkmn.moves[0].target = pokemon.data.moves.selectTarget(pkmn.moves[0])
		pokemon.battle.actions.foe.push(pkmn.moves[0])
	})
	pokemon.battle.readyPkmn(0)
}
pokemon.Battle.prototype.readyPkmn = function(pkmn){
	pkmn = pokemon.battle.activePokemon.player[pkmn]
	let $moves = $('#battle ul.moves'),
		$menu = $('#battle').find('.menu'),
	cb = function() {
		// Update View
		$('.pokemon-html.ready').removeClass('ready')
		$('.pokemon-name').text(pkmn.name)
		// List Pokémon Moves
		$moves.children().remove()
		pkmn.moves.forEach((move) => {
			$moves.append('<li><button data-action="' + move.id + '">' + move.identifier)
		})
		pkmn.html.addClass('ready')
		$menu.delayShow('show')
	}
	if ($menu.is('.show')) {
		// Hide Menu first!
		$menu.removeClass('show')
		setTimeout(cb, timing)
	} else cb()
}
pokemon.Battle.prototype.setAction = function(e){
	let btn = $(e.target),
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
	pokemon.battle.actions.sort((a, b) => {
		if (a.priority != b.priority) return b.priority - a.priority
		return b.pokemon.stats.spd - a.pokemon.stats.spd
	})
	pokemon.battle.actions.forEach((action, i) => {
		setTimeout(() => {
			let damage = 0, efficacy = 1, move
			console.log('Action',action)
			// This is a Move
			if (action.move_id) {
				move = action
				pokemon.battle.log(move.pokemon.name + " used " + move.identifier + "!")
				// TODO: Check Pokémon Status
				if (move.pokemon.battleStats.status) {
				}
				// Check Efficacy
				if (move.target && move.target.forEach) move.target.forEach((def) => {
					efficacy *= pokemon.data.moves.calcEfficacy(move, def)
				})
				if (efficacy) {
					// Deduct PP
					move.pp--
					if (move.damage_class != 'status') {
						console.log('efficacy', efficacy)
						console.log('accuracy', move.accuracy)
						// TODO: Calculate Accuracy
						if (Math.random(100) > move.accuracy) {
							console.log('Attack Missed!')
						} else {
							// TODO: Give Damage
							if (move.target && move.target.forEach) move.target.forEach((def) => {
								damage = pokemon.battle.calcDamage(move, def)
								setTimeout(() => {
									def.hp -= damage
									if (efficacy > 1) {
										pokemon.battle.log("It's super effective!")
									} else if (efficacy < 1) {
										pokemon.battle.log("It's not very effective&hellip;")
									}
									if (!def.hp) {
										// TODO: Fainted!
									}
								}, timing)
							}); else switch (move.target) {
							}
						}
					}
					// Stats Boost
					if (move.boost && move.boost.stat) {
						setTimeout(() => {
							if (move.target && move.target.forEach) move.target.forEach((def) => {
								def.battleStats.adjust(move.boost.stat, move.boost.num)
							})
						}, timing)
					}
					// Change Status
					if (move.changeStatus && move.target && move.target.forEach) {
						move.target.forEach(move.changeStatus)
					}
				} else {
					console.log(move.identifier + ' has no effect')
				}
				// TODO: Check Attacker Ability
				// TODO: Check Defender Ability
				// TODO: Check Effect
			}
		}, timing * 2 * i + timing / 2)
	})
	// Update Statuses
	;['foe','player'].forEach((t) => {
		pokemon.battle.activePokemon[t].forEach((pkmn) => {
			if (pkmn.battleStats.status && pkmn.battleStats.status.num) {
				switch (pkmn.battleStats.status) {
				case 'sleep':
					// Countdown to Waking Up
					pkmn.battleStats.status.num--
					break;
				}
			}
		})
	})
	// Move on to Next Round
	setTimeout(() => {
		if (pokemon.battle.activePokemon.foe.length && pokemon.battle.activePokemon.player.length) {
			pokemon.battle.startRound()
		} else {
			pokemon.battle.finish()
		}
	}, Math.max(0, timing * 2 * pokemon.battle.actions.length + timing / 2))
}
pokemon.Battle.prototype.calcDamage = function(move, def) {
	let intAtk = 0, intDef = 0, damage = 0,
		criticalHitRate = 1, criticalHit = false,
		modifier = Math.random() * ( 1 - 0.85 ) + 0.85
	// Is this a critical hit?
	switch (move.criticalHitStage) {
	case 0:
		criticalHitRate = 1/16
		break;
	case 1:
		criticalHitRate = 1/8
		break;
	case 2:
		criticalHitRate = 1/4
		break;
	case 3:
		criticalHitRate = 1/2
		break;
	}
	criticalHit = (Math.random() < criticalHitRate)
	if (criticalHit) {
		modifier *= 2
		pokemon.battle.log('A critical hit!')
	}
	// Get Attack and Defense Stats
	switch (move.damage_class) {
	case 'physical':
		intAtk = move.pokemon.battleStats.stat('atk')
		intDef = def.battleStats.stat('def')
		if (criticalHit) {
			// Ignore Boosts in wrong direction
			intAtk = Math.max(intAtk, move.pokemon.stats.atk)
			intDef = Math.min(intDef, def.stats.def)
		}
		break;
	case 'special':
		intAtk = move.pokemon.battleStats.stat('spatk')
		intDef = def.battleStats.stat('spdef')
		if (criticalHit) {
			// Ignore Boosts in wrong direction
			intAtk = Math.max(intAtk, move.pokemon.stats.spatk)
			intDef = Math.min(intDef, def.stats.spdef)
		}
		break;
	default:
		return 0
	}
	// TODO: Calculate Modifier
	// Same-Type Attack Bonus
	if (move.pokemon.types.indexOf(move.type) != -1) {
		modifier *= 1.5
	}
	// Type Efficacy
	modifier *= pokemon.data.moves.calcEfficacy(move, def)
	// Calculate Damage
	damage = (2 * move.pokemon.lvl + 10) / 250
	damage *= intAtk / intDef
	damage *= move.power
	damage += 2
	damage *= modifier
	damage = Math.ceil(damage)
console.log('damage', damage)
	return damage
}
pokemon.Battle.prototype.log = function(msg) {
	if (!msg) return
	let $log = $('#battle').children('.history')
	$log.append('<li class="hidden">' + msg)
	setTimeout(() => {
		$log.find('li.hidden').removeClass('hidden')
	}, 100)
}
pokemon.Battle.prototype.finish = function() {
	console.log('Battle Finished?')
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

//	const intLevel = Math.floor(Math.random() * pokemon.player.level * 5) + 2
const intLevel = 14;

	for (let i=0; i<1; i++) {
		pokemon.battle.foe.pokemon.push(new pokemon.Pokemon(intSpecies, intLevel))
	}

	$('#battle').addClass('wild')
	pokemon.battle.isWild = true

	console.log(pokemon.battle.foe)

	pokemon.battle.start()
}
pokemon.battle = {}
