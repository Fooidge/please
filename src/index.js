import please from './main';

(function() {
	if (typeof define === 'function' && define.amd) {
		define(please);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = please;
	}
	return this.please = please;
})();