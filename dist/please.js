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
    this.mix = bind(this.mix, this);
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
    if ((value != null) && this._isHex(value)) {
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

  Color.prototype.mix = function(color, amount) {
    var remainder;
    if (amount == null) {
      amount = 0.5;
    }
    amount = clamp(amount, 0, 1);
    remainder = 1 - amount;
    this.hue((this.hue() * remainder) + (color.hue() * amount));
    this.sat((this.sat() + color.sat()) / 2);
    this.val((this.val() + color.val()) / 2);
    return this;
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
    var b, computedV, f, g, h, i, p, q, r, rgbObj, s, t, v;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    h = hsv.h % 360;
    s = hsv.s;
    v = hsv.v;
    if (s === 0) {
      computedV = v * 255;
      rgbObj = {
        r: computedV,
        g: computedV,
        b: computedV
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDWixJQUFHLGFBQUg7QUFDQyxjQUFPLElBQUMsQ0FBQSxXQUFELENBQWEsS0FBYixDQUFQO0FBQUEsYUFDTSxLQUROO1VBRUUsSUFBQyxDQUFBLE9BQUQsR0FDQztZQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FBVDtZQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FEVDtZQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FGVDs7QUFGRztBQUROLGFBTU0sS0FOTjtVQU1pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQU5OLGFBT00sS0FQTjtVQU9pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVBOLGFBUU0sS0FSTjtVQVFpQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQVI1QixPQUREO0tBQUEsTUFBQTtNQVdDLElBQUMsQ0FBQSxPQUFELEdBQ0M7UUFBQSxDQUFBLEVBQUcsQ0FBSDtRQUNBLENBQUEsRUFBRyxDQURIO1FBRUEsQ0FBQSxFQUFHLENBRkg7UUFaRjs7RUFEWTs7a0JBaUJiLE1BQUEsR0FBUSxTQUFDLEtBQUQ7SUFDUCxJQUFlLFFBQUEsQ0FBUyxLQUFULENBQUEsSUFBb0IsaUJBQXBCLElBQWlDLGlCQUFqQyxJQUE4QyxpQkFBN0Q7QUFBQSxhQUFPLEtBQVA7O0FBQ0EsV0FBTztFQUZBOztrQkFJUixNQUFBLEdBQVEsU0FBQyxLQUFEO0lBQ1AsSUFBZSxRQUFBLENBQVMsS0FBVCxDQUFBLElBQW9CLGlCQUFwQixJQUFpQyxpQkFBakMsSUFBOEMsaUJB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QUNBLE1BQUEsR0FBUztBQUNULE9BQVMsNkRBQVQ7SUFDQyxNQUFPLENBQUEsTUFBTSxDQUFDLE1BQVAsQ0FBUCxHQUF3QixNQUFNLENBQUMsUUFBUCxDQUFBO0FBRHpCO0FBR0EsU0FBTztBQVJXIiwiZmlsZSI6InBsZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbG9yXG5cdGNvbnN0cnVjdG9yOiAoY29sb3IpIC0+XG5cdFx0aWYgY29sb3I/XG5cdFx0XHRzd2l0Y2ggQF9kZXRlY3RUeXBlIGNvbG9yXG5cdFx0XHRcdHdoZW4gJ0hTVidcblx0XHRcdFx0XHRAX19tb2RlbCA9XG5cdFx0XHRcdFx0XHRoOiBjb2xvci5oXG5cdFx0XHRcdFx0XHRzOiBjb2xvci5zXG5cdFx0XHRcdFx0XHR2OiBjb2xvci52XG5cdFx0XHRcdHdoZW4gJ0hTTCcgdGhlbiBAX19tb2RlbCA9IEBfaHNsVG9Ic3YgY29sb3Jcblx0XHRcdFx0d2hlbiAnUkdCJyB0aGVuIEBfX21vZGVsID0gQF9yZ2JUb0hzdiBjb2xvclxuXHRcdFx0XHR3aGVuICdIRVgnIHRoZW4gQF9fbW9kZWwgPSBAX2hleFRvSHN2IGNvbG9yXG5cdFx0ZWxzZVxuXHRcdFx0QF9fbW9kZWwgPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogMFxuXG5cdF9pc0hzdjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci52P1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbDogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIGlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci5sP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbFN0cmluZzogKGNvbG9yKSAtPlxuXHRcdGhzbFRlc3QgPSAvaHNsXFwocz9kezEsM30scz9kezEsM30lLHM/ZHsxLDN9JXM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhzbFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2I6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLnI/IGFuZCBjb2xvci5nPyBhbmQgY29sb3IuYj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2JTdHJpbmc6IChjb2xvcikgLT5cblx0XHRyZ2JUZXN0ID0gL3JnYlxcKFxccz8oXFxkezEsM30sXFxzPyl7Mn1cXGR7MSwzfVxccz9cXCkvaVxuXHRcdHJldHVybiB0cnVlIGlmIGlzU3RyaW5nKGNvbG9yKSBhbmQgcmdiVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hleDogKGNvbG9yKSAtPlxuXHRcdGhleFRlc3QgPSAvXiM/KD86WzAtOWEtZl17M30pezEsMn0kL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIGhleFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRodWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwuaCA9IGNsYW1wIHZhbHVlLCAwLCAzNjBcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmhcblxuXHRzYXR1cmF0aW9uOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnMgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuc1xuXG5cdHNhdDogQDo6c2F0dXJhdGlvblxuXG5cdHZhbHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnYgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwudlxuXG5cdHZhbDogQDo6dmFsdWVcblxuXHRicmlnaHRuZXNzOiBAOjp2YWx1ZVxuXG5cdGFscGhhOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLmEgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuYVxuXG5cdG9wYWNpdHk6IEA6OmFscGhhXG5cblx0cmVkOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5yID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuclxuXG5cdGdyZWVuOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuZ1xuXG5cdGJsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLmIgPSBjbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5iXG5cblx0cmdiOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IgQF9fbW9kZWxcblxuXHRyZ2JTdHJpbmc6ID0+XG5cdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdHJldHVybiBcInJnYigje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJyZ2JhKCN7cmdiLnJ9LCN7cmdiLmd9LCN7cmdiLmJ9LCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc2w6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9oc2xUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXG5cdGhzbFN0cmluZzogPT5cblx0XHRoc2wgPSBAX2hzdlRvSHNsIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwiaHNsKCN7aHNsLmh9LCN7aHNsLnMgKiAxMDB9JSwje2hzbC5sICogMTAwfSUpXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwiaHNsYSgje2hzbC5ofSwje2hzbC5zICogMTAwfSUsI3toc2wubCAqIDEwMH0lLCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc3Y6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIEBfaXNIc3YodmFsdWUpXG5cdFx0XHRAX19tb2RlbCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbFxuXG5cdGhleDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc0hleCh2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gQF9oZXhUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hleCBAX19tb2RlbFxuXG5cdGh0bWw6ICh2YWx1ZSkgPT5cblx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgQGdldEh0bWxDb2xvcih2YWx1ZSlcblx0XHRyZXR1cm4gdGhpc1xuXG5cdGdldEh0bWxDb2xvcjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0Y29sb3JOYW1lID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRpZiBAX2h0bWxDb2xvcnNbY29sb3JOYW1lXT8gdGhlbiByZXR1cm4gQF9odG1sQ29sb3JzW2NvbG9yTmFtZV1cblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhUTUwgY29sb3IuJ1xuXG5cblx0Z2V0SHRtbENvbG9yczogPT4gQF9odG1sQ29sb3JzXG5cblx0I3RydWUgZm9yIHdoaXRlIGZhbHNlIGZvciBibGFja1xuXHRjb250cmFzdDogPT5cblx0XHRyZ2IgPSBAcmdiKClcblx0XHR5aXFSID0gcmdiLnIgKiAyOTlcblx0XHR5aXFHID0gcmdiLmcgKiA1ODdcblx0XHR5aXFCID0gcmdiLmIgKiAxMTRcblx0XHR5aXEgPSAoeWlxUiArIHlpcUcgKyB5aXFCKS8xMDAwXG5cdFx0aWYgeWlxIDwgMTI4IHRoZW4gcmV0dXJuIHRydWUgZWxzZSByZXR1cm4gZmFsc2VcblxuXHRtaXg6IChjb2xvciwgYW1vdW50ID0gMC41KSA9PlxuXHRcdGFtb3VudCA9IGNsYW1wIGFtb3VudCwgMCwgMVxuXHRcdHJlbWFpbmRlciA9IDEgLSBhbW91bnRcblx0XHRAaHVlIChAaHVlKCkgKiByZW1haW5kZXIpICsgKGNvbG9yLmh1ZSgpICogYW1vdW50KVxuXHRcdEBzYXQgKEBzYXQoKSArIGNvbG9yLnNhdCgpKS8yXG5cdFx0QHZhbCAoQHZhbCgpICsgY29sb3IudmFsKCkpLzJcblx0XHRyZXR1cm4gdGhpc1xuXG5cdF9kZXRlY3RUeXBlOiAoY29sb3IpID0+XG5cdFx0aWYgQF9pc0hzdiBjb2xvciB0aGVuIHJldHVybiAnSFNWJ1xuXHRcdGlmIEBfaXNIc2wgY29sb3IgdGhlbiByZXR1cm4gJ0hTTCdcblx0XHRpZiBAX2lzUmdiIGNvbG9yIHRoZW4gcmV0dXJuICdSR0InXG5cdFx0aWYgQF9pc1JnYlN0cmluZyBjb2xvciB0aGVuIHJldHVybiAnUkdCX1NUUklORydcblx0XHRpZiBAX2lzSGV4IGNvbG9yIHRoZW4gcmV0dXJuICdIRVgnXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBjb2xvciB0eXBlLidcblxuXHRfcmdiVG9Ic3Y6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRyID0gcmdiLnIgLyAyNTVcblx0XHRnID0gcmdiLmcgLyAyNTVcblx0XHRiID0gcmdiLmIgLyAyNTVcblx0XHRtaW5SZ2IgPSBNYXRoLm1pbiByLCBNYXRoLm1pbihnLCBiKVxuXHRcdG1heFJnYiA9IE1hdGgubWF4IHIsIE1hdGgubWF4KGcsIGIpXG5cdFx0I0JsYWNrLWdyYXktd2hpdGVcblx0XHRpZiBtaW5SZ2IgaXMgbWF4UmdiXG5cdFx0XHRoc3ZPYmogPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogbWluUmdiXG5cdFx0XHRyZXR1cm4gaHN2T2JqXG5cdFx0I0NvbG9ycyBvdGhlciB0aGFuIGJsYWNrLWdyYXktd2hpdGU6XG5cdFx0ZCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gZyAtIGIgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIHIgLSBnIGVsc2UgYiAtIHJcblx0XHRoID0gaWYgciBpcyBtaW5SZ2IgdGhlbiAzIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiAxIGVsc2UgNVxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiA2MCAqIChoIC0gZC8obWF4UmdiIC0gbWluUmdiKSlcblx0XHRcdHM6IChtYXhSZ2IgLSBtaW5SZ2IpL21heFJnYlxuXHRcdFx0djogbWF4UmdiXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9oc3ZUb1JnYjogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGggPSBoc3YuaCAlIDM2MFxuXHRcdHMgPSBoc3Yuc1xuXHRcdHYgPSBoc3YudlxuXG5cdFx0I25vIHNhdHVyYXRpb24gY2FzZVxuXHRcdGlmIHMgaXMgMFxuXHRcdFx0Y29tcHV0ZWRWID0gdiAqIDI1NVxuXHRcdFx0cmdiT2JqID1cblx0XHRcdFx0cjogY29tcHV0ZWRWXG5cdFx0XHRcdGc6IGNvbXB1dGVkVlxuXHRcdFx0XHRiOiBjb21wdXRlZFZcblx0XHRcdHJldHVybiByZ2JPYmpcblxuXHRcdGggLz0gNjBcblx0XHRpID0gTWF0aC5mbG9vciBoXG5cdFx0ZiA9IGggLSBpXG5cdFx0cCA9IHYgKiAoMSAtIHMpXG5cdFx0cSA9IHYgKiAoMSAtIHMgKiBmKVxuXHRcdHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSlcblxuXHRcdHN3aXRjaCBpXG5cdFx0XHR3aGVuIDBcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHRcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMVxuXHRcdFx0XHRyID0gcVxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAyXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSB0XG5cdFx0XHR3aGVuIDNcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHFcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNFxuXHRcdFx0XHRyID0gdFxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA1XG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSBxXG5cblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogTWF0aC5mbG9vciByICogMjU1XG5cdFx0XHRnOiBNYXRoLmZsb29yIGcgKiAyNTVcblx0XHRcdGI6IE1hdGguZmxvb3IgYiAqIDI1NVxuXG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb1JnYjogKGhleCkgPT5cblx0XHRpZiBub3QgQF9pc0hleCBoZXggdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGhleCBzdHJpbmcuJ1xuXHRcdCNleHBhbmQgdG8gbG9uZyB2ZXJzaW9uXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwgKG0sIHIsIGcsIGIpIC0+IHIgKyByICsgZyArIGcgKyBiICsgYlxuXHRcdCNyZW1vdmUgZXZlcnl0aGluZyBleHBlY3QgdmFsaWQgbnVtYmVyc1xuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9bXjAtOWEtZl0vZ2ksICcnXG5cdFx0cGFyc2VkSGV4ID0gcGFyc2VJbnQgaGV4LCAxNlxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiAocGFyc2VkSGV4ID4+IDE2KSAmIDI1NVxuXHRcdFx0ZzogKHBhcnNlZEhleCA+PiA4KSAmIDI1NVxuXHRcdFx0YjogcGFyc2VkSGV4ICYgMjU1XG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb0hzdjogKGhleCkgPT4gQF9yZ2JUb0hzdihAX2hleFRvUmdiKGhleCkpXG5cblx0X3JnYlRvSGV4OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiKHJnYikgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIFJHQiBvYmplY3QuJ1xuXHRcdGJhc2UgPSByZ2IuYiB8IChyZ2IuZyA8PCA4KSB8IChyZ2IuciA8PCAxNilcblx0XHRyZXR1cm4gXCIjI3soMHgxMDAwMDAwICsgYmFzZSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpfVwiXG5cblx0X2hzdlRvSGV4OiAoaHN2KSA9PiBAX3JnYlRvSGV4KEBfaHN2VG9SZ2IoaHN2KSlcblxuXHRfaHN2VG9Ic2w6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRjb21wdXRlZEwgPSAoMiAtIGhzdi5zKSAqIGhzdi52XG5cdFx0Y29tcHV0ZWRTID0gaHN2LnMgKiBoc3YudlxuXHRcdGlmIGNvbXB1dGVkTCA8PSAxIHRoZW4gY29tcHV0ZWRTID0gY29tcHV0ZWRTIC8gY29tcHV0ZWRMXG5cdFx0ZWxzZSBjb21wdXRlZFMgPSBjb21wdXRlZFMgLyAoMiAtIGNvbXB1dGVkTClcblx0XHRjb21wdXRlZEwgPSBjb21wdXRlZEwgLyAyXG5cblx0XHRoc2xPYmogPVxuXHRcdFx0aDogaHN2Lmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0bDogY29tcHV0ZWRMXG5cblx0XHRyZXR1cm4gaHNsT2JqXG5cblx0X2hzbFRvSHN2OiAoaHNsKSA9PlxuXHRcdGlmIG5vdCBAX2lzSHNsIGhzbCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNMIG9iamVjdC4nXG5cdFx0aHNsLmwgKj0gMlxuXHRcdGlmIChoc2wubCA8PSAxKSB0aGVuIGhzbC5zICo9IGhzbC5sXG5cdFx0ZWxzZSBoc2wucyAqPSAoIDIgLSBoc2wubClcblx0XHRjb21wdXRlZFYgPSAoaHNsLmwgKyBoc2wucykgLyAyXG5cdFx0Y29tcHV0ZWRTID0gKDIgKiBoc2wucykgLyAoaHNsLmwgKyBoc2wucylcblxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiBoc2wuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHR2OiBjb21wdXRlZFZcblxuXHRcdHJldHVybiBoc3ZPYmpcblxuXHRfaHRtbENvbG9yczpcblx0XHRhbGljZWJsdWU6ICdGMEY4RkYnXG5cdFx0YW50aXF1ZXdoaXRlOiAnRkFFQkQ3J1xuXHRcdGFxdWE6ICcwMEZGRkYnXG5cdFx0YXF1YW1hcmluZTogJzdGRkZENCdcblx0XHRhenVyZTogJ0YwRkZGRidcblx0XHRiZWlnZTogJ0Y1RjVEQydcblx0XHRiaXNxdWU6ICdGRkU0QzQnXG5cdFx0YmxhY2s6ICcwMDAwMDAnXG5cdFx0YmxhbmNoZWRhbG1vbmQ6ICdGRkVCQ0QnXG5cdFx0Ymx1ZTogJzAwMDBGRidcblx0XHRibHVldmlvbGV0OiAnOEEyQkUyJ1xuXHRcdGJyb3duOiAnQTUyQTJBJ1xuXHRcdGJ1cmx5d29vZDogJ0RFQjg4Nydcblx0XHRjYWRldGJsdWU6ICc1RjlFQTAnXG5cdFx0Y2hhcnRyZXVzZTogJzdGRkYwMCdcblx0XHRjaG9jb2xhdGU6ICdEMjY5MUUnXG5cdFx0Y29yYWw6ICdGRjdGNTAnXG5cdFx0Y29ybmZsb3dlcmJsdWU6ICc2NDk1RUQnXG5cdFx0Y29ybnNpbGs6ICdGRkY4REMnXG5cdFx0Y3JpbXNvbjogJ0RDMTQzQydcblx0XHRjeWFuOiAnMDBGRkZGJ1xuXHRcdGRhcmtibHVlOiAnMDAwMDhCJ1xuXHRcdGRhcmtjeWFuOiAnMDA4QjhCJ1xuXHRcdGRhcmtnb2xkZW5yb2Q6ICdCODg2MEInXG5cdFx0ZGFya2dyYXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZWVuOiAnMDA2NDAwJ1xuXHRcdGRhcmtraGFraTogJ0JEQjc2Qidcblx0XHRkYXJrbWFnZW50YTogJzhCMDA4Qidcblx0XHRkYXJrb2xpdmVncmVlbjogJzU1NkIyRidcblx0XHRkYXJrb3JhbmdlOiAnRkY4QzAwJ1xuXHRcdGRhcmtvcmNoaWQ6ICc5OTMyQ0MnXG5cdFx0ZGFya3JlZDogJzhCMDAwMCdcblx0XHRkYXJrc2FsbW9uOiAnRTk5NjdBJ1xuXHRcdGRhcmtzZWFncmVlbjogJzhGQkM4Ridcblx0XHRkYXJrc2xhdGVibHVlOiAnNDgzRDhCJ1xuXHRcdGRhcmtzbGF0ZWdyYXk6ICcyRjRGNEYnXG5cdFx0ZGFya3NsYXRlZ3JleTogJzJGNEY0Ridcblx0XHRkYXJrdHVycXVvaXNlOiAnMDBDRUQxJ1xuXHRcdGRhcmt2aW9sZXQ6ICc5NDAwRDMnXG5cdFx0ZGVlcHBpbms6ICdGRjE0OTMnXG5cdFx0ZGVlcHNreWJsdWU6ICcwMEJGRkYnXG5cdFx0ZGltZ3JheTogJzY5Njk2OSdcblx0XHRkaW1ncmV5OiAnNjk2OTY5J1xuXHRcdGRvZGdlcmJsdWU6ICcxRTkwRkYnXG5cdFx0ZmlyZWJyaWNrOiAnQjIyMjIyJ1xuXHRcdGZsb3JhbHdoaXRlOiAnRkZGQUYwJ1xuXHRcdGZvcmVzdGdyZWVuOiAnMjI4QjIyJ1xuXHRcdGZ1Y2hzaWE6ICdGRjAwRkYnXG5cdFx0Z2FpbnNib3JvOiAnRENEQ0RDJ1xuXHRcdGdob3N0d2hpdGU6ICdGOEY4RkYnXG5cdFx0Z29sZDogJ0ZGRDcwMCdcblx0XHRnb2xkZW5yb2Q6ICdEQUE1MjAnXG5cdFx0Z3JheTogJzgwODA4MCdcblx0XHRncmV5OiAnODA4MDgwJ1xuXHRcdGdyZWVuOiAnMDA4MDAwJ1xuXHRcdGdyZWVueWVsbG93OiAnQURGRjJGJ1xuXHRcdGhvbmV5ZGV3OiAnRjBGRkYwJ1xuXHRcdGhvdHBpbms6ICdGRjY5QjQnXG5cdFx0aW5kaWFucmVkOiAnQ0Q1QzVDJ1xuXHRcdGluZGlnbzogJzRCMDA4Midcblx0XHRpdm9yeTogJ0ZGRkZGMCdcblx0XHRraGFraTogJ0YwRTY4Qydcblx0XHRsYXZlbmRlcjogJ0U2RTZGQSdcblx0XHRsYXZlbmRlcmJsdXNoOiAnRkZGMEY1J1xuXHRcdGxhd25ncmVlbjogJzdDRkMwMCdcblx0XHRsZW1vbmNoaWZmb246ICdGRkZBQ0QnXG5cdFx0bGlnaHRibHVlOiAnQUREOEU2J1xuXHRcdGxpZ2h0Y29yYWw6ICdGMDgwODAnXG5cdFx0bGlnaHRjeWFuOiAnRTBGRkZGJ1xuXHRcdGxpZ2h0Z29sZGVucm9keWVsbG93OiAnRkFGQUQyJ1xuXHRcdGxpZ2h0Z3JheTogJ0QzRDNEMydcblx0XHRsaWdodGdyZXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmVlbjogJzkwRUU5MCdcblx0XHRsaWdodHBpbms6ICdGRkI2QzEnXG5cdFx0bGlnaHRzYWxtb246ICdGRkEwN0EnXG5cdFx0bGlnaHRzZWFncmVlbjogJzIwQjJBQSdcblx0XHRsaWdodHNreWJsdWU6ICc4N0NFRkEnXG5cdFx0bGlnaHRzbGF0ZWdyYXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzbGF0ZWdyZXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzdGVlbGJsdWU6ICdCMEM0REUnXG5cdFx0bGlnaHR5ZWxsb3c6ICdGRkZGRTAnXG5cdFx0bGltZTogJzAwRkYwMCdcblx0XHRsaW1lZ3JlZW46ICczMkNEMzInXG5cdFx0bGluZW46ICdGQUYwRTYnXG5cdFx0bWFnZW50YTogJ0ZGMDBGRidcblx0XHRtYXJvb246ICc4MDAwMDAnXG5cdFx0bWVkaXVtYXF1YW1hcmluZTogJzY2Q0RBQSdcblx0XHRtZWRpdW1ibHVlOiAnMDAwMENEJ1xuXHRcdG1lZGl1bW9yY2hpZDogJ0JBNTVEMydcblx0XHRtZWRpdW1wdXJwbGU6ICc5MzcwRDgnXG5cdFx0bWVkaXVtc2VhZ3JlZW46ICczQ0IzNzEnXG5cdFx0bWVkaXVtc2xhdGVibHVlOiAnN0I2OEVFJ1xuXHRcdG1lZGl1bXNwcmluZ2dyZWVuOiAnMDBGQTlBJ1xuXHRcdG1lZGl1bXR1cnF1b2lzZTogJzQ4RDFDQydcblx0XHRtZWRpdW12aW9sZXRyZWQ6ICdDNzE1ODUnXG5cdFx0bWlkbmlnaHRibHVlOiAnMTkxOTcwJ1xuXHRcdG1pbnRjcmVhbTogJ0Y1RkZGQSdcblx0XHRtaXN0eXJvc2U6ICdGRkU0RTEnXG5cdFx0bW9jY2FzaW46ICdGRkU0QjUnXG5cdFx0bmF2YWpvd2hpdGU6ICdGRkRFQUQnXG5cdFx0bmF2eTogJzAwMDA4MCdcblx0XHRvbGRsYWNlOiAnRkRGNUU2J1xuXHRcdG9saXZlOiAnODA4MDAwJ1xuXHRcdG9saXZlZHJhYjogJzZCOEUyMydcblx0XHRvcmFuZ2U6ICdGRkE1MDAnXG5cdFx0b3JhbmdlcmVkOiAnRkY0NTAwJ1xuXHRcdG9yY2hpZDogJ0RBNzBENidcblx0XHRwYWxlZ29sZGVucm9kOiAnRUVFOEFBJ1xuXHRcdHBhbGVncmVlbjogJzk4RkI5OCdcblx0XHRwYWxldHVycXVvaXNlOiAnQUZFRUVFJ1xuXHRcdHBhbGV2aW9sZXRyZWQ6ICdEODcwOTMnXG5cdFx0cGFwYXlhd2hpcDogJ0ZGRUZENSdcblx0XHRwZWFjaHB1ZmY6ICdGRkRBQjknXG5cdFx0cGVydTogJ0NEODUzRidcblx0XHRwaW5rOiAnRkZDMENCJ1xuXHRcdHBsdW06ICdEREEwREQnXG5cdFx0cG93ZGVyYmx1ZTogJ0IwRTBFNidcblx0XHRwdXJwbGU6ICc4MDAwODAnXG5cdFx0cmViZWNjYXB1cnBsZTogJzY2MzM5OSdcblx0XHRyZWQ6ICdGRjAwMDAnXG5cdFx0cm9zeWJyb3duOiAnQkM4RjhGJ1xuXHRcdHJveWFsYmx1ZTogJzQxNjlFMSdcblx0XHRzYWRkbGVicm93bjogJzhCNDUxMydcblx0XHRzYWxtb246ICdGQTgwNzInXG5cdFx0c2FuZHlicm93bjogJ0Y0QTQ2MCdcblx0XHRzZWFncmVlbjogJzJFOEI1Nydcblx0XHRzZWFzaGVsbDogJ0ZGRjVFRSdcblx0XHRzaWVubmE6ICdBMDUyMkQnXG5cdFx0c2lsdmVyOiAnQzBDMEMwJ1xuXHRcdHNreWJsdWU6ICc4N0NFRUInXG5cdFx0c2xhdGVibHVlOiAnNkE1QUNEJ1xuXHRcdHNsYXRlZ3JheTogJzcwODA5MCdcblx0XHRzbGF0ZWdyZXk6ICc3MDgwOTAnXG5cdFx0c25vdzogJ0ZGRkFGQSdcblx0XHRzcHJpbmdncmVlbjogJzAwRkY3Ridcblx0XHRzdGVlbGJsdWU6ICc0NjgyQjQnXG5cdFx0dGFuOiAnRDJCNDhDJ1xuXHRcdHRlYWw6ICcwMDgwODAnXG5cdFx0dGhpc3RsZTogJ0Q4QkZEOCdcblx0XHR0b21hdG86ICdGRjYzNDcnXG5cdFx0dHVycXVvaXNlOiAnNDBFMEQwJ1xuXHRcdHZpb2xldDogJ0VFODJFRSdcblx0XHR3aGVhdDogJ0Y1REVCMydcblx0XHR3aGl0ZTogJ0ZGRkZGRidcblx0XHR3aGl0ZXNtb2tlOiAnRjVGNUY1J1xuXHRcdHllbGxvdzogJ0ZGRkYwMCdcblx0XHR5ZWxsb3dncmVlbjogJzlBQ0QzMidcblxuXG5cbiIsIiNsb2Rhc2ggLSBpc09iamVjdFxuaXNPYmplY3QgPSAodmFsdWUpIC0+XG5cdHR5cGUgPSB0eXBlb2YgdmFsdWVcblx0cmV0dXJuICEhdmFsdWUgYW5kICh0eXBlIGlzICdvYmplY3QnIG9yIHR5cGUgaXMgJ2Z1bmN0aW9uJylcblxuaXNBcnJheSA9IEFycmF5LmlzQXJyYXlcblxuI2xvZGFzaCAtIGlzT2JqZWN0TGlrZVxuaXNPYmplY3RMaWtlID0gKHZhbHVlKSAtPiAhIXZhbHVlICYmdHlwZW9mIHZhbHVlIGlzICdvYmplY3QnXG5cbiNsb2Rhc2ggLSBpc1N0cmluZyAobW9kaWZpZWQpXG5pc1N0cmluZyA9ICh2YWx1ZSkgLT4gdHlwZW9mIHZhbHVlIGlzICdzdHJpbmcnIG9yICghaXNBcnJheSh2YWx1ZSkgYW5kIGlzT2JqZWN0TGlrZSh2YWx1ZSkpXG5cbm9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5pc051bWJlciA9ICh2YWx1ZSkgLT4gdHlwZW9mIHZhbHVlIGlzICdudW1iZXInIG9yIChpc09iamVjdExpa2UodmFsdWUpIGFuZCBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSBpcyAnW29iamVjdCBOdW1iZXJdJylcblxuaXNOYU4gPSAodmFsdWUpIC0+IGlzTnVtYmVyKHZhbHVlKSBhbmQgdmFsdWUgaXNudCArdmFsdWVcblxuI2NsYW1wIHZhbHVlcyBiZXR3ZWVuIHR3byBwb2ludHMgZGVmYXVsdCAodmFsdWUsIDAsIDEpXG5jbGFtcCA9ICh2YWx1ZSwgbWluID0gMCwgbWF4ID0gMSkgLT4gTWF0aC5tYXgobWluLCBNYXRoLm1pbih2YWx1ZSwgbWF4KSlcblxucmFuZG9tSW50ID0gKG1pbiwgbWF4KSAtPiBNYXRoLmZsb29yIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW5cblxucmFuZG9tRmxvYXQgPSAobWluLCBtYXgpIC0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pblxuXG4jc2hhbGxvdyBkZWZhdWx0c1xuZGVmYXVsdHMgPSAoZGVmYXVsdHMgPSB7fSwgb2JqZWN0KSAtPlxuXHRmb3Iga2V5LCB2YWx1ZSBvZiBvYmplY3Rcblx0XHRpZiBvYmplY3QuaGFzT3duUHJvcGVydHkga2V5XG5cdFx0XHRkZWZhdWx0c1trZXldID0gb2JqZWN0W2tleV1cblx0cmV0dXJuIGRlZmF1bHRzIiwicGxlYXNlLkNvbG9yID0gKGNvbG9yKSAtPiBuZXcgQ29sb3IgY29sb3JcblxuUEhJID0gMC42MTgwMzM5ODg3NDk4OTVcblxubWFrZUNvbG9yRGVmYXVsdHMgPVxuXHRodWU6IG51bGxcblx0c2F0dXJhdGlvbjogbnVsbFxuXHR2YWx1ZTogbnVsbFxuXHRiYXNlX2NvbG9yOiAnJ1xuXHRiYXNlQ29sb3I6ICcnXG5cdGdyZXlzY2FsZTogZmFsc2Vcblx0Z3JheXNjYWxlOiBmYWxzZSAjd2hhdGV2ZXIgSSBzdXBwb3J0IHRoZW0gYm90aCwgbXVycmljYVxuXHRnb2xkZW46IHRydWVcblx0ZnVsbF9yYW5kb206IGZhbHNlXG5cdGZpbGxSYW5kb206IGZhbHNlXG5cdGNvbG9yc19yZXR1cm5lZDogMVxuXHRjb2xvcnNSZXR1cm5lZDogMVxuXHRmb3JtYXQ6ICdoZXgnXG5cbnBsZWFzZS5nZW5lcmF0ZUZyb21CYXNlQ29sb3IgPSAoYmFzZUNvbG9yKSAtPlxuXHRjb2xvciA9IG5ldyBDb2xvcigpXG5cdGJhc2UgPSBuZXcgQ29sb3IgYmFzZUNvbG9yXG5cdGNvbG9yLmh1ZSBjbGFtcChyYW5kb21JbnQoYmFzZS5odWUoKSAtIDUsIGJhc2UuaHVlKCkgKyA1KSwgMCwgMzYwKVxuXHRpZiBiYXNlLnNhdHVyYXRpb24oKSBpcyAwIHRoZW4gY29sb3Iuc2F0dXJhdGlvbiAwXG5cdGVsc2UgY29sb3Iuc2F0dXJhdGlvbiByYW5kb21GbG9hdCgwLjQsIDAuODUpXG5cdGNvbG9yLnZhbHVlIHJhbmRvbUZsb2F0KDAuNCwgMC44NSlcblx0cmV0dXJuIGNvbG9yXG5cbnBsZWFzZS5nZW5lcmF0ZSA9IHBsZWFzZS5nZW5lcmF0ZUdvbGRlbiA9IC0+XG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0aHVlID0gcmFuZG9tSW50KDAsIDM1OSlcblx0Y29sb3IuaHVlIChodWUgKyAoaHVlL1BISSkgJSAzNjApXG5cdGNvbG9yLnNhdHVyYXRpb24gcmFuZG9tRmxvYXQoMC40LCAwLjg1KVxuXHRjb2xvci52YWx1ZSByYW5kb21GbG9hdCgwLjQsIDAuODUpXG5cdHJldHVybiBjb2xvclxuXG5wbGVhc2UuZ2VuZXJhdGVSYW5kb20gPSAtPlxuXHRjb2xvciA9IG5ldyBDb2xvcigpXG5cdGNvbG9yLmh1ZSByYW5kb21JbnQoMCwgMzU5KVxuXHRjb2xvci5zYXR1cmF0aW9uIHJhbmRvbUZsb2F0KDAsIDEuMClcblx0Y29sb3IudmFsdWUgcmFuZG9tRmxvYXQoMCwgMS4wKVxuXHRyZXR1cm4gY29sb3JcblxuZGVwcmVjYXRpb25MYXllciA9IChvcHRpb25zKSAtPlxuXHRpZiBvcHRpb25zLmJhc2VfY29sb3IgaXNudCAnJ1xuXHRcdGNvbnNvbGUud2FybiAnVGhlIG9wdGlvbiBiYXNlX2NvbG9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgYmFzZUNvbG9yIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuYmFzZUNvbG9yID0gb3B0aW9ucy5iYXNlX2NvbG9yXG5cblx0aWYgb3B0aW9ucy5mdWxsX3JhbmRvbSBpc250IGZhbHNlXG5cdFx0Y29uc29sZS53YXJuICdUaGUgb3B0aW9uIGZ1bGxfcmFuZG9tIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgZnVsbFJhbmRvbSBpbnN0ZWFkLidcblx0XHRvcHRpb25zLmZ1bGxSYW5kb20gPSBvcHRpb25zLmZ1bGxfcmFuZG9tXG5cblx0aWYgb3B0aW9ucy5jb2xvcnNfcmV0dXJuZWQgaXNudCAxXG5cdFx0Y29uc29sZS53YXJuICdUaGUgb3B0aW9uIGNvbG9yc19yZXR1cm5lZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIGNvbG9yc1JldHVybmVkIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuY29sb3JzUmV0dXJuZWQgPSBvcHRpb25zLmNvbG9yc19yZXR1cm5lZFxuXG5cdHJldHVybiBvcHRpb25zXG5cblxucGxlYXNlLm1ha2VfY29sb3IgPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRjb25zb2xlLndhcm4gJ1RoZSBmdW5jdGlvbiBtYWtlX2NvbG9yKCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBtYWtlQ29sb3IoKSBpbnN0ZWFkLidcblx0cGxlYXNlLm1ha2VDb2xvciBvcHRpb25zXG5cdHJldHVyblxuXG5wbGVhc2UubWFrZUNvbG9yID0gKG9wdGlvbnMgPSB7fSkgLT5cblx0I3JlbW92ZSBkZXByZWNhdGlvbiBsYXllciBhZnRlciAzIG1vbnRocyBpbiB0aGUgd2lsZFxuXHRvcHRzID0gZGVwcmVjYXRpb25MYXllciBkZWZhdWx0cyhtYWtlQ29sb3JEZWZhdWx0cywgb3B0aW9ucylcblx0Y29uc29sZS5sb2cgb3B0c1xuXHRjb2xvcnMgPSBbXVxuXHRmb3IgaSBpbiBbMC4ub3B0aW9ucy5jb2xvcnNSZXR1cm5lZF0gYnkgMVxuXHRcdGNvbG9yc1tjb2xvcnMubGVuZ3RoXSA9IHBsZWFzZS5nZW5lcmF0ZSgpXG5cblx0cmV0dXJuIGNvbG9ycyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
