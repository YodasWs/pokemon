pokemon.data = pokemon.data || {}
pokemon.data.move_effects = {
	onEndRound(pkmn){
		if (!pkmn.battleStats.status) return;
		switch (pkmn.battleStats.status.status) {
		case 'sleep':
			// Countdown to Waking Up
			pkmn.battleStats.status.num--
			break;
		}
	},
	setStatus(status, pkmn){
		if (!pkmn.battleStats.status) switch (status) {
			case 'sleep':
				pokemon.battle.log(pkmn.name + " fell asleep!")
				pkmn.battleStats.status = {
					num: [1,2,2,3,3,4][Math.randInt(6)],
					status: 'sleep'
				}
				break;
		} else if (pkmn.battleStats.status.status == status) switch (status) {
			case 'sleep':
				pokemon.battle.log(pkmn.name + " is already asleep!")
				break;
		} else {
			pokemon.battle.log("No effect&hellip;")
		}
	},
	moveData(effect_id){
		let effect = {}
		effect.boost = {}
		switch (effect_id) {
		// Increase Critical Hit Stage
		case 44:
		case 201:
		case 210:
			effect.criticalHitStage = 1
			break;
		case 289:
			effect.criticalHitStage = 4
			break;
		// User Faints
		case 8:
			effect.onBeforeAttack = function() {
				this.pokemon.hp = 0
			}
			break;
		// Alter Battle Stats Boosts
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
		// Never misses
		case 18:
		case 79:
			effect.neverMiss = true
			break;
		// Alter Status Conditions
		case 2:
			// Put Target to Sleep!
			effect.changeStatus = (target) => {
				pokemon.data.move_effects.setStatus('sleep', target)
			}
			break;
		// Hits Multiple Times
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
		if (effect.boost) {
			if (!Array.isArray(effect.boost.stat)) effect.boost.stat = [effect.boost.stat]
			if (!effect.boost.target) effect.boost.target = 'user'
		}
		return effect
	}
}
