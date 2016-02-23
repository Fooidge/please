class Color
	constructor: (color) ->
		if color?
			switch @_detectType color
				when 'HSV'
					@__model =
						h: color.h
						s: color.s
						v: color.v
				when 'HSL' then @__model = @_hslToHsv color
				when 'RGB' then @__model = @_rgbToHsv color
				when 'HEX' then @__model = @_hexToHsv color
		else
			@__model =
				h: 0
				s: 0
				v: 0

	_isHsv: (color) ->
		return true if isObject(color) and color.h? and color.s? and color.v?
		return false

	_isHsl: (color) ->
		return true if isObject(color) and color.h? and color.s? and color.l?
		return false

	_isHslString: (color) ->
		hslTest = /hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i
		return true if isString(color) and hslTest.test(color)
		return false

	_isRgb: (color) ->
		return true if isObject(color) and color.r? and color.g? and color.b?
		return false

	_isRgbString: (color) ->
		rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i
		return true if isString(color) and rgbTest.test(color)
		return false

	_isHex: (color) ->
		hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i
		return true if isString(color) and hexTest.test(color)
		return false

	hue: (value) =>
		if value? and isNumber(value)
			@__model.h = clamp value, 0, 360
			return this
		return @__model.h

	saturation: (value) =>
		if value? and isNumber(value)
			@__model.s = clamp value
			return this
		return @__model.s

	sat: @::saturation

	value: (value) =>
		if value? and isNumber(value)
			@__model.v = clamp value
			return this
		return @__model.v

	val: @::value

	brightness: @::value

	alpha: (value) =>
		if value? and isNumber(value)
			@__model.a = clamp value
			return this
		return @__model.a

	opacity: @::alpha

	red: (value) =>
		if value? and isNumber(value)
			rgb = @_hsvToRgb @__model
			rgb.r = clamp value, 0, 255
			@__model = @_rgbToHsv rgb
			return this
		return @_hsvToRgb(@__model).r

	green: (value) =>
		if value? and isNumber(value)
			rgb = @_hsvToRgb @__model
			rgb.g = clamp value, 0, 255
			@__model = @_rgbToHsv rgb
			return this
		return @_hsvToRgb(@__model).g

	blue: (value) =>
		if value? and isNumber(value)
			rgb = @_hsvToRgb @__model
			rgb.b = clamp value, 0, 255
			@__model = @_rgbToHsv rgb
			return this
		return @_hsvToRgb(@__model).b

	rgb: (value) =>
		if value?
			@__model = @_rgbToHsv value
			return this
		return @_hsvToRgb @__model

	rgbString: =>
		rgb = @_hsvToRgb @__model
		return "rgb(#{rgb.r},#{rgb.g},#{rgb.b})" if not @__model.a?
		return "rgba(#{rgb.r},#{rgb.g},#{rgb.b},#{@__model.a})"

	hsl: (value) =>
		if value?
			@__model = @_hslToHsv value
			return this
		return @_hsvToHsl @__model

	hslString: =>
		hsl = @_hsvToHsl @__model
		return "hsl(#{hsl.h},#{hsl.s * 100}%,#{hsl.l * 100}%)" if not @__model.a?
		return "hsla(#{hsl.h},#{hsl.s * 100}%,#{hsl.l * 100}%,#{@__model.a})"

	hsv: (value) =>
		if value? and @_isHsv(value)
			@__model = value
			return this
		return @__model

	hex: (value) =>
		if value?
			@__model = @_hexToHsv value
			return this
		return @_hsvToHex @__model

	html: (value) =>
		@__model = @_hexToHsv @getHtmlColor(value)
		return this

	getHtmlColor: (value) =>
		if value?
			colorName = value.toString().toLowerCase()
			if @_htmlColors[colorName]? then return @_htmlColors[colorName]
		throw new Error 'Not a valid HTML color.'


	getHtmlColors: => @_htmlColors

	#true for white false for black
	contrast: =>
		rgb = @rgb()
		yiqR = rgb.r * 299
		yiqG = rgb.g * 587
		yiqB = rgb.b * 114
		yiq = (yiqR + yiqG + yiqB)/1000
		if yiq < 128 then return true else return false

	_detectType: (color) =>
		if @_isHsv color then return 'HSV'
		if @_isHsl color then return 'HSL'
		if @_isRgb color then return 'RGB'
		if @_isRgbString color then return 'RGB_STRING'
		if @_isHex color then return 'HEX'
		throw new Error 'Not a valid color type.'

	_rgbToHsv: (rgb) =>
		if not @_isRgb rgb then throw new Error 'Not a valid RGB object.'
		r = rgb.r / 255
		g = rgb.g / 255
		b = rgb.b / 255
		minRgb = Math.min r, Math.min(g, b)
		maxRgb = Math.max r, Math.max(g, b)
		#Black-gray-white
		if minRgb is maxRgb
			hsvObj =
				h: 0
				s: 0
				v: minRgb
			return hsvObj
		#Colors other than black-gray-white:
		d = if r is minRgb then g - b else if b is minRgb then r - g else b - r
		h = if r is minRgb then 3 else if b is minRgb then 1 else 5
		hsvObj =
			h: 60 * (h - d/(maxRgb - minRgb))
			s: (maxRgb - minRgb)/maxRgb
			v: maxRgb
		return hsvObj

	_hsvToRgb: (hsv) =>
		if not @_isHsv hsv then throw new Error 'Not a valid HSV object.'
		h = hsv.h
		s = hsv.s
		v = hsv.v

		#no saturation case
		if s is 0
			rgbObj =
				r: v
				g: v
				b: v
			return rgbObj

		h /= 60
		i = Math.floor h
		f = h - i
		p = v * (1 - s)
		q = v * (1 - s * f)
		t = v * (1 - s * (1 - f))

		switch i
			when 0
				r = v
				g = t
				b = p
			when 1
				r = q
				g = v
				b = p
			when 2
				r = p
				g = v
				b = t
			when 3
				r = p
				g = q
				b = v
			when 4
				r = t
				g = p
				b = v
			when 5
				r = v
				g = p
				b = q

		rgbObj =
			r: Math.floor r * 255
			g: Math.floor g * 255
			b: Math.floor b * 255

		return rgbObj

	_hexToRgb: (hex) =>
		if not @_isHex hex then throw new Error 'Not a valid hex string.'
		#expand to long version
		hex = hex.replace /^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) -> r + r + g + g + b + b
		#remove everything expect valid numbers
		hex = hex.replace /[^0-9a-f]/gi, ''
		parsedHex = parseInt hex, 16
		rgbObj =
			r: (parsedHex >> 16) & 255
			g: (parsedHex >> 8) & 255
			b: parsedHex & 255
		return rgbObj

	_hexToHsv: (hex) => @_rgbToHsv(@_hexToRgb(hex))

	_rgbToHex: (rgb) =>
		if not @_isRgb(rgb) then throw new Error 'Not a valid RGB object.'
		base = rgb.b | (rgb.g << 8) | (rgb.r << 16)
		return "##{(0x1000000 + base).toString(16).slice(1)}"

	_hsvToHex: (hsv) => @_rgbToHex(@_hsvToRgb(hsv))

	_hsvToHsl: (hsv) =>
		if not @_isHsv hsv then throw new Error 'Not a valid HSV object.'
		computedL = (2 - hsv.s) * hsv.v
		computedS = hsv.s * hsv.v
		if computedL <= 1 then computedS = computedS / computedL
		else computedS = computedS / (2 - computedL)
		computedL = computedL / 2

		hslObj =
			h: hsv.h
			s: computedS
			l: computedL

		return hslObj

	_hslToHsv: (hsl) =>
		if not @_isHsl hsl then throw new Error 'Not a valid HSL object.'
		hsl.l *= 2
		if (hsl.l <= 1) then hsl.s *= hsl.l
		else hsl.s *= ( 2 - hsl.l)
		computedV = (hsl.l + hsl.s) / 2
		computedS = (2 * hsl.s) / (hsl.l + hsl.s)

		hsvObj =
			h: hsl.h
			s: computedS
			v: computedV

		return hsvObj

	_htmlColors:
		aliceblue: 'F0F8FF'
		antiquewhite: 'FAEBD7'
		aqua: '00FFFF'
		aquamarine: '7FFFD4'
		azure: 'F0FFFF'
		beige: 'F5F5DC'
		bisque: 'FFE4C4'
		black: '000000'
		blanchedalmond: 'FFEBCD'
		blue: '0000FF'
		blueviolet: '8A2BE2'
		brown: 'A52A2A'
		burlywood: 'DEB887'
		cadetblue: '5F9EA0'
		chartreuse: '7FFF00'
		chocolate: 'D2691E'
		coral: 'FF7F50'
		cornflowerblue: '6495ED'
		cornsilk: 'FFF8DC'
		crimson: 'DC143C'
		cyan: '00FFFF'
		darkblue: '00008B'
		darkcyan: '008B8B'
		darkgoldenrod: 'B8860B'
		darkgray: 'A9A9A9'
		darkgrey: 'A9A9A9'
		darkgreen: '006400'
		darkkhaki: 'BDB76B'
		darkmagenta: '8B008B'
		darkolivegreen: '556B2F'
		darkorange: 'FF8C00'
		darkorchid: '9932CC'
		darkred: '8B0000'
		darksalmon: 'E9967A'
		darkseagreen: '8FBC8F'
		darkslateblue: '483D8B'
		darkslategray: '2F4F4F'
		darkslategrey: '2F4F4F'
		darkturquoise: '00CED1'
		darkviolet: '9400D3'
		deeppink: 'FF1493'
		deepskyblue: '00BFFF'
		dimgray: '696969'
		dimgrey: '696969'
		dodgerblue: '1E90FF'
		firebrick: 'B22222'
		floralwhite: 'FFFAF0'
		forestgreen: '228B22'
		fuchsia: 'FF00FF'
		gainsboro: 'DCDCDC'
		ghostwhite: 'F8F8FF'
		gold: 'FFD700'
		goldenrod: 'DAA520'
		gray: '808080'
		grey: '808080'
		green: '008000'
		greenyellow: 'ADFF2F'
		honeydew: 'F0FFF0'
		hotpink: 'FF69B4'
		indianred: 'CD5C5C'
		indigo: '4B0082'
		ivory: 'FFFFF0'
		khaki: 'F0E68C'
		lavender: 'E6E6FA'
		lavenderblush: 'FFF0F5'
		lawngreen: '7CFC00'
		lemonchiffon: 'FFFACD'
		lightblue: 'ADD8E6'
		lightcoral: 'F08080'
		lightcyan: 'E0FFFF'
		lightgoldenrodyellow: 'FAFAD2'
		lightgray: 'D3D3D3'
		lightgrey: 'D3D3D3'
		lightgreen: '90EE90'
		lightpink: 'FFB6C1'
		lightsalmon: 'FFA07A'
		lightseagreen: '20B2AA'
		lightskyblue: '87CEFA'
		lightslategray: '778899'
		lightslategrey: '778899'
		lightsteelblue: 'B0C4DE'
		lightyellow: 'FFFFE0'
		lime: '00FF00'
		limegreen: '32CD32'
		linen: 'FAF0E6'
		magenta: 'FF00FF'
		maroon: '800000'
		mediumaquamarine: '66CDAA'
		mediumblue: '0000CD'
		mediumorchid: 'BA55D3'
		mediumpurple: '9370D8'
		mediumseagreen: '3CB371'
		mediumslateblue: '7B68EE'
		mediumspringgreen: '00FA9A'
		mediumturquoise: '48D1CC'
		mediumvioletred: 'C71585'
		midnightblue: '191970'
		mintcream: 'F5FFFA'
		mistyrose: 'FFE4E1'
		moccasin: 'FFE4B5'
		navajowhite: 'FFDEAD'
		navy: '000080'
		oldlace: 'FDF5E6'
		olive: '808000'
		olivedrab: '6B8E23'
		orange: 'FFA500'
		orangered: 'FF4500'
		orchid: 'DA70D6'
		palegoldenrod: 'EEE8AA'
		palegreen: '98FB98'
		paleturquoise: 'AFEEEE'
		palevioletred: 'D87093'
		papayawhip: 'FFEFD5'
		peachpuff: 'FFDAB9'
		peru: 'CD853F'
		pink: 'FFC0CB'
		plum: 'DDA0DD'
		powderblue: 'B0E0E6'
		purple: '800080'
		rebeccapurple: '663399'
		red: 'FF0000'
		rosybrown: 'BC8F8F'
		royalblue: '4169E1'
		saddlebrown: '8B4513'
		salmon: 'FA8072'
		sandybrown: 'F4A460'
		seagreen: '2E8B57'
		seashell: 'FFF5EE'
		sienna: 'A0522D'
		silver: 'C0C0C0'
		skyblue: '87CEEB'
		slateblue: '6A5ACD'
		slategray: '708090'
		slategrey: '708090'
		snow: 'FFFAFA'
		springgreen: '00FF7F'
		steelblue: '4682B4'
		tan: 'D2B48C'
		teal: '008080'
		thistle: 'D8BFD8'
		tomato: 'FF6347'
		turquoise: '40E0D0'
		violet: 'EE82EE'
		wheat: 'F5DEB3'
		white: 'FFFFFF'
		whitesmoke: 'F5F5F5'
		yellow: 'FFFF00'
		yellowgreen: '9ACD32'



