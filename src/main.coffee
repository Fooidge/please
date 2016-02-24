please.Color = (color) -> new Color color

PHI = 0.618033988749895

makeColorDefaults =
	hue: null
	saturation: null
	value: null
	base_color: ''
	baseColor: ''
	greyscale: false
	grayscale: false #whatever I support them both, murrica
	golden: true
	full_random: false
	fillRandom: false
	colors_returned: 1
	colorsReturned: 1
	format: 'hex'

please.generateFromBaseColor = (baseColor) ->
	color = new Color()
	base = new Color baseColor
	color.hue clamp(randomInt(base.hue() - 5, base.hue() + 5), 0, 360)
	if base.saturation() is 0 then color.saturation 0
	else color.saturation randomFloat(0.4, 0.85)
	color.value randomFloat(0.4, 0.85)
	return color

please.generate = please.generateGolden = ->
	color = new Color()
	hue = randomInt(0, 359)
	color.hue (hue + (hue/PHI) % 360)
	color.saturation randomFloat(0.4, 0.85)
	color.value randomFloat(0.4, 0.85)
	return color

please.generateRandom = ->
	color = new Color()
	color.hue randomInt(0, 359)
	color.saturation randomFloat(0, 1.0)
	color.value randomFloat(0, 1.0)
	return color

deprecationLayer = (options) ->
	if options.base_color isnt ''
		console.warn 'The option base_color is deprecated and will be removed soon. Use baseColor instead.'
		options.baseColor = options.base_color

	if options.full_random isnt false
		console.warn 'The option full_random is deprecated and will be removed soon. Use fullRandom instead.'
		options.fullRandom = options.full_random

	if options.colors_returned isnt 1
		console.warn 'The option colors_returned is deprecated and will be removed soon. Use colorsReturned instead.'
		options.colorsReturned = options.colors_returned

	return options


please.make_color = (options = {}) ->
	console.warn 'The function make_color() is deprecated and will be removed soon. Use makeColor() instead.'
	please.makeColor options
	return

please.makeColor = (options = {}) ->
	#remove deprecation layer after 3 months in the wild
	opts = deprecationLayer defaults(makeColorDefaults, options)
	console.log opts
	colors = []
	for i in [0..options.colorsReturned] by 1
		colors[colors.length] = please.generate()

	return colors