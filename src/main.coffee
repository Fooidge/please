please.Color = (color) -> new Color color

PHI = 0.618033988749895

please.generateFromBaseColor = (baseColor) ->
	color = new Color()
	base = new Color baseColor
	color.hue clamp(randomInt(base.hue() - 5, base.hue() + 5), 0, 360)
	if base.saturation() is 0 then color.saturation 0
	else color.saturation randomFloat(0.4, 0.85)
	color.value randomFloat(0.4, 0.85)
	return color

please.generateGolden = ->
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


please.makeColor = (options = {}) ->

	# for i in [0..options.colorsReturned] by 1
	# 	generate()


	colors = []
	color = new Color()
	if options.baseColor?
		generateFromBaseColor options.baseColor
		return

		color.hue clamp(randomInt(base.hue() - 5, base.hue() + 5), 0 , 360)
		if base.saturation() is 0 then color.saturation 0
	else
		color.hue randomInt(0, 359)
	color.saturation randomFloat(0.4, 0.85)
	color.value randomFloat(0.4, 0.85)
	colors.push color.hsv()
	return colors