import {
	isObject,
	isString,
	isNumber,
	clamp
} from 'lodash';
import { htmlColors } from './htmlColors';

export default class Color {
	constructor(color) {
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
		if (isObject(color) && (color.h != null) && (color.s != null) && (color.v != null)) {
			return true;
		}
		return false;
	}

	_isHsl(color) {
		if (isObject(color) && (color.h != null) && (color.s != null) && (color.l != null)) {
			return true;
		}
		return false;
	}

	_isHslString(color) {
		let hslTest = /hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i;
		if (isString(color) && hslTest.test(color)) {
			return true;
		}
		return false;
	}

	_isRgb(color) {
		if (isObject(color) && (color.r != null) && (color.g != null) && (color.b != null)) {
			return true;
		}
		return false;
	}

	_isRgbString(color) {
		let rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;
		if (isString(color) && rgbTest.test(color)) {
			return true;
		}
		return false;
	}

	_isHex(color) {
		let hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i;
		if (isString(color) && hexTest.test(color)) {
			return true;
		}
		return false;
	}

	_isXyz(color) {
		if (isObject(color) && (color.x != null) && (color.y != null) && (color.z != null)) {
			return true;
		}
		return false;
	}

	_isLab(color) {
		if (isObject(color) && (color.l != null) && (color.a != null) && (color.b != null)) {
			return true;
		}
		return false;
	}

	_isCmy(color) {
		if (isObject(color) && (color.c != null) && (color.m != null) && (color.y != null)) {
			return true;
		}
		return false;
	}

	_isCmyk(color) {
		if(this._isCmy(color) && color.k != null) {
			return true;
		}
		return false;
	}

	hue(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.h = Math.abs(value % 360);
			return this;
		}
		return this.__model.h;
	}

	saturation(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.s = clamp(value, 0, 1);
			return this;
		}
		return this.__model.s;
	}

	sat(value) {
		return this.saturation(value);
	}

	value(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.v = clamp(value, 0, 1);
			return this;
		}
		return this.__model.v;
	}

	val(value) {
		return this.value(value);
	}

	brightness(value) {
		return this.value(value);
	}

	alpha(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.a = clamp(value, 0, 1);
			return this;
		}
		return this.__model.a;
	}

	opacity(value) {
		return this.alpha(value);
	}

	red(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.r = clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).r;
	}

	green(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.g = clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).g;
	}

	blue(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.b = clamp(value, 0, 255);
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
		if (this.__model.a == null) {
			return `rgb(${r},${g},${b})`;
		}
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
		if (this.__model.a == null) {
			return `hsl(${h},${s}%,${l}%)`;
		}
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
			if (htmlColors[colorName] != null) {
				return htmlColors[colorName];
			}
		}
		throw new Error('Not a valid HTML color.');
	}


	getHtmlColors() { return htmlColors; }

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
		amount = clamp(amount, 0, 1);
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
		let white = new Color(htmlColors.white);
		this.mix(white.hsv(), amount);
		return this;
	}

	darken(amount = 0.25) {
		let black = new Color(htmlColors.black);
		this.mix(black.hsv(), amount);
		return this;
	}

	_rgbToHsv(rgb) {
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid RGB object.');
		}
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
		if (!this._isHsv(hsv)) {
			throw new Error('Not a valid HSV object.');
		}
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
		if (!this._isHex(hex)) {
			throw new Error('Not a valid hex string.');
		}
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
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid RGB object.');
		}
		let base = rgb.b | (rgb.g << 8) | (rgb.r << 16);
		return `#${(0x1000000 + base).toString(16).slice(1)}`;
	}

	_hsvToHex(hsv) { return this._rgbToHex(this._hsvToRgb(hsv)); }

	_hsvToHsl(hsv) {
		if (!this._isHsv(hsv)) {
			throw new Error('Not a valid HSV object.');
		}
		let computedL = (2 - hsv.s) * hsv.v;
		let computedS = hsv.s * hsv.v;
		if (computedL <= 1) {
			computedS = computedS / computedL;
		} else {
			computedS = computedS / (2 - computedL);
		}
		computedL = computedL / 2;

		let hslObj = {
			h: hsv.h,
			s: computedS,
			l: computedL
		};

		return hslObj;
	}

	_hslToHsv(hsl) {
		if (!this._isHsl(hsl)) {
			throw new Error('Not a valid HSL object.');
		}
		hsl.l *= 2;
		if (hsl.l <= 1) {
			hsl.s *= hsl.l;
		} else {
			hsl.s *= ( 2 - hsl.l);
		}
		let computedV = (hsl.l + hsl.s) / 2;
		let computedS = (2 * hsl.s) / (hsl.l + hsl.s);

		let hsvObj = {
			h: hsl.h,
			s: computedS,
			v: computedV
		};

		return hsvObj;
	}

	_hsvToXyz(hsv) {
		return this._rgbToXyz(this._hsvToRgb(hsv));
	}

	_xyzToHsv(xyz) {
		return this._rgbToHsv(this._xyzToRgb(xyz));
	}

	__xyzForward(value) {
		if (value > 0.04045) {
			return Math.pow((value + 0.055) / 1.055, 2.4);
		}
		return value / 12.92;
	}

	_rgbToXyz(rgb) {
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid RGB object.');
		}

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
		if (value > 0.0031308) {
			return Math.pow(value, (1/2.4)) - 0.055;
		}
		return value * 12.92;
	}

	_xyzToRgb(xyz) {
		if (!this._isXyz(xyz)) {
			throw new Error('Not a valid XYZ object.');
		}

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
		if (value > 0.008856) {
			return Math.pow(x, (1 / 3));
		}
		return (7.787 * x) + (16 / 116);
	}

	_xyzToLab(xyz) {
		if (!this._isXyz(xyz)) {
			throw new Error('Not a valid XYZ object.');
		}
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

	_labToHsv(lab) {
		return this._xyzToHsv(this._labToXyz(lab));
	}

	_hsvToLab(hsv) {
		return this._xyzToLab(this._hsvToXyz(hsv));
	}

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
		if (!this._isCmy(cmy)) {
			throw new Error('Not a valid cmy object.');
		}
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
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid rgb object.');
		}
		return this.__cmyToCmyk(this.__rgbToCmy(rgb));
	}

	_cmykToRgb(cmyk) {
		if (!this._isCmyk(cmyk)) {
			throw new Error('Not a valid cmyk object.');
		}
		return this.__cmyToRgb(this.__cmykToCmy(cmyk));
	}

	_cmykToHsv(cmyk) {
		return this._rgbToHsv(this._cmykToRgb(cmyk));
	}

	_hsvToCmyk(hsv) {
		return this._rgbToCmyk(this._hsvToRgb(hsv));
	}

};



