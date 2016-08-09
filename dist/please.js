/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var _main=__webpack_require__(2);var _main2=_interopRequireDefault(_main);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){if(true){!(__WEBPACK_AMD_DEFINE_FACTORY__ = (_main2.default), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if((typeof module==='undefined'?'undefined':_typeof(module))==='object'&&module.exports){module.exports=_main2.default;}return this.please=_main2.default;})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _util=__webpack_require__(3);var _Color=__webpack_require__(4);var _Color2=_interopRequireDefault(_Color);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var please={};exports.default=please;please.Color=function(color){return new _Color2.default(color);};var PHI=0.618033988749895;var makeColorDefaults={hue:null,saturation:null,value:null,base_color:'',baseColor:'',greyscale:false,grayscale:false,//whatever I support them both, murrica
	golden:true,full_random:false,fullRandom:false,colors_returned:1,colorsReturned:1,format:'hex'};please.generateFromBaseColor=function(baseColor){var color=new _Color2.default();var base=new _Color2.default(baseColor);color.hue(clamp((0,_util.random)(base.hue()-5,base.hue()+5),0,360));if(base.saturation()===0){color.saturation(0);}else{color.saturation((0,_util.random)(0.4,0.85,true));}color.value((0,_util.random)(0.4,0.85,true));return color;};please.generate=please.generateGolden=function(){var color=new _Color2.default();var hue=(0,_util.random)(0,359);color.hue((hue+hue/PHI)%360);color.saturation((0,_util.random)(0.4,0.85,true));color.value((0,_util.random)(0.4,0.85,true));return color;};please.generateRandom=function(){var color=new _Color2.default();color.hue((0,_util.random)(0,359));color.saturation((0,_util.random)(0,1.0,true));color.value((0,_util.random)(0,1.0,true));return color;};var deprecationLayer=function deprecationLayer(options){if(options.base_color!==makeColorDefaults.baseColor){console.warn('The option base_color is deprecated and will be removed soon. Use baseColor instead.');options.baseColor=options.base_color;}if(options.full_random!==makeColorDefaults.fullRandom){console.warn('The option full_random is deprecated and will be removed soon. Use fullRandom instead.');options.fullRandom=options.full_random;}if(options.colors_returned!==makeColorDefaults.colorsReturned){console.warn('The option colors_returned is deprecated and will be removed soon. Use colorsReturned instead.');options.colorsReturned=options.colors_returned;}return options;};//remove make_color after 3 months in the wild
	please.make_color=function(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];console.warn('The function make_color() is deprecated and will be removed soon. Use makeColor() instead.');please.makeColor(options);};please.makeColor=function(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];//remove deprecationLayer after 3 months in the wild
	var opts=deprecationLayer((0,_util.defaults)(makeColorDefaults,options));var colors=[];for(var i=0;i<opts.colorsReturned;i++){colors[i]=please.generate();//remove overwrites after 3 months in the wild
	//overwrite values if option exists to
	if(opts.hue!=null&&(0,_util.isNumber)(opts.hue)){colors[i].hue(opts.hue);}if(opts.saturation!=null&&(0,_util.isNumber)(opts.saturation)){colors[i].saturation(opts.saturation);}if(opts.value!=null&&(0,_util.isNumber)(opts.value)){colors[i].value(opts.value);}switch(opts.format.toLowerCase()){case'hex':colors[i]=colors[i].hex();break;case'rgb':colors[i]=colors[i].rgbString();break;case'hsl':colors[i]=colors[i].hslString();break;default:console.warn('Unknown format. Defaulting to hex.');colors[i]=colors[i].hex();}}return colors;};//remove make_scheme after 3 months in the wild
	please.make_scheme=function(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];console.warn('The function make_scheme() is deprecated and will be removed soon. use makeScheme() instead.');please.makeScheme(options);};please.makeScheme=function(){var options=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var scheme=[];return scheme;};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};var isArray=Array.isArray;var objectProto=Object.prototype;var objectToString=objectProto.toString;var hasOwnProperty=objectProto.hasOwnProperty;var stringTag='[object String]';//Adapted from _.clamp
	var clamp=function clamp(value,min,max){if(value===value){if(max!==undefined){value=value<=max?value:max;}if(min!==undefined){value=value>=min?value:min;}}return value;};//Adapted from _.isNumber
	var isNumber=function isNumber(value){return!isNaN(parseFloat(value))&&isFinite(value);};//Adapted from _.isObject
	var isObject=function isObject(value){return value!=null&&(typeof value==='undefined'?'undefined':_typeof(value))==='object'&&isArray(value)===false;};var isObjectLike=function isObjectLike(value){return!!value&&(typeof value==='undefined'?'undefined':_typeof(value))=='object';};//Adapted from _.isString
	var isString=function isString(value){return typeof value=='string'||!isArray(value)&&isObjectLike(value)&&objectToString.call(value)==stringTag;};//Adapted from _.random
	var random=function random(lower,upper){if(lower%1||upper%1){var rand=Math.random();return Math.min(lower+rand*(upper-lower+parseFloat('1e-'+((rand+'').length-1))),upper);}return lower+Math.floor(Math.random()*(upper-lower+1));};var equals=function equals(value,other){return value===other||value!==value&&other!==other;};var assignDefaults=function assignDefaults(objValue,srcValue,key,object){if(objValue===undefined||equals(objValue,objectProto[key])&&!hasOwnProperty.call(object,key)){//if objValue doesnt exist OR objValue is part of the prototype and it doesnt have own prop
	return srcValue;}return objValue;};var defaults=function defaults(){var defaults=arguments.length<=0||arguments[0]===undefined?{}:arguments[0];var obj=arguments[1];var updated={};for(var key in defaults){if(defaults.hasOwnProperty(key)){updated[key]=defaults[key];}}for(var _key in obj){if(obj.hasOwnProperty(_key)&&obj[_key]!=updated[_key]){updated[_key]=obj[_key];}}return updated;};exports.clamp=clamp;exports.isNumber=isNumber;exports.isObject=isObject;exports.isString=isString;exports.random=random;exports.defaults=defaults;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _util=__webpack_require__(3);var _colorUtil=__webpack_require__(5);var _colorUtil2=_interopRequireDefault(_colorUtil);var _hsv=__webpack_require__(6);var _hsv2=_interopRequireDefault(_hsv);var _rgb=__webpack_require__(7);var _rgb2=_interopRequireDefault(_rgb);var _hex=__webpack_require__(8);var _hex2=_interopRequireDefault(_hex);var _html=__webpack_require__(9);var _html2=_interopRequireDefault(_html);var _cmyk=__webpack_require__(10);var _cmyk2=_interopRequireDefault(_cmyk);var _hsl=__webpack_require__(11);var _hsl2=_interopRequireDefault(_hsl);var _xyz=__webpack_require__(12);var _xyz2=_interopRequireDefault(_xyz);var _lab=__webpack_require__(13);var _lab2=_interopRequireDefault(_lab);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Color=function(){function Color(color){_classCallCheck(this,Color);_colorUtil2.default.call(this);_hsv2.default.call(this);_rgb2.default.call(this);_hex2.default.call(this);_html2.default.call(this);_cmyk2.default.call(this);_hsl2.default.call(this);_xyz2.default.call(this);_lab2.default.call(this);if(color!=null){switch(this._detectType(color)){case'HSV':this.hsv(color);break;case'HSL':this.__model=this._hslToHsv(color);break;case'RGB':this.__model=this._rgbToHsv(color);break;case'HEX':this.__model=this._hexToHsv(color);break;case'XYZ':this.__model=this._xyzToHsv(color);break;case'LAB':this.__model=this._labToHsv(color);break;case'CMYK':this.__model=this._cmykToHsv(color);break;case'HTML':this.__model=this._htmlToHsv(color);break;}}else{this.hsv({h:0,s:0,v:0});}}/**
		 * Getter/Setter for alpha property.
		 * @param  {Number} value
		 * @return {Object}
		 */_createClass(Color,[{key:'alpha',value:function alpha(value){if(value!=null&&(0,_util.isNumber)(value)){this.__model.a=(0,_util.clamp)(value,0,1);return this;}return this.__model.a;}/**
		 * Alias for alpha.
		 * @param  {Number} value
		 * @return {Function}
		 */},{key:'opacity',value:function opacity(value){return this.alpha(value);}//true for white false for black
	},{key:'contrast',value:function contrast(){var rgb=this.rgb();var yiqR=rgb.r*299;var yiqG=rgb.g*587;var yiqB=rgb.b*114;var yiq=(yiqR+yiqG+yiqB)/1000;if(yiq<128){return true;}return false;}//cmyk style mixing
	},{key:'mix',value:function mix(color){var amount=arguments.length<=1||arguments[1]===undefined?0.5:arguments[1];var cmyk=this._hsvToCmyk(this.__model);var mixer=this._hsvToCmyk(color);amount=(0,_util.clamp)(amount,0,1);var remainder=1-amount;var result={c:cmyk.c*remainder+mixer.c*amount,m:cmyk.m*remainder+mixer.m*amount,y:cmyk.y*remainder+mixer.y*amount,k:cmyk.k*remainder+mixer.k*amount};this.__model=this._cmykToHsv(result);return this;}},{key:'lighten',value:function lighten(){var amount=arguments.length<=0||arguments[0]===undefined?0.25:arguments[0];var white=new Color(this._htmlColors.white);this.mix(white.hsv(),amount);return this;}},{key:'darken',value:function darken(){var amount=arguments.length<=0||arguments[0]===undefined?0.25:arguments[0];var black=new Color(this._htmlColors.black);this.mix(black.hsv(),amount);return this;}}]);return Color;}();exports.default=Color;;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _util=__webpack_require__(3);var ColorUtil=function ColorUtil(){/**
		 * Detects type of color input into the constrcutor, errors if none found.
		 * @param  {Any} color
		 * @return {String} The type of color detected.
		 */this._detectType=function(color){if(this._isHsv(color)){return'HSV';}if(this._isHsl(color)){return'HSL';}if(this._isRgb(color)){return'RGB';}if(this._isRgbString(color)){return'RGB_STRING';}if(this._isHex(color)){return'HEX';}if(this._isXyz(color)){return'XYZ';}if(this._isLab(color)){return'LAB';}if(this._isCmyk(color)){return'CMYK';}if(this._isHtml(color)){return'HTML';}throw new Error('Not a valid color type.');};/**
		 * Returns true if color is HSV and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isHsv=function(color){if((0,_util.isObject)(color)&&color.h!=null&&color.s!=null&&color.v!=null){return true;}return false;};/**
		 * Returns true if color is HSL and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isHsl=function(color){if((0,_util.isObject)(color)&&color.h!=null&&color.s!=null&&color.l!=null){return true;}return false;};/**
		 * Returns true if color is an HSL string and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isHslString=function(color){var hslTest=/hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i;if((0,_util.isString)(color)&&hslTest.test(color)){return true;}return false;};/**
		 * Returns true if color is RGB and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isRgb=function(color){if((0,_util.isObject)(color)&&color.r!=null&&color.g!=null&&color.b!=null){return true;}return false;};/**
		 * Returns true if color is an RGB string and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isRgbString=function(color){var rgbTest=/rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;if((0,_util.isString)(color)&&rgbTest.test(color)){return true;}return false;};/**
		 * Returns true if color is an HTML color and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isHtml=function(color){var normalizedColor=color.toLowerCase();if((0,_util.isString)(normalizedColor)&&normalizedColor in this._htmlColors){return true;}return false;};/**
		 * Returns true if color is a Hex string and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isHex=function(color){var hexTest=/^#?(?:[0-9a-f]{3}){1,2}$/i;if((0,_util.isString)(color)&&hexTest.test(color)){return true;}return false;};/**
		 * Returns true if color is XYZ and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isXyz=function(color){if((0,_util.isObject)(color)&&color.x!=null&&color.y!=null&&color.z!=null){return true;}return false;};/**
		 * Returns true if color is LAB and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isLab=function(color){if((0,_util.isObject)(color)&&color.l!=null&&color.a!=null&&color.b!=null){return true;}return false;};/**
		 * Returns true is color is CMY and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isCmy=function(color){if((0,_util.isObject)(color)&&color.c!=null&&color.m!=null&&color.y!=null){return true;}return false;};/**
		 * Returns true if color is CMYK and false otherwise.
		 * @param  {Any} color
		 * @return {Boolean}
		 */this._isCmyk=function(color){if(this._isCmy(color)&&color.k!=null){return true;}return false;};};exports.default=ColorUtil;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _util=__webpack_require__(3);var Hsv=function Hsv(){this._hsvToRgb=function(hsv){if(!this._isHsv(hsv)){throw new Error('Not a valid HSV object.');}var h=hsv.h%360;var s=hsv.s;var v=hsv.v;//no saturation case
	if(s===0){var computedV=v*255;var rgbObj={r:computedV,g:computedV,b:computedV};return rgbObj;}h/=60;var i=Math.floor(h);var f=h-i;var p=v*(1-s);var q=v*(1-s*f);var t=v*(1-s*(1-f));var r=void 0,g=void 0,b=void 0;switch(i){case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;case 5:r=v;g=p;b=q;break;}var rgbObj={r:Math.floor(r*255),g:Math.floor(g*255),b:Math.floor(b*255)};return rgbObj;};this._hsvToHex=function(hsv){return this._rgbToHex(this._hsvToRgb(hsv));};this._hsvToHsl=function(hsv){if(!this._isHsv(hsv)){throw new Error('Not a valid HSV object.');}var computedL=(2-hsv.s)*hsv.v;var computedS=hsv.s*hsv.v;if(computedL<=1){computedS=computedS/computedL;}else{computedS=computedS/(2-computedL);}computedL=computedL/2;var hslObj={h:hsv.h,s:computedS,l:computedL};return hslObj;};this._hsvToXyz=function(hsv){return this._rgbToXyz(this._hsvToRgb(hsv));};this._hsvToCmyk=function(hsv){return this._rgbToCmyk(this._hsvToRgb(hsv));};this._hsvToLab=function(hsv){return this._xyzToLab(this._hsvToXyz(hsv));};/**
		 * Getter/Setter for hue property.
		 * @param  {Number} value
		 * @return {Object}
		 */this.hue=function(value){if(value!=null&&(0,_util.isNumber)(value)){this.__model.h=Math.abs(value%360);return this;}return this.__model.h;};/**
		 * Getter/Setter for saturation property.
		 * @param  {Number} value
		 * @return {Object}
		 */this.saturation=function(value){if(value!=null&&(0,_util.isNumber)(value)){this.__model.s=(0,_util.clamp)(value,0,1);return this;}return this.__model.s;};/**
		 * Alias for saturation.
		 * @param  {Number} value
		 * @return {Function}
		 */this.sat=function(value){return this.saturation(value);};/**
		 * Getter/Setter for value property.
		 * @param  {Number} value
		 * @return {Object}
		 */this.value=function(value){if(value!=null&&(0,_util.isNumber)(value)){this.__model.v=(0,_util.clamp)(value,0,1);return this;}return this.__model.v;};/**
		 * Alias for value.
		 * @param  {Number} value
		 * @return {Function}
		 */this.val=function(value){return this.value(value);};/**
		 * Alias for value.
		 * @param  {Number} value
		 * @return {Function}
		 */this.brightness=function(value){return this.value(value);};this.hsv=function(value){if(value!=null&&this._isHsv(value)){var adjustedHsv={h:(0,_util.clamp)(value.h,0,1.0),s:value.s,v:value.v};this.__model=adjustedHsv;return this;}return this.__model;};};exports.default=Hsv;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _util=__webpack_require__(3);var Rgb=function Rgb(){this.red=function(value){if(value!=null&&(0,_util.isNumber)(value)){var rgb=this._hsvToRgb(this.__model);rgb.r=(0,_util.clamp)(value,0,255);this.__model=this._rgbToHsv(rgb);return this;}return this._hsvToRgb(this.__model).r;};this.green=function(value){if(value!=null&&(0,_util.isNumber)(value)){var rgb=this._hsvToRgb(this.__model);rgb.g=(0,_util.clamp)(value,0,255);this.__model=this._rgbToHsv(rgb);return this;}return this._hsvToRgb(this.__model).g;};this.blue=function(value){if(value!=null&&(0,_util.isNumber)(value)){var rgb=this._hsvToRgb(this.__model);rgb.b=(0,_util.clamp)(value,0,255);this.__model=this._rgbToHsv(rgb);return this;}return this._hsvToRgb(this.__model).b;};this.rgb=function(value){if(value!=null){this.__model=this._rgbToHsv(value);return this;}return this._hsvToRgb(this.__model);};this.rgbString=function(){var rgb=this.rgb();var r=Math.round(rgb.r);var g=Math.round(rgb.g);var b=Math.round(rgb.b);if(this.__model.a==null){return'rgb('+r+','+g+','+b+')';}return'rgba('+r+','+g+','+b+','+this.__model.a+')';};this._rgbToHsv=function(rgb){if(!this._isRgb(rgb)){throw new Error('Not a valid RGB object.');}var r=rgb.r/255;var g=rgb.g/255;var b=rgb.b/255;var minRgb=Math.min(r,Math.min(g,b));var maxRgb=Math.max(r,Math.max(g,b));//Black-gray-white
	if(minRgb===maxRgb){var hsvObj={h:0,s:0,v:minRgb};return hsvObj;}//Colors other than black-gray-white:
	var d=r===minRgb?g-b:b===minRgb?r-g:b-r;var h=r===minRgb?3:b===minRgb?1:5;var hsvObj={h:60*(h-d/(maxRgb-minRgb)),s:(maxRgb-minRgb)/maxRgb,v:maxRgb};return hsvObj;};this._rgbToHex=function(rgb){if(!this._isRgb(rgb)){throw new Error('Not a valid RGB object.');}var base=rgb.b|rgb.g<<8|rgb.r<<16;return'#'+(0x1000000+base).toString(16).slice(1);};this._rgbToXyz=function(rgb){if(!this._isRgb(rgb)){throw new Error('Not a valid RGB object.');}var r=this.__xyzForward(rgb.r);var g=this.__xyzForward(rgb.g);var b=this.__xyzForward(rgb.b);var xyzObj={x:r*0.4124+g*0.3576+b*0.1805,y:r*0.2126+g*0.7152+b*0.0722,z:r*0.0193+g*0.1192+b*0.9505};return xyzObj;};this.__rgbToCmy=function(rgb){var cmyObj={c:1-rgb.r,m:1-rgb.g,y:1-rgb.b};return cmyObj;};this._rgbToCmyk=function(rgb){if(!this._isRgb(rgb)){throw new Error('Not a valid rgb object.');}return this.__cmyToCmyk(this.__rgbToCmy(rgb));};};exports.default=Rgb;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Hex=function Hex(){this._hexToRgb=function(hex){if(!this._isHex(hex)){throw new Error('Not a valid hex string.');}//expand to long version
	hex=hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(m,r,g,b){return r+r+g+g+b+b;});//remove everything expect valid numbers
	hex=hex.replace(/[^0-9a-f]/gi,'');var parsedHex=parseInt(hex,16);var rgbObj={r:parsedHex>>16&255,g:parsedHex>>8&255,b:parsedHex&255};return rgbObj;};this._hexToHsv=function(hex){return this._rgbToHsv(this._hexToRgb(hex));};this.hex=function(value){if(value!=null&&this._isHex(value)){this.__model=this._hexToHsv(value);return this;}return this._hsvToHex(this.__model);};};exports.default=Hex;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Html=function Html(){this._htmlColors={aliceblue:'F0F8FF',antiquewhite:'FAEBD7',aqua:'00FFFF',aquamarine:'7FFFD4',azure:'F0FFFF',beige:'F5F5DC',bisque:'FFE4C4',black:'000000',blanchedalmond:'FFEBCD',blue:'0000FF',blueviolet:'8A2BE2',brown:'A52A2A',burlywood:'DEB887',cadetblue:'5F9EA0',chartreuse:'7FFF00',chocolate:'D2691E',coral:'FF7F50',cornflowerblue:'6495ED',cornsilk:'FFF8DC',crimson:'DC143C',cyan:'00FFFF',darkblue:'00008B',darkcyan:'008B8B',darkgoldenrod:'B8860B',darkgray:'A9A9A9',darkgrey:'A9A9A9',darkgreen:'006400',darkkhaki:'BDB76B',darkmagenta:'8B008B',darkolivegreen:'556B2F',darkorange:'FF8C00',darkorchid:'9932CC',darkred:'8B0000',darksalmon:'E9967A',darkseagreen:'8FBC8F',darkslateblue:'483D8B',darkslategray:'2F4F4F',darkslategrey:'2F4F4F',darkturquoise:'00CED1',darkviolet:'9400D3',deeppink:'FF1493',deepskyblue:'00BFFF',dimgray:'696969',dimgrey:'696969',dodgerblue:'1E90FF',firebrick:'B22222',floralwhite:'FFFAF0',forestgreen:'228B22',fuchsia:'FF00FF',gainsboro:'DCDCDC',ghostwhite:'F8F8FF',gold:'FFD700',goldenrod:'DAA520',gray:'808080',grey:'808080',green:'008000',greenyellow:'ADFF2F',honeydew:'F0FFF0',hotpink:'FF69B4',indianred:'CD5C5C',indigo:'4B0082',ivory:'FFFFF0',khaki:'F0E68C',lavender:'E6E6FA',lavenderblush:'FFF0F5',lawngreen:'7CFC00',lemonchiffon:'FFFACD',lightblue:'ADD8E6',lightcoral:'F08080',lightcyan:'E0FFFF',lightgoldenrodyellow:'FAFAD2',lightgray:'D3D3D3',lightgrey:'D3D3D3',lightgreen:'90EE90',lightpink:'FFB6C1',lightsalmon:'FFA07A',lightseagreen:'20B2AA',lightskyblue:'87CEFA',lightslategray:'778899',lightslategrey:'778899',lightsteelblue:'B0C4DE',lightyellow:'FFFFE0',lime:'00FF00',limegreen:'32CD32',linen:'FAF0E6',magenta:'FF00FF',maroon:'800000',mediumaquamarine:'66CDAA',mediumblue:'0000CD',mediumorchid:'BA55D3',mediumpurple:'9370D8',mediumseagreen:'3CB371',mediumslateblue:'7B68EE',mediumspringgreen:'00FA9A',mediumturquoise:'48D1CC',mediumvioletred:'C71585',midnightblue:'191970',mintcream:'F5FFFA',mistyrose:'FFE4E1',moccasin:'FFE4B5',navajowhite:'FFDEAD',navy:'000080',oldlace:'FDF5E6',olive:'808000',olivedrab:'6B8E23',orange:'FFA500',orangered:'FF4500',orchid:'DA70D6',palegoldenrod:'EEE8AA',palegreen:'98FB98',paleturquoise:'AFEEEE',palevioletred:'D87093',papayawhip:'FFEFD5',peachpuff:'FFDAB9',peru:'CD853F',pink:'FFC0CB',plum:'DDA0DD',powderblue:'B0E0E6',purple:'800080',rebeccapurple:'663399',red:'FF0000',rosybrown:'BC8F8F',royalblue:'4169E1',saddlebrown:'8B4513',salmon:'FA8072',sandybrown:'F4A460',seagreen:'2E8B57',seashell:'FFF5EE',sienna:'A0522D',silver:'C0C0C0',skyblue:'87CEEB',slateblue:'6A5ACD',slategray:'708090',slategrey:'708090',snow:'FFFAFA',springgreen:'00FF7F',steelblue:'4682B4',tan:'D2B48C',teal:'008080',thistle:'D8BFD8',tomato:'FF6347',turquoise:'40E0D0',violet:'EE82EE',wheat:'F5DEB3',white:'FFFFFF',whitesmoke:'F5F5F5',yellow:'FFFF00',yellowgreen:'9ACD32'};this._htmlToHsv=function(html){if(!this._isHtml(html)){throw new Error('Not a valid HTML color.');}var normalizedColor=html.toLowerCase();return this._hexToHsv(this._htmlColors[normalizedColor]);};this.html=function(value){this.__model=this._hexToHsv(this.getHtmlColor(value));return this;};this.getHtmlColor=function(value){if(value!=null){var colorName=value.toString().toLowerCase();if(this._htmlColors[colorName]!=null){return this._htmlColors[colorName];}}throw new Error('Not a valid HTML color.');};this.getHtmlColors=function(){return this._htmlColors;};};exports.default=Html;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _util=__webpack_require__(3);var Cmyk=function Cmyk(){this.__cmyToRgb=function(cmy){var rgbObj={r:1-cmy.c,g:1-cmy.m,b:1-cmy.y};return rgbObj;};this.__cmyToCmyk=function(cmy){if(!this._isCmy(cmy)){throw new Error('Not a valid cmy object.');}var K=1;if(cmy.x<K){K=cmy.c;}if(cmy.m<K){K=cmy.m;}if(cmy.y<K){K=cmy.y;}if(K===1){var cmykObj={c:0,m:0,y:0,k:1};return cmykObj;}var cmykObj={c:(cmy.c-K)/(1-K),m:(cmy.m-K)/(1-K),y:(cmy.y-K)/(1-K),k:K};return cmykObj;};this.__cmykToCmy=function(cmyk){var K=cmyk.k;var cmyObj={c:cmyk.c*(1-K)+K,m:cmyk.m*(1-K)+K,y:cmyk.y*(1-K)+K};return cmyObj;};this._cmykToRgb=function(cmyk){if(!this._isCmyk(cmyk)){throw new Error('Not a valid cmyk object.');}return this.__cmyToRgb(this.__cmykToCmy(cmyk));};this._cmykToHsv=function(cmyk){return this._rgbToHsv(this._cmykToRgb(cmyk));};this.cmyk=function(value){if(value!=null){var adjustedCmyk={c:(0,_util.clamp)(value.c,0,1.0),m:(0,_util.clamp)(value.m,0,1.0),y:(0,_util.clamp)(value.y,0,1.0),k:(0,_util.clamp)(value.k,0,1.0)};this.__model=this._cmykToHsv(adjustedCmyk);}return this._hsvToCmyk(this.__model);};};exports.default=Cmyk;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Hsl=function Hsl(){this._hslToHsv=function(hsl){if(!this._isHsl(hsl)){throw new Error('Not a valid HSL object.');}hsl.l*=2;if(hsl.l<=1){hsl.s*=hsl.l;}else{hsl.s*=2-hsl.l;}var computedV=(hsl.l+hsl.s)/2;var computedS=2*hsl.s/(hsl.l+hsl.s);var hsvObj={h:hsl.h,s:computedS,v:computedV};return hsvObj;};this.hsl=function(value){if(value!=null){this.__model=this._hslToHsv(value);return this;}return this._hsvToHsl(this.__model);};this.hslString=function(){var hsl=this._hsvToHsl(this.__model);var h=hsl.h;var s=hsl.s*100;var l=hsl.l*100;if(this.__model.a==null){return'hsl('+h+','+s+'%,'+l+'%)';}return'hsla('+h+','+s+'%,'+l+'%,'+this.__model.a+')';};};exports.default=Hsl;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Xyz=function Xyz(){this.__xyzForward=function(value){if(value>0.04045){return Math.pow((value+0.055)/1.055,2.4);}return value/12.92;};this.__xyzBackward=function(value){if(value>0.0031308){return Math.pow(value,1/2.4)-0.055;}return value*12.92;};this._xyzToHsv=function(xyz){return this._rgbToHsv(this._xyzToRgb(xyz));};this._xyzToRgb=function(xyz){if(!this._isXyz(xyz)){throw new Error('Not a valid XYZ object.');}var r=xyz.x*3.2406+xyz.y*-1.5372+xyz.z*-0.4986;var g=xyz.x*-0.9689+xyz.y*1.8758+xyz.z*0.0415;var b=xyz.x*0.0557+xyz.y*-0.2040+xyz.z*1.057;var rgbObj={r:this.__xyzBackward(r),g:this.__xyzBackward(g),b:this.__xyzBackward(b)};return rgbObj;};this._xyzToLab=function(xyz){if(!this._isXyz(xyz)){throw new Error('Not a valid XYZ object.');}// CIE-L*ab D65/2' 1931
	var x=this.__labForward(xyz.x*0.9504285);var y=this.__labForward(xyz.y);var z=this.__labForward(xyz.z*1.0889);var labObj={l:(116*y-16)/100,//[0-100]
	a:(500*(x-y)+128)/255,//[-128-127]
	b:(200*(y-z)+128)/255//[-128-127]
	};return labObj;};this.xyz=function(value){if(value!=null&&this._isXyz(value)){this.__model=this._xyzToHsv(value);return this;}return this._hsvToXyz(this.__model);};};exports.default=Xyz;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var Lab=function Lab(){this.__labForward=function(value){if(value>0.008856){return Math.pow(x,1/3);}return 7.787*x+16/116;};this.__labBackward=function(value){var thirded=Math.pow(value,3);if(thirded>0.008856){return thirded;}return(value-16/116)/7.787;};this._labToXyz=function(lab){if(!this._isLab(lab)){throw new Error('Not a valid LAB object');}var l=lab.l*100;var a=lab.a*255-128;var b=lab.b*255-128;var y=(l+16)/116;var x=a/500+y;var z=y-b/200;var xyzObj={x:this.__labBackward(x)*0.9504285,y:this.__labBackward(y),z:this.__labBackward(z)*1.0889};return xyzObj;};this._labToHsv=function(lab){return this._xyzToHsv(this._labToXyz(lab));};};exports.default=Lab;

/***/ }
/******/ ]);