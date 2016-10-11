pokemon.data = pokemon.data || {}
pokemon.data.move_effects = function(effect_id) {
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
			if (!target.battleStats.status || !target.battleStats.status.num) {
				target.battleStats.status = {
					num: Math.randInt(1, 4),
					status: 'sleep'
				}
			}
		}
		break;
	}
	return effect
}
