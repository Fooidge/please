#lodash - isObject
isObject = (value) ->
	type = typeof value
	return !!value and (type is 'object' or type is 'function')

isArray = Array.isArray

#lodash - isObjectLike
isObjectLike = (value) -> !!value &&typeof value is 'object'

#lodash - isString (modified)
isString = (value) -> typeof value is 'string' or (!isArray(value) and isObjectLike(value))

objToString = Object.prototype.toString

isNumber = (value) -> typeof value is 'number' or (isObjectLike(value) and objToString.call(value) is '[object Number]')

isNaN = (value) -> isNumber(value) and value isnt +value

#clamp values between two points default (value, 0, 1)
clamp = (value, min = 0, max = 1) -> Math.max(min, Math.min(value, max))

randomInt = (min, max) -> Math.floor Math.random() * (max - min + 1) + min

randomFloat = (min, max) -> Math.random() * (max - min) + min

#shallow defaults
defaults = (defaults = {}, object) ->
	for key, value of object
		if object.hasOwnProperty key
			defaults[key] = object[key]
	return defaults