let Hsl = function() {

	this._hslToHsv = function(hsl) {
		if (!this._isHsl(hsl)) {
			throw new Error('Not a valid HSL object.');
		}
		hsl.l *= 2;
		if (hsl.l <= 1) {
			hsl.s *= hsl.l;
		} else {
			hsl.s *= (2 - hsl.l);
		}
		let computedV = (hsl.l + hsl.s) / 2;
		let computedS = (2 * hsl.s) / (hsl.l + hsl.s);

		let hsvObj = {
			h: hsl.h,
			s: computedS,
			v: computedV
		};

		return hsvObj;
	};

	this.hsl = function(value) {
		if (value != null) {
			this.__model = this._hslToHsv(value);
			return this;
		}
		return this._hsvToHsl(this.__model);
	};

	this.hslString = function() {
		let hsl = this._hsvToHsl(this.__model);
		let { h } = hsl;
		let s = hsl.s * 100;
		let l = hsl.l * 100;
		if (this.__model.a == null) {
			return `hsl(${h},${s}%,${l}%)`;
		}
		return `hsla(${h},${s}%,${l}%,${this.__model.a})`;
	};
};

export default Hsl;