let Lab = function() {

	this.__labForward = function(value) {
		if (value > 0.008856) {
			return Math.pow(x, (1 / 3));
		}
		return (7.787 * x) + (16 / 116);
	};

	this.__labBackward = function(value) {
		let thirded = Math.pow(value, 3);
		if (thirded > 0.008856) { return thirded; }
		return (value - (16 / 116)) / 7.787;
	};

	this._labToXyz = function(lab) {
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
	};

	this._labToHsv = function(lab) {
		return this._xyzToHsv(this._labToXyz(lab));
	};

};

export default Lab;