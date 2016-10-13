pokemon.data = pokemon.data || {}
pokemon.data.move_effects = {
	onEndRound(pkmn){
		if (!pkmn.battleStats.status || pkmn.battleStats.status.num <= 0) return;
		switch (pkmn.battleStats.status.status) {
		case 'sleep':
			// Countdown to Waking Up
			pkmn.battleStats.status.num--
			break;
		}
	},
	setStatus(status, pkmn){
		if (!pkmn.battleStats.status || pkmn.battleStats.status.num <= 0) switch (status) {
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
moveData(effect_id) {
	var effect = {}
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
	// Alter Battle Stats Boosts
	effect.boost = {}
	switch (effect_id) {
	case 11:
		effect.boost.num = 1
		effect.boost.stat = 'atk'
		break;
	case 12:
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
		effect.boost.num = -1
		effect.boost.stat = 'atk'
		break;
	case 20:
		effect.boost.num = -1
		effect.boost.stat = 'def'
		break;
	case 21:
		effect.boost.num = -1
		effect.boost.stat = 'spd'
		break;
	case 24:
		effect.boost.num = -1
		effect.boost.stat = 'accuracy'
		break;
	case 25:
		effect.boost.num = -1
		effect.boost.stat = 'evasion'
		break;
	}
	// Alter Status Conditions
	switch (effect_id) {
	case 2:
		// Put Target to Sleep!
		effect.changeStatus = (target) => {
			pokemon.data.move_effects.setStatus('sleep', target)
		}
		break;
	}
	return effect
}
}
