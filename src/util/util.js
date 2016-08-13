let isArray = Array.isArray;
let objectProto = Object.prototype;
let objectToString = objectProto.toString;
let hasOwnProperty = objectProto.hasOwnProperty;
let stringTag = '[object String]';

let clamp = function(value, min, max) {
	return Math.max(min, Math.min(max, value));
};

//Adapted from _.isNumber
let isNumber = function(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
};

//Adapted from _.isObject
let isObject = function(value) {
	return value != null && typeof value === 'object' && isArray(value) === false;
};

let isObjectLike = function(value) {
	return !!value && typeof value == 'object';
};

//Adapted from _.isString
let isString = function(value) {
	return typeof value == 'string' ||
	(!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
};

//Adapted from _.random
let random = function(lower, upper, floating) {
	if(floating || lower % 1 || upper % 1) {
		let rand = Math.random();
		return Math.min(lower + (rand * (upper - lower + parseFloat('1e-' + ((rand + '').length - 1)))), upper);
	}
	return lower + Math.floor(Math.random() * (upper - lower + 1));
}

let defaults = function(defaults, obj) {
	let updated = {};
	for (let key in defaults) {
		if(defaults.hasOwnProperty(key)) {
			updated[key] = defaults[key];
		}
	}
	for (let key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] != updated[key]) {
			updated[key] = obj[key];
		}
	}
	return updated;
}

let inRange = function(number, start, end) {
	return number >= Math.min(start, end) && number < Math.max(start, end);
}

/**
 * {
 * 	  foo: {
 *  	type: 'Number'
 * 	 	rangeMin: 0
 * 	 	rangeMax: 100
 * 	  },
 	  bar: {
	    type: 'String'
 	  }
 * }
 */
let specTest = function(spec, obj) {
	for (let key in spec) {
		if (spec.hasOwnProperty(key)) {
			if (!obj.hasOwnProperty(key)) {
				return false;
			}
			switch(spec[key].type) {
				case 'Number':
					let specProp = spec[key];
					let objProp = obj[key];
					let min = specProp.rangeMin;
					let max = specProp.rangeMax;
					if (!isNumber(objProp)) {
						return false;
					}
					if (!inRange(objProp, min, max)) {
						return false;
					}
				break;
				case 'String':
					if (!isString(obj[key])) {
						return false;
					}
				break;
			}
		}
	}
	return true;
}

export { clamp, isNumber, isObject, isString, random, defaults, inRange, specTest };
