(function(){
var please = {
	version: '0.0.0'
};var Color,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
    this.getHtmlColors = bind(this.getHtmlColors, this);
    this.getHtmlColor = bind(this.getHtmlColor, this);
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
    if ((value != null) && isNumber(value)) {
      this.__model.h = clamp(value(0, 360));
      return this;
    }
    return this.__model.h;
  };

  Color.prototype.saturation = function(value) {
    if ((value != null) && isNumber(value)) {
      this.__model.s = clamp(value);
      return this;
    }
    return this.__model.s;
  };

  Color.prototype.sat = Color.prototype.saturation;

  Color.prototype.value = function(value) {
    if ((value != null) && isNumber(value)) {
      this.__model.v = clamp(value);
      return this;
    }
    return this.__model.v;
  };

  Color.prototype.val = Color.prototype.value;

  Color.prototype.brightness = Color.prototype.value;

  Color.prototype.alpha = function(value) {
    if ((value != null) && isNumber(value)) {
      this.__model.a = clamp(value);
      return this;
    }
    return this.__model.a;
  };

  Color.prototype.opacity = Color.prototype.alpha;

  Color.prototype.red = function(value) {
    var rgb;
    if ((value != null) && isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.r = clamp(value(0, 255));
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).r;
  };

  Color.prototype.green = function(value) {
    var rgb;
    if ((value != null) && isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.g = clamp(value(0, 255));
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).g;
  };

  Color.prototype.blue = function(value) {
    var rgb;
    if ((value != null) && isNumber(value)) {
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

  Color.prototype.getHtmlColor = function(value) {
    var colorName;
    if (value != null) {
      colorName = value.toString().toLowerCase();
      if (this._htmlColors[colorName] != null) {
        return this._htmlColors[colorName];
      }
    }
    throw new Error('Not a valid HTML color.');
  };

  Color.prototype.getHtmlColors = function() {
    return this._htmlColors;
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
    }
    throw new Error('Not a valid color type.');
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

  Color.prototype._htmlColors = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNaLFlBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQVA7QUFBQSxXQUNNLEtBRE47UUFFRSxJQUFDLENBQUEsT0FBRCxHQUNDO1VBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUFUO1VBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQURUO1VBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUOztBQUZHO0FBRE4sV0FNTSxLQU5OO1FBTWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBTk4sV0FPTSxLQVBOO1FBT2lCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBUE4sV0FRTSxLQVJOO1FBUWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBUjVCO0VBRFk7O2tCQVdiLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFBN0Q7QUFBQSxhQUFPLEtBQVA7O0FBQ0EsV0FBTztFQUZBOztrQkFJUixNQUFBLEdBQVEsU0FBQyxLQUFEO0lBQ1AsSUFBZSxRQUFBLENBQVMsS0FBVCxDQUFBLElBQW9CLGlCQUFwQixJQUFpQyxpQkFBakMsSUFBOEMsaUJBQTdEO0FBQUEsYUFBTyxLQUFQOztBQUNBLFdBQU87RUFGQTs7a0JBSVIsWUFBQSxHQUFjLFNBQUMsS0FBRDtBQUNiLFFBQUE7SUFBQSxPQUFBLEdBQVU7SUFDVixJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsT0FB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Y2VzQ29udGVudCI6WyJjbGFzcyBDb2xvclxuXHRjb25zdHJ1Y3RvcjogKGNvbG9yKSAtPlxuXHRcdHN3aXRjaCBAX2RldGVjdFR5cGUgY29sb3Jcblx0XHRcdHdoZW4gJ0hTVidcblx0XHRcdFx0QF9fbW9kZWwgPVxuXHRcdFx0XHRcdGg6IGNvbG9yLmhcblx0XHRcdFx0XHRzOiBjb2xvci5zXG5cdFx0XHRcdFx0djogY29sb3IudlxuXHRcdFx0d2hlbiAnSFNMJyB0aGVuIEBfX21vZGVsID0gQF9oc2xUb0hzdiBjb2xvclxuXHRcdFx0d2hlbiAnUkdCJyB0aGVuIEBfX21vZGVsID0gQF9yZ2JUb0hzdiBjb2xvclxuXHRcdFx0d2hlbiAnSEVYJyB0aGVuIEBfX21vZGVsID0gQF9oZXhUb0hzdiBjb2xvclxuXG5cdF9pc0hzdjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci52P1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbDogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci5sP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbFN0cmluZzogKGNvbG9yKSAtPlxuXHRcdGhzbFRlc3QgPSAvaHNsXFwocz9kezEsM30scz9kezEsM30lLHM/ZHsxLDN9JXM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhzbFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2I6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLnI/IGFuZCBjb2xvci5nPyBhbmQgY29sb3IuYj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2JTdHJpbmc6IChjb2xvcikgLT5cblx0XHRyZ2JUZXN0ID0gL3JnYlxcKFxccz8oXFxkezEsM30sXFxzPyl7Mn1cXGR7MSwzfVxccz9cXCkvaVxuXHRcdHJldHVybiB0cnVlIGlmIGlzU3RyaW5nKGNvbG9yKSBhbmQgcmdiVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hleDogKGNvbG9yKSAtPlxuXHRcdGhleFRlc3QgPSAvXiM/KD86WzAtOWEtZl17M30pezEsMn0kL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhleFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRodWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwuaCA9IGNsYW1wIHZhbHVlIDAsIDM2MFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuaFxuXG5cdHNhdHVyYXRpb246ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwucyA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5zXG5cblx0c2F0OiBAOjpzYXR1cmF0aW9uXG5cblx0dmFsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwudiA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC52XG5cblx0dmFsOiBAOjp2YWx1ZVxuXG5cdGJyaWdodG5lc3M6IEA6OnZhbHVlXG5cblxuXHRhbHBoYTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5hID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmFcblxuXHRvcGFjaXR5OiBAOjphbHBoYVxuXG5cdHJlZDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuciA9IGNsYW1wIHZhbHVlIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuclxuXG5cdGdyZWVuOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gY2xhbXAgdmFsdWUgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5nXG5cblx0Ymx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuYiA9IGNsYW1wIHZhbHVlIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuYlxuXG5cdHJnYjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiXG5cblx0cmdiU3RyaW5nOiA9PlxuXHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRyZXR1cm4gXCJyZ2IoI3tyZ2Iucn0sI3tyZ2IuZ30sI3tyZ2IuYn0pXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwicmdiYSgje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHNsOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfaHNsVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9Ic2wgQF9fbW9kZWxcblxuXHRoc2xTdHJpbmc6ID0+XG5cdFx0aHNsID0gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXHRcdHJldHVybiBcImhzbCgje2hzbC5ofSwje2hzbC5zfSwje2hzbC5sfSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJoc2xhKCN7aHNsLmh9LCN7aHNsLnN9LCN7aHNsLmx9LCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc3Y6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIEBfaXNIc3YodmFsdWUpXG5cdFx0XHRAX19tb2RlbCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbFxuXG5cdGdldEh0bWxDb2xvcjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0Y29sb3JOYW1lID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRpZiBAX2h0bWxDb2xvcnNbY29sb3JOYW1lXT8gdGhlbiByZXR1cm4gQF9odG1sQ29sb3JzW2NvbG9yTmFtZV1cblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhUTUwgY29sb3IuJ1xuXG5cdGdldEh0bWxDb2xvcnM6ID0+IEBfaHRtbENvbG9yc1xuXG5cdF9kZXRlY3RUeXBlOiAoY29sb3IpID0+XG5cdFx0aWYgQF9pc0hzdiBjb2xvciB0aGVuIHJldHVybiAnSFNWJ1xuXHRcdGlmIEBfaXNIc2wgY29sb3IgdGhlbiByZXR1cm4gJ0hTTCdcblx0XHRpZiBAX2lzUmdiIGNvbG9yIHRoZW4gcmV0dXJuICdSR0InXG5cdFx0aWYgQF9pc1JnYlN0cmluZyBjb2xvciB0aGVuIHJldHVybiAnUkdCX1NUUklORydcblx0XHRpZiBAX2lzSGV4IGNvbG9yIHRoZW4gcmV0dXJuICdIRVgnXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBjb2xvciB0eXBlLidcblxuXHRfcmdiVG9Ic3Y6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRyID0gcmdiLnIgLyAyNTVcblx0XHRnID0gcmdiLmcgLyAyNTVcblx0XHRiID0gcmdiLmIgLyAyNTVcblx0XHRtaW5SZ2IgPSBNYXRoLm1pbiByLCBNYXRoLm1pbihnLCBiKVxuXHRcdG1heFJnYiA9IE1hdGgubWF4IHIsIE1hdGgubWF4KGcsIGIpXG5cdFx0I0JsYWNrLWdyYXktd2hpdGVcblx0XHRpZiBtaW5SZ2IgaXMgbWF4UmdiXG5cdFx0XHRoc3ZPYmogPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogbWluUmdiXG5cdFx0XHRyZXR1cm4gaHN2T2JqXG5cdFx0I0NvbG9ycyBvdGhlciB0aGFuIGJsYWNrLWdyYXktd2hpdGU6XG5cdFx0ZCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gZyAtIGIgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIHIgLSBnIGVsc2UgYiAtIHJcblx0XHRoID0gaWYgciBpcyBtaW5SZ2IgdGhlbiAzIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiAxIGVsc2UgNVxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiA2MCAqIChoIC0gZC8obWF4UmdiIC0gbWluUmdiKSlcblx0XHRcdHM6IChtYXhSZ2IgLSBtaW5SZ2IpL21heFJnYlxuXHRcdFx0djogbWF4UmdiXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9oc3ZUb1JnYjogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGggPSBoc3YuaFxuXHRcdHMgPSBoc3Yuc1xuXHRcdHYgPSBoc3YudlxuXG5cdFx0I25vIHNhdHVyYXRpb24gY2FzZVxuXHRcdGlmIHMgaXMgMFxuXHRcdFx0cmdiT2JqID1cblx0XHRcdFx0cjogdlxuXHRcdFx0XHRnOiB2XG5cdFx0XHRcdGI6IHZcblx0XHRcdHJldHVybiByZ2JPYmpcblxuXHRcdGggLz0gNjBcblx0XHRpID0gTWF0aC5mbG9vciBoXG5cdFx0ZiA9IGggLSBpXG5cdFx0cCA9IHYgKiAoMSAtIHMpXG5cdFx0cSA9IHYgKiAoMSAtIHMgKiBmKVxuXHRcdHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSlcblxuXHRcdHN3aXRjaCBpXG5cdFx0XHR3aGVuIDBcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHRcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMVxuXHRcdFx0XHRyID0gcVxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAyXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSB0XG5cdFx0XHR3aGVuIDNcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHFcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNFxuXHRcdFx0XHRyID0gdFxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA1XG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSBxXG5cblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogTWF0aC5mbG9vciByICogMjU1XG5cdFx0XHRnOiBNYXRoLmZsb29yIGcgKiAyNTVcblx0XHRcdGI6IE1hdGguZmxvb3IgYiAqIDI1NVxuXG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb1JnYjogKGhleCkgPT5cblx0XHRpZiBub3QgQF9pc0hleCBoZXggdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGhleCBzdHJpbmcuJ1xuXHRcdCNleHBhbmQgdG8gbG9uZyB2ZXJzaW9uXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwgKG0sIHIsIGcsIGIpIC0+IHIgKyByICsgZyArIGcgKyBiICsgYlxuXHRcdCNyZW1vdmUgZXZlcnl0aGluZyBleHBlY3QgdmFsaWQgbnVtYmVyc1xuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9bXjAtOWEtZl0vZ2ksICcnXG5cdFx0cGFyc2VkSGV4ID0gcGFyc2VJbnQgaGV4LCAxNlxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiAocGFyc2VkSGV4ID4+IDE2KSAmIDI1NVxuXHRcdFx0ZzogKHBhcnNlZEhleCA+PiA4KSAmIDI1NVxuXHRcdFx0YjogcGFyc2VkSGV4ICYgMjU1XG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb0hzdjogKGhleCkgPT4gQF9yZ2JUb0hzdihAX2hleFRvUmdiKGhleCkpXG5cblx0X3JnYlRvSGV4OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiIHJnYiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0YmFzZSA9IFwiIyN7MSA8PCAyNH0je3JnYi5yIDw8IDE2fSN7cmdiLmcgPDwgOH0je3JnYi5nfVwiXG5cdFx0cmV0dXJuIGJhc2UudG9TdHJpbmcoMTYpLnNsaWNlKDEpXG5cblx0X2hzdlRvSGV4OiAoaHN2KSA9PiBAX3JnYlRvSGV4KEBfaHN2VG9SZ2IoaHN2KSlcblxuXHRfaHN2VG9Ic2w6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRjb21wdXRlZEwgPSAoMiAtIGhzdi5zLzEwMCkgKiBoc3Yudi8yXG5cdFx0c2F0RGVub20gPSBpZiBjb21wdXRlZEwgPCA1MCB0aGVuIGNvbXB1dGVkTCAqIDIgZWxzZSAyMDAgLSBjb21wdXRlZEwgKiAyXG5cdFx0Y29tcHV0ZWRTID0gaHN2LnMgKiBoc3YudiAvIHNhdERlbm9tXG5cdFx0I2NvcnJlY3RzIGEgZGl2aWRlIGJ5IDAgZXJyb3Jcblx0XHRpZiBpc05hTiBjb21wdXRlZEwgdGhlbiBjb21wdXRlZFMgPSAwXG5cblx0XHRoc2xPYmogPVxuXHRcdFx0aDogaHN2Lmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0bDogY29tcHV0ZWRMXG5cblx0XHRyZXR1cm4gaHNsT2JqXG5cblx0X2hzbFRvSHN2OiAoaHNsKSA9PlxuXHRcdGlmIG5vdCBAX2lzSHNsIGhzbCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNMIG9iamVjdC4nXG5cdFx0dCA9IGhzbC5zICogKGlmIGhzbC5sIDwgNTAgdGhlbiBoc2wubCBlbHNlIDEwMCAtIGhzbC5sKS8xMDBcblx0XHRjb21wdXRlZFMgPSAyMDAgKiB0IC8gKGhzbC5sICsgdClcblx0XHRjb21wdXRlZFYgPSB0ICsgaHNsLmxcblx0XHQjY29ycmVjdHMgYSBkaXZpZGUgYnkgMCBlcnJvclxuXHRcdGlmIGlzTmFOIGNvbXB1dGVkUyB0aGVuIGNvbXB1dGVkUyA9IDBcblxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiBoc2wuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHR2OiBjb21wdXRlZFZcblxuXHRcdHJldHVybiBoc3ZPYmpcblxuXHRfaHRtbENvbG9yczpcblx0XHRhbGljZWJsdWU6ICdGMEY4RkYnXG5cdFx0YW50aXF1ZXdoaXRlOiAnRkFFQkQ3J1xuXHRcdGFxdWE6ICcwMEZGRkYnXG5cdFx0YXF1YW1hcmluZTogJzdGRkZENCdcblx0XHRhenVyZTogJ0YwRkZGRidcblx0XHRiZWlnZTogJ0Y1RjVEQydcblx0XHRiaXNxdWU6ICdGRkU0QzQnXG5cdFx0YmxhY2s6ICcwMDAwMDAnXG5cdFx0YmxhbmNoZWRhbG1vbmQ6ICdGRkVCQ0QnXG5cdFx0Ymx1ZTogJzAwMDBGRidcblx0XHRibHVldmlvbGV0OiAnOEEyQkUyJ1xuXHRcdGJyb3duOiAnQTUyQTJBJ1xuXHRcdGJ1cmx5d29vZDogJ0RFQjg4Nydcblx0XHRjYWRldGJsdWU6ICc1RjlFQTAnXG5cdFx0Y2hhcnRyZXVzZTogJzdGRkYwMCdcblx0XHRjaG9jb2xhdGU6ICdEMjY5MUUnXG5cdFx0Y29yYWw6ICdGRjdGNTAnXG5cdFx0Y29ybmZsb3dlcmJsdWU6ICc2NDk1RUQnXG5cdFx0Y29ybnNpbGs6ICdGRkY4REMnXG5cdFx0Y3JpbXNvbjogJ0RDMTQzQydcblx0XHRjeWFuOiAnMDBGRkZGJ1xuXHRcdGRhcmtibHVlOiAnMDAwMDhCJ1xuXHRcdGRhcmtjeWFuOiAnMDA4QjhCJ1xuXHRcdGRhcmtnb2xkZW5yb2Q6ICdCODg2MEInXG5cdFx0ZGFya2dyYXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZWVuOiAnMDA2NDAwJ1xuXHRcdGRhcmtraGFraTogJ0JEQjc2Qidcblx0XHRkYXJrbWFnZW50YTogJzhCMDA4Qidcblx0XHRkYXJrb2xpdmVncmVlbjogJzU1NkIyRidcblx0XHRkYXJrb3JhbmdlOiAnRkY4QzAwJ1xuXHRcdGRhcmtvcmNoaWQ6ICc5OTMyQ0MnXG5cdFx0ZGFya3JlZDogJzhCMDAwMCdcblx0XHRkYXJrc2FsbW9uOiAnRTk5NjdBJ1xuXHRcdGRhcmtzZWFncmVlbjogJzhGQkM4Ridcblx0XHRkYXJrc2xhdGVibHVlOiAnNDgzRDhCJ1xuXHRcdGRhcmtzbGF0ZWdyYXk6ICcyRjRGNEYnXG5cdFx0ZGFya3NsYXRlZ3JleTogJzJGNEY0Ridcblx0XHRkYXJrdHVycXVvaXNlOiAnMDBDRUQxJ1xuXHRcdGRhcmt2aW9sZXQ6ICc5NDAwRDMnXG5cdFx0ZGVlcHBpbms6ICdGRjE0OTMnXG5cdFx0ZGVlcHNreWJsdWU6ICcwMEJGRkYnXG5cdFx0ZGltZ3JheTogJzY5Njk2OSdcblx0XHRkaW1ncmV5OiAnNjk2OTY5J1xuXHRcdGRvZGdlcmJsdWU6ICcxRTkwRkYnXG5cdFx0ZmlyZWJyaWNrOiAnQjIyMjIyJ1xuXHRcdGZsb3JhbHdoaXRlOiAnRkZGQUYwJ1xuXHRcdGZvcmVzdGdyZWVuOiAnMjI4QjIyJ1xuXHRcdGZ1Y2hzaWE6ICdGRjAwRkYnXG5cdFx0Z2FpbnNib3JvOiAnRENEQ0RDJ1xuXHRcdGdob3N0d2hpdGU6ICdGOEY4RkYnXG5cdFx0Z29sZDogJ0ZGRDcwMCdcblx0XHRnb2xkZW5yb2Q6ICdEQUE1MjAnXG5cdFx0Z3JheTogJzgwODA4MCdcblx0XHRncmV5OiAnODA4MDgwJ1xuXHRcdGdyZWVuOiAnMDA4MDAwJ1xuXHRcdGdyZWVueWVsbG93OiAnQURGRjJGJ1xuXHRcdGhvbmV5ZGV3OiAnRjBGRkYwJ1xuXHRcdGhvdHBpbms6ICdGRjY5QjQnXG5cdFx0aW5kaWFucmVkOiAnQ0Q1QzVDJ1xuXHRcdGluZGlnbzogJzRCMDA4Midcblx0XHRpdm9yeTogJ0ZGRkZGMCdcblx0XHRraGFraTogJ0YwRTY4Qydcblx0XHRsYXZlbmRlcjogJ0U2RTZGQSdcblx0XHRsYXZlbmRlcmJsdXNoOiAnRkZGMEY1J1xuXHRcdGxhd25ncmVlbjogJzdDRkMwMCdcblx0XHRsZW1vbmNoaWZmb246ICdGRkZBQ0QnXG5cdFx0bGlnaHRibHVlOiAnQUREOEU2J1xuXHRcdGxpZ2h0Y29yYWw6ICdGMDgwODAnXG5cdFx0bGlnaHRjeWFuOiAnRTBGRkZGJ1xuXHRcdGxpZ2h0Z29sZGVucm9keWVsbG93OiAnRkFGQUQyJ1xuXHRcdGxpZ2h0Z3JheTogJ0QzRDNEMydcblx0XHRsaWdodGdyZXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmVlbjogJzkwRUU5MCdcblx0XHRsaWdodHBpbms6ICdGRkI2QzEnXG5cdFx0bGlnaHRzYWxtb246ICdGRkEwN0EnXG5cdFx0bGlnaHRzZWFncmVlbjogJzIwQjJBQSdcblx0XHRsaWdodHNreWJsdWU6ICc4N0NFRkEnXG5cdFx0bGlnaHRzbGF0ZWdyYXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzbGF0ZWdyZXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzdGVlbGJsdWU6ICdCMEM0REUnXG5cdFx0bGlnaHR5ZWxsb3c6ICdGRkZGRTAnXG5cdFx0bGltZTogJzAwRkYwMCdcblx0XHRsaW1lZ3JlZW46ICczMkNEMzInXG5cdFx0bGluZW46ICdGQUYwRTYnXG5cdFx0bWFnZW50YTogJ0ZGMDBGRidcblx0XHRtYXJvb246ICc4MDAwMDAnXG5cdFx0bWVkaXVtYXF1YW1hcmluZTogJzY2Q0RBQSdcblx0XHRtZWRpdW1ibHVlOiAnMDAwMENEJ1xuXHRcdG1lZGl1bW9yY2hpZDogJ0JBNTVEMydcblx0XHRtZWRpdW1wdXJwbGU6ICc5MzcwRDgnXG5cdFx0bWVkaXVtc2VhZ3JlZW46ICczQ0IzNzEnXG5cdFx0bWVkaXVtc2xhdGVibHVlOiAnN0I2OEVFJ1xuXHRcdG1lZGl1bXNwcmluZ2dyZWVuOiAnMDBGQTlBJ1xuXHRcdG1lZGl1bXR1cnF1b2lzZTogJzQ4RDFDQydcblx0XHRtZWRpdW12aW9sZXRyZWQ6ICdDNzE1ODUnXG5cdFx0bWlkbmlnaHRibHVlOiAnMTkxOTcwJ1xuXHRcdG1pbnRjcmVhbTogJ0Y1RkZGQSdcblx0XHRtaXN0eXJvc2U6ICdGRkU0RTEnXG5cdFx0bW9jY2FzaW46ICdGRkU0QjUnXG5cdFx0bmF2YWpvd2hpdGU6ICdGRkRFQUQnXG5cdFx0bmF2eTogJzAwMDA4MCdcblx0XHRvbGRsYWNlOiAnRkRGNUU2J1xuXHRcdG9saXZlOiAnODA4MDAwJ1xuXHRcdG9saXZlZHJhYjogJzZCOEUyMydcblx0XHRvcmFuZ2U6ICdGRkE1MDAnXG5cdFx0b3JhbmdlcmVkOiAnRkY0NTAwJ1xuXHRcdG9yY2hpZDogJ0RBNzBENidcblx0XHRwYWxlZ29sZGVucm9kOiAnRUVFOEFBJ1xuXHRcdHBhbGVncmVlbjogJzk4RkI5OCdcblx0XHRwYWxldHVycXVvaXNlOiAnQUZFRUVFJ1xuXHRcdHBhbGV2aW9sZXRyZWQ6ICdEODcwOTMnXG5cdFx0cGFwYXlhd2hpcDogJ0ZGRUZENSdcblx0XHRwZWFjaHB1ZmY6ICdGRkRBQjknXG5cdFx0cGVydTogJ0NEODUzRidcblx0XHRwaW5rOiAnRkZDMENCJ1xuXHRcdHBsdW06ICdEREEwREQnXG5cdFx0cG93ZGVyYmx1ZTogJ0IwRTBFNidcblx0XHRwdXJwbGU6ICc4MDAwODAnXG5cdFx0cmViZWNjYXB1cnBsZTogJzY2MzM5OSdcblx0XHRyZWQ6ICdGRjAwMDAnXG5cdFx0cm9zeWJyb3duOiAnQkM4RjhGJ1xuXHRcdHJveWFsYmx1ZTogJzQxNjlFMSdcblx0XHRzYWRkbGVicm93bjogJzhCNDUxMydcblx0XHRzYWxtb246ICdGQTgwNzInXG5cdFx0c2FuZHlicm93bjogJ0Y0QTQ2MCdcblx0XHRzZWFncmVlbjogJzJFOEI1Nydcblx0XHRzZWFzaGVsbDogJ0ZGRjVFRSdcblx0XHRzaWVubmE6ICdBMDUyMkQnXG5cdFx0c2lsdmVyOiAnQzBDMEMwJ1xuXHRcdHNreWJsdWU6ICc4N0NFRUInXG5cdFx0c2xhdGVibHVlOiAnNkE1QUNEJ1xuXHRcdHNsYXRlZ3JheTogJzcwODA5MCdcblx0XHRzbGF0ZWdyZXk6ICc3MDgwOTAnXG5cdFx0c25vdzogJ0ZGRkFGQSdcblx0XHRzcHJpbmdncmVlbjogJzAwRkY3Ridcblx0XHRzdGVlbGJsdWU6ICc0NjgyQjQnXG5cdFx0dGFuOiAnRDJCNDhDJ1xuXHRcdHRlYWw6ICcwMDgwODAnXG5cdFx0dGhpc3RsZTogJ0Q4QkZEOCdcblx0XHR0b21hdG86ICdGRjYzNDcnXG5cdFx0dHVycXVvaXNlOiAnNDBFMEQwJ1xuXHRcdHZpb2xldDogJ0VFODJFRSdcblx0XHR3aGVhdDogJ0Y1REVCMydcblx0XHR3aGl0ZTogJ0ZGRkZGRidcblx0XHR3aGl0ZXNtb2tlOiAnRjVGNUY1J1xuXHRcdHllbGxvdzogJ0ZGRkYwMCdcblx0XHR5ZWxsb3dncmVlbjogJzlBQ0QzMidcblxuXG5cbiIsIiNsb2Rhc2ggLSBpc09iamVjdFxuaXNPYmplY3QgPSAodmFsdWUpIC0+XG5cdHR5cGUgPSB0eXBlb2YgdmFsdWVcblx0cmV0dXJuICEhdmFsdWUgYW5kICh0eXBlIGlzICdvYmplY3QnIG9yIHR5cGUgaXMgJ2Z1bmN0aW9uJylcblxuaXNBcnJheSA9IEFycmF5LmlzQXJyYXlcblxuI2xvZGFzaCAtIGlzT2JqZWN0TGlrZVxuaXNPYmplY3RMaWtlID0gKHZhbHVlKSAtPiAhIXZhbHVlICYmdHlwZW9mIHZhbHVlIGlzICdvYmplY3QnXG5cbiNsb2Rhc2ggLSBpc1N0cmluZyAobW9kaWZpZWQpXG5pc1N0cmluZyA9ICh2YWx1ZSkgLT4gdHlwZW9mIHZhbHVlIGlzICdzdHJpbmcnIG9yICghaXNBcnJheSh2YWx1ZSkgYW5kIGlzT2JqZWN0TGlrZSh2YWx1ZSkpXG5cbm9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5pc051bWJlciA9ICh2YWx1ZSkgLT4gdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIG9yIChpc09iamVjdExpa2UodmFsdWUpIGFuZCBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSBpcyAnW29iamVjdCBOdW1iZXJdJylcblxuaXNOYU4gPSAodmFsdWUpIC0+IGlzTnVtYmVyKHZhbHVlKSBhbmQgdmFsdWUgaXNudCArdmFsdWVcblxuI2NsYW1wIHZhbHVlcyBiZXR3ZWVuIHR3byBwb2ludHMgZGVmYXVsdCAodmFsdWUsIDAsIDEpXG5jbGFtcCA9ICh2YWx1ZSwgbWluID0gMCwgbWF4ID0gMSkgLT4gTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSlcblxucmFuZG9tSW50ID0gKG1pbiwgbWF4KSAtPiBNYXRoLmZsb29yIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW5cblxucmFuZG9tRmxvYXQgPSAobWluLCBtYXgpIC0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbiIsInBsZWFzZS5Db2xvciA9IChjb2xvcikgLT4gbmV3IENvbG9yIGNvbG9yIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
