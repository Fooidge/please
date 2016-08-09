import { clamp } from '../util/util';

let Cmyk = function () {

	this.__cmyToRgb = function(cmy) {
		let rgbObj = {
			r: (1 - cmy.c) * 255,
			g: (1 - cmy.m) * 255,
			b: (1 - cmy.y) * 255
		};

		return rgbObj;
	};

	this.__cmyToCmyk = function(cmy) {
		if (!this._isCmy(cmy)) {
			throw new Error('Not a valid cmy object.');
		}
		let K = 1;

		if (cmy.x < K) {
			K = cmy.c;
		}
		if (cmy.m < K) {
			K = cmy.m;
		}
		if (cmy.y < K) {
			K = cmy.y;
		}

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
	};

	this.__cmykToCmy = function(cmyk) {
		let K = cmyk.k;
		let cmyObj = {
			c: (cmyk.c * (1 - K)) + K,
			m: (cmyk.m * (1 - K)) + K,
			y: (cmyk.y * (1 - K)) + K
		};

		return cmyObj;
	};

	this._cmykToRgb = function(cmyk) {
		if (!this._isCmyk(cmyk)) {
			throw new Error('Not a valid cmyk object.');
		}
		return this.__cmyToRgb(this.__cmykToCmy(cmyk));
	};

	this._cmykToHsv = function(cmyk) {
		return this._rgbToHsv(this._cmykToRgb(cmyk));
	};

	this.cmyk = function(value) {
		if(value != null) {
			let adjustedCmyk = {
				c: clamp(value.c, 0, 1),
				m: clamp(value.m, 0, 1),
				y: clamp(value.y, 0, 1),
				k: clamp(value.k, 0, 1)
			};
			this.__model = this._cmykToHsv(adjustedCmyk);
			return this;
		}
		return this._hsvToCmyk(this.__model);
	};

};

export default Cmyk;