(function(){
var please = {
	version: '0.0.0'
};var Color,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Color = (function() {
  function Color(color) {
    this._hslToHsv = bind(this._hslToHsv, this);
    this._hsvToHsl = bind(this._hsvToHsl, this);
    this._hsvToHex = bind(this._hsvToHex, this);
    this._rgbToHex = bind(this._rgbToHex, this);
    this._hexToHsv = bind(this._hexToHsv, this);
    this._hexToRgb = bind(this._hexToRgb, this);
    this._hsvToRgb = bind(this._hsvToRgb, this);
    this._rgbToHsv = bind(this._rgbToHsv, this);
    this._detectType = bind(this._detectType, this);
    this.htmlColor = bind(this.htmlColor, this);
    this.hsv = bind(this.hsv, this);
    this.hslString = bind(this.hslString, this);
    this.hsl = bind(this.hsl, this);
    this.rgbString = bind(this.rgbString, this);
    this.rgb = bind(this.rgb, this);
    this.blue = bind(this.blue, this);
    this.green = bind(this.green, this);
    this.red = bind(this.red, this);
    this.alpha = bind(this.alpha, this);
    this.value = bind(this.value, this);
    this.saturation = bind(this.saturation, this);
    this.hue = bind(this.hue, this);
    switch (this._detectType(color)) {
      case 'HSV':
        this.__model = {
          h: color.h,
          s: color.s,
          v: color.v
        };
        break;
      case 'HSL':
        this.__model = this._hslToHsv(color);
        break;
      case 'RGB':
        this.__model = this._rgbToHsv(color);
        break;
      case 'HEX':
        this.__model = this._hexToHsv(color);
    }
  }

  Color.prototype._isHsv = function(color) {
    if (isObject(color) && (color.h != null) && (color.s != null) && (color.v != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHsl = function(color) {
    if (isObject(color) && (color.h != null) && (color.s != null) && (color.l != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHslString = function(color) {
    var hslTest;
    hslTest = /hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i;
    if (isString(color) && hslTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype._isRgb = function(color) {
    if (isObject(color) && (color.r != null) && (color.g != null) && (color.b != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isRgbString = function(color) {
    var rgbTest;
    rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;
    if (isString(color) && rgbTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHex = function(color) {
    var hexTest;
    hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i;
    if (isString(color) && hexTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype.hue = function(value) {
    if (value != null) {
      this.__model.h = clamp(value(0, 360));
      return this;
    }
    return this.__model.h;
  };

  Color.prototype.h = Color.prototype.hue;

  Color.prototype.saturation = function(value) {
    if (value != null) {
      this.__model.s = clamp(value);
      return this;
    }
    return this.__model.s;
  };

  Color.prototype.s = Color.prototype.saturation;

  Color.prototype.value = function(value) {
    if (value != null) {
      this.__model.v = clamp(value);
      return this;
    }
    return this.__model.v;
  };

  Color.prototype.v = Color.prototype.value;

  Color.prototype.brightness = Color.prototype.value;

  Color.prototype.b = Color.prototype.value;

  Color.prototype.alpha = function(value) {
    if ((value != null) && isNumber(value)) {
      this.__model.a = clamp(value);
      return this;
    }
    return this.__model.a;
  };

  Color.prototype.a = Color.prototype.alpha;

  Color.prototype.opacity = Color.prototype.alpha;

  Color.prototype.o = Color.prototype.alpha;

  Color.prototype.red = function(value) {
    var rgb;
    if (value != null) {
      rgb = this._hsvToRgb(this.__model);
      rgb.r = clamp(value(0, 255));
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).r;
  };

  Color.prototype.green = function(value) {
    var rgb;
    if (value != null) {
      rgb = this._hsvToRgb(this.__model);
      rgb.g = clamp(value(0, 255));
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).g;
  };

  Color.prototype.blue = function(value) {
    var rgb;
    if (value != null) {
      rgb = this._hsvToRgb(this.__model);
      rgb.b = clamp(value(0, 255));
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).b;
  };

  Color.prototype.rgb = function(value) {
    if (value != null) {
      this.__model = this._rgbToHsv(value);
      return this;
    }
    return this._hsvToRgb;
  };

  Color.prototype.rgbString = function() {
    var rgb;
    rgb = this._hsvToRgb(this.__model);
    if (this.__model.a == null) {
      return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    }
    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + this.__model.a + ")";
  };

  Color.prototype.hsl = function(value) {
    if (value != null) {
      this.__model = this._hslToHsv(value);
      return this;
    }
    return this._hsvToHsl(this.__model);
  };

  Color.prototype.hslString = function() {
    var hsl;
    hsl = this._hsvToHsl(this.__model);
    if (this.__model.a == null) {
      return "hsl(" + hsl.h + "," + hsl.s + "," + hsl.l + ")";
    }
    return "hsla(" + hsl.h + "," + hsl.s + "," + hsl.l + "," + this.__model.a + ")";
  };

  Color.prototype.hsv = function(value) {
    if ((value != null) && this._isHsv(value)) {
      this.__model = value;
      return this;
    }
    return this.__model;
  };

  Color.prototype.htmlColor = function(value) {
    var colorName;
    if ((value != null) && isString(value)) {
      colorName = value.toLowerCase();
      if (indexOf.call(this.htmlColors, color) >= 0) {
        return this.htmlColors[color];
      }
      throw new Error('Not a valid HTML color.');
      return false;
    }
  };

  Color.prototype._detectType = function(color) {
    if (this._isHsv(color)) {
      return 'HSV';
    }
    if (this._isHsl(color)) {
      return 'HSL';
    }
    if (this._isRgb(color)) {
      return 'RGB';
    }
    if (this._isRgbString(color)) {
      return 'RGB_STRING';
    }
    if (this._isHex(color)) {
      return 'HEX';
    } else {
      throw new Error('Not a valid color type.');
    }
  };

  Color.prototype._rgbToHsv = function(rgb) {
    var b, d, g, h, hsvObj, maxRgb, minRgb, r;
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid RGB object.');
    }
    r = rgb.r / 255;
    g = rgb.g / 255;
    b = rgb.b / 255;
    minRgb = Math.min(r, Math.min(g, b));
    maxRgb = Math.max(r, Math.max(g, b));
    if (minRgb === maxRgb) {
      hsvObj = {
        h: 0,
        s: 0,
        v: minRgb
      };
      return hsvObj;
    }
    d = r === minRgb ? g - b : b === minRgb ? r - g : b - r;
    h = r === minRgb ? 3 : b === minRgb ? 1 : 5;
    hsvObj = {
      h: 60 * (h - d / (maxRgb - minRgb)),
      s: (maxRgb - minRgb) / maxRgb,
      v: maxRgb
    };
    return hsvObj;
  };

  Color.prototype._hsvToRgb = function(hsv) {
    var b, f, g, h, i, p, q, r, rgbObj, s, t, v;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    h = hsv.h;
    s = hsv.s;
    v = hsv.v;
    if (s === 0) {
      rgbObj = {
        r: v,
        g: v,
        b: v
      };
      return rgbObj;
    }
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
    }
    rgbObj = {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
    return rgbObj;
  };

  Color.prototype._hexToRgb = function(hex) {
    var parsedHex, rgbObj;
    if (!this._isHex(hex)) {
      throw new Error('Not a valid hex string.');
    }
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    hex = hex.replace(/[^0-9a-f]/gi, '');
    parsedHex = parseInt(hex, 16);
    rgbObj = {
      r: (parsedHex >> 16) & 255,
      g: (parsedHex >> 8) & 255,
      b: parsedHex & 255
    };
    return rgbObj;
  };

  Color.prototype._hexToHsv = function(hex) {
    return this._rgbToHsv(this._hexToRgb(hex));
  };

  Color.prototype._rgbToHex = function(rgb) {
    var base;
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid RGB object.');
    }
    base = "#" + (1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.g;
    return base.toString(16).slice(1);
  };

  Color.prototype._hsvToHex = function(hsv) {
    return this._rgbToHex(this._hsvToRgb(hsv));
  };

  Color.prototype._hsvToHsl = function(hsv) {
    var computedL, computedS, hslObj, satDenom;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    computedL = (2 - hsv.s / 100) * hsv.v / 2;
    satDenom = computedL < 50 ? computedL * 2 : 200 - computedL * 2;
    computedS = hsv.s * hsv.v / satDenom;
    if (isNaN(computedL)) {
      computedS = 0;
    }
    hslObj = {
      h: hsv.h,
      s: computedS,
      l: computedL
    };
    return hslObj;
  };

  Color.prototype._hslToHsv = function(hsl) {
    var computedS, computedV, hsvObj, t;
    if (!this._isHsl(hsl)) {
      throw new Error('Not a valid HSL object.');
    }
    t = hsl.s * (hsl.l < 50 ? hsl.l : 100 - hsl.l) / 100;
    computedS = 200 * t / (hsl.l + t);
    computedV = t + hsl.l;
    if (isNaN(computedS)) {
      computedS = 0;
    }
    hsvObj = {
      h: hsl.h,
      s: computedS,
      v: computedV
    };
    return hsvObj;
  };

  Color.prototype.htmlColors = {
    aliceblue: 'F0F8FF',
    antiquewhite: 'FAEBD7',
    aqua: '00FFFF',
    aquamarine: '7FFFD4',
    azure: 'F0FFFF',
    beige: 'F5F5DC',
    bisque: 'FFE4C4',
    black: '000000',
    blanchedalmond: 'FFEBCD',
    blue: '0000FF',
    blueviolet: '8A2BE2',
    brown: 'A52A2A',
    burlywood: 'DEB887',
    cadetblue: '5F9EA0',
    chartreuse: '7FFF00',
    chocolate: 'D2691E',
    coral: 'FF7F50',
    cornflowerblue: '6495ED',
    cornsilk: 'FFF8DC',
    crimson: 'DC143C',
    cyan: '00FFFF',
    darkblue: '00008B',
    darkcyan: '008B8B',
    darkgoldenrod: 'B8860B',
    darkgray: 'A9A9A9',
    darkgrey: 'A9A9A9',
    darkgreen: '006400',
    darkkhaki: 'BDB76B',
    darkmagenta: '8B008B',
    darkolivegreen: '556B2F',
    darkorange: 'FF8C00',
    darkorchid: '9932CC',
    darkred: '8B0000',
    darksalmon: 'E9967A',
    darkseagreen: '8FBC8F',
    darkslateblue: '483D8B',
    darkslategray: '2F4F4F',
    darkslategrey: '2F4F4F',
    darkturquoise: '00CED1',
    darkviolet: '9400D3',
    deeppink: 'FF1493',
    deepskyblue: '00BFFF',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1E90FF',
    firebrick: 'B22222',
    floralwhite: 'FFFAF0',
    forestgreen: '228B22',
    fuchsia: 'FF00FF',
    gainsboro: 'DCDCDC',
    ghostwhite: 'F8F8FF',
    gold: 'FFD700',
    goldenrod: 'DAA520',
    gray: '808080',
    grey: '808080',
    green: '008000',
    greenyellow: 'ADFF2F',
    honeydew: 'F0FFF0',
    hotpink: 'FF69B4',
    indianred: 'CD5C5C',
    indigo: '4B0082',
    ivory: 'FFFFF0',
    khaki: 'F0E68C',
    lavender: 'E6E6FA',
    lavenderblush: 'FFF0F5',
    lawngreen: '7CFC00',
    lemonchiffon: 'FFFACD',
    lightblue: 'ADD8E6',
    lightcoral: 'F08080',
    lightcyan: 'E0FFFF',
    lightgoldenrodyellow: 'FAFAD2',
    lightgray: 'D3D3D3',
    lightgrey: 'D3D3D3',
    lightgreen: '90EE90',
    lightpink: 'FFB6C1',
    lightsalmon: 'FFA07A',
    lightseagreen: '20B2AA',
    lightskyblue: '87CEFA',
    lightslategray: '778899',
    lightslategrey: '778899',
    lightsteelblue: 'B0C4DE',
    lightyellow: 'FFFFE0',
    lime: '00FF00',
    limegreen: '32CD32',
    linen: 'FAF0E6',
    magenta: 'FF00FF',
    maroon: '800000',
    mediumaquamarine: '66CDAA',
    mediumblue: '0000CD',
    mediumorchid: 'BA55D3',
    mediumpurple: '9370D8',
    mediumseagreen: '3CB371',
    mediumslateblue: '7B68EE',
    mediumspringgreen: '00FA9A',
    mediumturquoise: '48D1CC',
    mediumvioletred: 'C71585',
    midnightblue: '191970',
    mintcream: 'F5FFFA',
    mistyrose: 'FFE4E1',
    moccasin: 'FFE4B5',
    navajowhite: 'FFDEAD',
    navy: '000080',
    oldlace: 'FDF5E6',
    olive: '808000',
    olivedrab: '6B8E23',
    orange: 'FFA500',
    orangered: 'FF4500',
    orchid: 'DA70D6',
    palegoldenrod: 'EEE8AA',
    palegreen: '98FB98',
    paleturquoise: 'AFEEEE',
    palevioletred: 'D87093',
    papayawhip: 'FFEFD5',
    peachpuff: 'FFDAB9',
    peru: 'CD853F',
    pink: 'FFC0CB',
    plum: 'DDA0DD',
    powderblue: 'B0E0E6',
    purple: '800080',
    rebeccapurple: '663399',
    red: 'FF0000',
    rosybrown: 'BC8F8F',
    royalblue: '4169E1',
    saddlebrown: '8B4513',
    salmon: 'FA8072',
    sandybrown: 'F4A460',
    seagreen: '2E8B57',
    seashell: 'FFF5EE',
    sienna: 'A0522D',
    silver: 'C0C0C0',
    skyblue: '87CEEB',
    slateblue: '6A5ACD',
    slategray: '708090',
    slategrey: '708090',
    snow: 'FFFAFA',
    springgreen: '00FF7F',
    steelblue: '4682B4',
    tan: 'D2B48C',
    teal: '008080',
    thistle: 'D8BFD8',
    tomato: 'FF6347',
    turquoise: '40E0D0',
    violet: 'EE82EE',
    wheat: 'F5DEB3',
    white: 'FFFFFF',
    whitesmoke: 'F5F5F5',
    yellow: 'FFFF00',
    yellowgreen: '9ACD32'
  };

  return Color;

})();

var clamp, isArray, isNaN, isNumber, isObject, isObjectLike, isString, objToString, randomFloat, randomInt;

isObject = function(value) {
  var type;
  type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

isArray = Array.isArray;

isObjectLike = function(value) {
  return !!value && typeof value === 'object';
};

isString = function(value) {
  return typeof value === 'string' || (!isArray(value) && isObjectLike(value));
};

objToString = Object.prototype.toString;

isNumber = function(value) {
  return typeof value === 'number' || (isObjectLike(value) && objToString.call(value) === '[object Number]');
};

isNaN = function(value) {
  return isNumber(value) && value !== +value;
};

clamp = function(value, min, max) {
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = 1;
  }
  return Math.max(min, Math.min(value, max));
};

randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

randomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
};

please.Color = function(color) {
  return new Color(color);
};
if ( typeof define === 'function' && define.amd ){
		define(please);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = please;
	}
	this.please = please;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7OztBQUFNO0VBQ1EsZUFBQyxLQUFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNaLFlBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQVA7QUFBQSxXQUNNLEtBRE47UUFFRSxJQUFDLENBQUEsT0FBRCxHQUNDO1VBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUFUO1VBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQURUO1VBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUOztBQUZHO0FBRE4sV0FNTSxLQU5OO1FBTWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBTk4sV0FPTSxLQVBOO1FBT2lCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBUE4sV0FRTSxLQVJOO1FBUWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBUjVCO0VBRFk7O2tCQVdiLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFBN0Q7QUFBQSxhQUFPLEtBQVA7O0FBQ0EsV0FBTztFQUZBOztrQkFJUixNQUFBLEdBQVEsU0FBQyxLQUFEO0lBQ1AsSUFBZSxRQUFBLENBQVMsS0FBVCxDQUFBLElBQW9CLGlCQUFwQixJQUFpQyxpQkFBakMsSUFBOEMsaUJBQTdEO0FBQUEsYUFBTyxLQUFQOztBQUNBLFdBQU87RUFGQTs7a0JBSVIsWUFBQSxHQUFjLFNBQUMsS0FBRDtBQUNiLFFBQUE7SUFBQSxPQUFBLEdBQVU7SUFDVixJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsT0FB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cGxlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29sb3Jcblx0Y29uc3RydWN0b3I6IChjb2xvcikgLT5cblx0XHRzd2l0Y2ggQF9kZXRlY3RUeXBlIGNvbG9yXG5cdFx0XHR3aGVuICdIU1YnXG5cdFx0XHRcdEBfX21vZGVsID1cblx0XHRcdFx0XHRoOiBjb2xvci5oXG5cdFx0XHRcdFx0czogY29sb3Iuc1xuXHRcdFx0XHRcdHY6IGNvbG9yLnZcblx0XHRcdHdoZW4gJ0hTTCcgdGhlbiBAX19tb2RlbCA9IEBfaHNsVG9Ic3YgY29sb3Jcblx0XHRcdHdoZW4gJ1JHQicgdGhlbiBAX19tb2RlbCA9IEBfcmdiVG9Ic3YgY29sb3Jcblx0XHRcdHdoZW4gJ0hFWCcgdGhlbiBAX19tb2RlbCA9IEBfaGV4VG9Ic3YgY29sb3JcblxuXHRfaXNIc3Y6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3Iudj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2w6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3IubD9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2xTdHJpbmc6IChjb2xvcikgLT5cblx0XHRoc2xUZXN0ID0gL2hzbFxcKHM/ZHsxLDN9LHM/ZHsxLDN9JSxzP2R7MSwzfSVzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoc2xUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5yPyBhbmQgY29sb3IuZz8gYW5kIGNvbG9yLmI/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiU3RyaW5nOiAoY29sb3IpIC0+XG5cdFx0cmdiVGVzdCA9IC9yZ2JcXChcXHM/KFxcZHsxLDN9LFxccz8pezJ9XFxkezEsM31cXHM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIHJnYlRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIZXg6IChjb2xvcikgLT5cblx0XHRoZXhUZXN0ID0gL14jPyg/OlswLTlhLWZdezN9KXsxLDJ9JC9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoZXhUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0aHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbC5oID0gY2xhbXAgdmFsdWUgMCwgMzYwXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5oXG5cblx0aDogQDo6aHVlXG5cblx0c2F0dXJhdGlvbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwucyA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5zXG5cblx0czogQDo6c2F0dXJhdGlvblxuXG5cdHZhbHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbC52ID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnZcblxuXHR2OiBAOjp2YWx1ZVxuXG5cdGJyaWdodG5lc3M6IEA6OnZhbHVlXG5cblx0YjogQDo6dmFsdWVcblxuXHRhbHBoYTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5hID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmFcblxuXHRhOiBAOjphbHBoYVxuXG5cdG9wYWNpdHk6IEA6OmFscGhhXG5cblx0bzogQDo6YWxwaGFcblxuXHRyZWQ6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5yID0gY2xhbXAgdmFsdWUgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5yXG5cblx0Z3JlZW46ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gY2xhbXAgdmFsdWUgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5nXG5cblx0Ymx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLmIgPSBjbGFtcCB2YWx1ZSAwLCAyNTVcblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiByZ2Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IoQF9fbW9kZWwpLmJcblxuXHRyZ2I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYlxuXG5cdHJnYlN0cmluZzogPT5cblx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwicmdiKCN7cmdiLnJ9LCN7cmdiLmd9LCN7cmdiLmJ9KVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcInJnYmEoI3tyZ2Iucn0sI3tyZ2IuZ30sI3tyZ2IuYn0sI3tAX19tb2RlbC5hfSlcIlxuXG5cdGhzbDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwgPSBAX2hzbFRvSHN2IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvSHNsIEBfX21vZGVsXG5cblx0aHNsU3RyaW5nOiA9PlxuXHRcdGhzbCA9IEBfaHN2VG9Ic2wgQF9fbW9kZWxcblx0XHRyZXR1cm4gXCJoc2woI3toc2wuaH0sI3toc2wuc30sI3toc2wubH0pXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwiaHNsYSgje2hzbC5ofSwje2hzbC5zfSwje2hzbC5sfSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHN2OiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBAX2lzSHN2KHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWxcblxuXHQjVE9ETzogY29ycmVjdGx5IGZhY3RvciB0aGlzIGFzIGEgZ2V0dGVyL3NldHRlclxuXHRodG1sQ29sb3I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzU3RyaW5nIHZhbHVlXG5cdFx0XHRjb2xvck5hbWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRyZXR1cm4gQGh0bWxDb2xvcnNbY29sb3JdIGlmIGNvbG9yIGluIEBodG1sQ29sb3JzXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhUTUwgY29sb3IuJ1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0X2RldGVjdFR5cGU6IChjb2xvcikgPT5cblx0XHQjIHN3aXRjaCBjb2xvclxuXHRcdGlmIEBfaXNIc3YgY29sb3IgdGhlbiByZXR1cm4gJ0hTVidcblx0XHRpZiBAX2lzSHNsIGNvbG9yIHRoZW4gcmV0dXJuICdIU0wnXG5cdFx0aWYgQF9pc1JnYiBjb2xvciB0aGVuIHJldHVybiAnUkdCJ1xuXHRcdGlmIEBfaXNSZ2JTdHJpbmcgY29sb3IgdGhlbiByZXR1cm4gJ1JHQl9TVFJJTkcnXG5cdFx0aWYgQF9pc0hleCBjb2xvciB0aGVuIHJldHVybiAnSEVYJ1xuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgY29sb3IgdHlwZS4nXG5cblxuXHRfcmdiVG9Ic3Y6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRyID0gcmdiLnIgLyAyNTVcblx0XHRnID0gcmdiLmcgLyAyNTVcblx0XHRiID0gcmdiLmIgLyAyNTVcblx0XHRtaW5SZ2IgPSBNYXRoLm1pbiByLCBNYXRoLm1pbihnLCBiKVxuXHRcdG1heFJnYiA9IE1hdGgubWF4IHIsIE1hdGgubWF4KGcsIGIpXG5cdFx0I0JsYWNrLWdyYXktd2hpdGVcblx0XHRpZiBtaW5SZ2IgaXMgbWF4UmdiXG5cdFx0XHRoc3ZPYmogPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogbWluUmdiXG5cdFx0XHRyZXR1cm4gaHN2T2JqXG5cdFx0I0NvbG9ycyBvdGhlciB0aGFuIGJsYWNrLWdyYXktd2hpdGU6XG5cdFx0ZCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gZyAtIGIgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIHIgLSBnIGVsc2UgYiAtIHJcblx0XHRoID0gaWYgciBpcyBtaW5SZ2IgdGhlbiAzIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiAxIGVsc2UgNVxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiA2MCAqIChoIC0gZC8obWF4UmdiIC0gbWluUmdiKSlcblx0XHRcdHM6IChtYXhSZ2IgLSBtaW5SZ2IpL21heFJnYlxuXHRcdFx0djogbWF4UmdiXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9oc3ZUb1JnYjogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGggPSBoc3YuaFxuXHRcdHMgPSBoc3Yuc1xuXHRcdHYgPSBoc3YudlxuXG5cdFx0I25vIHNhdHVyYXRpb24gY2FzZVxuXHRcdGlmIHMgaXMgMFxuXHRcdFx0cmdiT2JqID1cblx0XHRcdFx0cjogdlxuXHRcdFx0XHRnOiB2XG5cdFx0XHRcdGI6IHZcblx0XHRcdHJldHVybiByZ2JPYmpcblxuXHRcdGggLz0gNjBcblx0XHRpID0gTWF0aC5mbG9vciBoXG5cdFx0ZiA9IGggLSBpXG5cdFx0cCA9IHYgKiAoMSAtIHMpXG5cdFx0cSA9IHYgKiAoMSAtIHMgKiBmKVxuXHRcdHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSlcblxuXHRcdHN3aXRjaCBpXG5cdFx0XHR3aGVuIDBcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHRcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMVxuXHRcdFx0XHRyID0gcVxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAyXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSB0XG5cdFx0XHR3aGVuIDNcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHFcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNFxuXHRcdFx0XHRyID0gdFxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA1XG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSBxXG5cblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogTWF0aC5mbG9vciByICogMjU1XG5cdFx0XHRnOiBNYXRoLmZsb29yIGcgKiAyNTVcblx0XHRcdGI6IE1hdGguZmxvb3IgYiAqIDI1NVxuXG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb1JnYjogKGhleCkgPT5cblx0XHRpZiBub3QgQF9pc0hleCBoZXggdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGhleCBzdHJpbmcuJ1xuXHRcdCNleHBhbmQgdG8gbG9uZyB2ZXJzaW9uXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwgKG0sIHIsIGcsIGIpIC0+IHIgKyByICsgZyArIGcgKyBiICsgYlxuXHRcdCNyZW1vdmUgZXZlcnl0aGluZyBleHBlY3QgdmFsaWQgbnVtYmVyc1xuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9bXjAtOWEtZl0vZ2ksICcnXG5cdFx0cGFyc2VkSGV4ID0gcGFyc2VJbnQgaGV4LCAxNlxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiAocGFyc2VkSGV4ID4+IDE2KSAmIDI1NVxuXHRcdFx0ZzogKHBhcnNlZEhleCA+PiA4KSAmIDI1NVxuXHRcdFx0YjogcGFyc2VkSGV4ICYgMjU1XG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb0hzdjogKGhleCkgPT4gQF9yZ2JUb0hzdihAX2hleFRvUmdiKGhleCkpXG5cblx0X3JnYlRvSGV4OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiIHJnYiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0YmFzZSA9IFwiIyN7MSA8PCAyNH0je3JnYi5yIDw8IDE2fSN7cmdiLmcgPDwgOH0je3JnYi5nfVwiXG5cdFx0cmV0dXJuIGJhc2UudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG5cblx0X2hzdlRvSGV4OiAoaHN2KSA9PiBAX3JnYlRvSGV4KEBfaHN2VG9SZ2IoaHN2KSlcblxuXHRfaHN2VG9Ic2w6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRjb21wdXRlZEwgPSAoMiAtIGhzdi5zLzEwMCkgKiBoc3Yudi8yXG5cdFx0c2F0RGVub20gPSBpZiBjb21wdXRlZEwgPCA1MCB0aGVuIGNvbXB1dGVkTCAqIDIgZWxzZSAyMDAgLSBjb21wdXRlZEwgKiAyXG5cdFx0Y29tcHV0ZWRTID0gaHN2LnMgKiBoc3YudiAvIHNhdERlbm9tXG5cdFx0I2NvcnJlY3RzIGEgZGl2aWRlIGJ5IDAgZXJyb3Jcblx0XHRpZiBpc05hTiBjb21wdXRlZEwgdGhlbiBjb21wdXRlZFMgPSAwXG5cblx0XHRoc2xPYmogPVxuXHRcdFx0aDogaHN2Lmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0bDogY29tcHV0ZWRMXG5cblx0XHRyZXR1cm4gaHNsT2JqXG5cblx0X2hzbFRvSHN2OiAoaHNsKSA9PlxuXHRcdGlmIG5vdCBAX2lzSHNsIGhzbCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNMIG9iamVjdC4nXG5cdFx0dCA9IGhzbC5zICogKGlmIGhzbC5sIDwgNTAgdGhlbiBoc2wubCBlbHNlIDEwMCAtIGhzbC5sKS8xMDBcblx0XHRjb21wdXRlZFMgPSAyMDAgKiB0IC8gKGhzbC5sICsgdClcblx0XHRjb21wdXRlZFYgPSB0ICsgaHNsLmxcblx0XHQjY29ycmVjdHMgYSBkaXZpZGUgYnkgMCBlcnJvclxuXHRcdGlmIGlzTmFOIGNvbXB1dGVkUyB0aGVuIGNvbXB1dGVkUyA9IDBcblxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiBoc2wuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHR2OiBjb21wdXRlZFZcblxuXHRcdHJldHVybiBoc3ZPYmpcblxuXG5cdGh0bWxDb2xvcnM6XG5cdFx0YWxpY2VibHVlOiAnRjBGOEZGJ1xuXHRcdGFudGlxdWV3aGl0ZTogJ0ZBRUJENydcblx0XHRhcXVhOiAnMDBGRkZGJ1xuXHRcdGFxdWFtYXJpbmU6ICc3RkZGRDQnXG5cdFx0YXp1cmU6ICdGMEZGRkYnXG5cdFx0YmVpZ2U6ICdGNUY1REMnXG5cdFx0YmlzcXVlOiAnRkZFNEM0J1xuXHRcdGJsYWNrOiAnMDAwMDAwJ1xuXHRcdGJsYW5jaGVkYWxtb25kOiAnRkZFQkNEJ1xuXHRcdGJsdWU6ICcwMDAwRkYnXG5cdFx0Ymx1ZXZpb2xldDogJzhBMkJFMidcblx0XHRicm93bjogJ0E1MkEyQSdcblx0XHRidXJseXdvb2Q6ICdERUI4ODcnXG5cdFx0Y2FkZXRibHVlOiAnNUY5RUEwJ1xuXHRcdGNoYXJ0cmV1c2U6ICc3RkZGMDAnXG5cdFx0Y2hvY29sYXRlOiAnRDI2OTFFJ1xuXHRcdGNvcmFsOiAnRkY3RjUwJ1xuXHRcdGNvcm5mbG93ZXJibHVlOiAnNjQ5NUVEJ1xuXHRcdGNvcm5zaWxrOiAnRkZGOERDJ1xuXHRcdGNyaW1zb246ICdEQzE0M0MnXG5cdFx0Y3lhbjogJzAwRkZGRidcblx0XHRkYXJrYmx1ZTogJzAwMDA4Qidcblx0XHRkYXJrY3lhbjogJzAwOEI4Qidcblx0XHRkYXJrZ29sZGVucm9kOiAnQjg4NjBCJ1xuXHRcdGRhcmtncmF5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmV5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmVlbjogJzAwNjQwMCdcblx0XHRkYXJra2hha2k6ICdCREI3NkInXG5cdFx0ZGFya21hZ2VudGE6ICc4QjAwOEInXG5cdFx0ZGFya29saXZlZ3JlZW46ICc1NTZCMkYnXG5cdFx0ZGFya29yYW5nZTogJ0ZGOEMwMCdcblx0XHRkYXJrb3JjaGlkOiAnOTkzMkNDJ1xuXHRcdGRhcmtyZWQ6ICc4QjAwMDAnXG5cdFx0ZGFya3NhbG1vbjogJ0U5OTY3QSdcblx0XHRkYXJrc2VhZ3JlZW46ICc4RkJDOEYnXG5cdFx0ZGFya3NsYXRlYmx1ZTogJzQ4M0Q4Qidcblx0XHRkYXJrc2xhdGVncmF5OiAnMkY0RjRGJ1xuXHRcdGRhcmtzbGF0ZWdyZXk6ICcyRjRGNEYnXG5cdFx0ZGFya3R1cnF1b2lzZTogJzAwQ0VEMSdcblx0XHRkYXJrdmlvbGV0OiAnOTQwMEQzJ1xuXHRcdGRlZXBwaW5rOiAnRkYxNDkzJ1xuXHRcdGRlZXBza3libHVlOiAnMDBCRkZGJ1xuXHRcdGRpbWdyYXk6ICc2OTY5NjknXG5cdFx0ZGltZ3JleTogJzY5Njk2OSdcblx0XHRkb2RnZXJibHVlOiAnMUU5MEZGJ1xuXHRcdGZpcmVicmljazogJ0IyMjIyMidcblx0XHRmbG9yYWx3aGl0ZTogJ0ZGRkFGMCdcblx0XHRmb3Jlc3RncmVlbjogJzIyOEIyMidcblx0XHRmdWNoc2lhOiAnRkYwMEZGJ1xuXHRcdGdhaW5zYm9ybzogJ0RDRENEQydcblx0XHRnaG9zdHdoaXRlOiAnRjhGOEZGJ1xuXHRcdGdvbGQ6ICdGRkQ3MDAnXG5cdFx0Z29sZGVucm9kOiAnREFBNTIwJ1xuXHRcdGdyYXk6ICc4MDgwODAnXG5cdFx0Z3JleTogJzgwODA4MCdcblx0XHRncmVlbjogJzAwODAwMCdcblx0XHRncmVlbnllbGxvdzogJ0FERkYyRidcblx0XHRob25leWRldzogJ0YwRkZGMCdcblx0XHRob3RwaW5rOiAnRkY2OUI0J1xuXHRcdGluZGlhbnJlZDogJ0NENUM1Qydcblx0XHRpbmRpZ286ICc0QjAwODInXG5cdFx0aXZvcnk6ICdGRkZGRjAnXG5cdFx0a2hha2k6ICdGMEU2OEMnXG5cdFx0bGF2ZW5kZXI6ICdFNkU2RkEnXG5cdFx0bGF2ZW5kZXJibHVzaDogJ0ZGRjBGNSdcblx0XHRsYXduZ3JlZW46ICc3Q0ZDMDAnXG5cdFx0bGVtb25jaGlmZm9uOiAnRkZGQUNEJ1xuXHRcdGxpZ2h0Ymx1ZTogJ0FERDhFNidcblx0XHRsaWdodGNvcmFsOiAnRjA4MDgwJ1xuXHRcdGxpZ2h0Y3lhbjogJ0UwRkZGRidcblx0XHRsaWdodGdvbGRlbnJvZHllbGxvdzogJ0ZBRkFEMidcblx0XHRsaWdodGdyYXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmV5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JlZW46ICc5MEVFOTAnXG5cdFx0bGlnaHRwaW5rOiAnRkZCNkMxJ1xuXHRcdGxpZ2h0c2FsbW9uOiAnRkZBMDdBJ1xuXHRcdGxpZ2h0c2VhZ3JlZW46ICcyMEIyQUEnXG5cdFx0bGlnaHRza3libHVlOiAnODdDRUZBJ1xuXHRcdGxpZ2h0c2xhdGVncmF5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c2xhdGVncmV5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c3RlZWxibHVlOiAnQjBDNERFJ1xuXHRcdGxpZ2h0eWVsbG93OiAnRkZGRkUwJ1xuXHRcdGxpbWU6ICcwMEZGMDAnXG5cdFx0bGltZWdyZWVuOiAnMzJDRDMyJ1xuXHRcdGxpbmVuOiAnRkFGMEU2J1xuXHRcdG1hZ2VudGE6ICdGRjAwRkYnXG5cdFx0bWFyb29uOiAnODAwMDAwJ1xuXHRcdG1lZGl1bWFxdWFtYXJpbmU6ICc2NkNEQUEnXG5cdFx0bWVkaXVtYmx1ZTogJzAwMDBDRCdcblx0XHRtZWRpdW1vcmNoaWQ6ICdCQTU1RDMnXG5cdFx0bWVkaXVtcHVycGxlOiAnOTM3MEQ4J1xuXHRcdG1lZGl1bXNlYWdyZWVuOiAnM0NCMzcxJ1xuXHRcdG1lZGl1bXNsYXRlYmx1ZTogJzdCNjhFRSdcblx0XHRtZWRpdW1zcHJpbmdncmVlbjogJzAwRkE5QSdcblx0XHRtZWRpdW10dXJxdW9pc2U6ICc0OEQxQ0MnXG5cdFx0bWVkaXVtdmlvbGV0cmVkOiAnQzcxNTg1J1xuXHRcdG1pZG5pZ2h0Ymx1ZTogJzE5MTk3MCdcblx0XHRtaW50Y3JlYW06ICdGNUZGRkEnXG5cdFx0bWlzdHlyb3NlOiAnRkZFNEUxJ1xuXHRcdG1vY2Nhc2luOiAnRkZFNEI1J1xuXHRcdG5hdmFqb3doaXRlOiAnRkZERUFEJ1xuXHRcdG5hdnk6ICcwMDAwODAnXG5cdFx0b2xkbGFjZTogJ0ZERjVFNidcblx0XHRvbGl2ZTogJzgwODAwMCdcblx0XHRvbGl2ZWRyYWI6ICc2QjhFMjMnXG5cdFx0b3JhbmdlOiAnRkZBNTAwJ1xuXHRcdG9yYW5nZXJlZDogJ0ZGNDUwMCdcblx0XHRvcmNoaWQ6ICdEQTcwRDYnXG5cdFx0cGFsZWdvbGRlbnJvZDogJ0VFRThBQSdcblx0XHRwYWxlZ3JlZW46ICc5OEZCOTgnXG5cdFx0cGFsZXR1cnF1b2lzZTogJ0FGRUVFRSdcblx0XHRwYWxldmlvbGV0cmVkOiAnRDg3MDkzJ1xuXHRcdHBhcGF5YXdoaXA6ICdGRkVGRDUnXG5cdFx0cGVhY2hwdWZmOiAnRkZEQUI5J1xuXHRcdHBlcnU6ICdDRDg1M0YnXG5cdFx0cGluazogJ0ZGQzBDQidcblx0XHRwbHVtOiAnRERBMEREJ1xuXHRcdHBvd2RlcmJsdWU6ICdCMEUwRTYnXG5cdFx0cHVycGxlOiAnODAwMDgwJ1xuXHRcdHJlYmVjY2FwdXJwbGU6ICc2NjMzOTknXG5cdFx0cmVkOiAnRkYwMDAwJ1xuXHRcdHJvc3licm93bjogJ0JDOEY4Ridcblx0XHRyb3lhbGJsdWU6ICc0MTY5RTEnXG5cdFx0c2FkZGxlYnJvd246ICc4QjQ1MTMnXG5cdFx0c2FsbW9uOiAnRkE4MDcyJ1xuXHRcdHNhbmR5YnJvd246ICdGNEE0NjAnXG5cdFx0c2VhZ3JlZW46ICcyRThCNTcnXG5cdFx0c2Vhc2hlbGw6ICdGRkY1RUUnXG5cdFx0c2llbm5hOiAnQTA1MjJEJ1xuXHRcdHNpbHZlcjogJ0MwQzBDMCdcblx0XHRza3libHVlOiAnODdDRUVCJ1xuXHRcdHNsYXRlYmx1ZTogJzZBNUFDRCdcblx0XHRzbGF0ZWdyYXk6ICc3MDgwOTAnXG5cdFx0c2xhdGVncmV5OiAnNzA4MDkwJ1xuXHRcdHNub3c6ICdGRkZBRkEnXG5cdFx0c3ByaW5nZ3JlZW46ICcwMEZGN0YnXG5cdFx0c3RlZWxibHVlOiAnNDY4MkI0J1xuXHRcdHRhbjogJ0QyQjQ4Qydcblx0XHR0ZWFsOiAnMDA4MDgwJ1xuXHRcdHRoaXN0bGU6ICdEOEJGRDgnXG5cdFx0dG9tYXRvOiAnRkY2MzQ3J1xuXHRcdHR1cnF1b2lzZTogJzQwRTBEMCdcblx0XHR2aW9sZXQ6ICdFRTgyRUUnXG5cdFx0d2hlYXQ6ICdGNURFQjMnXG5cdFx0d2hpdGU6ICdGRkZGRkYnXG5cdFx0d2hpdGVzbW9rZTogJ0Y1RjVGNSdcblx0XHR5ZWxsb3c6ICdGRkZGMDAnXG5cdFx0eWVsbG93Z3JlZW46ICc5QUNEMzInXG5cblxuXG4iLCIjbG9kYXNoIC0gaXNPYmplY3RcbmlzT2JqZWN0ID0gKHZhbHVlKSAtPlxuXHR0eXBlID0gdHlwZW9mIHZhbHVlXG5cdHJldHVybiAhIXZhbHVlIGFuZCAodHlwZSBpcyAnb2JqZWN0JyBvciB0eXBlIGlzICdmdW5jdGlvbicpXG5cbmlzQXJyYXkgPSBBcnJheS5pc0FycmF5XG5cbiNsb2Rhc2ggLSBpc09iamVjdExpa2VcbmlzT2JqZWN0TGlrZSA9ICh2YWx1ZSkgLT4gISF2YWx1ZSAmJnR5cGVvZiB2YWx1ZSBpcyAnb2JqZWN0J1xuXG4jbG9kYXNoIC0gaXNTdHJpbmcgKG1vZGlmaWVkKVxuaXNTdHJpbmcgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJyBvciAoIWlzQXJyYXkodmFsdWUpIGFuZCBpc09iamVjdExpa2UodmFsdWUpKVxuXG5vYmpUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuaXNOdW1iZXIgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJyBvciAoaXNPYmplY3RMaWtlKHZhbHVlKSBhbmQgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgaXMgJ1tvYmplY3QgTnVtYmVyXScpXG5cbmlzTmFOID0gKHZhbHVlKSAtPiBpc051bWJlcih2YWx1ZSkgYW5kIHZhbHVlIGlzbnQgK3ZhbHVlXG5cbiNjbGFtcCB2YWx1ZXMgYmV0d2VlbiB0d28gcG9pbnRzIGRlZmF1bHQgKHZhbHVlLCAwLCAxKVxuY2xhbXAgPSAodmFsdWUsIG1pbiA9IDAsIG1heCA9IDEpIC0+IE1hdGgubWF4KG1pbiwgTWF0aC5taW4odmFsdWUsIG1heCkpXG5cbnJhbmRvbUludCA9IChtaW4sIG1heCkgLT4gTWF0aC5mbG9vciBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluXG5cbnJhbmRvbUZsb2F0ID0gKG1pbiwgbWF4KSAtPiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4iLCJwbGVhc2UuQ29sb3IgPSAoY29sb3IpIC0+IG5ldyBDb2xvciBjb2xvciJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
