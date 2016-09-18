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
	case 'dragon':
		switch (def) {
		case 'steel':
			return .5
		case 'dragon':
			return 2
		case 'fairy':
			return 0
		}
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
	}
	return 1
}
