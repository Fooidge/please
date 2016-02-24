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

var clamp, defaults, isArray, isNaN, isNumber, isObject, isObjectLike, isString, objToString, randomFloat, randomInt;

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

defaults = function(defaults, object) {
  var key, value;
  if (defaults == null) {
    defaults = {};
  }
  for (key in object) {
    value = object[key];
    if (object.hasOwnProperty(key)) {
      defaults[key] = object[key];
    }
  }
  return defaults;
};

var PHI, deprecationLayer, makeColorDefaults;

please.Color = function(color) {
  return new Color(color);
};

PHI = 0.618033988749895;

makeColorDefaults = {
  hue: null,
  saturation: null,
  value: null,
  base_color: '',
  baseColor: '',
  greyscale: false,
  grayscale: false,
  golden: true,
  full_random: false,
  fillRandom: false,
  colors_returned: 1,
  colorsReturned: 1,
  format: 'hex'
};

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

please.generate = please.generateGolden = function() {
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

deprecationLayer = function(options) {
  if (options.base_color !== '') {
    console.warn('The option base_color is deprecated and will be removed soon. Use baseColor instead.');
    options.baseColor = options.base_color;
  }
  if (options.full_random !== false) {
    console.warn('The option full_random is deprecated and will be removed soon. Use fullRandom instead.');
    options.fullRandom = options.full_random;
  }
  if (options.colors_returned !== 1) {
    console.warn('The option colors_returned is deprecated and will be removed soon. Use colorsReturned instead.');
    options.colorsReturned = options.colors_returned;
  }
  return options;
};

please.make_color = function(options) {
  if (options == null) {
    options = {};
  }
  console.warn('The function make_color() is deprecated and will be removed soon. Use makeColor() instead.');
  please.makeColor(options);
};

please.makeColor = function(options) {
  var colors, i, j, opts, ref;
  if (options == null) {
    options = {};
  }
  opts = deprecationLayer(defaults(makeColorDefaults, options));
  console.log(opts);
  colors = [];
  for (i = j = 0, ref = options.colorsReturned; j <= ref; i = j += 1) {
    colors[colors.length] = please.generate();
  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNaLElBQUcsYUFBSDtBQUNDLGNBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQVA7QUFBQSxhQUNNLEtBRE47VUFFRSxJQUFDLENBQUEsT0FBRCxHQUNDO1lBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUFUO1lBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQURUO1lBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUOztBQUZHO0FBRE4sYUFNTSxLQU5OO1VBTWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBTk4sYUFPTSxLQVBOO1VBT2lCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBUE4sYUFRTSxLQVJOO1VBUWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBUjVCLE9BREQ7S0FBQSxNQUFBO01BV0MsSUFBQyxDQUFBLE9BQUQsR0FDQztRQUFBLENBQUEsRUFBRyxDQUFIO1FBQ0EsQ0FBQSxFQUFHLENBREg7UUFFQSxDQUFBLEVBQUcsQ0FGSDtRQVpGOztFQURZOztrQkFpQmIsTUFBQSxHQUFRLFNBQUMsS0FBRDtJQUNQLElBQWUsUUFBQSxDQUFTLEtBQVQsQ0FBQSxJQUFvQixpQkFBcEIsSUFBaUMsaUJBQWpDLElBQThDLGlCQUE3RDtBQUFBLGFBQU8sS0FBUDs7QUFDQSxXQUFPO0VBRkE7O2tCQUlSLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFB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QVIsQ0FBYSxnR0FBYjtJQUNBLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLE9BQU8sQ0FBQyxnQkFGbEM7O0FBSUEsU0FBTztBQWJXOztBQWdCbkIsTUFBTSxDQUFDLFVBQVAsR0FBb0IsU0FBQyxPQUFEOztJQUFDLFVBQVU7O0VBQzlCLE9BQU8sQ0FBQyxJQUFSLENBQWEsNEZBQWI7RUFDQSxNQUFNLENBQUMsU0FBUCxDQUFpQixPQUFqQjtBQUZtQjs7QUFLcEIsTUFBTSxDQUFDLFNBQVAsR0FBbUIsU0FBQyxPQUFEO0FBRWxCLE1BQUE7O0lBRm1CLFVBQVU7O0VBRTdCLElBQUEsR0FBTyxnQkFBQSxDQUFpQixRQUFBLENBQVMsaUJBQVQsRUFBNEIsT0FBNUIsQ0FBakI7RUFDUCxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7RUFDQSxNQUFBLEdBQVM7QUFDVCxPQUFTLDZEQUFUO0lBQ0MsTUFBTyxDQUFBLE1BQU0sQ0FBQyxNQUFQLENBQVAsR0FBd0IsTUFBTSxDQUFDLFFBQVAsQ0FBQTtBQUR6QjtBQUdBLFNBQU87QUFSVyIsImZpbGUiOiJwbGVhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDb2xvclxuXHRjb25zdHJ1Y3RvcjogKGNvbG9yKSAtPlxuXHRcdGlmIGNvbG9yP1xuXHRcdFx0c3dpdGNoIEBfZGV0ZWN0VHlwZSBjb2xvclxuXHRcdFx0XHR3aGVuICdIU1YnXG5cdFx0XHRcdFx0QF9fbW9kZWwgPVxuXHRcdFx0XHRcdFx0aDogY29sb3IuaFxuXHRcdFx0XHRcdFx0czogY29sb3Iuc1xuXHRcdFx0XHRcdFx0djogY29sb3IudlxuXHRcdFx0XHR3aGVuICdIU0wnIHRoZW4gQF9fbW9kZWwgPSBAX2hzbFRvSHN2IGNvbG9yXG5cdFx0XHRcdHdoZW4gJ1JHQicgdGhlbiBAX19tb2RlbCA9IEBfcmdiVG9Ic3YgY29sb3Jcblx0XHRcdFx0d2hlbiAnSEVYJyB0aGVuIEBfX21vZGVsID0gQF9oZXhUb0hzdiBjb2xvclxuXHRcdGVsc2Vcblx0XHRcdEBfX21vZGVsID1cblx0XHRcdFx0aDogMFxuXHRcdFx0XHRzOiAwXG5cdFx0XHRcdHY6IDBcblxuXHRfaXNIc3Y6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3Iudj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2w6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3IubD9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2xTdHJpbmc6IChjb2xvcikgLT5cblx0XHRoc2xUZXN0ID0gL2hzbFxcKHM/ZHsxLDN9LHM/ZHsxLDN9JSxzP2R7MSwzfSVzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoc2xUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5yPyBhbmQgY29sb3IuZz8gYW5kIGNvbG9yLmI/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiU3RyaW5nOiAoY29sb3IpIC0+XG5cdFx0cmdiVGVzdCA9IC9yZ2JcXChcXHM/KFxcZHsxLDN9LFxccz8pezJ9XFxkezEsM31cXHM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIHJnYlRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIZXg6IChjb2xvcikgLT5cblx0XHRoZXhUZXN0ID0gL14jPyg/OlswLTlhLWZdezN9KXsxLDJ9JC9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoZXhUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0aHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLmggPSBjbGFtcCB2YWx1ZSwgMCwgMzYwXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5oXG5cblx0c2F0dXJhdGlvbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5zID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnNcblxuXHRzYXQ6IEA6OnNhdHVyYXRpb25cblxuXHR2YWx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC52ID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnZcblxuXHR2YWw6IEA6OnZhbHVlXG5cblx0YnJpZ2h0bmVzczogQDo6dmFsdWVcblxuXHRhbHBoYTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5hID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmFcblxuXHRvcGFjaXR5OiBAOjphbHBoYVxuXG5cdHJlZDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuciA9IGNsYW1wIHZhbHVlLCAwLCAyNTVcblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiByZ2Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IoQF9fbW9kZWwpLnJcblxuXHRncmVlbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuZyA9IGNsYW1wIHZhbHVlLCAwLCAyNTVcblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiByZ2Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IoQF9fbW9kZWwpLmdcblxuXHRibHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5iID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuYlxuXG5cdHJnYjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiIEBfX21vZGVsXG5cblx0cmdiU3RyaW5nOiA9PlxuXHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRyZXR1cm4gXCJyZ2IoI3tyZ2Iucn0sI3tyZ2IuZ30sI3tyZ2IuYn0pXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwicmdiYSgje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHNsOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfaHNsVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9Ic2wgQF9fbW9kZWxcblxuXHRoc2xTdHJpbmc6ID0+XG5cdFx0aHNsID0gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXHRcdHJldHVybiBcImhzbCgje2hzbC5ofSwje2hzbC5zICogMTAwfSUsI3toc2wubCAqIDEwMH0lKVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcImhzbGEoI3toc2wuaH0sI3toc2wucyAqIDEwMH0lLCN7aHNsLmwgKiAxMDB9JSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHN2OiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBAX2lzSHN2KHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWxcblxuXHRoZXg6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9oZXhUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hleCBAX19tb2RlbFxuXG5cdGh0bWw6ICh2YWx1ZSkgPT5cblx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgQGdldEh0bWxDb2xvcih2YWx1ZSlcblx0XHRyZXR1cm4gdGhpc1xuXG5cdGdldEh0bWxDb2xvcjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0Y29sb3JOYW1lID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRpZiBAX2h0bWxDb2xvcnNbY29sb3JOYW1lXT8gdGhlbiByZXR1cm4gQF9odG1sQ29sb3JzW2NvbG9yTmFtZV1cblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhUTUwgY29sb3IuJ1xuXG5cblx0Z2V0SHRtbENvbG9yczogPT4gQF9odG1sQ29sb3JzXG5cblx0I3RydWUgZm9yIHdoaXRlIGZhbHNlIGZvciBibGFja1xuXHRjb250cmFzdDogPT5cblx0XHRyZ2IgPSBAcmdiKClcblx0XHR5aXFSID0gcmdiLnIgKiAyOTlcblx0XHR5aXFHID0gcmdiLmcgKiA1ODdcblx0XHR5aXFCID0gcmdiLmIgKiAxMTRcblx0XHR5aXEgPSAoeWlxUiArIHlpcUcgKyB5aXFCKS8xMDAwXG5cdFx0aWYgeWlxIDwgMTI4IHRoZW4gcmV0dXJuIHRydWUgZWxzZSByZXR1cm4gZmFsc2VcblxuXHRfZGV0ZWN0VHlwZTogKGNvbG9yKSA9PlxuXHRcdGlmIEBfaXNIc3YgY29sb3IgdGhlbiByZXR1cm4gJ0hTVidcblx0XHRpZiBAX2lzSHNsIGNvbG9yIHRoZW4gcmV0dXJuICdIU0wnXG5cdFx0aWYgQF9pc1JnYiBjb2xvciB0aGVuIHJldHVybiAnUkdCJ1xuXHRcdGlmIEBfaXNSZ2JTdHJpbmcgY29sb3IgdGhlbiByZXR1cm4gJ1JHQl9TVFJJTkcnXG5cdFx0aWYgQF9pc0hleCBjb2xvciB0aGVuIHJldHVybiAnSEVYJ1xuXHRcdHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgY29sb3IgdHlwZS4nXG5cblx0X3JnYlRvSHN2OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiIHJnYiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0ciA9IHJnYi5yIC8gMjU1XG5cdFx0ZyA9IHJnYi5nIC8gMjU1XG5cdFx0YiA9IHJnYi5iIC8gMjU1XG5cdFx0bWluUmdiID0gTWF0aC5taW4gciwgTWF0aC5taW4oZywgYilcblx0XHRtYXhSZ2IgPSBNYXRoLm1heCByLCBNYXRoLm1heChnLCBiKVxuXHRcdCNCbGFjay1ncmF5LXdoaXRlXG5cdFx0aWYgbWluUmdiIGlzIG1heFJnYlxuXHRcdFx0aHN2T2JqID1cblx0XHRcdFx0aDogMFxuXHRcdFx0XHRzOiAwXG5cdFx0XHRcdHY6IG1pblJnYlxuXHRcdFx0cmV0dXJuIGhzdk9ialxuXHRcdCNDb2xvcnMgb3RoZXIgdGhhbiBibGFjay1ncmF5LXdoaXRlOlxuXHRcdGQgPSBpZiByIGlzIG1pblJnYiB0aGVuIGcgLSBiIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiByIC0gZyBlbHNlIGIgLSByXG5cdFx0aCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gMyBlbHNlIGlmIGIgaXMgbWluUmdiIHRoZW4gMSBlbHNlIDVcblx0XHRoc3ZPYmogPVxuXHRcdFx0aDogNjAgKiAoaCAtIGQvKG1heFJnYiAtIG1pblJnYikpXG5cdFx0XHRzOiAobWF4UmdiIC0gbWluUmdiKS9tYXhSZ2Jcblx0XHRcdHY6IG1heFJnYlxuXHRcdHJldHVybiBoc3ZPYmpcblxuXHRfaHN2VG9SZ2I6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRoID0gaHN2Lmhcblx0XHRzID0gaHN2LnNcblx0XHR2ID0gaHN2LnZcblxuXHRcdCNubyBzYXR1cmF0aW9uIGNhc2Vcblx0XHRpZiBzIGlzIDBcblx0XHRcdHJnYk9iaiA9XG5cdFx0XHRcdHI6IHZcblx0XHRcdFx0ZzogdlxuXHRcdFx0XHRiOiB2XG5cdFx0XHRyZXR1cm4gcmdiT2JqXG5cblx0XHRoIC89IDYwXG5cdFx0aSA9IE1hdGguZmxvb3IgaFxuXHRcdGYgPSBoIC0gaVxuXHRcdHAgPSB2ICogKDEgLSBzKVxuXHRcdHEgPSB2ICogKDEgLSBzICogZilcblx0XHR0ID0gdiAqICgxIC0gcyAqICgxIC0gZikpXG5cblx0XHRzd2l0Y2ggaVxuXHRcdFx0d2hlbiAwXG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSB0XG5cdFx0XHRcdGIgPSBwXG5cdFx0XHR3aGVuIDFcblx0XHRcdFx0ciA9IHFcblx0XHRcdFx0ZyA9IHZcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMlxuXHRcdFx0XHRyID0gcFxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gdFxuXHRcdFx0d2hlbiAzXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSBxXG5cdFx0XHRcdGIgPSB2XG5cdFx0XHR3aGVuIDRcblx0XHRcdFx0ciA9IHRcblx0XHRcdFx0ZyA9IHBcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNVxuXHRcdFx0XHRyID0gdlxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gcVxuXG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IE1hdGguZmxvb3IgciAqIDI1NVxuXHRcdFx0ZzogTWF0aC5mbG9vciBnICogMjU1XG5cdFx0XHRiOiBNYXRoLmZsb29yIGIgKiAyNTVcblxuXHRcdHJldHVybiByZ2JPYmpcblxuXHRfaGV4VG9SZ2I6IChoZXgpID0+XG5cdFx0aWYgbm90IEBfaXNIZXggaGV4IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBoZXggc3RyaW5nLidcblx0XHQjZXhwYW5kIHRvIGxvbmcgdmVyc2lvblxuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2ksIChtLCByLCBnLCBiKSAtPiByICsgciArIGcgKyBnICsgYiArIGJcblx0XHQjcmVtb3ZlIGV2ZXJ5dGhpbmcgZXhwZWN0IHZhbGlkIG51bWJlcnNcblx0XHRoZXggPSBoZXgucmVwbGFjZSAvW14wLTlhLWZdL2dpLCAnJ1xuXHRcdHBhcnNlZEhleCA9IHBhcnNlSW50IGhleCwgMTZcblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogKHBhcnNlZEhleCA+PiAxNikgJiAyNTVcblx0XHRcdGc6IChwYXJzZWRIZXggPj4gOCkgJiAyNTVcblx0XHRcdGI6IHBhcnNlZEhleCAmIDI1NVxuXHRcdHJldHVybiByZ2JPYmpcblxuXHRfaGV4VG9Ic3Y6IChoZXgpID0+IEBfcmdiVG9Ic3YoQF9oZXhUb1JnYihoZXgpKVxuXG5cdF9yZ2JUb0hleDogKHJnYikgPT5cblx0XHRpZiBub3QgQF9pc1JnYihyZ2IpIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRiYXNlID0gcmdiLmIgfCAocmdiLmcgPDwgOCkgfCAocmdiLnIgPDwgMTYpXG5cdFx0cmV0dXJuIFwiIyN7KDB4MTAwMDAwMCArIGJhc2UpLnRvU3RyaW5nKDE2KS5zbGljZSgxKX1cIlxuXG5cdF9oc3ZUb0hleDogKGhzdikgPT4gQF9yZ2JUb0hleChAX2hzdlRvUmdiKGhzdikpXG5cblx0X2hzdlRvSHNsOiAoaHN2KSA9PlxuXHRcdGlmIG5vdCBAX2lzSHN2IGhzdiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNWIG9iamVjdC4nXG5cdFx0Y29tcHV0ZWRMID0gKDIgLSBoc3YucykgKiBoc3YudlxuXHRcdGNvbXB1dGVkUyA9IGhzdi5zICogaHN2LnZcblx0XHRpZiBjb21wdXRlZEwgPD0gMSB0aGVuIGNvbXB1dGVkUyA9IGNvbXB1dGVkUyAvIGNvbXB1dGVkTFxuXHRcdGVsc2UgY29tcHV0ZWRTID0gY29tcHV0ZWRTIC8gKDIgLSBjb21wdXRlZEwpXG5cdFx0Y29tcHV0ZWRMID0gY29tcHV0ZWRMIC8gMlxuXG5cdFx0aHNsT2JqID1cblx0XHRcdGg6IGhzdi5oXG5cdFx0XHRzOiBjb21wdXRlZFNcblx0XHRcdGw6IGNvbXB1dGVkTFxuXG5cdFx0cmV0dXJuIGhzbE9ialxuXG5cdF9oc2xUb0hzdjogKGhzbCkgPT5cblx0XHRpZiBub3QgQF9pc0hzbCBoc2wgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTTCBvYmplY3QuJ1xuXHRcdGhzbC5sICo9IDJcblx0XHRpZiAoaHNsLmwgPD0gMSkgdGhlbiBoc2wucyAqPSBoc2wubFxuXHRcdGVsc2UgaHNsLnMgKj0gKCAyIC0gaHNsLmwpXG5cdFx0Y29tcHV0ZWRWID0gKGhzbC5sICsgaHNsLnMpIC8gMlxuXHRcdGNvbXB1dGVkUyA9ICgyICogaHNsLnMpIC8gKGhzbC5sICsgaHNsLnMpXG5cblx0XHRoc3ZPYmogPVxuXHRcdFx0aDogaHNsLmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0djogY29tcHV0ZWRWXG5cblx0XHRyZXR1cm4gaHN2T2JqXG5cblx0X2h0bWxDb2xvcnM6XG5cdFx0YWxpY2VibHVlOiAnRjBGOEZGJ1xuXHRcdGFudGlxdWV3aGl0ZTogJ0ZBRUJENydcblx0XHRhcXVhOiAnMDBGRkZGJ1xuXHRcdGFxdWFtYXJpbmU6ICc3RkZGRDQnXG5cdFx0YXp1cmU6ICdGMEZGRkYnXG5cdFx0YmVpZ2U6ICdGNUY1REMnXG5cdFx0YmlzcXVlOiAnRkZFNEM0J1xuXHRcdGJsYWNrOiAnMDAwMDAwJ1xuXHRcdGJsYW5jaGVkYWxtb25kOiAnRkZFQkNEJ1xuXHRcdGJsdWU6ICcwMDAwRkYnXG5cdFx0Ymx1ZXZpb2xldDogJzhBMkJFMidcblx0XHRicm93bjogJ0E1MkEyQSdcblx0XHRidXJseXdvb2Q6ICdERUI4ODcnXG5cdFx0Y2FkZXRibHVlOiAnNUY5RUEwJ1xuXHRcdGNoYXJ0cmV1c2U6ICc3RkZGMDAnXG5cdFx0Y2hvY29sYXRlOiAnRDI2OTFFJ1xuXHRcdGNvcmFsOiAnRkY3RjUwJ1xuXHRcdGNvcm5mbG93ZXJibHVlOiAnNjQ5NUVEJ1xuXHRcdGNvcm5zaWxrOiAnRkZGOERDJ1xuXHRcdGNyaW1zb246ICdEQzE0M0MnXG5cdFx0Y3lhbjogJzAwRkZGRidcblx0XHRkYXJrYmx1ZTogJzAwMDA4Qidcblx0XHRkYXJrY3lhbjogJzAwOEI4Qidcblx0XHRkYXJrZ29sZGVucm9kOiAnQjg4NjBCJ1xuXHRcdGRhcmtncmF5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmV5OiAnQTlBOUE5J1xuXHRcdGRhcmtncmVlbjogJzAwNjQwMCdcblx0XHRkYXJra2hha2k6ICdCREI3NkInXG5cdFx0ZGFya21hZ2VudGE6ICc4QjAwOEInXG5cdFx0ZGFya29saXZlZ3JlZW46ICc1NTZCMkYnXG5cdFx0ZGFya29yYW5nZTogJ0ZGOEMwMCdcblx0XHRkYXJrb3JjaGlkOiAnOTkzMkNDJ1xuXHRcdGRhcmtyZWQ6ICc4QjAwMDAnXG5cdFx0ZGFya3NhbG1vbjogJ0U5OTY3QSdcblx0XHRkYXJrc2VhZ3JlZW46ICc4RkJDOEYnXG5cdFx0ZGFya3NsYXRlYmx1ZTogJzQ4M0Q4Qidcblx0XHRkYXJrc2xhdGVncmF5OiAnMkY0RjRGJ1xuXHRcdGRhcmtzbGF0ZWdyZXk6ICcyRjRGNEYnXG5cdFx0ZGFya3R1cnF1b2lzZTogJzAwQ0VEMSdcblx0XHRkYXJrdmlvbGV0OiAnOTQwMEQzJ1xuXHRcdGRlZXBwaW5rOiAnRkYxNDkzJ1xuXHRcdGRlZXBza3libHVlOiAnMDBCRkZGJ1xuXHRcdGRpbWdyYXk6ICc2OTY5NjknXG5cdFx0ZGltZ3JleTogJzY5Njk2OSdcblx0XHRkb2RnZXJibHVlOiAnMUU5MEZGJ1xuXHRcdGZpcmVicmljazogJ0IyMjIyMidcblx0XHRmbG9yYWx3aGl0ZTogJ0ZGRkFGMCdcblx0XHRmb3Jlc3RncmVlbjogJzIyOEIyMidcblx0XHRmdWNoc2lhOiAnRkYwMEZGJ1xuXHRcdGdhaW5zYm9ybzogJ0RDRENEQydcblx0XHRnaG9zdHdoaXRlOiAnRjhGOEZGJ1xuXHRcdGdvbGQ6ICdGRkQ3MDAnXG5cdFx0Z29sZGVucm9kOiAnREFBNTIwJ1xuXHRcdGdyYXk6ICc4MDgwODAnXG5cdFx0Z3JleTogJzgwODA4MCdcblx0XHRncmVlbjogJzAwODAwMCdcblx0XHRncmVlbnllbGxvdzogJ0FERkYyRidcblx0XHRob25leWRldzogJ0YwRkZGMCdcblx0XHRob3RwaW5rOiAnRkY2OUI0J1xuXHRcdGluZGlhbnJlZDogJ0NENUM1Qydcblx0XHRpbmRpZ286ICc0QjAwODInXG5cdFx0aXZvcnk6ICdGRkZGRjAnXG5cdFx0a2hha2k6ICdGMEU2OEMnXG5cdFx0bGF2ZW5kZXI6ICdFNkU2RkEnXG5cdFx0bGF2ZW5kZXJibHVzaDogJ0ZGRjBGNSdcblx0XHRsYXduZ3JlZW46ICc3Q0ZDMDAnXG5cdFx0bGVtb25jaGlmZm9uOiAnRkZGQUNEJ1xuXHRcdGxpZ2h0Ymx1ZTogJ0FERDhFNidcblx0XHRsaWdodGNvcmFsOiAnRjA4MDgwJ1xuXHRcdGxpZ2h0Y3lhbjogJ0UwRkZGRidcblx0XHRsaWdodGdvbGRlbnJvZHllbGxvdzogJ0ZBRkFEMidcblx0XHRsaWdodGdyYXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmV5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JlZW46ICc5MEVFOTAnXG5cdFx0bGlnaHRwaW5rOiAnRkZCNkMxJ1xuXHRcdGxpZ2h0c2FsbW9uOiAnRkZBMDdBJ1xuXHRcdGxpZ2h0c2VhZ3JlZW46ICcyMEIyQUEnXG5cdFx0bGlnaHRza3libHVlOiAnODdDRUZBJ1xuXHRcdGxpZ2h0c2xhdGVncmF5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c2xhdGVncmV5OiAnNzc4ODk5J1xuXHRcdGxpZ2h0c3RlZWxibHVlOiAnQjBDNERFJ1xuXHRcdGxpZ2h0eWVsbG93OiAnRkZGRkUwJ1xuXHRcdGxpbWU6ICcwMEZGMDAnXG5cdFx0bGltZWdyZWVuOiAnMzJDRDMyJ1xuXHRcdGxpbmVuOiAnRkFGMEU2J1xuXHRcdG1hZ2VudGE6ICdGRjAwRkYnXG5cdFx0bWFyb29uOiAnODAwMDAwJ1xuXHRcdG1lZGl1bWFxdWFtYXJpbmU6ICc2NkNEQUEnXG5cdFx0bWVkaXVtYmx1ZTogJzAwMDBDRCdcblx0XHRtZWRpdW1vcmNoaWQ6ICdCQTU1RDMnXG5cdFx0bWVkaXVtcHVycGxlOiAnOTM3MEQ4J1xuXHRcdG1lZGl1bXNlYWdyZWVuOiAnM0NCMzcxJ1xuXHRcdG1lZGl1bXNsYXRlYmx1ZTogJzdCNjhFRSdcblx0XHRtZWRpdW1zcHJpbmdncmVlbjogJzAwRkE5QSdcblx0XHRtZWRpdW10dXJxdW9pc2U6ICc0OEQxQ0MnXG5cdFx0bWVkaXVtdmlvbGV0cmVkOiAnQzcxNTg1J1xuXHRcdG1pZG5pZ2h0Ymx1ZTogJzE5MTk3MCdcblx0XHRtaW50Y3JlYW06ICdGNUZGRkEnXG5cdFx0bWlzdHlyb3NlOiAnRkZFNEUxJ1xuXHRcdG1vY2Nhc2luOiAnRkZFNEI1J1xuXHRcdG5hdmFqb3doaXRlOiAnRkZERUFEJ1xuXHRcdG5hdnk6ICcwMDAwODAnXG5cdFx0b2xkbGFjZTogJ0ZERjVFNidcblx0XHRvbGl2ZTogJzgwODAwMCdcblx0XHRvbGl2ZWRyYWI6ICc2QjhFMjMnXG5cdFx0b3JhbmdlOiAnRkZBNTAwJ1xuXHRcdG9yYW5nZXJlZDogJ0ZGNDUwMCdcblx0XHRvcmNoaWQ6ICdEQTcwRDYnXG5cdFx0cGFsZWdvbGRlbnJvZDogJ0VFRThBQSdcblx0XHRwYWxlZ3JlZW46ICc5OEZCOTgnXG5cdFx0cGFsZXR1cnF1b2lzZTogJ0FGRUVFRSdcblx0XHRwYWxldmlvbGV0cmVkOiAnRDg3MDkzJ1xuXHRcdHBhcGF5YXdoaXA6ICdGRkVGRDUnXG5cdFx0cGVhY2hwdWZmOiAnRkZEQUI5J1xuXHRcdHBlcnU6ICdDRDg1M0YnXG5cdFx0cGluazogJ0ZGQzBDQidcblx0XHRwbHVtOiAnRERBMEREJ1xuXHRcdHBvd2RlcmJsdWU6ICdCMEUwRTYnXG5cdFx0cHVycGxlOiAnODAwMDgwJ1xuXHRcdHJlYmVjY2FwdXJwbGU6ICc2NjMzOTknXG5cdFx0cmVkOiAnRkYwMDAwJ1xuXHRcdHJvc3licm93bjogJ0JDOEY4Ridcblx0XHRyb3lhbGJsdWU6ICc0MTY5RTEnXG5cdFx0c2FkZGxlYnJvd246ICc4QjQ1MTMnXG5cdFx0c2FsbW9uOiAnRkE4MDcyJ1xuXHRcdHNhbmR5YnJvd246ICdGNEE0NjAnXG5cdFx0c2VhZ3JlZW46ICcyRThCNTcnXG5cdFx0c2Vhc2hlbGw6ICdGRkY1RUUnXG5cdFx0c2llbm5hOiAnQTA1MjJEJ1xuXHRcdHNpbHZlcjogJ0MwQzBDMCdcblx0XHRza3libHVlOiAnODdDRUVCJ1xuXHRcdHNsYXRlYmx1ZTogJzZBNUFDRCdcblx0XHRzbGF0ZWdyYXk6ICc3MDgwOTAnXG5cdFx0c2xhdGVncmV5OiAnNzA4MDkwJ1xuXHRcdHNub3c6ICdGRkZBRkEnXG5cdFx0c3ByaW5nZ3JlZW46ICcwMEZGN0YnXG5cdFx0c3RlZWxibHVlOiAnNDY4MkI0J1xuXHRcdHRhbjogJ0QyQjQ4Qydcblx0XHR0ZWFsOiAnMDA4MDgwJ1xuXHRcdHRoaXN0bGU6ICdEOEJGRDgnXG5cdFx0dG9tYXRvOiAnRkY2MzQ3J1xuXHRcdHR1cnF1b2lzZTogJzQwRTBEMCdcblx0XHR2aW9sZXQ6ICdFRTgyRUUnXG5cdFx0d2hlYXQ6ICdGNURFQjMnXG5cdFx0d2hpdGU6ICdGRkZGRkYnXG5cdFx0d2hpdGVzbW9rZTogJ0Y1RjVGNSdcblx0XHR5ZWxsb3c6ICdGRkZGMDAnXG5cdFx0eWVsbG93Z3JlZW46ICc5QUNEMzInXG5cblxuXG4iLCIjbG9kYXNoIC0gaXNPYmplY3RcbmlzT2JqZWN0ID0gKHZhbHVlKSAtPlxuXHR0eXBlID0gdHlwZW9mIHZhbHVlXG5cdHJldHVybiAhIXZhbHVlIGFuZCAodHlwZSBpcyAnb2JqZWN0JyBvciB0eXBlIGlzICdmdW5jdGlvbicpXG5cbmlzQXJyYXkgPSBBcnJheS5pc0FycmF5XG5cbiNsb2Rhc2ggLSBpc09iamVjdExpa2VcbmlzT2JqZWN0TGlrZSA9ICh2YWx1ZSkgLT4gISF2YWx1ZSAmJnR5cGVvZiB2YWx1ZSBpcyAnb2JqZWN0J1xuXG4jbG9kYXNoIC0gaXNTdHJpbmcgKG1vZGlmaWVkKVxuaXNTdHJpbmcgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnc3RyaW5nJyBvciAoIWlzQXJyYXkodmFsdWUpIGFuZCBpc09iamVjdExpa2UodmFsdWUpKVxuXG5vYmpUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuaXNOdW1iZXIgPSAodmFsdWUpIC0+IHR5cGVvZiB2YWx1ZSBpcyAnbnVtYmVyJyBvciAoaXNPYmplY3RMaWtlKHZhbHVlKSBhbmQgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgaXMgJ1tvYmplY3QgTnVtYmVyXScpXG5cbmlzTmFOID0gKHZhbHVlKSAtPiBpc051bWJlcih2YWx1ZSkgYW5kIHZhbHVlIGlzbnQgK3ZhbHVlXG5cbiNjbGFtcCB2YWx1ZXMgYmV0d2VlbiB0d28gcG9pbnRzIGRlZmF1bHQgKHZhbHVlLCAwLCAxKVxuY2xhbXAgPSAodmFsdWUsIG1pbiA9IDAsIG1heCA9IDEpIC0+IE1hdGgubWF4KG1pbiwgTWF0aC5taW4odmFsdWUsIG1heCkpXG5cbnJhbmRvbUludCA9IChtaW4sIG1heCkgLT4gTWF0aC5mbG9vciBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluXG5cbnJhbmRvbUZsb2F0ID0gKG1pbiwgbWF4KSAtPiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW5cblxuI3NoYWxsb3cgZGVmYXVsdHNcbmRlZmF1bHRzID0gKGRlZmF1bHRzID0ge30sIG9iamVjdCkgLT5cblx0Zm9yIGtleSwgdmFsdWUgb2Ygb2JqZWN0XG5cdFx0aWYgb2JqZWN0Lmhhc093blByb3BlcnR5IGtleVxuXHRcdFx0ZGVmYXVsdHNba2V5XSA9IG9iamVjdFtrZXldXG5cdHJldHVybiBkZWZhdWx0cyIsInBsZWFzZS5Db2xvciA9IChjb2xvcikgLT4gbmV3IENvbG9yIGNvbG9yXG5cblBISSA9IDAuNjE4MDMzOTg4NzQ5ODk1XG5cbm1ha2VDb2xvckRlZmF1bHRzID1cblx0aHVlOiBudWxsXG5cdHNhdHVyYXRpb246IG51bGxcblx0dmFsdWU6IG51bGxcblx0YmFzZV9jb2xvcjogJydcblx0YmFzZUNvbG9yOiAnJ1xuXHRncmV5c2NhbGU6IGZhbHNlXG5cdGdyYXlzY2FsZTogZmFsc2UgI3doYXRldmVyIEkgc3VwcG9ydCB0aGVtIGJvdGgsIG11cnJpY2Fcblx0Z29sZGVuOiB0cnVlXG5cdGZ1bGxfcmFuZG9tOiBmYWxzZVxuXHRmaWxsUmFuZG9tOiBmYWxzZVxuXHRjb2xvcnNfcmV0dXJuZWQ6IDFcblx0Y29sb3JzUmV0dXJuZWQ6IDFcblx0Zm9ybWF0OiAnaGV4J1xuXG5wbGVhc2UuZ2VuZXJhdGVGcm9tQmFzZUNvbG9yID0gKGJhc2VDb2xvcikgLT5cblx0Y29sb3IgPSBuZXcgQ29sb3IoKVxuXHRiYXNlID0gbmV3IENvbG9yIGJhc2VDb2xvclxuXHRjb2xvci5odWUgY2xhbXAocmFuZG9tSW50KGJhc2UuaHVlKCkgLSA1LCBiYXNlLmh1ZSgpICsgNSksIDAsIDM2MClcblx0aWYgYmFzZS5zYXR1cmF0aW9uKCkgaXMgMCB0aGVuIGNvbG9yLnNhdHVyYXRpb24gMFxuXHRlbHNlIGNvbG9yLnNhdHVyYXRpb24gcmFuZG9tRmxvYXQoMC40LCAwLjg1KVxuXHRjb2xvci52YWx1ZSByYW5kb21GbG9hdCgwLjQsIDAuODUpXG5cdHJldHVybiBjb2xvclxuXG5wbGVhc2UuZ2VuZXJhdGUgPSBwbGVhc2UuZ2VuZXJhdGVHb2xkZW4gPSAtPlxuXHRjb2xvciA9IG5ldyBDb2xvcigpXG5cdGh1ZSA9IHJhbmRvbUludCgwLCAzNTkpXG5cdGNvbG9yLmh1ZSAoaHVlICsgKGh1ZS9QSEkpICUgMzYwKVxuXHRjb2xvci5zYXR1cmF0aW9uIHJhbmRvbUZsb2F0KDAuNCwgMC44NSlcblx0Y29sb3IudmFsdWUgcmFuZG9tRmxvYXQoMC40LCAwLjg1KVxuXHRyZXR1cm4gY29sb3JcblxucGxlYXNlLmdlbmVyYXRlUmFuZG9tID0gLT5cblx0Y29sb3IgPSBuZXcgQ29sb3IoKVxuXHRjb2xvci5odWUgcmFuZG9tSW50KDAsIDM1OSlcblx0Y29sb3Iuc2F0dXJhdGlvbiByYW5kb21GbG9hdCgwLCAxLjApXG5cdGNvbG9yLnZhbHVlIHJhbmRvbUZsb2F0KDAsIDEuMClcblx0cmV0dXJuIGNvbG9yXG5cbmRlcHJlY2F0aW9uTGF5ZXIgPSAob3B0aW9ucykgLT5cblx0aWYgb3B0aW9ucy5iYXNlX2NvbG9yIGlzbnQgJydcblx0XHRjb25zb2xlLndhcm4gJ1RoZSBvcHRpb24gYmFzZV9jb2xvciBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIGJhc2VDb2xvciBpbnN0ZWFkLidcblx0XHRvcHRpb25zLmJhc2VDb2xvciA9IG9wdGlvbnMuYmFzZV9jb2xvclxuXG5cdGlmIG9wdGlvbnMuZnVsbF9yYW5kb20gaXNudCBmYWxzZVxuXHRcdGNvbnNvbGUud2FybiAnVGhlIG9wdGlvbiBmdWxsX3JhbmRvbSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIGZ1bGxSYW5kb20gaW5zdGVhZC4nXG5cdFx0b3B0aW9ucy5mdWxsUmFuZG9tID0gb3B0aW9ucy5mdWxsX3JhbmRvbVxuXG5cdGlmIG9wdGlvbnMuY29sb3JzX3JldHVybmVkIGlzbnQgMVxuXHRcdGNvbnNvbGUud2FybiAnVGhlIG9wdGlvbiBjb2xvcnNfcmV0dXJuZWQgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBjb2xvcnNSZXR1cm5lZCBpbnN0ZWFkLidcblx0XHRvcHRpb25zLmNvbG9yc1JldHVybmVkID0gb3B0aW9ucy5jb2xvcnNfcmV0dXJuZWRcblxuXHRyZXR1cm4gb3B0aW9uc1xuXG5cbnBsZWFzZS5tYWtlX2NvbG9yID0gKG9wdGlvbnMgPSB7fSkgLT5cblx0Y29uc29sZS53YXJuICdUaGUgZnVuY3Rpb24gbWFrZV9jb2xvcigpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgbWFrZUNvbG9yKCkgaW5zdGVhZC4nXG5cdHBsZWFzZS5tYWtlQ29sb3Igb3B0aW9uc1xuXHRyZXR1cm5cblxucGxlYXNlLm1ha2VDb2xvciA9IChvcHRpb25zID0ge30pIC0+XG5cdCNyZW1vdmUgZGVwcmVjYXRpb24gbGF5ZXIgYWZ0ZXIgMyBtb250aHMgaW4gdGhlIHdpbGRcblx0b3B0cyA9IGRlcHJlY2F0aW9uTGF5ZXIgZGVmYXVsdHMobWFrZUNvbG9yRGVmYXVsdHMsIG9wdGlvbnMpXG5cdGNvbnNvbGUubG9nIG9wdHNcblx0Y29sb3JzID0gW11cblx0Zm9yIGkgaW4gWzAuLm9wdGlvbnMuY29sb3JzUmV0dXJuZWRdIGJ5IDFcblx0XHRjb2xvcnNbY29sb3JzLmxlbmd0aF0gPSBwbGVhc2UuZ2VuZXJhdGUoKVxuXG5cdHJldHVybiBjb2xvcnMiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
