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
	format: null

please.generateFromBaseColor = (baseColor) ->
	color = new Color()
	base = new Color baseColor
	color.hue clamp(_.random(base.hue() - 5, base.hue() + 5), 0, 360)
	if base.saturation() is 0 then color.saturation 0
	else color.saturation _.random(0.4, 0.85, true)
	color.value _.random(0.4, 0.85, true)
	return color

please.generate = please.generateGolden = ->
	color = new Color()
	hue = _.random 0, 359
	color.hue ((hue + (hue/PHI)) % 360)
	color.saturation _.random(0.4, 0.85, true)
	color.value _.random(0.4, 0.85, true)
	return color

please.generateRandom = ->
	color = new Color()
	color.hue _.random(0, 359)
	color.saturation _.random(0, 1.0, true)
	color.value _.random(0, 1.0, true)
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
	opts = deprecationLayer _.defaults(makeColorDefaults, options)
	colors = []
	for i in [0..opts.colorsReturned] by 1
		colors[i] = please.generate()
		switch opts.format.toLowerCase()
			when 'hex' then colors[i] = colors[i].hex()
			when 'rgb' then colors[i] = colors[i].rgbString()
			when 'hsl' then colors[i] = colors[i].hslString()
			else
				console.warn 'Unknown format. Defaulting to hex.'
				colors[i] = colors[i].hex()


	return colors