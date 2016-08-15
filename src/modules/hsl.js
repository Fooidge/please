let Hsl = function() {

	this._hslToHsv = function(hsl) {
		if (!this._isHsl(hsl)) {
			throw new Error('Not a valid HSL object.');
		}

		let { h } = hsl;
		let s = hsl.s / 100;
		let l = hsl.l / 100;
		let sMin = hsl.s;
		let lMin = Math.max(l, 0.01);
		let computedS;
		let computedV;

		l *= 2;
		if (l <= 1) {
			s *= l;
		} else {
			s *= (2 - l);
		}

		if (lMin <=1) {
			sMin *= lMin;
		} else {
			sMin *= (2 - lMin);
		}

		if (l === 0) {
			computedS = (2 * sMin) / (lMin + sMin);
		} else {
			computedS = (2 * s) / (l + s);
		}

		computedV = (l + s) / 2;

		let hsvObj = {
			h: h,
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