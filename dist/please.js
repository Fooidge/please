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
    this.html = bind(this.html, this);
    this.getHtmlColor = bind(this.getHtmlColor, this);
    this.hex = bind(this.hex, this);
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
      this.__model.h = clamp(value, 0, 360);
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
      rgb.r = clamp(value, 0, 255);
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).r;
  };

  Color.prototype.green = function(value) {
    var rgb;
    if ((value != null) && isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.g = clamp(value, 0, 255);
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).g;
  };

  Color.prototype.blue = function(value) {
    var rgb;
    if ((value != null) && isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.b = clamp(value, 0, 255);
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

  Color.prototype.hex = function(value) {
    if (value != null) {
      this.__model = this._hexToHsv(value);
      return this;
    }
    return this._hsvToHex(this.__model);
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

  Color.prototype.html = function(value) {
    this.__model = this._hexToHsv(this.getHtmlColor(value));
    return this;
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
    base = rgb.b | (rgb.g << 8) | (rgb.r << 16);
    return "#" + ((0x1000000 + base).toString(16).slice(1));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ1osWUFBTyxJQUFDLENBQUEsV0FBRCxDQUFhLEtBQWIsQ0FBUDtBQUFBLFdBQ00sS0FETjtRQUVFLElBQUMsQ0FBQSxPQUFELEdBQ0M7VUFBQSxDQUFBLEVBQUcsS0FBSyxDQUFDLENBQVQ7VUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLENBRFQ7VUFFQSxDQUFBLEVBQUcsS0FBSyxDQUFDLENBRlQ7O0FBRkc7QUFETixXQU1NLEtBTk47UUFNaUIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsU0FBRCxDQUFXLEtBQVg7QUFBdEI7QUFOTixXQU9NLEtBUE47UUFPaUIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsU0FBRCxDQUFXLEtBQVg7QUFBdEI7QUFQTixXQVFNLEtBUk47UUFRaUIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsU0FBRCxDQUFXLEtBQVg7QUFSNUI7RUFEWTs7a0JBV2IsTUFBQSxHQUFRLFNBQUMsS0FBRDtJQUNQLElBQWUsUUFBQSxDQUFTLEtBQVQsQ0FBQSxJQUFvQixpQkFBcEIsSUFBaUMsaUJBQWpDLElBQThDLGlCQUE3RDtBQUFBLGFBQU8sS0FBUDs7QUFDQSxXQUFPO0VBRkE7O2tCQUlSLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFBN0Q7QUFBQSxhQUFPLEtBQVA7O0FBQ0EsV0FBTztFQUZBOztrQkFJUixZQUFBLEdBQWMsU0FBQyxLQUFEO0FBQ2IsUUFBQTtJQUFBLE9BQUEsR0FBVTtJQUNWLElBQWUsUUFBQSxDQUFTLEtBQVQsQ0FBQSxJQUFvQixP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LENBQUEsR0FBZ0IsQ0FBQyxHQUFBLEdBQU0sR0FBTixHQUFZLENBQWIsQ0FBaEIsR0FBa0MsR0FBN0M7QUFBZDs7QUFFWixXQUFBLEdBQWMsU0FBQyxHQUFELEVBQU0sR0FBTjtTQUFjLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFnQixDQUFDLEdBQUEsR0FBTSxHQUFQLENBQWhCLEdBQThCO0FBQTVDOztBQ3hCZCxNQUFNLENBQUMsS0FBUCxHQUFlLFNBQUMsS0FBRDtTQUFlLElBQUEsS0FBQSxDQUFNLEtBQU47QUFBZiIsImZpbGUiOiJwbGVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDb2xvclxuXHRjb25zdHJ1Y3RvcjogKGNvbG9yKSAtPlxuXHRcdHN3aXRjaCBAX2RldGVjdFR5cGUgY29sb3Jcblx0XHRcdHdoZW4gJ0hTVidcblx0XHRcdFx0QF9fbW9kZWwgPVxuXHRcdFx0XHRcdGg6IGNvbG9yLmhcblx0XHRcdFx0XHRzOiBjb2xvci5zXG5cdFx0XHRcdFx0djogY29sb3IudlxuXHRcdFx0d2hlbiAnSFNMJyB0aGVuIEBfX21vZGVsID0gQF9oc2xUb0hzdiBjb2xvclxuXHRcdFx0d2hlbiAnUkdCJyB0aGVuIEBfX21vZGVsID0gQF9yZ2JUb0hzdiBjb2xvclxuXHRcdFx0d2hlbiAnSEVYJyB0aGVuIEBfX21vZGVsID0gQF9oZXhUb0hzdiBjb2xvclxuXG5cdF9pc0hzdjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci52P1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbDogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci5sP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbFN0cmluZzogKGNvbG9yKSAtPlxuXHRcdGhzbFRlc3QgPSAvaHNsXFwocz9kezEsM30scz9kezEsM30lLHM/ZHsxLDN9JXM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhzbFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2I6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLnI/IGFuZCBjb2xvci5nPyBhbmQgY29sb3IuYj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2JTdHJpbmc6IChjb2xvcikgLT5cblx0XHRyZ2JUZXN0ID0gL3JnYlxcKFxccz8oXFxkezEsM30sXFxzPyl7Mn1cXGR7MSwzfVxccz9cXCkvaVxuXHRcdHJldHVybiB0cnVlIGlmIGlzU3RyaW5nKGNvbG9yKSBhbmQgcmdiVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hleDogKGNvbG9yKSAtPlxuXHRcdGhleFRlc3QgPSAvXiM/KD86WzAtOWEtZl17M30pezEsMn0kL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhleFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRodWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwuaCA9IGNsYW1wIHZhbHVlLCAwLCAzNjBcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmhcblxuXHRzYXR1cmF0aW9uOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnMgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuc1xuXG5cdHNhdDogQDo6c2F0dXJhdGlvblxuXG5cdHZhbHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnYgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwudlxuXG5cdHZhbDogQDo6dmFsdWVcblxuXHRicmlnaHRuZXNzOiBAOjp2YWx1ZVxuXG5cdGFscGhhOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLmEgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuYVxuXG5cdG9wYWNpdHk6IEA6OmFscGhhXG5cblx0cmVkOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5yID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuclxuXG5cdGdyZWVuOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuZ1xuXG5cdGJsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLmIgPSBjbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5iXG5cblx0cmdiOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2JcblxuXHRyZ2JTdHJpbmc6ID0+XG5cdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdHJldHVybiBcInJnYigje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJyZ2JhKCN7cmdiLnJ9LCN7cmdiLmd9LCN7cmdiLmJ9LCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc2w6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9oc2xUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXG5cdGhzbFN0cmluZzogPT5cblx0XHRoc2wgPSBAX2hzdlRvSHNsIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwiaHNsKCN7aHNsLmh9LCN7aHNsLnN9LCN7aHNsLmx9KVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcImhzbGEoI3toc2wuaH0sI3toc2wuc30sI3toc2wubH0sI3tAX19tb2RlbC5hfSlcIlxuXG5cdGhzdjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc0hzdih2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsXG5cblx0aGV4OiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9IZXggQF9fbW9kZWxcblxuXHRnZXRIdG1sQ29sb3I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdGNvbG9yTmFtZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuXHRcdFx0aWYgQF9odG1sQ29sb3JzW2NvbG9yTmFtZV0/IHRoZW4gcmV0dXJuIEBfaHRtbENvbG9yc1tjb2xvck5hbWVdXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIVE1MIGNvbG9yLidcblxuXHRodG1sOiAodmFsdWUpID0+XG5cdFx0QF9fbW9kZWwgPSBAX2hleFRvSHN2IEBnZXRIdG1sQ29sb3IodmFsdWUpXG5cdFx0cmV0dXJuIHRoaXNcblxuXHRnZXRIdG1sQ29sb3JzOiA9PiBAX2h0bWxDb2xvcnNcblxuXHRfZGV0ZWN0VHlwZTogKGNvbG9yKSA9PlxuXHRcdGlmIEBfaXNIc3YgY29sb3IgdGhlbiByZXR1cm4gJ0hTVidcblx0XHRpZiBAX2lzSHNsIGNvbG9yIHRoZW4gcmV0dXJuICdIU0wnXG5cdFx0aWYgQF9pc1JnYiBjb2xvciB0aGVuIHJldHVybiAnUkdCJ1xuXHRcdGlmIEBfaXNSZ2JTdHJpbmcgY29sb3IgdGhlbiByZXR1cm4gJ1JHQl9TVFJJTkcnXG5cdFx0aWYgQF9pc0hleCBjb2xvciB0aGVuIHJldHVybiAnSEVYJ1xuXHRcdHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgY29sb3IgdHlwZS4nXG5cblx0X3JnYlRvSHN2OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiIHJnYiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0ciA9IHJnYi5yIC8gMjU1XG5cdFx0ZyA9IHJnYi5nIC8gMjU1XG5cdFx0YiA9IHJnYi5iIC8gMjU1XG5cdFx0bWluUmdiID0gTWF0aC5taW4gciwgTWF0aC5taW4oZywgYilcblx0XHRtYXhSZ2IgPSBNYXRoLm1heCByLCBNYXRoLm1heChnLCBiKVxuXHRcdCNCbGFjay1ncmF5LXdoaXRlXG5cdFx0aWYgbWluUmdiIGlzIG1heFJnYlxuXHRcdFx0aHN2T2JqID1cblx0XHRcdFx0aDogMFxuXHRcdFx0XHRzOiAwXG5cdFx0XHRcdHY6IG1pblJnYlxuXHRcdFx0cmV0dXJuIGhzdk9ialxuXHRcdCNDb2xvcnMgb3RoZXIgdGhhbiBibGFjay1ncmF5LXdoaXRlOlxuXHRcdGQgPSBpZiByIGlzIG1pblJnYiB0aGVuIGcgLSBiIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiByIC0gZyBlbHNlIGIgLSByXG5cdFx0aCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gMyBlbHNlIGlmIGIgaXMgbWluUmdiIHRoZW4gMSBlbHNlIDVcblx0XHRoc3ZPYmogPVxuXHRcdFx0aDogNjAgKiAoaCAtIGQvKG1heFJnYiAtIG1pblJnYikpXG5cdFx0XHRzOiAobWF4UmdiIC0gbWluUmdiKS9tYXhSZ2Jcblx0XHRcdHY6IG1heFJnYlxuXHRcdHJldHVybiBoc3ZPYmpcblxuXHRfaHN2VG9SZ2I6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRoID0gaHN2Lmhcblx0XHRzID0gaHN2LnNcblx0XHR2ID0gaHN2LnZcblxuXHRcdCNubyBzYXR1cmF0aW9uIGNhc2Vcblx0XHRpZiBzIGlzIDBcblx0XHRcdHJnYk9iaiA9XG5cdFx0XHRcdHI6IHZcblx0XHRcdFx0ZzogdlxuXHRcdFx0XHRiOiB2XG5cdFx0XHRyZXR1cm4gcmdiT2JqXG5cblx0XHRoIC89IDYwXG5cdFx0aSA9IE1hdGguZmxvb3IgaFxuXHRcdGYgPSBoIC0gaVxuXHRcdHAgPSB2ICogKDEgLSBzKVxuXHRcdHEgPSB2ICogKDEgLSBzICogZilcblx0XHR0ID0gdiAqICgxIC0gcyAqICgxIC0gZikpXG5cblx0XHRzd2l0Y2ggaVxuXHRcdFx0d2hlbiAwXG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSB0XG5cdFx0XHRcdGIgPSBwXG5cdFx0XHR3aGVuIDFcblx0XHRcdFx0ciA9IHFcblx0XHRcdFx0ZyA9IHZcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMlxuXHRcdFx0XHRyID0gcFxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gdFxuXHRcdFx0d2hlbiAzXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSBxXG5cdFx0XHRcdGIgPSB2XG5cdFx0XHR3aGVuIDRcblx0XHRcdFx0ciA9IHRcblx0XHRcdFx0ZyA9IHBcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNVxuXHRcdFx0XHRyID0gdlxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gcVxuXG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IE1hdGguZmxvb3IgciAqIDI1NVxuXHRcdFx0ZzogTWF0aC5mbG9vciBnICogMjU1XG5cdFx0XHRiOiBNYXRoLmZsb29yIGIgKiAyNTVcblxuXHRcdHJldHVybiByZ2JPYmpcblxuXHRfaGV4VG9SZ2I6IChoZXgpID0+XG5cdFx0aWYgbm90IEBfaXNIZXggaGV4IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBoZXggc3RyaW5nLidcblx0XHQjZXhwYW5kIHRvIGxvbmcgdmVyc2lvblxuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2ksIChtLCByLCBnLCBiKSAtPiByICsgciArIGcgKyBnICsgYiArIGJcblx0XHQjcmVtb3ZlIGV2ZXJ5dGhpbmcgZXhwZWN0IHZhbGlkIG51bWJlcnNcblx0XHRoZXggPSBoZXgucmVwbGFjZSAvW14wLTlhLWZdL2dpLCAnJ1xuXHRcdHBhcnNlZEhleCA9IHBhcnNlSW50IGhleCwgMTZcblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogKHBhcnNlZEhleCA+PiAxNikgJiAyNTVcblx0XHRcdGc6IChwYXJzZWRIZXggPj4gOCkgJiAyNTVcblx0XHRcdGI6IHBhcnNlZEhleCAmIDI1NVxuXHRcdHJldHVybiByZ2JPYmpcblxuXHRfaGV4VG9Ic3Y6IChoZXgpID0+IEBfcmdiVG9Ic3YoQF9oZXhUb1JnYihoZXgpKVxuXG5cdF9yZ2JUb0hleDogKHJnYikgPT5cblx0XHRpZiBub3QgQF9pc1JnYihyZ2IpIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRiYXNlID0gcmdiLmIgfCAocmdiLmcgPDwgOCkgfCAocmdiLnIgPDwgMTYpXG5cdFx0cmV0dXJuIFwiIyN7KDB4MTAwMDAwMCArIGJhc2UpLnRvU3RyaW5nKDE2KS5zbGljZSgxKX1cIlxuXG5cdF9oc3ZUb0hleDogKGhzdikgPT4gQF9yZ2JUb0hleChAX2hzdlRvUmdiKGhzdikpXG5cblx0X2hzdlRvSHNsOiAoaHN2KSA9PlxuXHRcdGlmIG5vdCBAX2lzSHN2IGhzdiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNWIG9iamVjdC4nXG5cdFx0Y29tcHV0ZWRMID0gKDIgLSBoc3Yucy8xMDApICogaHN2LnYvMlxuXHRcdHNhdERlbm9tID0gaWYgY29tcHV0ZWRMIDwgNTAgdGhlbiBjb21wdXRlZEwgKiAyIGVsc2UgMjAwIC0gY29tcHV0ZWRMICogMlxuXHRcdGNvbXB1dGVkUyA9IGhzdi5zICogaHN2LnYgLyBzYXREZW5vbVxuXHRcdCNjb3JyZWN0cyBhIGRpdmlkZSBieSAwIGVycm9yXG5cdFx0aWYgaXNOYU4gY29tcHV0ZWRMIHRoZW4gY29tcHV0ZWRTID0gMFxuXG5cdFx0aHNsT2JqID1cblx0XHRcdGg6IGhzdi5oXG5cdFx0XHRzOiBjb21wdXRlZFNcblx0XHRcdGw6IGNvbXB1dGVkTFxuXG5cdFx0cmV0dXJuIGhzbE9ialxuXG5cdF9oc2xUb0hzdjogKGhzbCkgPT5cblx0XHRpZiBub3QgQF9pc0hzbCBoc2wgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTTCBvYmplY3QuJ1xuXHRcdHQgPSBoc2wucyAqIChpZiBoc2wubCA8IDUwIHRoZW4gaHNsLmwgZWxzZSAxMDAgLSBoc2wubCkvMTAwXG5cdFx0Y29tcHV0ZWRTID0gMjAwICogdCAvIChoc2wubCArIHQpXG5cdFx0Y29tcHV0ZWRWID0gdCArIGhzbC5sXG5cdFx0I2NvcnJlY3RzIGEgZGl2aWRlIGJ5IDAgZXJyb3Jcblx0XHRpZiBpc05hTiBjb21wdXRlZFMgdGhlbiBjb21wdXRlZFMgPSAwXG5cblx0XHRoc3ZPYmogPVxuXHRcdFx0aDogaHNsLmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0djogY29tcHV0ZWRWXG5cblx0XHRyZXR1cm4gaHN2T2JqXG5cblx0X2h0bWxDb2xvcnM6XG5cdFx0YWxpY2VibHVlOiAnRjBGOEZGJ1xuXHRcdGFudGlxdWV3aGl0ZTogJ0ZBRUJENydcblx0XHRhcXVhOiAnMDBGRkZGJ1xuXHRcdGFxdWFtYXJpbmU6ICc3RkZGRDQnXG5cdFx0YXp1cmU6ICdGMEZGRkYnXG5cdFx0YmVpZ2U6ICdGNUY1REMnXG5cdFx0YmlzcXVlOiAnRkZFNEM0J1xuXHRcdGJsYWNrOiAnMDAwMDAwJ1xuXHRcdGJsYW5jaGVkYWxtb25kOiAnRkZFQkNEJ1xuXHRcdGJsdWU6ICcwMDAwRkYnXG5cdFx0Ymx1ZXZpb2xldDogJzhBMkJFMidcblx0XHRicm93bjogJ0E1MkEyQSdcblx0XHRidXJseXdvb2Q6ICdERUI4ODcnXG5cdFx0Y2FkZXRibHVlOiAnNUY5RUEwJ1xuXHRcdGNoYXJ0cmV1c2U6ICc3RkZGMDAnXG5cdFx0Y2hvY29sYXRlOiAnRDI2OTFFJ1xuXHRcdGNvcmFsOiAnRkY3RjUwJ1xuXHRcdGNvcm5mbG93ZXJibHVlOiAnNjQ5NUVEJ1xuXHRcdGNvcm5zaWxrOiAnRkZGOERDJ1xuXHRcdGNyaW1zb246ICdEQzE0M0MnXG5cdFx0Y3lhbjogJzAwRkZGRidcblx0XHRkYXJrYmx1ZTogJzAwMDA4Qidcblx0XHRkYXJrY3lhbjogJzAwOEI4Qidcblx0XHRkYXJrZ29sZGVucm9kOiAnQjg4NjBCJ1xuXHRcdGRhcmtncmF5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmV5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmVlbjogJzAwNjQwMCdcblx0XHRkYXJra2hha2k6ICdCREI3NkInXG5cdFx0ZGFya21hZ2VudGE6ICc4QjAwOEInXG5cdFx0ZGFya29saXZlZ3JlZW46ICc1NTZCMkYnXG5cdFx0ZGFya29yYW5nZTogJ0ZGOEMwMCdcblx0XHRkYXJrb3JjaGlkOiAnOTkzMkNDJ1xuXHRcdGRhcmtyZWQ6ICc4QjAwMDAnXG5cdFx0ZGFya3NhbG1vbjogJ0U5OTY3QSdcblx0XHRkYXJrc2VhZ3JlZW46ICc4RkJDOEYnXG5cdFx0ZGFya3NsYXRlYmx1ZTogJzQ4M0Q4Qidcblx0XHRkYXJrc2xhdGVncmF5OiAnMkY0RjRGJ1xuXHRcdGRhcmtzbGF0ZWdyZXk6ICcyRjRGNEYnXG5cdFx0ZGFya3R1cnF1b2lzZTogJzAwQ0VEMSdcblx0XHRkYXJrdmlvbGV0OiAnOTQwMEQzJ1xuXHRcdGRlZXBwaW5rOiAnRkYxNDkzJ1xuXHRcdGRlZXBza3libHVlOiAnMDBCRkZGJ1xuXHRcdGRpbWdyYXk6ICc2OTY5NjknXG5cdFx0ZGltZ3JleTogJzY5Njk2OSdcblx0XHRkb2RnZXJibHVlOiAnMUU5MEZGJ1xuXHRcdGZpcmVicmljazogJ0IyMjIyMidcblx0XHRmbG9yYWx3aGl0ZTogJ0ZGRkFGMCdcblx0XHRmb3Jlc3RncmVlbjogJzIyOEIyMidcblx0XHRmdWNoc2lhOiAnRkYwMEZGJ1xuXHRcdGdhaW5zYm9ybzogJ0RDRENEQydcblx0XHRnaG9zdHdoaXRlOiAnRjhGOEZGJ1xuXHRcdGdvbGQ6ICdGRkQ3MDAnXG5cdFx0Z29sZGVucm9kOiAnREFBNTIwJ1xuXHRcdGdyYXk6ICc4MDgwODAnXG5cdFx0Z3JleTogJzgwODA4MCdcblx0XHRncmVlbjogJzAwODAwMCdcblx0XHRncmVlbnllbGxvdzogJ0FERkYyRidcblx0XHRob25leWRldzogJ0YwRkZGMCdcblx0XHRob3RwaW5rOiAnRkY2OUI0J1xuXHRcdGluZGlhbnJlZDogJ0NENUM1Qydcblx0XHRpbmRpZ286ICc0QjAwODInXG5cdFx0aXZvcnk6ICdGRkZGRjAnXG5cdFx0a2hha2k6ICdGMEU2OEMnXG5cdFx0bGF2ZW5kZXI6ICdFNkU2RkEnXG5cdFx0bGF2ZW5kZXJibHVzaDogJ0ZGRjBGNSdcblx0XHRsYXduZ3JlZW46ICc3Q0ZDMDAnXG5cdFx0bGVtb25jaGlmZm9uOiAnRkZGQUNEJ1xuXHRcdGxpZ2h0Ymx1ZTogJ0FERDhFNidcblx0XHRsaWdodGNvcmFsOiAnRjA4MDgwJ1xuXHRcdGxpZ2h0Y3lhbjogJ0UwRkZGRidcblx0XHRsaWdodGdvbGRlbnJvZHllbGxvdzogJ0ZBRkFEMidcblx0XHRsaWdodGdyYXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmV5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JlZW46ICc5MEVFOTAnXG5cdFx0bGlnaHRwaW5rOiAnRkZCNkMxJ1xuXHRcdGxpZ2h0c2FsbW9uOiAnRkZBMDdBJ1xuXHRcdGxpZ2h0c2VhZ3JlZW46ICcyMEIyQUEnXG5cdFx0bGlnaHRza3libHVlOiAnODdDRUZBJ1xuXHRcdGxpZ2h0c2xhdGVncmF5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c2xhdGVncmV5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c3RlZWxibHVlOiAnQjBDNERFJ1xuXHRcdGxpZ2h0eWVsbG93OiAnRkZGRkUwJ1xuXHRcdGxpbWU6ICcwMEZGMDAnXG5cdFx0bGltZWdyZWVuOiAnMzJDRDMyJ1xuXHRcdGxpbmVuOiAnRkFGMEU2J1xuXHRcdG1hZ2VudGE6ICdGRjAwRkYnXG5cdFx0bWFyb29uOiAnODAwMDAwJ1xuXHRcdG1lZGl1bWFxdWFtYXJpbmU6ICc2NkNEQUEnXG5cdFx0bWVkaXVtYmx1ZTogJzAwMDBDRCdcblx0XHRtZWRpdW1vcmNoaWQ6ICdCQTU1RDMnXG5cdFx0bWVkaXVtcHVycGxlOiAnOTM3MEQ4J1xuXHRcdG1lZGl1bXNlYWdyZWVuOiAnM0NCMzcxJ1xuXHRcdG1lZGl1bXNsYXRlYmx1ZTogJzdCNjhFRSdcblx0XHRtZWRpdW1zcHJpbmdncmVlbjogJzAwRkE5QSdcblx0XHRtZWRpdW10dXJxdW9pc2U6ICc0OEQxQ0MnXG5cdFx0bWVkaXVtdmlvbGV0cmVkOiAnQzcxNTg1J1xuXHRcdG1pZG5pZ2h0Ymx1ZTogJzE5MTk3MCdcblx0XHRtaW50Y3JlYW06ICdGNUZGRkEnXG5cdFx0bWlzdHlyb3NlOiAnRkZFNEUxJ1xuXHRcdG1vY2Nhc2luOiAnRkZFNEI1J1xuXHRcdG5hdmFqb3doaXRlOiAnRkZERUFEJ1xuXHRcdG5hdnk6ICcwMDAwODAnXG5cdFx0b2xkbGFjZTogJ0ZERjVFNidcblx0XHRvbGl2ZTogJzgwODAwMCdcblx0XHRvbGl2ZWRyYWI6ICc2QjhFMjMnXG5cdFx0b3JhbmdlOiAnRkZBNTAwJ1xuXHRcdG9yYW5nZXJlZDogJ0ZGNDUwMCdcblx0XHRvcmNoaWQ6ICdEQTcwRDYnXG5cdFx0cGFsZWdvbGRlbnJvZDogJ0VFRThBQSdcblx0XHRwYWxlZ3JlZW46ICc5OEZCOTgnXG5cdFx0cGFsZXR1cnF1b2lzZTogJ0FGRUVFRSdcblx0XHRwYWxldmlvbGV0cmVkOiAnRDg3MDkzJ1xuXHRcdHBhcGF5YXdoaXA6ICdGRkVGRDUnXG5cdFx0cGVhY2hwdWZmOiAnRkZEQUI5J1xuXHRcdHBlcnU6ICdDRDg1M0YnXG5cdFx0cGluazogJ0ZGQzBDQidcblx0XHRwbHVtOiAnRERBMEREJ1xuXHRcdHBvd2RlcmJsdWU6ICdCMEUwRTYnXG5cdFx0cHVycGxlOiAnODAwMDgwJ1xuXHRcdHJlYmVjY2FwdXJwbGU6ICc2NjMzOTknXG5cdFx0cmVkOiAnRkYwMDAwJ1xuXHRcdHJvc3licm93bjogJ0JDOEY4Ridcblx0XHRyb3lhbGJsdWU6ICc0MTY5RTEnXG5cdFx0c2FkZGxlYnJvd246ICc4QjQ1MTMnXG5cdFx0c2FsbW9uOiAnRkE4MDcyJ1xuXHRcdHNhbmR5YnJvd246ICdGNEE0NjAnXG5cdFx0c2VhZ3JlZW46ICcyRThCNTcnXG5cdFx0c2Vhc2hlbGw6ICdGRkY1RUUnXG5cdFx0c2llbm5hOiAnQTA1MjJEJ1xuXHRcdHNpbHZlcjogJ0MwQzBDMCdcblx0XHRza3libHVlOiAnODdDRUVCJ1xuXHRcdHNsYXRlYmx1ZTogJzZBNUFDRCdcblx0XHRzbGF0ZWdyYXk6ICc3MDgwOTAnXG5cdFx0c2xhdGVncmV5OiAnNzA4MDkwJ1xuXHRcdHNub3c6ICdGRkZBRkEnXG5cdFx0c3ByaW5nZ3JlZW46ICcwMEZGN0YnXG5cdFx0c3RlZWxibHVlOiAnNDY4MkI0J1xuXHRcdHRhbjogJ0QyQjQ4Qydcblx0XHR0ZWFsOiAnMDA4MDgwJ1xuXHRcdHRoaXN0bGU6ICdEOEJGRDgnXG5cdFx0dG9tYXRvOiAnRkY2MzQ3J1xuXHRcdHR1cnF1b2lzZTogJzQwRTBEMCdcblx0XHR2aW9sZXQ6ICdFRTgyRUUnXG5cdFx0d2hlYXQ6ICdGNURFQjMnXG5cdFx0d2hpdGU6ICdGRkZGRkYnXG5cdFx0d2hpdGVzbW9rZTogJ0Y1RjVGNSdcblx0XHR5ZWxsb3c6ICdGRkZGMDAnXG5cdFx0eWVsbG93Z3JlZW46ICc5QUNEMzInXG5cblxuXG4iLCIjbG9kYXNoIC0gaXNPYmplY3RcbmlzT2JqZWN0ID0gKHZhbHVlKSAtPlxuXHR0eXBlID0gdHlwZW9mIHZhbHVlXG5cdHJldHVybiAhIXZhbHVlIGFuZCAodHlwZSBpcyAnb2JqZWN0JyBvciB0eXBlIGlzICdmdW5jdGlvbicpXG5cbmlzQXJyYXkgPSBBcnJheS5pc0FycmF5XG5cbiNsb2Rhc2ggLSBpc09iamVjdExpa2VcbmlzT2JqZWN0TGlrZSA9ICh2YWx1ZSkgLT4gISF2YWx1ZSAmJnR5cGVvZiB2YWx1ZSBpcyAnb2JqZWN0J1xuXG4jbG9kYXNoIC0gaXNTdHJpbmcgKG1vZGlmaWVkKVxuaXNTdHJpbmcgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJyBvciAoIWlzQXJyYXkodmFsdWUpIGFuZCBpc09iamVjdExpa2UodmFsdWUpKVxuXG5vYmpUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuaXNOdW1iZXIgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJyBvciAoaXNPYmplY3RMaWtlKHZhbHVlKSBhbmQgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgaXMgJ1tvYmplY3QgTnVtYmVyXScpXG5cbmlzTmFOID0gKHZhbHVlKSAtPiBpc051bWJlcih2YWx1ZSkgYW5kIHZhbHVlIGlzbnQgK3ZhbHVlXG5cbiNjbGFtcCB2YWx1ZXMgYmV0d2VlbiB0d28gcG9pbnRzIGRlZmF1bHQgKHZhbHVlLCAwLCAxKVxuY2xhbXAgPSAodmFsdWUsIG1pbiA9IDAsIG1heCA9IDEpIC0+IE1hdGgubWF4KG1pbiwgTWF0aC5taW4odmFsdWUsIG1heCkpXG5cbnJhbmRvbUludCA9IChtaW4sIG1heCkgLT4gTWF0aC5mbG9vciBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluXG5cbnJhbmRvbUZsb2F0ID0gKG1pbiwgbWF4KSAtPiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4iLCJwbGVhc2UuQ29sb3IgPSAoY29sb3IpIC0+IG5ldyBDb2xvciBjb2xvciJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
