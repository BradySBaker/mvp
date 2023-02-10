Queries = require('./bookQueries');
const fictionGenres = Queries.fictionGenres;
const fictionLocations = Queries.fictionLocations;
const timePeriods = Queries.timePeriods;
const characterTraits = Queries.characterTraits;
const bookPlots = Queries.bookPlots;

//Returns true or false randomely
var flipADice = () => {
	if (Math.floor(Math.random()) * 6 === 0) {
		return true;
	} else {
		return false;
	}
}

var getRandomIdx = (arr) => {
	return Math.floor(Math.random() * arr.length);
}

var randomizeSearch = () => {
	var randomGenre = fictionGenres[getRandomIdx(fictionGenres)];
	var query = randomGenre;
	var randomLocaton = '';
	var randomTimePeriod = '';
	//Decide to add random location
	if (flipADice()) {
		randomLocaton = fictionLocations[getRandomIdx(fictionLocations)];
		query += `+${randomLocaton}`;
	}
	//Decide to add random time period
	if (flipADice()) {
		randomTimePeriod = timePeriods[getRandomIdx(timePeriods)];
		query += `+${randomTimePeriod}`;
	}
	//Decide to add random character trait
	if (flipADice()) {
		randomTrait = characterTraits[getRandomIdx(characterTraits)];
		query += `+${randomTrait}`;
	}
	//Decide to add random book plot
	if (flipADice()) {
		randomPlot = bookPlots[getRandomIdx(bookPlots)];
		query += `+${randomPlot}`;
	}
	var randomStartIndex = Math.floor(Math.random() * 101);

	query += `&startIndex=${randomStartIndex}`

	return query;
}

module.exports = randomizeSearch;