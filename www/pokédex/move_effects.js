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
	return effect
}
