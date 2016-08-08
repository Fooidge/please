import {
	isNumber,
	clamp
} from 'lodash';

let Rgb = function () {

	this.red = function(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.r = clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).r;
	};

	this.green = function(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.g = clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).g;
	};

	this.blue = function(value) {
		if ((value != null) && isNumber(value)) {
			let rgb = this._hsvToRgb(this.__model);
			rgb.b = clamp(value, 0, 255);
			this.__model = this._rgbToHsv(rgb);
			return this;
		}
		return this._hsvToRgb(this.__model).b;
	};

	this.rgb = function(value) {
		if (value != null) {
			this.__model = this._rgbToHsv(value);
			return this;
		}
		return this._hsvToRgb(this.__model);
	};

	this.rgbString = function() {
		let rgb = this.rgb();
		let r = Math.round(rgb.r);
		let g = Math.round(rgb.g);
		let b = Math.round(rgb.b);
		if (this.__model.a == null) {
			return `rgb(${r},${g},${b})`;
		}
		return `rgba(${r},${g},${b},${this.__model.a})`;
	};

	this._rgbToHsv = function(rgb) {
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
	};

	this._rgbToHex = function(rgb) {
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid RGB object.');
		}
		let base = rgb.b | (rgb.g << 8) | (rgb.r << 16);
		return `#${(0x1000000 + base).toString(16).slice(1)}`;
	};

	this._rgbToXyz = function(rgb) {
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
	};

	this.__rgbToCmy = function(rgb) {
		let cmyObj = {
			c: 1 - rgb.r,
			m: 1 - rgb.g,
			y: 1 - rgb.b
		};

		return cmyObj;
	};

	this._rgbToCmyk = function(rgb) {
		if (!this._isRgb(rgb)) {
			throw new Error('Not a valid rgb object.');
		}
		return this.__cmyToCmyk(this.__rgbToCmy(rgb));
	};

};

export default Rgb;