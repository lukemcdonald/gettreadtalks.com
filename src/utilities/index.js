export const getCurrentYear = () => new Date().getFullYear();

export const getRandomIndex = (items) =>
	items[parseInt(Math.random() * items.length)];

export const getRandomObjectItem = (items = {}) => {
	const keys = Object.keys(items);
	return items[getRandomIndex(keys)];
};

export const trimText = (text, limit) => {
	if (text.length > limit) {
		return `${text.slice(0, limit).trim()}...`;
	}

	return text;
};

export const shuffle = (array) => {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

export const sanitizeHTMLTag = (tagname = '', whitelist = []) => {
	const sanitized = tagname ? tagname.toLowerCase() : '';
	const tags = whitelist || [tagname];
	return tags.includes(sanitized) ? sanitized : whitelist[0];
};

export const maybePluralize = (count, noun, args = {}) => {
	const defaults = {
		suffix: 's',
		showCount: true,
		formatSmallNumbers: false,
	};

	const options = { ...defaults, ...args };

	const smallNumbers = {
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
		6: 'six',
		7: 'seven',
		8: 'eight',
		9: 'nine',
	};

	let displayCount = count;

	if (options.formatSmallNumbers && smallNumbers[count]) {
		displayCount = smallNumbers[count];
	}

	if (!options.showCount) {
		displayCount = '';
	}

	return `${displayCount} ${noun}${count !== 1 ? options.suffix : ''}`;
};
