let Hex = function() {

	this._hexToRgb = function(hex) {
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
	};

	this._hexToHsv = function(hex) {
		return this._rgbToHsv(this._hexToRgb(hex));
	};

	this.hex = function(value) {
		if ((value != null) && this._isHex(value)) {
			this.__model = this._hexToHsv(value);
			return this;
		}
		return this._hsvToHex(this.__model);
	};
}

export default Hex;