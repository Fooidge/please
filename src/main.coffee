# class Pathos
# 	constructor: (element, transformations, options) ->
# 		if !element instanceof SVGElement
# 			throw new Error 'not an SVG Element'
# 		return

pathos.animate = (element) ->
	if !(element instanceof SVGElement)
		throw new Error 'not an SVG Element'
	return