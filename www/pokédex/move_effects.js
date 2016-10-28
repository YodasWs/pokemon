pokemon.data = pokemon.data || {}
pokemon.data.move_effects = {
	onEndRound(pkmn){
		if (!pkmn.status) return;
		switch (pkmn.status.status) {
		case 'sleep':
			// Countdown to Waking Up
			pkmn.status.num--
			break;
		}
	},
	setStatus(status, pkmn, warnPkmnHasStatus = true){
		// Give Pokémon Status Condition
		if (!pkmn.status) switch (status) {
			case 'paralysis':
				if (pkmn.types.indexOf('electric') > -1) {
					pokemon.battle.log(pkmn.name + " cannot be paralyzed.")
				}
				pokemon.battle.log(pkmn.name + " became paralyzed! It may be unable to attack&hellip;")
				pkmn.status = {
					status: 'paralysis'
				}
				break;
			case 'sleep':
				pokemon.battle.log(pkmn.name + " fell asleep!")
				pkmn.status = {
					num: [1,2,2,3,3,4][Math.randInt(6)],
					status: 'sleep'
				}
				break;
		// Pokémon Already Has Status Condition!
		} else if (pkmn.status.status == status && warnPkmnHasStatus) switch (status) {
			case 'paralysis':
				pokemon.battle.log(pkmn.name + " is already paralyzed&hellip;")
				break;
			case 'sleep':
				pokemon.battle.log(pkmn.name + " is already asleep&hellip;")
				break;
		} else if (warnPkmnHasStatus) {
			pokemon.battle.log("No effect&hellip;")
		}
	},
	moveData(effect_id){
		let effect = {}
		effect.boost = {}
		// Increase Critical Hit Stage
		switch (effect_id) {
		case 44:
		case 201:
		case 210:
			effect.criticalHitStage = 1
			break;
		case 289:
			effect.criticalHitStage = 4
			break;
		}
		// User Faints
		switch (effect_id) {
		case 8:
			effect.onBeforeAttack = function() {
				this.pokemon.hp = 0
			}
			break;
		}
		// Alter Battle Stats Boosts
		switch (effect_id) {
		case 141:
			effect.boost.stat = pokemon.BattleStats.boosts.keys()
			effect.boost.num = 1
			break;
		case 11:
		case 140:
			effect.boost.num = 1
			effect.boost.stat = 'atk'
			break;
		case 12:
		case 139:
			effect.boost.num = 1
			effect.boost.stat = 'def'
			break;
		case 14:
			effect.boost.num = 1
			effect.boost.stat = 'spatk'
			break;
		case 17:
			effect.boost.num = 1
			effect.boost.stat = 'evasion'
			break;
		case 19:
		case 69:
			effect.boost.num = -1
			effect.boost.stat = 'atk'
			effect.boost.target = 'target'
			break;
		case 20:
		case 70:
			effect.boost.num = -1
			effect.boost.stat = 'def'
			effect.boost.target = 'target'
			break;
		case 21:
		case 71:
			effect.boost.num = -1
			effect.boost.stat = 'spd'
			effect.boost.target = 'target'
			break;
		case 72:
			effect.boost.num = -1
			effect.boost.stat = 'spatk'
			effect.boost.target = 'target'
			break;
		case 73:
			effect.boost.num = -1
			effect.boost.stat = 'spdef'
			effect.boost.target = 'target'
			break;
		case 24:
		case 74:
			effect.boost.num = -1
			effect.boost.stat = 'accuracy'
			effect.boost.target = 'target'
			break;
		case 25:
			effect.boost.num = -1
			effect.boost.stat = 'evasion'
			effect.boost.target = 'target'
			break;
		case 51:
			effect.boost.num = 2
			effect.boost.stat = 'atk'
			break;
		case 52:
			effect.boost.num = 2
			effect.boost.stat = 'def'
			break;
		case 53:
			effect.boost.num = 2
			effect.boost.stat = 'spd'
			break;
		case 54:
			effect.boost.num = 2
			effect.boost.stat = 'spatk'
			break;
		case 55:
			effect.boost.num = 2
			effect.boost.stat = 'spdef'
			break;
		case 59:
			effect.boost.num = -2
			effect.boost.stat = 'atk'
			effect.boost.target = 'target'
			break;
		case 60:
			effect.boost.num = -2
			effect.boost.stat = 'def'
			effect.boost.target = 'target'
			break;
		case 61:
			effect.boost.num = -2
			effect.boost.stat = 'spd'
			effect.boost.target = 'target'
			break;
		case 63:
			effect.boost.num = -2
			effect.boost.stat = 'spdef'
			effect.boost.target = 'target'
			break;
		}
		// Never misses
		switch (effect_id) {
		case 18:
		case 79:
			effect.neverMiss = true
			break;
		}
		// Alter Status Conditions
		switch (effect_id) {
		// Put Target to Sleep!
		case 2:
			effect.changeStatus = (target) => {
				pokemon.data.move_effects.setStatus('sleep', target)
			}
			break;
		// Paralyze Target!
		case 7:
		case 153:
		case 263:
		case 264:
		case 276:
		case 332:
			effect.changeStatus = (target) => {
				// But don't warn when paralysis fails
				pokemon.data.move_effects.setStatus('paralysis', target, false)
			}
			break;
		case 68:
			effect.changeStatus = (target) => {
				pokemon.data.move_effects.setStatus('paralysis', target)
			}
			break;
		}
		// Hits Multiple Times
		switch (effect_id) {
		case 30:
			effect.onBeforeHits = function() {
				let numHits = [2,2,3,3,4,5]
				this.hits = numHits[Math.randInt(numHits)]
			}
			break;
		case 45:
		case 78:
			this.hits = 2
			break;
		}
		// Clean up boost effect object
		if (!effect.boost.isEmpty()) {
			if (!Array.isArray(effect.boost.stat)) effect.boost.stat = [effect.boost.stat]
			if (!effect.boost.target) effect.boost.target = 'user'
		}
		return effect
	}
}
