(function(){
var please = {
	version: '2.0.0'
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
    this.contrast = bind(this.contrast, this);
    this.getHtmlColors = bind(this.getHtmlColors, this);
    this.getHtmlColor = bind(this.getHtmlColor, this);
    this.html = bind(this.html, this);
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
    if (color != null) {
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
    } else {
      this.__model = {
        h: 0,
        s: 0,
        v: 0
      };
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
    return this._hsvToRgb(this.__model);
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
      return "hsl(" + hsl.h + "," + (hsl.s * 100) + "%," + (hsl.l * 100) + "%)";
    }
    return "hsla(" + hsl.h + "," + (hsl.s * 100) + "%," + (hsl.l * 100) + "%," + this.__model.a + ")";
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

  Color.prototype.html = function(value) {
    this.__model = this._hexToHsv(this.getHtmlColor(value));
    return this;
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

  Color.prototype.contrast = function() {
    var rgb, yiq, yiqB, yiqG, yiqR;
    rgb = this.rgb();
    yiqR = rgb.r * 299;
    yiqG = rgb.g * 587;
    yiqB = rgb.b * 114;
    yiq = (yiqR + yiqG + yiqB) / 1000;
    if (yiq < 128) {
      return true;
    } else {
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
    var computedL, computedS, hslObj;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    computedL = (2 - hsv.s) * hsv.v;
    computedS = hsv.s * hsv.v;
    if (computedL <= 1) {
      computedS = computedS / computedL;
    } else {
      computedS = computedS / (2 - computedL);
    }
    computedL = computedL / 2;
    hslObj = {
      h: hsv.h,
      s: computedS,
      l: computedL
    };
    return hslObj;
  };

  Color.prototype._hslToHsv = function(hsl) {
    var computedS, computedV, hsvObj;
    if (!this._isHsl(hsl)) {
      throw new Error('Not a valid HSL object.');
    }
    hsl.l *= 2;
    if (hsl.l <= 1) {
      hsl.s *= hsl.l;
    } else {
      hsl.s *= 2 - hsl.l;
    }
    computedV = (hsl.l + hsl.s) / 2;
    computedS = (2 * hsl.s) / (hsl.l + hsl.s);
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

var PHI;

please.Color = function(color) {
  return new Color(color);
};

PHI = 0.618033988749895;

please.generateFromBaseColor = function(baseColor) {
  var base, color;
  color = new Color();
  base = new Color(baseColor);
  color.hue(clamp(randomInt(base.hue() - 5, base.hue() + 5), 0, 360));
  if (base.saturation() === 0) {
    color.saturation(0);
  } else {
    color.saturation(randomFloat(0.4, 0.85));
  }
  color.value(randomFloat(0.4, 0.85));
  return color;
};

please.generateGolden = function() {
  var color, hue;
  color = new Color();
  hue = randomInt(0, 359);
  color.hue(hue + (hue / PHI) % 360);
  color.saturation(randomFloat(0.4, 0.85));
  color.value(randomFloat(0.4, 0.85));
  return color;
};

please.generateRandom = function() {
  var color;
  color = new Color();
  color.hue(randomInt(0, 359));
  color.saturation(randomFloat(0, 1.0));
  color.value(randomFloat(0, 1.0));
  return color;
};

please.makeColor = function(options) {
  var color, colors;
  if (options == null) {
    options = {};
  }
  colors = [];
  color = new Color();
  if (options.baseColor != null) {
    generateFromBaseColor(options.baseColor);
    return;
    color.hue(clamp(randomInt(base.hue() - 5, base.hue() + 5), 0, 360));
    if (base.saturation() === 0) {
      color.saturation(0);
    }
  } else {
    color.hue(randomInt(0, 359));
  }
  color.saturation(randomFloat(0.4, 0.85));
  color.value(randomFloat(0.4, 0.85));
  colors.push(color.hsv());
  return colors;
};
if ( typeof define === 'function' && define.amd ){
		define(please);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = please;
	}
	this.please = please;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNaLElBQUcsYUFBSDtBQUNDLGNBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQVA7QUFBQSxhQUNNLEtBRE47VUFFRSxJQUFDLENBQUEsT0FBRCxHQUNDO1lBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUFUO1lBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQURUO1lBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUOztBQUZHO0FBRE4sYUFNTSxLQU5OO1VBTWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBTk4sYUFPTSxLQVBOO1VBT2lCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBUE4sYUFRTSxLQVJOO1VBUWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBUjVCLE9BREQ7S0FBQSxNQUFBO01BV0MsSUFBQyxDQUFBLE9BQUQsR0FDQztRQUFBLENBQUEsRUFBRyxDQUFIO1FBQ0EsQ0FBQSxFQUFHLENBREg7UUFFQSxDQUFBLEVBQUcsQ0FGSDtRQVpGOztFQURZOztrQkFpQmIsTUFBQSxHQUFRLFNBQUMsS0FBRDtJQUNQLElBQWUsUUFBQSxDQUFTLEtBQVQsQ0FBQSxJQUFvQixpQkFBcEIsSUFBaUMsaUJBQWpDLElBQThDLGlCQUE3RDtBQUFBLGFBQU8sS0FBUDs7QUFDQSxXQUFPO0VBRkE7O2tCQUlSLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFB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QSxDQUFZLENBQVosRUFBZSxHQUFmLENBQWpCO0VBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxXQUFBLENBQVksQ0FBWixFQUFlLEdBQWYsQ0FBWjtBQUNBLFNBQU87QUFMZ0I7O0FBUXhCLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFNBQUMsT0FBRDtBQU1sQixNQUFBOztJQU5tQixVQUFVOztFQU03QixNQUFBLEdBQVM7RUFDVCxLQUFBLEdBQVksSUFBQSxLQUFBLENBQUE7RUFDWixJQUFHLHlCQUFIO0lBQ0MscUJBQUEsQ0FBc0IsT0FBTyxDQUFDLFNBQTlCO0FBQ0E7SUFFQSxLQUFLLENBQUMsR0FBTixDQUFVLEtBQUEsQ0FBTSxTQUFBLENBQVUsSUFBSSxDQUFDLEdBQUwsQ0FBQSxDQUFBLEdBQWEsQ0FBdkIsRUFBMEIsSUFBSSxDQUFDLEdBQUwsQ0FBQSxDQUFBLEdBQWEsQ0FBdkMsQ0FBTixFQUFpRCxDQUFqRCxFQUFxRCxHQUFyRCxDQUFWO0lBQ0EsSUFBRyxJQUFJLENBQUMsVUFBTCxDQUFBLENBQUEsS0FBcUIsQ0FBeEI7TUFBK0IsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsQ0FBakIsRUFBL0I7S0FMRDtHQUFBLE1BQUE7SUFPQyxLQUFLLENBQUMsR0FBTixDQUFVLFNBQUEsQ0FBVSxDQUFWLEVBQWEsR0FBYixDQUFWLEVBUEQ7O0VBUUEsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsV0FBQSxDQUFZLEdBQVosRUFBaUIsSUFBakIsQ0FBakI7RUFDQSxLQUFLLENBQUMsS0FBTixDQUFZLFdBQUEsQ0FBWSxHQUFaLEVBQWlCLElBQWpCLENBQVo7RUFDQSxNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBWjtBQUNBLFNBQU87QUFuQlciLCJmaWxlIjoicGxlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29sb3Jcblx0Y29uc3RydWN0b3I6IChjb2xvcikgLT5cblx0XHRpZiBjb2xvcj9cblx0XHRcdHN3aXRjaCBAX2RldGVjdFR5cGUgY29sb3Jcblx0XHRcdFx0d2hlbiAnSFNWJ1xuXHRcdFx0XHRcdEBfX21vZGVsID1cblx0XHRcdFx0XHRcdGg6IGNvbG9yLmhcblx0XHRcdFx0XHRcdHM6IGNvbG9yLnNcblx0XHRcdFx0XHRcdHY6IGNvbG9yLnZcblx0XHRcdFx0d2hlbiAnSFNMJyB0aGVuIEBfX21vZGVsID0gQF9oc2xUb0hzdiBjb2xvclxuXHRcdFx0XHR3aGVuICdSR0InIHRoZW4gQF9fbW9kZWwgPSBAX3JnYlRvSHN2IGNvbG9yXG5cdFx0XHRcdHdoZW4gJ0hFWCcgdGhlbiBAX19tb2RlbCA9IEBfaGV4VG9Ic3YgY29sb3Jcblx0XHRlbHNlXG5cdFx0XHRAX19tb2RlbCA9XG5cdFx0XHRcdGg6IDBcblx0XHRcdFx0czogMFxuXHRcdFx0XHR2OiAwXG5cblx0X2lzSHN2OiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5oPyBhbmQgY29sb3Iucz8gYW5kIGNvbG9yLnY/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzSHNsOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5oPyBhbmQgY29sb3Iucz8gYW5kIGNvbG9yLmw/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzSHNsU3RyaW5nOiAoY29sb3IpIC0+XG5cdFx0aHNsVGVzdCA9IC9oc2xcXChzP2R7MSwzfSxzP2R7MSwzfSUscz9kezEsM30lcz9cXCkvaVxuXHRcdHJldHVybiB0cnVlIGlmIGlzU3RyaW5nKGNvbG9yKSBhbmQgaHNsVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc1JnYjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3Iucj8gYW5kIGNvbG9yLmc/IGFuZCBjb2xvci5iP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc1JnYlN0cmluZzogKGNvbG9yKSAtPlxuXHRcdHJnYlRlc3QgPSAvcmdiXFwoXFxzPyhcXGR7MSwzfSxcXHM/KXsyfVxcZHsxLDN9XFxzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCByZ2JUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzSGV4OiAoY29sb3IpIC0+XG5cdFx0aGV4VGVzdCA9IC9eIz8oPzpbMC05YS1mXXszfSl7MSwyfSQvaVxuXHRcdHJldHVybiB0cnVlIGlmIGlzU3RyaW5nKGNvbG9yKSBhbmQgaGV4VGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdGh1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5oID0gY2xhbXAgdmFsdWUsIDAsIDM2MFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuaFxuXG5cdHNhdHVyYXRpb246ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwucyA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5zXG5cblx0c2F0OiBAOjpzYXR1cmF0aW9uXG5cblx0dmFsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwudiA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC52XG5cblx0dmFsOiBAOjp2YWx1ZVxuXG5cdGJyaWdodG5lc3M6IEA6OnZhbHVlXG5cblx0YWxwaGE6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwuYSA9IGNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5hXG5cblx0b3BhY2l0eTogQDo6YWxwaGFcblxuXHRyZWQ6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLnIgPSBjbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5yXG5cblx0Z3JlZW46ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLmcgPSBjbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5nXG5cblx0Ymx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuYiA9IGNsYW1wIHZhbHVlLCAwLCAyNTVcblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiByZ2Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IoQF9fbW9kZWwpLmJcblxuXHRyZ2I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXG5cdHJnYlN0cmluZzogPT5cblx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwicmdiKCN7cmdiLnJ9LCN7cmdiLmd9LCN7cmdiLmJ9KVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcInJnYmEoI3tyZ2Iucn0sI3tyZ2IuZ30sI3tyZ2IuYn0sI3tAX19tb2RlbC5hfSlcIlxuXG5cdGhzbDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwgPSBAX2hzbFRvSHN2IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvSHNsIEBfX21vZGVsXG5cblx0aHNsU3RyaW5nOiA9PlxuXHRcdGhzbCA9IEBfaHN2VG9Ic2wgQF9fbW9kZWxcblx0XHRyZXR1cm4gXCJoc2woI3toc2wuaH0sI3toc2wucyAqIDEwMH0lLCN7aHNsLmwgKiAxMDB9JSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJoc2xhKCN7aHNsLmh9LCN7aHNsLnMgKiAxMDB9JSwje2hzbC5sICogMTAwfSUsI3tAX19tb2RlbC5hfSlcIlxuXG5cdGhzdjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc0hzdih2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsXG5cblx0aGV4OiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9IZXggQF9fbW9kZWxcblxuXHRodG1sOiAodmFsdWUpID0+XG5cdFx0QF9fbW9kZWwgPSBAX2hleFRvSHN2IEBnZXRIdG1sQ29sb3IodmFsdWUpXG5cdFx0cmV0dXJuIHRoaXNcblxuXHRnZXRIdG1sQ29sb3I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdGNvbG9yTmFtZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuXHRcdFx0aWYgQF9odG1sQ29sb3JzW2NvbG9yTmFtZV0/IHRoZW4gcmV0dXJuIEBfaHRtbENvbG9yc1tjb2xvck5hbWVdXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIVE1MIGNvbG9yLidcblxuXG5cdGdldEh0bWxDb2xvcnM6ID0+IEBfaHRtbENvbG9yc1xuXG5cdCN0cnVlIGZvciB3aGl0ZSBmYWxzZSBmb3IgYmxhY2tcblx0Y29udHJhc3Q6ID0+XG5cdFx0cmdiID0gQHJnYigpXG5cdFx0eWlxUiA9IHJnYi5yICogMjk5XG5cdFx0eWlxRyA9IHJnYi5nICogNTg3XG5cdFx0eWlxQiA9IHJnYi5iICogMTE0XG5cdFx0eWlxID0gKHlpcVIgKyB5aXFHICsgeWlxQikvMTAwMFxuXHRcdGlmIHlpcSA8IDEyOCB0aGVuIHJldHVybiB0cnVlIGVsc2UgcmV0dXJuIGZhbHNlXG5cblx0X2RldGVjdFR5cGU6IChjb2xvcikgPT5cblx0XHRpZiBAX2lzSHN2IGNvbG9yIHRoZW4gcmV0dXJuICdIU1YnXG5cdFx0aWYgQF9pc0hzbCBjb2xvciB0aGVuIHJldHVybiAnSFNMJ1xuXHRcdGlmIEBfaXNSZ2IgY29sb3IgdGhlbiByZXR1cm4gJ1JHQidcblx0XHRpZiBAX2lzUmdiU3RyaW5nIGNvbG9yIHRoZW4gcmV0dXJuICdSR0JfU1RSSU5HJ1xuXHRcdGlmIEBfaXNIZXggY29sb3IgdGhlbiByZXR1cm4gJ0hFWCdcblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGNvbG9yIHR5cGUuJ1xuXG5cdF9yZ2JUb0hzdjogKHJnYikgPT5cblx0XHRpZiBub3QgQF9pc1JnYiByZ2IgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIFJHQiBvYmplY3QuJ1xuXHRcdHIgPSByZ2IuciAvIDI1NVxuXHRcdGcgPSByZ2IuZyAvIDI1NVxuXHRcdGIgPSByZ2IuYiAvIDI1NVxuXHRcdG1pblJnYiA9IE1hdGgubWluIHIsIE1hdGgubWluKGcsIGIpXG5cdFx0bWF4UmdiID0gTWF0aC5tYXggciwgTWF0aC5tYXgoZywgYilcblx0XHQjQmxhY2stZ3JheS13aGl0ZVxuXHRcdGlmIG1pblJnYiBpcyBtYXhSZ2Jcblx0XHRcdGhzdk9iaiA9XG5cdFx0XHRcdGg6IDBcblx0XHRcdFx0czogMFxuXHRcdFx0XHR2OiBtaW5SZ2Jcblx0XHRcdHJldHVybiBoc3ZPYmpcblx0XHQjQ29sb3JzIG90aGVyIHRoYW4gYmxhY2stZ3JheS13aGl0ZTpcblx0XHRkID0gaWYgciBpcyBtaW5SZ2IgdGhlbiBnIC0gYiBlbHNlIGlmIGIgaXMgbWluUmdiIHRoZW4gciAtIGcgZWxzZSBiIC0gclxuXHRcdGggPSBpZiByIGlzIG1pblJnYiB0aGVuIDMgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIDEgZWxzZSA1XG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IDYwICogKGggLSBkLyhtYXhSZ2IgLSBtaW5SZ2IpKVxuXHRcdFx0czogKG1heFJnYiAtIG1pblJnYikvbWF4UmdiXG5cdFx0XHR2OiBtYXhSZ2Jcblx0XHRyZXR1cm4gaHN2T2JqXG5cblx0X2hzdlRvUmdiOiAoaHN2KSA9PlxuXHRcdGlmIG5vdCBAX2lzSHN2IGhzdiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNWIG9iamVjdC4nXG5cdFx0aCA9IGhzdi5oXG5cdFx0cyA9IGhzdi5zXG5cdFx0diA9IGhzdi52XG5cblx0XHQjbm8gc2F0dXJhdGlvbiBjYXNlXG5cdFx0aWYgcyBpcyAwXG5cdFx0XHRyZ2JPYmogPVxuXHRcdFx0XHRyOiB2XG5cdFx0XHRcdGc6IHZcblx0XHRcdFx0YjogdlxuXHRcdFx0cmV0dXJuIHJnYk9ialxuXG5cdFx0aCAvPSA2MFxuXHRcdGkgPSBNYXRoLmZsb29yIGhcblx0XHRmID0gaCAtIGlcblx0XHRwID0gdiAqICgxIC0gcylcblx0XHRxID0gdiAqICgxIC0gcyAqIGYpXG5cdFx0dCA9IHYgKiAoMSAtIHMgKiAoMSAtIGYpKVxuXG5cdFx0c3dpdGNoIGlcblx0XHRcdHdoZW4gMFxuXHRcdFx0XHRyID0gdlxuXHRcdFx0XHRnID0gdFxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAxXG5cdFx0XHRcdHIgPSBxXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSBwXG5cdFx0XHR3aGVuIDJcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHZcblx0XHRcdFx0YiA9IHRcblx0XHRcdHdoZW4gM1xuXHRcdFx0XHRyID0gcFxuXHRcdFx0XHRnID0gcVxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA0XG5cdFx0XHRcdHIgPSB0XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSB2XG5cdFx0XHR3aGVuIDVcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHBcblx0XHRcdFx0YiA9IHFcblxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiBNYXRoLmZsb29yIHIgKiAyNTVcblx0XHRcdGc6IE1hdGguZmxvb3IgZyAqIDI1NVxuXHRcdFx0YjogTWF0aC5mbG9vciBiICogMjU1XG5cblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvUmdiOiAoaGV4KSA9PlxuXHRcdGlmIG5vdCBAX2lzSGV4IGhleCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgaGV4IHN0cmluZy4nXG5cdFx0I2V4cGFuZCB0byBsb25nIHZlcnNpb25cblx0XHRoZXggPSBoZXgucmVwbGFjZSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgLT4gciArIHIgKyBnICsgZyArIGIgKyBiXG5cdFx0I3JlbW92ZSBldmVyeXRoaW5nIGV4cGVjdCB2YWxpZCBudW1iZXJzXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL1teMC05YS1mXS9naSwgJydcblx0XHRwYXJzZWRIZXggPSBwYXJzZUludCBoZXgsIDE2XG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IChwYXJzZWRIZXggPj4gMTYpICYgMjU1XG5cdFx0XHRnOiAocGFyc2VkSGV4ID4+IDgpICYgMjU1XG5cdFx0XHRiOiBwYXJzZWRIZXggJiAyNTVcblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvSHN2OiAoaGV4KSA9PiBAX3JnYlRvSHN2KEBfaGV4VG9SZ2IoaGV4KSlcblxuXHRfcmdiVG9IZXg6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IocmdiKSB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0YmFzZSA9IHJnYi5iIHwgKHJnYi5nIDw8IDgpIHwgKHJnYi5yIDw8IDE2KVxuXHRcdHJldHVybiBcIiMjeygweDEwMDAwMDAgKyBiYXNlKS50b1N0cmluZygxNikuc2xpY2UoMSl9XCJcblxuXHRfaHN2VG9IZXg6IChoc3YpID0+IEBfcmdiVG9IZXgoQF9oc3ZUb1JnYihoc3YpKVxuXG5cdF9oc3ZUb0hzbDogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGNvbXB1dGVkTCA9ICgyIC0gaHN2LnMpICogaHN2LnZcblx0XHRjb21wdXRlZFMgPSBoc3YucyAqIGhzdi52XG5cdFx0aWYgY29tcHV0ZWRMIDw9IDEgdGhlbiBjb21wdXRlZFMgPSBjb21wdXRlZFMgLyBjb21wdXRlZExcblx0XHRlbHNlIGNvbXB1dGVkUyA9IGNvbXB1dGVkUyAvICgyIC0gY29tcHV0ZWRMKVxuXHRcdGNvbXB1dGVkTCA9IGNvbXB1dGVkTCAvIDJcblxuXHRcdGhzbE9iaiA9XG5cdFx0XHRoOiBoc3YuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHRsOiBjb21wdXRlZExcblxuXHRcdHJldHVybiBoc2xPYmpcblxuXHRfaHNsVG9Ic3Y6IChoc2wpID0+XG5cdFx0aWYgbm90IEBfaXNIc2wgaHNsIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU0wgb2JqZWN0Lidcblx0XHRoc2wubCAqPSAyXG5cdFx0aWYgKGhzbC5sIDw9IDEpIHRoZW4gaHNsLnMgKj0gaHNsLmxcblx0XHRlbHNlIGhzbC5zICo9ICggMiAtIGhzbC5sKVxuXHRcdGNvbXB1dGVkViA9IChoc2wubCArIGhzbC5zKSAvIDJcblx0XHRjb21wdXRlZFMgPSAoMiAqIGhzbC5zKSAvIChoc2wubCArIGhzbC5zKVxuXG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IGhzbC5oXG5cdFx0XHRzOiBjb21wdXRlZFNcblx0XHRcdHY6IGNvbXB1dGVkVlxuXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9odG1sQ29sb3JzOlxuXHRcdGFsaWNlYmx1ZTogJ0YwRjhGRidcblx0XHRhbnRpcXVld2hpdGU6ICdGQUVCRDcnXG5cdFx0YXF1YTogJzAwRkZGRidcblx0XHRhcXVhbWFyaW5lOiAnN0ZGRkQ0J1xuXHRcdGF6dXJlOiAnRjBGRkZGJ1xuXHRcdGJlaWdlOiAnRjVGNURDJ1xuXHRcdGJpc3F1ZTogJ0ZGRTRDNCdcblx0XHRibGFjazogJzAwMDAwMCdcblx0XHRibGFuY2hlZGFsbW9uZDogJ0ZGRUJDRCdcblx0XHRibHVlOiAnMDAwMEZGJ1xuXHRcdGJsdWV2aW9sZXQ6ICc4QTJCRTInXG5cdFx0YnJvd246ICdBNTJBMkEnXG5cdFx0YnVybHl3b29kOiAnREVCODg3J1xuXHRcdGNhZGV0Ymx1ZTogJzVGOUVBMCdcblx0XHRjaGFydHJldXNlOiAnN0ZGRjAwJ1xuXHRcdGNob2NvbGF0ZTogJ0QyNjkxRSdcblx0XHRjb3JhbDogJ0ZGN0Y1MCdcblx0XHRjb3JuZmxvd2VyYmx1ZTogJzY0OTVFRCdcblx0XHRjb3Juc2lsazogJ0ZGRjhEQydcblx0XHRjcmltc29uOiAnREMxNDNDJ1xuXHRcdGN5YW46ICcwMEZGRkYnXG5cdFx0ZGFya2JsdWU6ICcwMDAwOEInXG5cdFx0ZGFya2N5YW46ICcwMDhCOEInXG5cdFx0ZGFya2dvbGRlbnJvZDogJ0I4ODYwQidcblx0XHRkYXJrZ3JheTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JleTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JlZW46ICcwMDY0MDAnXG5cdFx0ZGFya2toYWtpOiAnQkRCNzZCJ1xuXHRcdGRhcmttYWdlbnRhOiAnOEIwMDhCJ1xuXHRcdGRhcmtvbGl2ZWdyZWVuOiAnNTU2QjJGJ1xuXHRcdGRhcmtvcmFuZ2U6ICdGRjhDMDAnXG5cdFx0ZGFya29yY2hpZDogJzk5MzJDQydcblx0XHRkYXJrcmVkOiAnOEIwMDAwJ1xuXHRcdGRhcmtzYWxtb246ICdFOTk2N0EnXG5cdFx0ZGFya3NlYWdyZWVuOiAnOEZCQzhGJ1xuXHRcdGRhcmtzbGF0ZWJsdWU6ICc0ODNEOEInXG5cdFx0ZGFya3NsYXRlZ3JheTogJzJGNEY0Ridcblx0XHRkYXJrc2xhdGVncmV5OiAnMkY0RjRGJ1xuXHRcdGRhcmt0dXJxdW9pc2U6ICcwMENFRDEnXG5cdFx0ZGFya3Zpb2xldDogJzk0MDBEMydcblx0XHRkZWVwcGluazogJ0ZGMTQ5Mydcblx0XHRkZWVwc2t5Ymx1ZTogJzAwQkZGRidcblx0XHRkaW1ncmF5OiAnNjk2OTY5J1xuXHRcdGRpbWdyZXk6ICc2OTY5NjknXG5cdFx0ZG9kZ2VyYmx1ZTogJzFFOTBGRidcblx0XHRmaXJlYnJpY2s6ICdCMjIyMjInXG5cdFx0ZmxvcmFsd2hpdGU6ICdGRkZBRjAnXG5cdFx0Zm9yZXN0Z3JlZW46ICcyMjhCMjInXG5cdFx0ZnVjaHNpYTogJ0ZGMDBGRidcblx0XHRnYWluc2Jvcm86ICdEQ0RDREMnXG5cdFx0Z2hvc3R3aGl0ZTogJ0Y4RjhGRidcblx0XHRnb2xkOiAnRkZENzAwJ1xuXHRcdGdvbGRlbnJvZDogJ0RBQTUyMCdcblx0XHRncmF5OiAnODA4MDgwJ1xuXHRcdGdyZXk6ICc4MDgwODAnXG5cdFx0Z3JlZW46ICcwMDgwMDAnXG5cdFx0Z3JlZW55ZWxsb3c6ICdBREZGMkYnXG5cdFx0aG9uZXlkZXc6ICdGMEZGRjAnXG5cdFx0aG90cGluazogJ0ZGNjlCNCdcblx0XHRpbmRpYW5yZWQ6ICdDRDVDNUMnXG5cdFx0aW5kaWdvOiAnNEIwMDgyJ1xuXHRcdGl2b3J5OiAnRkZGRkYwJ1xuXHRcdGtoYWtpOiAnRjBFNjhDJ1xuXHRcdGxhdmVuZGVyOiAnRTZFNkZBJ1xuXHRcdGxhdmVuZGVyYmx1c2g6ICdGRkYwRjUnXG5cdFx0bGF3bmdyZWVuOiAnN0NGQzAwJ1xuXHRcdGxlbW9uY2hpZmZvbjogJ0ZGRkFDRCdcblx0XHRsaWdodGJsdWU6ICdBREQ4RTYnXG5cdFx0bGlnaHRjb3JhbDogJ0YwODA4MCdcblx0XHRsaWdodGN5YW46ICdFMEZGRkYnXG5cdFx0bGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICdGQUZBRDInXG5cdFx0bGlnaHRncmF5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JleTogJ0QzRDNEMydcblx0XHRsaWdodGdyZWVuOiAnOTBFRTkwJ1xuXHRcdGxpZ2h0cGluazogJ0ZGQjZDMSdcblx0XHRsaWdodHNhbG1vbjogJ0ZGQTA3QSdcblx0XHRsaWdodHNlYWdyZWVuOiAnMjBCMkFBJ1xuXHRcdGxpZ2h0c2t5Ymx1ZTogJzg3Q0VGQSdcblx0XHRsaWdodHNsYXRlZ3JheTogJzc3ODg5OSdcblx0XHRsaWdodHNsYXRlZ3JleTogJzc3ODg5OSdcblx0XHRsaWdodHN0ZWVsYmx1ZTogJ0IwQzRERSdcblx0XHRsaWdodHllbGxvdzogJ0ZGRkZFMCdcblx0XHRsaW1lOiAnMDBGRjAwJ1xuXHRcdGxpbWVncmVlbjogJzMyQ0QzMidcblx0XHRsaW5lbjogJ0ZBRjBFNidcblx0XHRtYWdlbnRhOiAnRkYwMEZGJ1xuXHRcdG1hcm9vbjogJzgwMDAwMCdcblx0XHRtZWRpdW1hcXVhbWFyaW5lOiAnNjZDREFBJ1xuXHRcdG1lZGl1bWJsdWU6ICcwMDAwQ0QnXG5cdFx0bWVkaXVtb3JjaGlkOiAnQkE1NUQzJ1xuXHRcdG1lZGl1bXB1cnBsZTogJzkzNzBEOCdcblx0XHRtZWRpdW1zZWFncmVlbjogJzNDQjM3MSdcblx0XHRtZWRpdW1zbGF0ZWJsdWU6ICc3QjY4RUUnXG5cdFx0bWVkaXVtc3ByaW5nZ3JlZW46ICcwMEZBOUEnXG5cdFx0bWVkaXVtdHVycXVvaXNlOiAnNDhEMUNDJ1xuXHRcdG1lZGl1bXZpb2xldHJlZDogJ0M3MTU4NSdcblx0XHRtaWRuaWdodGJsdWU6ICcxOTE5NzAnXG5cdFx0bWludGNyZWFtOiAnRjVGRkZBJ1xuXHRcdG1pc3R5cm9zZTogJ0ZGRTRFMSdcblx0XHRtb2NjYXNpbjogJ0ZGRTRCNSdcblx0XHRuYXZham93aGl0ZTogJ0ZGREVBRCdcblx0XHRuYXZ5OiAnMDAwMDgwJ1xuXHRcdG9sZGxhY2U6ICdGREY1RTYnXG5cdFx0b2xpdmU6ICc4MDgwMDAnXG5cdFx0b2xpdmVkcmFiOiAnNkI4RTIzJ1xuXHRcdG9yYW5nZTogJ0ZGQTUwMCdcblx0XHRvcmFuZ2VyZWQ6ICdGRjQ1MDAnXG5cdFx0b3JjaGlkOiAnREE3MEQ2J1xuXHRcdHBhbGVnb2xkZW5yb2Q6ICdFRUU4QUEnXG5cdFx0cGFsZWdyZWVuOiAnOThGQjk4J1xuXHRcdHBhbGV0dXJxdW9pc2U6ICdBRkVFRUUnXG5cdFx0cGFsZXZpb2xldHJlZDogJ0Q4NzA5Mydcblx0XHRwYXBheWF3aGlwOiAnRkZFRkQ1J1xuXHRcdHBlYWNocHVmZjogJ0ZGREFCOSdcblx0XHRwZXJ1OiAnQ0Q4NTNGJ1xuXHRcdHBpbms6ICdGRkMwQ0InXG5cdFx0cGx1bTogJ0REQTBERCdcblx0XHRwb3dkZXJibHVlOiAnQjBFMEU2J1xuXHRcdHB1cnBsZTogJzgwMDA4MCdcblx0XHRyZWJlY2NhcHVycGxlOiAnNjYzMzk5J1xuXHRcdHJlZDogJ0ZGMDAwMCdcblx0XHRyb3N5YnJvd246ICdCQzhGOEYnXG5cdFx0cm95YWxibHVlOiAnNDE2OUUxJ1xuXHRcdHNhZGRsZWJyb3duOiAnOEI0NTEzJ1xuXHRcdHNhbG1vbjogJ0ZBODA3Midcblx0XHRzYW5keWJyb3duOiAnRjRBNDYwJ1xuXHRcdHNlYWdyZWVuOiAnMkU4QjU3J1xuXHRcdHNlYXNoZWxsOiAnRkZGNUVFJ1xuXHRcdHNpZW5uYTogJ0EwNTIyRCdcblx0XHRzaWx2ZXI6ICdDMEMwQzAnXG5cdFx0c2t5Ymx1ZTogJzg3Q0VFQidcblx0XHRzbGF0ZWJsdWU6ICc2QTVBQ0QnXG5cdFx0c2xhdGVncmF5OiAnNzA4MDkwJ1xuXHRcdHNsYXRlZ3JleTogJzcwODA5MCdcblx0XHRzbm93OiAnRkZGQUZBJ1xuXHRcdHNwcmluZ2dyZWVuOiAnMDBGRjdGJ1xuXHRcdHN0ZWVsYmx1ZTogJzQ2ODJCNCdcblx0XHR0YW46ICdEMkI0OEMnXG5cdFx0dGVhbDogJzAwODA4MCdcblx0XHR0aGlzdGxlOiAnRDhCRkQ4J1xuXHRcdHRvbWF0bzogJ0ZGNjM0Nydcblx0XHR0dXJxdW9pc2U6ICc0MEUwRDAnXG5cdFx0dmlvbGV0OiAnRUU4MkVFJ1xuXHRcdHdoZWF0OiAnRjVERUIzJ1xuXHRcdHdoaXRlOiAnRkZGRkZGJ1xuXHRcdHdoaXRlc21va2U6ICdGNUY1RjUnXG5cdFx0eWVsbG93OiAnRkZGRjAwJ1xuXHRcdHllbGxvd2dyZWVuOiAnOUFDRDMyJ1xuXG5cblxuIiwiI2xvZGFzaCAtIGlzT2JqZWN0XG5pc09iamVjdCA9ICh2YWx1ZSkgLT5cblx0dHlwZSA9IHR5cGVvZiB2YWx1ZVxuXHRyZXR1cm4gISF2YWx1ZSBhbmQgKHR5cGUgaXMgJ29iamVjdCcgb3IgdHlwZSBpcyAnZnVuY3Rpb24nKVxuXG5pc0FycmF5ID0gQXJyYXkuaXNBcnJheVxuXG4jbG9kYXNoIC0gaXNPYmplY3RMaWtlXG5pc09iamVjdExpa2UgPSAodmFsdWUpIC0+ICEhdmFsdWUgJiZ0eXBlb2YgdmFsdWUgaXMgJ29iamVjdCdcblxuI2xvZGFzaCAtIGlzU3RyaW5nIChtb2RpZmllZClcbmlzU3RyaW5nID0gKHZhbHVlKSAtPiB0eXBlb2YgdmFsdWUgaXMgJ3N0cmluZycgb3IgKCFpc0FycmF5KHZhbHVlKSBhbmQgaXNPYmplY3RMaWtlKHZhbHVlKSlcblxub2JqVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmlzTnVtYmVyID0gKHZhbHVlKSAtPiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcicgb3IgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgYW5kIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpIGlzICdbb2JqZWN0IE51bWJlcl0nKVxuXG5pc05hTiA9ICh2YWx1ZSkgLT4gaXNOdW1iZXIodmFsdWUpIGFuZCB2YWx1ZSBpc250ICt2YWx1ZVxuXG4jY2xhbXAgdmFsdWVzIGJldHdlZW4gdHdvIHBvaW50cyBkZWZhdWx0ICh2YWx1ZSwgMCwgMSlcbmNsYW1wID0gKHZhbHVlLCBtaW4gPSAwLCBtYXggPSAxKSAtPiBNYXRoLm1heChtaW4sIE1hdGgubWluKHZhbHVlLCBtYXgpKVxuXG5yYW5kb21JbnQgPSAobWluLCBtYXgpIC0+IE1hdGguZmxvb3IgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pblxuXG5yYW5kb21GbG9hdCA9IChtaW4sIG1heCkgLT4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIiwicGxlYXNlLkNvbG9yID0gKGNvbG9yKSAtPiBuZXcgQ29sb3IgY29sb3JcblxuUEhJID0gMC42MTgwMzM5ODg3NDk4OTVcblxucGxlYXNlLmdlbmVyYXRlRnJvbUJhc2VDb2xvciA9IChiYXNlQ29sb3IpIC0+XG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0YmFzZSA9IG5ldyBDb2xvciBiYXNlQ29sb3Jcblx0Y29sb3IuaHVlIGNsYW1wKHJhbmRvbUludChiYXNlLmh1ZSgpIC0gNSwgYmFzZS5odWUoKSArIDUpLCAwLCAzNjApXG5cdGlmIGJhc2Uuc2F0dXJhdGlvbigpIGlzIDAgdGhlbiBjb2xvci5zYXR1cmF0aW9uIDBcblx0ZWxzZSBjb2xvci5zYXR1cmF0aW9uIHJhbmRvbUZsb2F0KDAuNCwgMC44NSlcblx0Y29sb3IudmFsdWUgcmFuZG9tRmxvYXQoMC40LCAwLjg1KVxuXHRyZXR1cm4gY29sb3JcblxucGxlYXNlLmdlbmVyYXRlR29sZGVuID0gLT5cblx0Y29sb3IgPSBuZXcgQ29sb3IoKVxuXHRodWUgPSByYW5kb21JbnQoMCwgMzU5KVxuXHRjb2xvci5odWUgKGh1ZSArIChodWUvUEhJKSAlIDM2MClcblx0Y29sb3Iuc2F0dXJhdGlvbiByYW5kb21GbG9hdCgwLjQsIDAuODUpXG5cdGNvbG9yLnZhbHVlIHJhbmRvbUZsb2F0KDAuNCwgMC44NSlcblx0cmV0dXJuIGNvbG9yXG5cbnBsZWFzZS5nZW5lcmF0ZVJhbmRvbSA9IC0+XG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0Y29sb3IuaHVlIHJhbmRvbUludCgwLCAzNTkpXG5cdGNvbG9yLnNhdHVyYXRpb24gcmFuZG9tRmxvYXQoMCwgMS4wKVxuXHRjb2xvci52YWx1ZSByYW5kb21GbG9hdCgwLCAxLjApXG5cdHJldHVybiBjb2xvclxuXG5cbnBsZWFzZS5tYWtlQ29sb3IgPSAob3B0aW9ucyA9IHt9KSAtPlxuXG5cdCMgZm9yIGkgaW4gWzAuLm9wdGlvbnMuY29sb3JzUmV0dXJuZWRdIGJ5IDFcblx0IyBcdGdlbmVyYXRlKClcblxuXG5cdGNvbG9ycyA9IFtdXG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0aWYgb3B0aW9ucy5iYXNlQ29sb3I/XG5cdFx0Z2VuZXJhdGVGcm9tQmFzZUNvbG9yIG9wdGlvbnMuYmFzZUNvbG9yXG5cdFx0cmV0dXJuXG5cblx0XHRjb2xvci5odWUgY2xhbXAocmFuZG9tSW50KGJhc2UuaHVlKCkgLSA1LCBiYXNlLmh1ZSgpICsgNSksIDAgLCAzNjApXG5cdFx0aWYgYmFzZS5zYXR1cmF0aW9uKCkgaXMgMCB0aGVuIGNvbG9yLnNhdHVyYXRpb24gMFxuXHRlbHNlXG5cdFx0Y29sb3IuaHVlIHJhbmRvbUludCgwLCAzNTkpXG5cdGNvbG9yLnNhdHVyYXRpb24gcmFuZG9tRmxvYXQoMC40LCAwLjg1KVxuXHRjb2xvci52YWx1ZSByYW5kb21GbG9hdCgwLjQsIDAuODUpXG5cdGNvbG9ycy5wdXNoIGNvbG9yLmhzdigpXG5cdHJldHVybiBjb2xvcnMiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
