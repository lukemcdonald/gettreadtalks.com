export const flattenObjectByKey = (object = {}, key = '') => {
	return key in object ? { ...object[key] } : object;
};

export const flattenObjectsByKey = (objects = [], key = '') => {
	// array does not exist, is not an array, or is empty
	if (!Array.isArray(objects) || !objects.length) {
		return objects;
	}

	return objects.map(object => flattenObjectByKey(object, key));
};

export const objectToString = (object = {}, sep = ' ') => {
	return Object.keys(object)
		.map(key => object[key])
		.join(sep);
};

export const mapObjectToString = (keys = [], object = {}, sep = ' ') => {
	return keys.map(key => object[key]).join(sep);
};

export const getCurrentYear = () => {
	return new Date().getFullYear();
};

export const serializeObject = (object = {}, prefix) => {
	let str = [];

	for (const param in object) {
		if (object.hasOwnProperty(param)) {
			const k = prefix ? `${prefix}[${param}]` : param;
			const v = object[param];

			str.push(
				typeof v === 'object'
					? serializeObject(v, k)
					: encodeURIComponent(k) + '=' + encodeURIComponent(v)
			);
		}
	}

	return str.join('&');
};

export const getRandomArrayItem = (items = []) => {
	return items[getRandomIndex(items)];
};

export const getRandomObjectItem = (items = {}) => {
	const keys = Object.keys(items);
	return items[keys[getRandomIndex(keys)]];
};

export const getRandomIndex = items => {
	return Math.floor((items.length * Math.random()) << 0);
};

export const trimText = (text, limit) => {
	if (text.length > limit) {
		return `${text.slice(0, limit).trim()}...`;
	}

	return text;
};

export const getFormatedPublishDate = () => {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	return `${yyyy}${mm}${dd}`;
}

export const getCurrentPosts = ( posts = {}, limit = null ) => {
	const today = getFormatedPublishDate();
	const currentPosts = posts.filter(({node}) => {
		return node.data.publishedDate <= today;
	});

	if ( limit ) {
		return currentPosts.slice(0, limit);
	} else {
		return currentPosts;
	}
}
