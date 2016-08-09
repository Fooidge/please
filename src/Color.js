import { isNumber, clamp } from './util/util';
import ColorUtil from './modules/colorUtil';
import Hsv from './modules/hsv';
import Rgb from './modules/rgb';
import Hex from './modules/hex';
import Html from './modules/html';
import Cmyk from './modules/cmyk';
import Hsl from './modules/hsl';
import Xyz from './modules/xyz';
import Lab from './modules/lab';

export default class Color {
	constructor(color) {
		ColorUtil.call(this);
		Hsv.call(this);
		Rgb.call(this);
		Hex.call(this);
		Html.call(this);
		Cmyk.call(this);
		Hsl.call(this);
		Xyz.call(this);
		Lab.call(this);
		if (color != null) {
			switch (this._detectType(color)) {
				case 'HSV':  this.hsv(color); break;
				case 'HSL':  this.__model = this._hslToHsv(color); break;
				case 'RGB':  this.__model = this._rgbToHsv(color); break;
				case 'HEX':  this.__model = this._hexToHsv(color); break;
				case 'XYZ':  this.__model = this._xyzToHsv(color); break;
				case 'LAB':  this.__model = this._labToHsv(color); break;
				case 'CMYK': this.__model = this._cmykToHsv(color); break;
				case 'HTML': this.__model = this._htmlToHsv(color); break;
			}
		} else {
			this.hsv({
				h: 0,
				s: 0,
				v: 0
			});
		}
	}

	/**
	 * Getter/Setter for alpha property.
	 * @param  {Number} value
	 * @return {Object}
	 */
	alpha(value) {
		if ((value != null) && isNumber(value)) {
			this.__model.a = clamp(value, 0, 1);
			return this;
		}
		return this.__model.a;
	}

	/**
	 * Alias for alpha.
	 * @param  {Number} value
	 * @return {Function}
	 */
	opacity(value) {
		return this.alpha(value);
	}

	//true for white false for black
	contrast() {
		let rgb = this.rgb();
		let yiqR = rgb.r * 299;
		let yiqG = rgb.g * 587;
		let yiqB = rgb.b * 114;
		let yiq = (yiqR + yiqG + yiqB) / 1000;
		if (yiq < 128) {
			return true;
		}
		return false;
	}

	//cmyk style mixing
	mix(color, amount = 0.5) {
		let cmyk = this._hsvToCmyk(this.__model);
		let mixer = this._hsvToCmyk(color);
		amount = clamp(amount, 0, 1);
		let remainder = 1 - amount;

		let result = {
			c: clamp((cmyk.c * remainder) + (mixer.c * amount), 0, 1),
			m: clamp((cmyk.m * remainder) + (mixer.m * amount), 0, 1),
			y: clamp((cmyk.y * remainder) + (mixer.y * amount), 0, 1),
			k: clamp((cmyk.k * remainder) + (mixer.k * amount), 0, 1)
		};

		console.log(result);

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

};