let isArray = Array.isArray;
let objectProto = Object.prototype;
let objectToString = objectProto.toString;
let hasOwnProperty = objectProto.hasOwnProperty;
let stringTag = '[object String]';

//Adapted from _.clamp
let clamp = function(value, min, max) {
	if (value === value) {
		if (max !== undefined) {
			value = value <= max ? value : max;
		}
		if (min !== undefined) {
			value = value >= min ? value : min;
		}
	}
	return value;
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
let random = function(lower, upper) {
	if(lower % 1 || upper % 1) {
		let rand = Math.random();
		return Math.min(lower + (rand * (upper - lower + parseFloat('1e-' + ((rand + '').length - 1)))), upper);
	}
	return lower + Math.floor(Math.random() * (upper - lower + 1));
}

let equals = function(value, other) {
  return value === other || (value !== value && other !== other);
}

let assignDefaults = function(objValue, srcValue, key, object) {
  if (objValue === undefined || (equals(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
  	//if objValue doesnt exist OR objValue is part of the prototype and it doesnt have own prop
    return srcValue;
  }
  return objValue;
}

let defaults = function(defaults = {}, obj) {
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

export { clamp, isNumber, isObject, isString, random, defaults };
