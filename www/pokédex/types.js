pokemon.types = {}
pokemon.types.efficacy = function(atk, def) {
	switch (atk) {
	case 'normal':
		switch (def) {
		case 'rock':
			return .5
		case 'ghost':
			return 0
		case 'steel':
			return .5
		}
		break;
	case 'fighting':
		switch (def) {
		case 'normal':
			return 2
		case 'flying':
			return .5
		case 'poison':
			return .5
		case 'rock':
			return 2
		case 'bug':
			return .5
		case 'ghost':
			return 0
		case 'steel':
			return 2
		case 'psychic':
			return .5
		case 'ice':
			return 2
		case 'dark':
			return 2
		case 'fairy':
			return .5
		}
		break;
	case 'flying':
		switch (def) {
		case 'fighting':
			return 2
		case 'rock':
			return .5
		case 'bug':
			return 2
		case 'steel':
			return .5
		case 'grass':
			return 2
		case 'electric':
			return .5
		}
		break;
	case 'poison':
		switch (def) {
		case 'poison':
			return .5
		case 'ground':
			return .5
		case 'rock':
			return .5
		case 'ghost':
			return .5
		case 'steel':
			return 0
		case 'grass':
			return 2
		case 'fairy':
			return 2
		}
		break;
	case 'ground':
		switch (def) {
		case 'flying':
			return 0
		case 'poison':
			return 2
		case 'rock':
			return 2
		case 'bug':
			return .5
		case 'steel':
			return 2
		case 'fire':
			return 2
		case 'grass':
			return .5
		case 'electric':
			return 2
		}
		break;
	case 'rock':
		switch (def) {
		case 'fighting':
			return .5
		case 'flying':
			return 2
		case 'ground':
			return .5
		case 'bug':
			return 2
		case 'steel':
			return .5
		case 'fire':
			return 2
		case 'ice':
			return 2
		}
		break;
	case 'bug':
		switch (def) {
		case 'fighting':
			return .5
		case 'flying':
			return .5
		case 'poison':
			return .5
		case 'ghost':
			return .5
		case 'steel':
			return .5
		case 'fire':
			return .5
		case 'grass':
			return 2
		case 'psychic':
			return 2
		case 'dark':
			return 2
		case 'fairy':
			return .5
		}
		break;
	case 'ghost':
		switch (def) {
		case 'normal':
			return 0
		case 'ghost':
			return 2
		case 'psychic':
			return 2
		case 'dark':
			return .5
		}
		break;
	case 'steel':
		switch (def) {
		case 'rock':
			return 2
		case 'steel':
			return .5
		case 'fire':
			return .5
		case 'water':
			return .5
		case 'electric':
			return .5
		case 'ice':
			return 2
		case 'fairy':
			return 2
		}
		break;
	case 'fire':
		switch (def) {
		case 'rock':
			return .5
		case 'bug':
			return 2
		case 'steel':
			return 2
		case 'fire':
			return .5
		case 'water':
			return .5
		case 'grass':
			return 2
		case 'ice':
			return 2
		case 'dragon':
			return .5
		}
		break;
	case 'water':
		switch (def) {
		case 'ground':
			return 2
		case 'rock':
			return 2
		case 'fire':
			return 2
		case 'water':
			return .5
		case 'grass':
			return .5
		case 'dragon':
			return .5
		}
		break;
	case 'grass':
		switch (def) {
		case 'flying':
			return .5
		case 'poison':
			return .5
		case 'ground':
			return 2
		case 'rock':
			return 2
		case 'bug':
			return .5
		case 'steel':
			return .5
		case 'fire':
			return .5
		case 'water':
			return 2
		case 'grass':
			return .5
		case 'dragon':
			return .5
		}
		break;
	case 'electric':
		switch (def) {
		case 'flying':
			return 2
		case 'ground':
			return 0
		case 'water':
			return 2
		case 'grass':
			return .5
		case 'electric':
			return .5
		case 'dragon':
			return .5
		}
		break;
	case 'psychic':
		switch (def) {
		case 'fighting':
			return 2
		case 'poison':
			return 2
		case 'steel':
			return .5
		case 'psychic':
			return .5
		case 'dark':
			return 0
		}
		break;
	case 'ice':
		switch (def) {
		case 'flying':
			return 2
		case 'ground':
			return 2
		case 'steel':
			return .5
		case 'fire':
			return .5
		case 'water':
			return .5
		case 'grass':
			return 2
		case 'ice':
			return .5
		case 'dragon':
			return 2
		}
		break;
	case 'dragon':
		switch (def) {
		case 'steel':
			return .5
		case 'dragon':
			return 2
		case 'fairy':
			return 0
		}
		break;
	case 'dark':
		switch (def) {
		case 'fighting':
			return .5
		case 'ghost':
			return 2
		case 'psychic':
			return 2
		case 'dark':
			return .5
		case 'fairy':
			return .5
		}
		break;
	case 'fairy':
		switch (def) {
		case 'fighting':
			return 2
		case 'poison':
			return .5
		case 'steel':
			return .5
		case 'fire':
			return .5
		case 'dragon':
			return 2
		case 'dark':
			return 2
		}
		break;
	}
	return 1
}
pokemon.types.toString = function(type_id) {
	switch (type_id) {
	case 1: return 'normal';
	case 2: return 'fighting';
	case 3: return 'flying';
	case 4: return 'poison';
	case 5: return 'ground';
	case 6: return 'rock';
	case 7: return 'bug';
	case 8: return 'ghost';
	case 9: return 'steel';
	case 10: return 'fire';
	case 11: return 'water';
	case 12: return 'grass';
	case 13: return 'electric';
	case 14: return 'psychic';
	case 15: return 'ice';
	case 16: return 'dragon';
	case 17: return 'dark';
	case 18: return 'fairy';
	}
	throw TypeError("Unknown type_id '" + type_id + "'")
}
