(function(){
var pathos = {
	version: '0.0.0'
};
if ( typeof define === 'function' && define.amd ){
		define(pathos);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = pathos;
	}
	this.pathos = pathos;
})();