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
