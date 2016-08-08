let Xyz = function() {

	this.__xyzForward = function(value) {
		if (value > 0.04045) {
			return Math.pow((value + 0.055) / 1.055, 2.4);
		}
		return value / 12.92;
	};

	this.__xyzBackward = function(value) {
		if (value > 0.0031308) {
			return Math.pow(value, (1/2.4)) - 0.055;
		}
		return value * 12.92;
	};

	this._xyzToHsv = function(xyz) {
		return this._rgbToHsv(this._xyzToRgb(xyz));
	};

	this._xyzToRgb = function(xyz) {
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
	};

	this._xyzToLab = function(xyz) {
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
	};

	this.xyz = function(value) {
		if ((value != null) && this._isXyz(value)) {
			this.__model = this._xyzToHsv(value);
			return this;
		}
		return this._hsvToXyz(this.__model);
	};

};

export default Xyz;