#lodash - isObject
isObject = (value) ->
	type = typeof value
	return !!value and (type is 'object' or type is 'function')

isArray = Array.isArray

#lodash - isObjectLike
isObjectLike = (value) -> !!value &&typeof value is 'object'

#lodash - isString (modified)
isString = (value) -> typeof value is 'string' or (!isArray value and isObjectLike value)