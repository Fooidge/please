import _ from 'lodash';

export default class Color {
	constructor(color) {
		this._detectType = this._detectType.bind(this);
		this.hue = this.hue.bind(this);
		this.saturation = this.saturation.bind(this);
		this.value = this.value.bind(this);
		this.alpha = this.alpha.bind(this);
		this.red = this.red.bind(this);
		this.green = this.green.bind(this);
		this.blue = this.blue.bind(this);
		this.rgb = this.rgb.bind(this);
		this.rgbString = this.rgbString.bind(this);
		this.hsl = this.hsl.bind(this);
		this.hslString = this.hslString.bind(this);
		this.hsv = this.hsv.bind(this);
		this.xyz = this.xyz.bind(this);
		this.hex = this.hex.bind(this);
		this.html = this.html.bind(this);
		this.getHtmlColor = this.getHtmlColor.bind(this);
		this.getHtmlColors = this.getHtmlColors.bind(this);
		this.contrast = this.contrast.bind(this);
		this.mix = this.mix.bind(this);
		this.lighten = this.lighten.bind(this);
		this.darken = this.darken.bind(this);
		this._rgbToHsv = this._rgbToHsv.bind(this);
		this._hsvToRgb = this._hsvToRgb.bind(this);
		this._hexToRgb = this._hexToRgb.bind(this);
		this._hexToHsv = this._hexToHsv.bind(this);
		this._rgbToHex = this._rgbToHex.bind(this);
		this._hsvToHex = this._hsvToHex.bind(this);
		this._hsvToHsl = this._hsvToHsl.bind(this);
		this._hslToHsv = this._hslToHsv.bind(this);
		this._hsvToXyz = this._hsvToXyz.bind(this);
		this._xyzToHsv = this._xyzToHsv.bind(this);
		this._rgbToXyz = this._rgbToXyz.bind(this);
		this._xyzToRgb = this._xyzToRgb.bind(this);
		this._xyzToLab = this._xyzToLab.bind(this);
		this._labToXyz = this._labToXyz.bind(this);
		this._labToHsv = this._labToHsv.bind(this);
		this._hsvToLab = this._hsvToLab.bind(this);
		this.__cmyToCmyk = this.__cmyToCmyk.bind(this);
		this._rgbToCmyk = this._rgbToCmyk.bind(this);
		this._cmykToRgb = this._cmykToRgb.bind(this);
		this._cmykToHsv = this._cmykToHsv.bind(this);
		this._hsvToCmyk = this._hsvToCmyk.bind(this);
		if (color != null) {
			switch (this._detectType(color)) {
				case 'HSV':
					this.__model = {
						h: color.h,
						s: color.s,
						v: color.v
					};
					break;
				case 'HSL': this.__model = this._hslToHsv(color); break;
				case 'RGB': this.__model = this._rgbToHsv(color); break;
				case 'HEX': this.__model = this._hexToHsv(color); break;
				case 'XYZ': this.__model = this._xyzToHsv(color); break;
				case 'LAB': this.__model = this._labToHsv(color); break;
				case 'CMYK': this.__model = this._cmykToHsv(color); break;
			}
		} else {
			this.__model = {
				h: 0,
				s: 0,
				v: 0
			};
		}
	}

	_detectType(color) {
		if (this._isHsv(color)) { return 'HSV'; }
		if (this._isHsl(color)) { return 'HSL'; }
		if (this._isRgb(color)) { return 'RGB'; }
		if (this._isRgbString(color)) { return 'RGB_STRING'; }
		if (this._isHex(color)) { return 'HEX'; }
		if (this._isXyz(color)) { return 'XYZ'; }
		if (this._isLab(color)) { return 'LAB'; }
		if (this._isCmyk(color)) { return 'CMYK'; }
		throw new Error('Not a valid color type.');
	}

	_isHsv(color) {
		if (_.isObject(color) && (color.h != null) && (color.s != null) && (color.v != null)) { return true; }
		return false;
	}

	_isHsl(color) {
		if (_.isObject(color) && (color.h != null) && (color.s != null) && (color.l != null)) {
			return true;
		}
		return false;
	}

	_isHslString(color) {
		let hslTest = /hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i;
		if (_.isString(color) && hslTest.test(color)) {
			return true;
		}
		return false;
	}

	_isRgb(color) {
		if (_.isObject(color) && (color.r != null) && (color.g != null) && (color.b != null)) {
			return true;
		}
		return false;
	}

	_isRgbString(color) {
		let rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;
		if (_.isString(color) && rgbTest.test(color)) {
			return true;
		}
		return false;
	}

	_isHex(color) {
		let hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i;
		if (_.isString(color) && hexTest.test(color)) {
			return true;
		}
		return false;
	}

	_isXyz(color) {
		if (_.isObject(color) && (color.x != null) && (color.y != null) && (color.z != null)) {
			return true;
		}
		return false;
	}

	_isLab(color) {
		if (_.isObject(color) && (color.l != null) && (color.a != null) && (color.b != null)) {
			return true;
		}
		return false;
	}

	_isCmy(color) {
		if (_.isObject(color) && (color.c != null) && (color.m != null) && (color.y != null)) {
			return true;
		}
		return false;
	}

	_isCmyk(color) {
		if (_.isObject(color) && (color.c != null) && (color.m != null) && (color.y != null) && (color.k != null)) {
			return true;
		}
		return false;
	}

	hue(value) {
		if ((value != null) && _.isNumber(value)) {
			this.__model.h = Math.abs(value % 360);
			return this;
		}
		return this.__model.h;
	}

	saturation(value) {
		if ((value != null) && _.isNumber(value)) {
			this.__model.s = _.clamp(value, 0, 1);
			return this;
		}
		return this.__model.s;
	}

	sat = this.prototype.saturation;

	value(value) {
		if ((value != null) && _.isNumber(value)) {
			this.__model.v = _.clamp(value, 0, 1);
			return this;
		}
		return this.__model.v;
	}

	val = this.prototype.value;

	brightness = this.prototype.value;

	alpha(value) {
		if ((value != null) && _.isNumber(value)) {
			this.__model.a = _.clamp(value, 0, 1);
			return this;
		}
		return this.__model.a;
	}

	opacity = this.prototype.alpha;

	red(value) {
		if ((value != null) && _.isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.r = _.clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).r;
	}

	green(value) {
		if ((value != null) && _.isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.g = _.clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).g;
	}

	blue(value) {
		if ((value != null) && _.isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.b = _.clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).b;
	}

	rgb(value) {
		if (value != null) {
			this.__model = this._rgbToHsv(value);
			return this;
		}
		return this._hsvToRgb(this.__model);
	}

	rgbString() {
		let rgb = this.rgb();
		let r = Math.round(rgb.r);
		let g = Math.round(rgb.g);
		let b = Math.round(rgb.b);
		if (this.__model.a == null) { return `rgb(${r},${g},${b})`; }
		return `rgba(${r},${g},${b},${this.__model.a})`;
	}

	hsl(value) {
		if (value != null) {
			this.__model = this._hslToHsv(value);
			return this;
		}
		return this._hsvToHsl(this.__model);
	}

	hslString() {
		let hsl = this._hsvToHsl(this.__model);
		let { h } = hsl;
		let s = hsl.s * 100;
		let l = hsl.l * 100;
		if (this.__model.a == null) { return `hsl(${h},${s}%,${l}%)`; }
		return `hsla(${h},${s}%,${l}%,${this.__model.a})`;
	}

	hsv(value) {
		if ((value != null) && this._isHsv(value)) {
			this.__model = value;
			return this;
		}
		return this.__model;
	}

	xyz(value) {
		if ((value != null) && this._isXyz(value)) {
			this.__model = this._xyzToHsv(value);
			return this;
		}
		return this._hsvToXyz(this.__model);
	}

	hex(value) {
		if ((value != null) && this._isHex(value)) {
			this.__model = this._hexToHsv(value);
			return this;
		}
		return this._hsvToHex(this.__model);
	}

	html(value) {
		this.__model = this._hexToHsv(this.getHtmlColor(value));
		return this;
	}

	getHtmlColor(value) {
		if (value != null) {
			let colorName = value.toString().toLowerCase();
			if (this._htmlColors[colorName] != null) { return this._htmlColors[colorName]; }
		}
		throw new Error('Not a valid HTML color.');
	}


	getHtmlColors() { return this._htmlColors; }

	//true for white false for black
	contrast() {
		let rgb = this.rgb();
		let yiqR = rgb.r * 299;
		let yiqG = rgb.g * 587;
		let yiqB = rgb.b * 114;
		let yiq = (yiqR + yiqG + yiqB) / 1000;
		if (yiq < 128) { return true; }
		return false;
	}

	//cmyk style mixing
	mix(color, amount = 0.5) {
		let cmyk = this._hsvToCmyk(this.__model);
		let mixer = this._hsvToCmyk(color);
		amount = _.clamp(amount, 0, 1);
		let remainder = 1 - amount;

		let result = {
			c: (cmyk.c * remainder) + (mixer.c * amount),
			m: (cmyk.m * remainder) + (mixer.m * amount),
			y: (cmyk.y * remainder) + (mixer.y * amount),
			k: (cmyk.k * remainder) + (mixer.k * amount)
		};

		this.__model = this._cmykToHsv(result);
		return this;
	}

	lighten(amount = 0.25) {
		let white = new Color(this._htmlColors.white);
		this.mix(white.hsv(), amount);
		return this;
	}

	darken(amount = 0.25) {
		let black = new Color(this._htmlColors.black);
		this.mix(black.hsv(), amount);
		return this;
	}

	_rgbToHsv(rgb) {
		if (!this._isRgb(rgb)) { throw new Error('Not a valid RGB object.'); }
		let r = rgb.r / 255;
		let g = rgb.g / 255;
		let b = rgb.b / 255;
		let minRgb = Math.min(r, Math.min(g, b));
		let maxRgb = Math.max(r, Math.max(g, b));
		//Black-gray-white
		if (minRgb === maxRgb) {
			var hsvObj = {
				h: 0,
				s: 0,
				v: minRgb
			};
			return hsvObj;
		}
		//Colors other than black-gray-white:
		let d = r === minRgb ? g - b : b === minRgb ? r - g : b - r;
		let h = r === minRgb ? 3 : b === minRgb ? 1 : 5;
		var hsvObj = {
			h: 60 * (h - (d/(maxRgb - minRgb))),
			s: (maxRgb - minRgb)/maxRgb,
			v: maxRgb
		};
		return hsvObj;
	}

	_hsvToRgb(hsv) {
		if (!this._isHsv(hsv)) { throw new Error('Not a valid HSV object.'); }
		let h = hsv.h % 360;
		let { s } = hsv;
		let { v } = hsv;

		//no saturation case
		if (s === 0) {
			let computedV = v * 255;
			var rgbObj = {
				r: computedV,
				g: computedV,
				b: computedV
			};
			return rgbObj;
		}

		h /= 60;
		let i = Math.floor(h);
		let f = h - i;
		let p = v * (1 - s);
		let q = v * (1 - (s * f));
		let t = v * (1 - (s * (1 - f)));

		switch (i) {
			case 0:
				var r = v;
				var g = t;
				var b = p;
				break;
			case 1:
				r = q;
				g = v;
				b = p;
				break;
			case 2:
				r = p;
				g = v;
				b = t;
				break;
			case 3:
				r = p;
				g = q;
				b = v;
				break;
			case 4:
				r = t;
				g = p;
				b = v;
				break;
			case 5:
				r = v;
				g = p;
				b = q;
				break;
		}

		var rgbObj = {
			r: Math.floor(r * 255),
			g: Math.floor(g * 255),
			b: Math.floor(b * 255)
		};

		return rgbObj;
	}

	_hexToRgb(hex) {
		if (!this._isHex(hex)) { throw new Error('Not a valid hex string.'); }
		//expand to long version
		hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
		//remove everything expect valid numbers
		hex = hex.replace(/[^0-9a-f]/gi, '');
		let parsedHex = parseInt(hex, 16);
		let rgbObj = {
			r: (parsedHex >> 16) & 255,
			g: (parsedHex >> 8) & 255,
			b: parsedHex & 255
		};
		return rgbObj;
	}

	_hexToHsv(hex) { return this._rgbToHsv(this._hexToRgb(hex)); }

	_rgbToHex(rgb) {
		if (!this._isRgb(rgb)) { throw new Error('Not a valid RGB object.'); }
		let base = rgb.b | (rgb.g << 8) | (rgb.r << 16);
		return `#${(0x1000000 + base).toString(16).slice(1)}`;
	}

	_hsvToHex(hsv) { return this._rgbToHex(this._hsvToRgb(hsv)); }

	_hsvToHsl(hsv) {
		if (!this._isHsv(hsv)) { throw new Error('Not a valid HSV object.'); }
		let computedL = (2 - hsv.s) * hsv.v;
		let computedS = hsv.s * hsv.v;
		if (computedL <= 1) { computedS = computedS / computedL;
		} else { computedS = computedS / (2 - computedL); }
		computedL = computedL / 2;

		let hslObj = {
			h: hsv.h,
			s: computedS,
			l: computedL
		};

		return hslObj;
	}

	_hslToHsv(hsl) {
		if (!this._isHsl(hsl)) { throw new Error('Not a valid HSL object.'); }
		hsl.l *= 2;
		if (hsl.l <= 1) { hsl.s *= hsl.l;
		} else { hsl.s *= ( 2 - hsl.l); }
		let computedV = (hsl.l + hsl.s) / 2;
		let computedS = (2 * hsl.s) / (hsl.l + hsl.s);

		let hsvObj = {
			h: hsl.h,
			s: computedS,
			v: computedV
		};

		return hsvObj;
	}

	_hsvToXyz(hsv) { return this._rgbToXyz(this._hsvToRgb(hsv)); }

	_xyzToHsv(xyz) { return this._rgbToHsv(this._xyzToRgb(xyz)); }

	__xyzForward(value) {
		if (value > 0.04045) { return Math.pow((value + 0.055) / 1.055, 2.4); }
		return value / 12.92;
	}

	_rgbToXyz(rgb) {
		if (!this._isRgb(rgb)) { throw new Error('Not a valid RGB object.'); }

		let r = this.__xyzForward(rgb.r);
		let g = this.__xyzForward(rgb.g);
		let b = this.__xyzForward(rgb.b);

		let xyzObj = {
			x: (r * 0.4124) + (g * 0.3576) + (b * 0.1805),
			y: (r * 0.2126) + (g * 0.7152) + (b * 0.0722),
			z: (r * 0.0193) + (g * 0.1192) + (b * 0.9505)
		};

		return xyzObj;
	}

	__xyzBackward(value) {
		if (value > 0.0031308) { return Math.pow(value, (1/2.4)) - 0.055; }
		return value * 12.92;
	}

	_xyzToRgb(xyz) {
		if (!this._isXyz(xyz)) { throw new Error('Not a valid XYZ object.'); }

		let r = (xyz.x * 3.2406) + (xyz.y * -1.5372) + (xyz.z * -0.4986);
		let g = (xyz.x * -0.9689) + (xyz.y * 1.8758) + (xyz.z * 0.0415);
		let b = (xyz.x * 0.0557) + (xyz.y * -0.2040) + (xyz.z * 1.057);

		let rgbObj = {
			r: this.__xyzBackward(r),
			g: this.__xyzBackward(g),
			b: this.__xyzBackward(b)
		};

		return rgbObj;
	}

	__labForward(value) {
		if (value > 0.008856) { return Math.pow(x, (1 / 3)); }
		return (7.787 * x) + (16 / 116);
	}

	_xyzToLab(xyz) {
		if (!this._isXyz(xyz)) { throw new Error('Not a valid XYZ object.'); }
		// CIE-L*ab D65/2' 1931
		let x = this.__labForward(xyz.x * 0.9504285);
		let y = this.__labForward(xyz.y);
		let z = this.__labForward(xyz.z * 1.0889);

		let labObj = {
			l: ((116 * y) - 16) / 100, //[0-100]
			a: ((500 * (x - y)) + 128) / 255, //[-128-127]
			b: ((200 * (y - z)) + 128) / 255 //[-128-127]
		};

		return labObj;
	}

	__labBackward(value) {
		let thirded = Math.pow(value, 3);
		if (thirded > 0.008856) { return thirded; }
		return (value - (16 / 116)) / 7.787;
	}

	_labToXyz(lab) {
		if (!this._isLab(lab)) { throw new Error('Not a valid LAB object'); }

		let l = lab.l * 100;
		let a = (lab.a * 255) - 128;
		let b = (lab.b * 255) - 128;

		let y = (l + 16) / 116;
		let x = (a / 500) + y;
		let z = y - (b / 200);

		let xyzObj = {
			x: this.__labBackward(x) * 0.9504285,
			y: this.__labBackward(y),
			z: this.__labBackward(z) * 1.0889
		};

		return xyzObj;
	}

	_labToHsv(lab) { return this._xyzToHsv(this._labToXyz(lab)); }

	_hsvToLab(hsv) { return this._xyzToLab(this._hsvToXyz(hsv)); }

	__rgbToCmy(rgb) {
		let cmyObj = {
			c: 1 - rgb.r,
			m: 1 - rgb.g,
			y: 1 - rgb.b
		};

		return cmyObj;
	}

	__cmyToRgb(cmy) {
		let rgbObj = {
			r: 1 - cmy.c,
			g: 1 - cmy.m,
			b: 1 - cmy.y
		};

		return rgbObj;
	}

	__cmyToCmyk(cmy) {
		if (!this._isCmy(cmy)) { throw new Error('Not a valid cmy object.'); }
		let K = 1;

		if (cmy.x < K) { K = cmy.c; }
		if (cmy.m < K) { K = cmy.m; }
		if (cmy.y < K) { K = cmy.y; }

		if (K === 1) {
			var cmykObj = {
				c: 0,
				m: 0,
				y: 0,
				k: 1
			};

			return cmykObj;
		}

		var cmykObj = {
			c: (cmy.c - K)/(1 - K),
			m: (cmy.m - K)/(1 - K),
			y: (cmy.y - K)/(1 - K),
			k: K
		};

		return cmykObj;
	}

	__cmykToCmy(cmyk) {
		let K = cmyk.k;
		let cmyObj = {
			c: (cmyk.c * (1 - K)) + K,
			m: (cmyk.m * (1 - K)) + K,
			y: (cmyk.y * (1 - K)) + K
		};

		return cmyObj;
	}

	_rgbToCmyk(rgb) {
		if (!this._isRgb(rgb)) { throw new Error('Not a valid rgb object.'); }
		return this.__cmyToCmyk(this.__rgbToCmy(rgb));
	}

	_cmykToRgb(cmyk) {
		if (!this._isCmyk(cmyk)) { throw new Error('Not a valid cmyk object.'); }
		return this.__cmyToRgb(this.__cmykToCmy(cmyk));
	}

	_cmykToHsv(cmyk) { return this._rgbToHsv(this._cmykToRgb(cmyk)); }

	_hsvToCmyk(hsv) { return this._rgbToCmyk(this._hsvToRgb(hsv)); }

	_htmlColors = {
		aliceblue: 'F0F8FF',
		antiquewhite: 'FAEBD7',
		aqua: '00FFFF',
		aquamarine: '7FFFD4',
		azure: 'F0FFFF',
		beige: 'F5F5DC',
		bisque: 'FFE4C4',
		black: '000000',
		blanchedalmond: 'FFEBCD',
		blue: '0000FF',
		blueviolet: '8A2BE2',
		brown: 'A52A2A',
		burlywood: 'DEB887',
		cadetblue: '5F9EA0',
		chartreuse: '7FFF00',
		chocolate: 'D2691E',
		coral: 'FF7F50',
		cornflowerblue: '6495ED',
		cornsilk: 'FFF8DC',
		crimson: 'DC143C',
		cyan: '00FFFF',
		darkblue: '00008B',
		darkcyan: '008B8B',
		darkgoldenrod: 'B8860B',
		darkgray: 'A9A9A9',
		darkgrey: 'A9A9A9',
		darkgreen: '006400',
		darkkhaki: 'BDB76B',
		darkmagenta: '8B008B',
		darkolivegreen: '556B2F',
		darkorange: 'FF8C00',
		darkorchid: '9932CC',
		darkred: '8B0000',
		darksalmon: 'E9967A',
		darkseagreen: '8FBC8F',
		darkslateblue: '483D8B',
		darkslategray: '2F4F4F',
		darkslategrey: '2F4F4F',
		darkturquoise: '00CED1',
		darkviolet: '9400D3',
		deeppink: 'FF1493',
		deepskyblue: '00BFFF',
		dimgray: '696969',
		dimgrey: '696969',
		dodgerblue: '1E90FF',
		firebrick: 'B22222',
		floralwhite: 'FFFAF0',
		forestgreen: '228B22',
		fuchsia: 'FF00FF',
		gainsboro: 'DCDCDC',
		ghostwhite: 'F8F8FF',
		gold: 'FFD700',
		goldenrod: 'DAA520',
		gray: '808080',
		grey: '808080',
		green: '008000',
		greenyellow: 'ADFF2F',
		honeydew: 'F0FFF0',
		hotpink: 'FF69B4',
		indianred: 'CD5C5C',
		indigo: '4B0082',
		ivory: 'FFFFF0',
		khaki: 'F0E68C',
		lavender: 'E6E6FA',
		lavenderblush: 'FFF0F5',
		lawngreen: '7CFC00',
		lemonchiffon: 'FFFACD',
		lightblue: 'ADD8E6',
		lightcoral: 'F08080',
		lightcyan: 'E0FFFF',
		lightgoldenrodyellow: 'FAFAD2',
		lightgray: 'D3D3D3',
		lightgrey: 'D3D3D3',
		lightgreen: '90EE90',
		lightpink: 'FFB6C1',
		lightsalmon: 'FFA07A',
		lightseagreen: '20B2AA',
		lightskyblue: '87CEFA',
		lightslategray: '778899',
		lightslategrey: '778899',
		lightsteelblue: 'B0C4DE',
		lightyellow: 'FFFFE0',
		lime: '00FF00',
		limegreen: '32CD32',
		linen: 'FAF0E6',
		magenta: 'FF00FF',
		maroon: '800000',
		mediumaquamarine: '66CDAA',
		mediumblue: '0000CD',
		mediumorchid: 'BA55D3',
		mediumpurple: '9370D8',
		mediumseagreen: '3CB371',
		mediumslateblue: '7B68EE',
		mediumspringgreen: '00FA9A',
		mediumturquoise: '48D1CC',
		mediumvioletred: 'C71585',
		midnightblue: '191970',
		mintcream: 'F5FFFA',
		mistyrose: 'FFE4E1',
		moccasin: 'FFE4B5',
		navajowhite: 'FFDEAD',
		navy: '000080',
		oldlace: 'FDF5E6',
		olive: '808000',
		olivedrab: '6B8E23',
		orange: 'FFA500',
		orangered: 'FF4500',
		orchid: 'DA70D6',
		palegoldenrod: 'EEE8AA',
		palegreen: '98FB98',
		paleturquoise: 'AFEEEE',
		palevioletred: 'D87093',
		papayawhip: 'FFEFD5',
		peachpuff: 'FFDAB9',
		peru: 'CD853F',
		pink: 'FFC0CB',
		plum: 'DDA0DD',
		powderblue: 'B0E0E6',
		purple: '800080',
		rebeccapurple: '663399',
		red: 'FF0000',
		rosybrown: 'BC8F8F',
		royalblue: '4169E1',
		saddlebrown: '8B4513',
		salmon: 'FA8072',
		sandybrown: 'F4A460',
		seagreen: '2E8B57',
		seashell: 'FFF5EE',
		sienna: 'A0522D',
		silver: 'C0C0C0',
		skyblue: '87CEEB',
		slateblue: '6A5ACD',
		slategray: '708090',
		slategrey: '708090',
		snow: 'FFFAFA',
		springgreen: '00FF7F',
		steelblue: '4682B4',
		tan: 'D2B48C',
		teal: '008080',
		thistle: 'D8BFD8',
		tomato: 'FF6347',
		turquoise: '40E0D0',
		violet: 'EE82EE',
		wheat: 'F5DEB3',
		white: 'FFFFFF',
		whitesmoke: 'F5F5F5',
		yellow: 'FFFF00',
		yellowgreen: '9ACD32'
	};
};



