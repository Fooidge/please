(function(){
var pathos = {
	version: '0.0.0'
};pathos.animate = function(element) {
  if (!(element instanceof SVGElement)) {
    throw new Error('not an SVG Element');
  }
};
if ( typeof define === 'function' && define.amd ){
		define(pathos);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = pathos;
	}
	this.pathos = pathos;
})();