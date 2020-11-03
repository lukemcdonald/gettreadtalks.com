export const flattenObjectByKey = (object = {}, key = '') =>
	key in object ? { ...object[key] } : object;

export const flattenObjectsByKey = (objects = [], key = '') => {
	// array does not exist, is not an array, or is empty
	if (!Array.isArray(objects) || !objects.length) {
		return objects;
	}

	return objects.map((object) => flattenObjectByKey(object, key));
};

export const objectToString = (object = {}, sep = ' ') =>
	Object.keys(object)
		.map((key) => object[key])
		.join(sep);

export const mapObjectToString = (keys = [], object = {}, sep = ' ') =>
	keys.map((key) => object[key]).join(sep);

export const getCurrentYear = () => new Date().getFullYear();

export const serializeObject = (object = {}, prefix) => {
	const str = [];

	Object.keys(object).forEach((key) => {
		if (object && object.hasOwnProperty(key)) {
			const k = prefix ? `${prefix}[${key}]` : key;
			const v = object[key];

			str.push(
				typeof v === 'object'
					? serializeObject(v, k)
					: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
			);
		}
	});

	// for (const param in object) {
	// 	if (object.hasOwnProperty(param)) {
	// 		const k = prefix ? `${prefix}[${param}]` : param;
	// 		const v = object[param];

	// 		str.push(
	// 			typeof v === 'object'
	// 				? serializeObject(v, k)
	// 				: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
	// 		);
	// 	}
	// }

	return str.join('&');
};

export const getRandomIndex = (items) =>
	items[parseInt(Math.random() * items.length)];

export const getRandomArrayItem = (items = []) => getRandomIndex(items);

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

export const getFormatedPublishDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
	const yyyy = today.getFullYear();

	return `${yyyy}${mm}${dd}`;
};

export const getCurrentPosts = (posts = {}, limit = null) => {
	const today = getFormatedPublishDate();
	const currentPosts = posts.filter(
		({ node }) => node.data.publishedDate <= today
	);

	if (limit) {
		return currentPosts.slice(0, limit);
	}
	return currentPosts;
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
