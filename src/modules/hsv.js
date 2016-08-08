import {
	isNumber,
	clamp
} from 'lodash';

let Hsv = function () {

	this._hsvToRgb = function(hsv) {
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
		let r, g, b;

		switch (i) {
			case 0:
				r = v;
				g = t;
				b = p;
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
	};

	this._hsvToHex = function(hsv) {
		return this._rgbToHex(this._hsvToRgb(hsv));
	};

	this._hsvToHsl = function(hsv) {
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
	};

	this._hsvToXyz = function(hsv) {
		return this._rgbToXyz(this._hsvToRgb(hsv));
	};

	this._hsvToCmyk = function(hsv) {
		return this._rgbToCmyk(this._hsvToRgb(hsv));
	};

	this._hsvToLab = function(hsv) {
		return this._xyzToLab(this._hsvToXyz(hsv));
	};

	/**
	 * Getter/Setter for hue property.
	 * @param  {Number} value
	 * @return {Object}
	 */
	this.hue = function(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.h = Math.abs(value % 360);
			return this;
		}
		return this.__model.h;
	};

	/**
	 * Getter/Setter for saturation property.
	 * @param  {Number} value
	 * @return {Object}
	 */
	this.saturation = function(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.s = clamp(value, 0, 1);
			return this;
		}
		return this.__model.s;
	};

	/**
	 * Alias for saturation.
	 * @param  {Number} value
	 * @return {Function}
	 */
	this.sat = function(value) {
		return this.saturation(value);
	};

	/**
	 * Getter/Setter for value property.
	 * @param  {Number} value
	 * @return {Object}
	 */
	this.value = function(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.v = clamp(value, 0, 1);
			return this;
		}
		return this.__model.v;
	};

	/**
	 * Alias for value.
	 * @param  {Number} value
	 * @return {Function}
	 */
	this.val = function(value) {
		return this.value(value);
	};

	/**
	 * Alias for value.
	 * @param  {Number} value
	 * @return {Function}
	 */
	this.brightness = function(value) {
		return this.value(value);
	};

	this.hsv = function(value) {
		if ((value != null) && this._isHsv(value)) {
			let adjustedHsv = {
				h: clamp(value.h, 0, 1.0),
				s: value.s,
				v: value.v
			};
			this.__model = adjustedHsv;
			return this;
		}
		return this.__model;
	};
};

export default Hsv;