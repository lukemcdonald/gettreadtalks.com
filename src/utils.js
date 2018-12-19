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
