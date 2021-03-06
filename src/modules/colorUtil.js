import {
	isNumber,
	isObject,
	isString,
	specTest
} from '../util/util';

let ColorUtil = function () {

	/**
	 * Detects type of color input into the constrcutor, errors if none found.
	 * @param  {Any} color
	 * @return {String} The type of color detected.
	 */
	this._detectType = function(color) {
		if (this._isHsv(color)) { return 'HSV'; }
		if (this._isHsl(color)) { return 'HSL'; }
		if (this._isRgb(color)) { return 'RGB'; }
		if (this._isRgbString(color)) { return 'RGB_STRING'; }
		if (this._isHex(color)) { return 'HEX'; }
		if (this._isXyz(color)) { return 'XYZ'; }
		if (this._isLab(color)) { return 'LAB'; }
		if (this._isCmyk(color)) { return 'CMYK'; }
		if (this._isHtml(color)) { return 'HTML'; }
		throw new Error('Not a valid color type.');
	};

	/**
	 * Returns true if color is HSV and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isHsv = function(color) {
		let spec = {
			h: { min: 0, max: 360 },
			s: { min: 0, max: 1 },
			v: { min: 0, max: 1 }
		};
		return specTest(spec, color);
	};

	/**
	 * Returns true if color is HSL and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isHsl = function(color) {
		let spec = {
			h: { min: 0, max: 360 },
			s: { min: 0, max: 100 },
			l: { min: 0, max: 100 }
		};
		return specTest(spec, color);
	};

	/**
	 * Returns true if color is an HSL string and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isHslString = function(color) {
		let hslTest = /hsl\(\s?\d{1,3},\s?\d{1,3}%,\s?\d{1,3}%\s?\)/i;
		if (isString(color) && hslTest.test(color)) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is RGB and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isRgb = function(color) {
		let spec = {
			r: { min: 0, max: 255 },
			g: { min: 0, max: 255 },
			b: { min: 0, max: 255 }
		};
		return specTest(spec, color);
	};

	/**
	 * Returns true if color is an RGB string and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isRgbString = function(color) {
		let rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;
		if (isString(color) && rgbTest.test(color)) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is an HTML color and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isHtml = function(color) {
		if (isString(color) && color.toLowerCase() in this._htmlColors) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is a Hex string and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isHex = function(color) {
		let hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i;
		if (isString(color) && hexTest.test(color)) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is XYZ and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isXyz = function(color) {
		// let spec = {
		// 	x: { min: 0, max: 255 },
		// 	y: { min: 0, max: 255 },
		// 	z: { min: 0, max: 255 }
		// };
		if (isObject(color) && (color.x != null) && (color.y != null) && (color.z != null)) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is LAB and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isLab = function(color) {
		let spec = {
			l: { min: -128, max: 127 },
			a: { min: -128, max: 127 },
			b: { min: -128, max: 127 }
		};
		return specTest(spec, color);
	};

	/**
	 * Returns true is color is CMY and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isCmy = function(color) {
		if (isObject(color) && (color.c != null) && (color.m != null) && (color.y != null)) {
			return true;
		}
		return false;
	};

	/**
	 * Returns true if color is CMYK and false otherwise.
	 * @param  {Any} color
	 * @return {Boolean}
	 */
	this._isCmyk = function(color) {
		if(this._isCmy(color) && color.k != null) {
			return true;
		}
		return false;
	};
}

export default ColorUtil;