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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuY29mZmVlIiwibWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxLQUFBO0VBQUE7O0FBQU07RUFDUSxlQUFDLEtBQUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDWixZQUFPLElBQUMsQ0FBQSxXQUFELENBQWEsS0FBYixDQUFQO0FBQUEsV0FDTSxLQUROO1FBRUUsSUFBQyxDQUFBLE9BQUQsR0FDQztVQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FBVDtVQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FEVDtVQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FGVDs7QUFGRztBQUROLFdBTU0sS0FOTjtRQU1pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQU5OLFdBT00sS0FQTjtRQU9pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVBOLFdBUU0sS0FSTjtRQVFpQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQVI1QjtFQURZOztrQkFXYixNQUFBLEdBQVEsU0FBQyxLQUFEO0lBQ1AsSUFBZSxRQUFBLENBQVMsS0FBVCxDQUFBLElBQW9CLGlCQUFwQixJQUFpQyxpQkFBakMsSUFBOEMsaUJBQTdEO0FBQUEsYUFBTyxLQUFQOztBQUNBLFdBQU87RUFGQTs7a0JBSVIsTUFBQSxHQUFRLFNBQUMsS0FBRDtJQUNQLElBQWUsUUFBQSxDQUFTLEtBQVQsQ0FBQSxJQUFvQixpQkFBcEIsSUFBaUMsaUJBQWpDLElBQThDLGlCQUE3RDtBQUFBLGFBQU8sS0FBUDs7QUFDQSxXQUFPO0VBRkE7O2tCQUlSLFlBQUEsR0FBYyxTQUFDLEtBQUQ7QUFDYixRQUFBO0lBQUEsT0FBQSxHQUFVO0lBQ1YsSUFBZSxRQUFBLENBQVMsS0FBVCxDQUFBLElBQW9CLE9B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QixHQUE4QjtBQUE1Qzs7QUN4QmQsTUFBTSxDQUFDLEtBQVAsR0FBZSxTQUFDLEtBQUQ7U0FBZSxJQUFBLEtBQUEsQ0FBTSxLQUFOO0FBQWYiLCJmaWxlIjoicGxlYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29sb3Jcblx0Y29uc3RydWN0b3I6IChjb2xvcikgLT5cblx0XHRzd2l0Y2ggQF9kZXRlY3RUeXBlIGNvbG9yXG5cdFx0XHR3aGVuICdIU1YnXG5cdFx0XHRcdEBfX21vZGVsID1cblx0XHRcdFx0XHRoOiBjb2xvci5oXG5cdFx0XHRcdFx0czogY29sb3Iuc1xuXHRcdFx0XHRcdHY6IGNvbG9yLnZcblx0XHRcdHdoZW4gJ0hTTCcgdGhlbiBAX19tb2RlbCA9IEBfaHNsVG9Ic3YgY29sb3Jcblx0XHRcdHdoZW4gJ1JHQicgdGhlbiBAX19tb2RlbCA9IEBfcmdiVG9Ic3YgY29sb3Jcblx0XHRcdHdoZW4gJ0hFWCcgdGhlbiBAX19tb2RlbCA9IEBfaGV4VG9Ic3YgY29sb3JcblxuXHRfaXNIc3Y6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3Iudj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2w6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3IubD9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2xTdHJpbmc6IChjb2xvcikgLT5cblx0XHRoc2xUZXN0ID0gL2hzbFxcKHM/ZHsxLDN9LHM/ZHsxLDN9JSxzP2R7MSwzfSVzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoc2xUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5yPyBhbmQgY29sb3IuZz8gYW5kIGNvbG9yLmI/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiU3RyaW5nOiAoY29sb3IpIC0+XG5cdFx0cmdiVGVzdCA9IC9yZ2JcXChcXHM/KFxcZHsxLDN9LFxccz8pezJ9XFxkezEsM31cXHM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBpc1N0cmluZyhjb2xvcikgYW5kIHJnYlRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIZXg6IChjb2xvcikgLT5cblx0XHRoZXhUZXN0ID0gL14jPyg/OlswLTlhLWZdezN9KXsxLDJ9JC9pXG5cdFx0cmV0dXJuIHRydWUgaWYgaXNTdHJpbmcoY29sb3IpIGFuZCBoZXhUZXN0LnRlc3QoY29sb3IpXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0aHVlOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLmggPSBjbGFtcCB2YWx1ZSwgMCwgMzYwXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5oXG5cblx0c2F0dXJhdGlvbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5zID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnNcblxuXHRzYXQ6IEA6OnNhdHVyYXRpb25cblxuXHR2YWx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC52ID0gY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnZcblxuXHR2YWw6IEA6OnZhbHVlXG5cblx0YnJpZ2h0bmVzczogQDo6dmFsdWVcblxuXG5cdGFscGhhOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLmEgPSBjbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuYVxuXG5cdG9wYWNpdHk6IEA6OmFscGhhXG5cblx0cmVkOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5yID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuclxuXG5cdGdyZWVuOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBpc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuZ1xuXG5cdGJsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIGlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLmIgPSBjbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5iXG5cblx0cmdiOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2JcblxuXHRyZ2JTdHJpbmc6ID0+XG5cdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdHJldHVybiBcInJnYigje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJyZ2JhKCN7cmdiLnJ9LCN7cmdiLmd9LCN7cmdiLmJ9LCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc2w6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9oc2xUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXG5cdGhzbFN0cmluZzogPT5cblx0XHRoc2wgPSBAX2hzdlRvSHNsIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwiaHNsKCN7aHNsLmh9LCN7aHNsLnN9LCN7aHNsLmx9KVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcImhzbGEoI3toc2wuaH0sI3toc2wuc30sI3toc2wubH0sI3tAX19tb2RlbC5hfSlcIlxuXG5cdGhzdjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc0hzdih2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsXG5cblx0Z2V0SHRtbENvbG9yOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRjb2xvck5hbWUgPSB2YWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcblx0XHRcdGlmIEBfaHRtbENvbG9yc1tjb2xvck5hbWVdPyB0aGVuIHJldHVybiBAX2h0bWxDb2xvcnNbY29sb3JOYW1lXVxuXHRcdHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFRNTCBjb2xvci4nXG5cblx0aHRtbDogKHZhbHVlKSA9PlxuXHRcdEBfX21vZGVsID0gQF9oZXhUb0hzdiBAZ2V0SHRtbENvbG9yKHZhbHVlKVxuXHRcdHJldHVybiB0aGlzXG5cblx0Z2V0SHRtbENvbG9yczogPT4gQF9odG1sQ29sb3JzXG5cblx0X2RldGVjdFR5cGU6IChjb2xvcikgPT5cblx0XHRpZiBAX2lzSHN2IGNvbG9yIHRoZW4gcmV0dXJuICdIU1YnXG5cdFx0aWYgQF9pc0hzbCBjb2xvciB0aGVuIHJldHVybiAnSFNMJ1xuXHRcdGlmIEBfaXNSZ2IgY29sb3IgdGhlbiByZXR1cm4gJ1JHQidcblx0XHRpZiBAX2lzUmdiU3RyaW5nIGNvbG9yIHRoZW4gcmV0dXJuICdSR0JfU1RSSU5HJ1xuXHRcdGlmIEBfaXNIZXggY29sb3IgdGhlbiByZXR1cm4gJ0hFWCdcblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGNvbG9yIHR5cGUuJ1xuXG5cdF9yZ2JUb0hzdjogKHJnYikgPT5cblx0XHRpZiBub3QgQF9pc1JnYiByZ2IgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIFJHQiBvYmplY3QuJ1xuXHRcdHIgPSByZ2IuciAvIDI1NVxuXHRcdGcgPSByZ2IuZyAvIDI1NVxuXHRcdGIgPSByZ2IuYiAvIDI1NVxuXHRcdG1pblJnYiA9IE1hdGgubWluIHIsIE1hdGgubWluKGcsIGIpXG5cdFx0bWF4UmdiID0gTWF0aC5tYXggciwgTWF0aC5tYXgoZywgYilcblx0XHQjQmxhY2stZ3JheS13aGl0ZVxuXHRcdGlmIG1pblJnYiBpcyBtYXhSZ2Jcblx0XHRcdGhzdk9iaiA9XG5cdFx0XHRcdGg6IDBcblx0XHRcdFx0czogMFxuXHRcdFx0XHR2OiBtaW5SZ2Jcblx0XHRcdHJldHVybiBoc3ZPYmpcblx0XHQjQ29sb3JzIG90aGVyIHRoYW4gYmxhY2stZ3JheS13aGl0ZTpcblx0XHRkID0gaWYgciBpcyBtaW5SZ2IgdGhlbiBnIC0gYiBlbHNlIGlmIGIgaXMgbWluUmdiIHRoZW4gciAtIGcgZWxzZSBiIC0gclxuXHRcdGggPSBpZiByIGlzIG1pblJnYiB0aGVuIDMgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIDEgZWxzZSA1XG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IDYwICogKGggLSBkLyhtYXhSZ2IgLSBtaW5SZ2IpKVxuXHRcdFx0czogKG1heFJnYiAtIG1pblJnYikvbWF4UmdiXG5cdFx0XHR2OiBtYXhSZ2Jcblx0XHRyZXR1cm4gaHN2T2JqXG5cblx0X2hzdlRvUmdiOiAoaHN2KSA9PlxuXHRcdGlmIG5vdCBAX2lzSHN2IGhzdiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNWIG9iamVjdC4nXG5cdFx0aCA9IGhzdi5oXG5cdFx0cyA9IGhzdi5zXG5cdFx0diA9IGhzdi52XG5cblx0XHQjbm8gc2F0dXJhdGlvbiBjYXNlXG5cdFx0aWYgcyBpcyAwXG5cdFx0XHRyZ2JPYmogPVxuXHRcdFx0XHRyOiB2XG5cdFx0XHRcdGc6IHZcblx0XHRcdFx0YjogdlxuXHRcdFx0cmV0dXJuIHJnYk9ialxuXG5cdFx0aCAvPSA2MFxuXHRcdGkgPSBNYXRoLmZsb29yIGhcblx0XHRmID0gaCAtIGlcblx0XHRwID0gdiAqICgxIC0gcylcblx0XHRxID0gdiAqICgxIC0gcyAqIGYpXG5cdFx0dCA9IHYgKiAoMSAtIHMgKiAoMSAtIGYpKVxuXG5cdFx0c3dpdGNoIGlcblx0XHRcdHdoZW4gMFxuXHRcdFx0XHRyID0gdlxuXHRcdFx0XHRnID0gdFxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAxXG5cdFx0XHRcdHIgPSBxXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSBwXG5cdFx0XHR3aGVuIDJcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHZcblx0XHRcdFx0YiA9IHRcblx0XHRcdHdoZW4gM1xuXHRcdFx0XHRyID0gcFxuXHRcdFx0XHRnID0gcVxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA0XG5cdFx0XHRcdHIgPSB0XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSB2XG5cdFx0XHR3aGVuIDVcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHBcblx0XHRcdFx0YiA9IHFcblxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiBNYXRoLmZsb29yIHIgKiAyNTVcblx0XHRcdGc6IE1hdGguZmxvb3IgZyAqIDI1NVxuXHRcdFx0YjogTWF0aC5mbG9vciBiICogMjU1XG5cblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvUmdiOiAoaGV4KSA9PlxuXHRcdGlmIG5vdCBAX2lzSGV4IGhleCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgaGV4IHN0cmluZy4nXG5cdFx0I2V4cGFuZCB0byBsb25nIHZlcnNpb25cblx0XHRoZXggPSBoZXgucmVwbGFjZSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgLT4gciArIHIgKyBnICsgZyArIGIgKyBiXG5cdFx0I3JlbW92ZSBldmVyeXRoaW5nIGV4cGVjdCB2YWxpZCBudW1iZXJzXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL1teMC05YS1mXS9naSwgJydcblx0XHRwYXJzZWRIZXggPSBwYXJzZUludCBoZXgsIDE2XG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IChwYXJzZWRIZXggPj4gMTYpICYgMjU1XG5cdFx0XHRnOiAocGFyc2VkSGV4ID4+IDgpICYgMjU1XG5cdFx0XHRiOiBwYXJzZWRIZXggJiAyNTVcblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvSHN2OiAoaGV4KSA9PiBAX3JnYlRvSHN2KEBfaGV4VG9SZ2IoaGV4KSlcblxuXHRfcmdiVG9IZXg6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRiYXNlID0gXCIjI3sxIDw8IDI0fSN7cmdiLnIgPDwgMTZ9I3tyZ2IuZyA8PCA4fSN7cmdiLmd9XCJcblx0XHRyZXR1cm4gYmFzZS50b1N0cmluZygxNikuc2xpY2UoMSlcblxuXHRfaHN2VG9IZXg6IChoc3YpID0+IEBfcmdiVG9IZXgoQF9oc3ZUb1JnYihoc3YpKVxuXG5cdF9oc3ZUb0hzbDogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGNvbXB1dGVkTCA9ICgyIC0gaHN2LnMvMTAwKSAqIGhzdi52LzJcblx0XHRzYXREZW5vbSA9IGlmIGNvbXB1dGVkTCA8IDUwIHRoZW4gY29tcHV0ZWRMICogMiBlbHNlIDIwMCAtIGNvbXB1dGVkTCAqIDJcblx0XHRjb21wdXRlZFMgPSBoc3YucyAqIGhzdi52IC8gc2F0RGVub21cblx0XHQjY29ycmVjdHMgYSBkaXZpZGUgYnkgMCBlcnJvclxuXHRcdGlmIGlzTmFOIGNvbXB1dGVkTCB0aGVuIGNvbXB1dGVkUyA9IDBcblxuXHRcdGhzbE9iaiA9XG5cdFx0XHRoOiBoc3YuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHRsOiBjb21wdXRlZExcblxuXHRcdHJldHVybiBoc2xPYmpcblxuXHRfaHNsVG9Ic3Y6IChoc2wpID0+XG5cdFx0aWYgbm90IEBfaXNIc2wgaHNsIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU0wgb2JqZWN0Lidcblx0XHR0ID0gaHNsLnMgKiAoaWYgaHNsLmwgPCA1MCB0aGVuIGhzbC5sIGVsc2UgMTAwIC0gaHNsLmwpLzEwMFxuXHRcdGNvbXB1dGVkUyA9IDIwMCAqIHQgLyAoaHNsLmwgKyB0KVxuXHRcdGNvbXB1dGVkViA9IHQgKyBoc2wubFxuXHRcdCNjb3JyZWN0cyBhIGRpdmlkZSBieSAwIGVycm9yXG5cdFx0aWYgaXNOYU4gY29tcHV0ZWRTIHRoZW4gY29tcHV0ZWRTID0gMFxuXG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IGhzbC5oXG5cdFx0XHRzOiBjb21wdXRlZFNcblx0XHRcdHY6IGNvbXB1dGVkVlxuXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9odG1sQ29sb3JzOlxuXHRcdGFsaWNlYmx1ZTogJ0YwRjhGRidcblx0XHRhbnRpcXVld2hpdGU6ICdGQUVCRDcnXG5cdFx0YXF1YTogJzAwRkZGRidcblx0XHRhcXVhbWFyaW5lOiAnN0ZGRkQ0J1xuXHRcdGF6dXJlOiAnRjBGRkZGJ1xuXHRcdGJlaWdlOiAnRjVGNURDJ1xuXHRcdGJpc3F1ZTogJ0ZGRTRDNCdcblx0XHRibGFjazogJzAwMDAwMCdcblx0XHRibGFuY2hlZGFsbW9uZDogJ0ZGRUJDRCdcblx0XHRibHVlOiAnMDAwMEZGJ1xuXHRcdGJsdWV2aW9sZXQ6ICc4QTJCRTInXG5cdFx0YnJvd246ICdBNTJBMkEnXG5cdFx0YnVybHl3b29kOiAnREVCODg3J1xuXHRcdGNhZGV0Ymx1ZTogJzVGOUVBMCdcblx0XHRjaGFydHJldXNlOiAnN0ZGRjAwJ1xuXHRcdGNob2NvbGF0ZTogJ0QyNjkxRSdcblx0XHRjb3JhbDogJ0ZGN0Y1MCdcblx0XHRjb3JuZmxvd2VyYmx1ZTogJzY0OTVFRCdcblx0XHRjb3Juc2lsazogJ0ZGRjhEQydcblx0XHRjcmltc29uOiAnREMxNDNDJ1xuXHRcdGN5YW46ICcwMEZGRkYnXG5cdFx0ZGFya2JsdWU6ICcwMDAwOEInXG5cdFx0ZGFya2N5YW46ICcwMDhCOEInXG5cdFx0ZGFya2dvbGRlbnJvZDogJ0I4ODYwQidcblx0XHRkYXJrZ3JheTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JleTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JlZW46ICcwMDY0MDAnXG5cdFx0ZGFya2toYWtpOiAnQkRCNzZCJ1xuXHRcdGRhcmttYWdlbnRhOiAnOEIwMDhCJ1xuXHRcdGRhcmtvbGl2ZWdyZWVuOiAnNTU2QjJGJ1xuXHRcdGRhcmtvcmFuZ2U6ICdGRjhDMDAnXG5cdFx0ZGFya29yY2hpZDogJzk5MzJDQydcblx0XHRkYXJrcmVkOiAnOEIwMDAwJ1xuXHRcdGRhcmtzYWxtb246ICdFOTk2N0EnXG5cdFx0ZGFya3NlYWdyZWVuOiAnOEZCQzhGJ1xuXHRcdGRhcmtzbGF0ZWJsdWU6ICc0ODNEOEInXG5cdFx0ZGFya3NsYXRlZ3JheTogJzJGNEY0Ridcblx0XHRkYXJrc2xhdGVncmV5OiAnMkY0RjRGJ1xuXHRcdGRhcmt0dXJxdW9pc2U6ICcwMENFRDEnXG5cdFx0ZGFya3Zpb2xldDogJzk0MDBEMydcblx0XHRkZWVwcGluazogJ0ZGMTQ5Mydcblx0XHRkZWVwc2t5Ymx1ZTogJzAwQkZGRidcblx0XHRkaW1ncmF5OiAnNjk2OTY5J1xuXHRcdGRpbWdyZXk6ICc2OTY5NjknXG5cdFx0ZG9kZ2VyYmx1ZTogJzFFOTBGRidcblx0XHRmaXJlYnJpY2s6ICdCMjIyMjInXG5cdFx0ZmxvcmFsd2hpdGU6ICdGRkZBRjAnXG5cdFx0Zm9yZXN0Z3JlZW46ICcyMjhCMjInXG5cdFx0ZnVjaHNpYTogJ0ZGMDBGRidcblx0XHRnYWluc2Jvcm86ICdEQ0RDREMnXG5cdFx0Z2hvc3R3aGl0ZTogJ0Y4RjhGRidcblx0XHRnb2xkOiAnRkZENzAwJ1xuXHRcdGdvbGRlbnJvZDogJ0RBQTUyMCdcblx0XHRncmF5OiAnODA4MDgwJ1xuXHRcdGdyZXk6ICc4MDgwODAnXG5cdFx0Z3JlZW46ICcwMDgwMDAnXG5cdFx0Z3JlZW55ZWxsb3c6ICdBREZGMkYnXG5cdFx0aG9uZXlkZXc6ICdGMEZGRjAnXG5cdFx0aG90cGluazogJ0ZGNjlCNCdcblx0XHRpbmRpYW5yZWQ6ICdDRDVDNUMnXG5cdFx0aW5kaWdvOiAnNEIwMDgyJ1xuXHRcdGl2b3J5OiAnRkZGRkYwJ1xuXHRcdGtoYWtpOiAnRjBFNjhDJ1xuXHRcdGxhdmVuZGVyOiAnRTZFNkZBJ1xuXHRcdGxhdmVuZGVyYmx1c2g6ICdGRkYwRjUnXG5cdFx0bGF3bmdyZWVuOiAnN0NGQzAwJ1xuXHRcdGxlbW9uY2hpZmZvbjogJ0ZGRkFDRCdcblx0XHRsaWdodGJsdWU6ICdBREQ4RTYnXG5cdFx0bGlnaHRjb3JhbDogJ0YwODA4MCdcblx0XHRsaWdodGN5YW46ICdFMEZGRkYnXG5cdFx0bGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICdGQUZBRDInXG5cdFx0bGlnaHRncmF5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JleTogJ0QzRDNEMydcblx0XHRsaWdodGdyZWVuOiAnOTBFRTkwJ1xuXHRcdGxpZ2h0cGluazogJ0ZGQjZDMSdcblx0XHRsaWdodHNhbG1vbjogJ0ZGQTA3QSdcblx0XHRsaWdodHNlYWdyZWVuOiAnMjBCMkFBJ1xuXHRcdGxpZ2h0c2t5Ymx1ZTogJzg3Q0VGQSdcblx0XHRsaWdodHNsYXRlZ3JheTogJzc3ODg5OSdcblx0XHRsaWdodHNsYXRlZ3JleTogJzc3ODg5OSdcblx0XHRsaWdodHN0ZWVsYmx1ZTogJ0IwQzRERSdcblx0XHRsaWdodHllbGxvdzogJ0ZGRkZFMCdcblx0XHRsaW1lOiAnMDBGRjAwJ1xuXHRcdGxpbWVncmVlbjogJzMyQ0QzMidcblx0XHRsaW5lbjogJ0ZBRjBFNidcblx0XHRtYWdlbnRhOiAnRkYwMEZGJ1xuXHRcdG1hcm9vbjogJzgwMDAwMCdcblx0XHRtZWRpdW1hcXVhbWFyaW5lOiAnNjZDREFBJ1xuXHRcdG1lZGl1bWJsdWU6ICcwMDAwQ0QnXG5cdFx0bWVkaXVtb3JjaGlkOiAnQkE1NUQzJ1xuXHRcdG1lZGl1bXB1cnBsZTogJzkzNzBEOCdcblx0XHRtZWRpdW1zZWFncmVlbjogJzNDQjM3MSdcblx0XHRtZWRpdW1zbGF0ZWJsdWU6ICc3QjY4RUUnXG5cdFx0bWVkaXVtc3ByaW5nZ3JlZW46ICcwMEZBOUEnXG5cdFx0bWVkaXVtdHVycXVvaXNlOiAnNDhEMUNDJ1xuXHRcdG1lZGl1bXZpb2xldHJlZDogJ0M3MTU4NSdcblx0XHRtaWRuaWdodGJsdWU6ICcxOTE5NzAnXG5cdFx0bWludGNyZWFtOiAnRjVGRkZBJ1xuXHRcdG1pc3R5cm9zZTogJ0ZGRTRFMSdcblx0XHRtb2NjYXNpbjogJ0ZGRTRCNSdcblx0XHRuYXZham93aGl0ZTogJ0ZGREVBRCdcblx0XHRuYXZ5OiAnMDAwMDgwJ1xuXHRcdG9sZGxhY2U6ICdGREY1RTYnXG5cdFx0b2xpdmU6ICc4MDgwMDAnXG5cdFx0b2xpdmVkcmFiOiAnNkI4RTIzJ1xuXHRcdG9yYW5nZTogJ0ZGQTUwMCdcblx0XHRvcmFuZ2VyZWQ6ICdGRjQ1MDAnXG5cdFx0b3JjaGlkOiAnREE3MEQ2J1xuXHRcdHBhbGVnb2xkZW5yb2Q6ICdFRUU4QUEnXG5cdFx0cGFsZWdyZWVuOiAnOThGQjk4J1xuXHRcdHBhbGV0dXJxdW9pc2U6ICdBRkVFRUUnXG5cdFx0cGFsZXZpb2xldHJlZDogJ0Q4NzA5Mydcblx0XHRwYXBheWF3aGlwOiAnRkZFRkQ1J1xuXHRcdHBlYWNocHVmZjogJ0ZGREFCOSdcblx0XHRwZXJ1OiAnQ0Q4NTNGJ1xuXHRcdHBpbms6ICdGRkMwQ0InXG5cdFx0cGx1bTogJ0REQTBERCdcblx0XHRwb3dkZXJibHVlOiAnQjBFMEU2J1xuXHRcdHB1cnBsZTogJzgwMDA4MCdcblx0XHRyZWJlY2NhcHVycGxlOiAnNjYzMzk5J1xuXHRcdHJlZDogJ0ZGMDAwMCdcblx0XHRyb3N5YnJvd246ICdCQzhGOEYnXG5cdFx0cm95YWxibHVlOiAnNDE2OUUxJ1xuXHRcdHNhZGRsZWJyb3duOiAnOEI0NTEzJ1xuXHRcdHNhbG1vbjogJ0ZBODA3Midcblx0XHRzYW5keWJyb3duOiAnRjRBNDYwJ1xuXHRcdHNlYWdyZWVuOiAnMkU4QjU3J1xuXHRcdHNlYXNoZWxsOiAnRkZGNUVFJ1xuXHRcdHNpZW5uYTogJ0EwNTIyRCdcblx0XHRzaWx2ZXI6ICdDMEMwQzAnXG5cdFx0c2t5Ymx1ZTogJzg3Q0VFQidcblx0XHRzbGF0ZWJsdWU6ICc2QTVBQ0QnXG5cdFx0c2xhdGVncmF5OiAnNzA4MDkwJ1xuXHRcdHNsYXRlZ3JleTogJzcwODA5MCdcblx0XHRzbm93OiAnRkZGQUZBJ1xuXHRcdHNwcmluZ2dyZWVuOiAnMDBGRjdGJ1xuXHRcdHN0ZWVsYmx1ZTogJzQ2ODJCNCdcblx0XHR0YW46ICdEMkI0OEMnXG5cdFx0dGVhbDogJzAwODA4MCdcblx0XHR0aGlzdGxlOiAnRDhCRkQ4J1xuXHRcdHRvbWF0bzogJ0ZGNjM0Nydcblx0XHR0dXJxdW9pc2U6ICc0MEUwRDAnXG5cdFx0dmlvbGV0OiAnRUU4MkVFJ1xuXHRcdHdoZWF0OiAnRjVERUIzJ1xuXHRcdHdoaXRlOiAnRkZGRkZGJ1xuXHRcdHdoaXRlc21va2U6ICdGNUY1RjUnXG5cdFx0eWVsbG93OiAnRkZGRjAwJ1xuXHRcdHllbGxvd2dyZWVuOiAnOUFDRDMyJ1xuXG5cblxuIiwiI2xvZGFzaCAtIGlzT2JqZWN0XG5pc09iamVjdCA9ICh2YWx1ZSkgLT5cblx0dHlwZSA9IHR5cGVvZiB2YWx1ZVxuXHRyZXR1cm4gISF2YWx1ZSBhbmQgKHR5cGUgaXMgJ29iamVjdCcgb3IgdHlwZSBpcyAnZnVuY3Rpb24nKVxuXG5pc0FycmF5ID0gQXJyYXkuaXNBcnJheVxuXG4jbG9kYXNoIC0gaXNPYmplY3RMaWtlXG5pc09iamVjdExpa2UgPSAodmFsdWUpIC0+ICEhdmFsdWUgJiZ0eXBlb2YgdmFsdWUgaXMgJ29iamVjdCdcblxuI2xvZGFzaCAtIGlzU3RyaW5nIChtb2RpZmllZClcbmlzU3RyaW5nID0gKHZhbHVlKSAtPiB0eXBlb2YgdmFsdWUgaXMgJ3N0cmluZycgb3IgKCFpc0FycmF5KHZhbHVlKSBhbmQgaXNPYmplY3RMaWtlKHZhbHVlKSlcblxub2JqVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmlzTnVtYmVyID0gKHZhbHVlKSAtPiB0eXBlb2YgdmFsdWUgaXMgJ251bWJlcicgb3IgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgYW5kIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpIGlzICdbb2JqZWN0IE51bWJlcl0nKVxuXG5pc05hTiA9ICh2YWx1ZSkgLT4gaXNOdW1iZXIodmFsdWUpIGFuZCB2YWx1ZSBpc250ICt2YWx1ZVxuXG4jY2xhbXAgdmFsdWVzIGJldHdlZW4gdHdvIHBvaW50cyBkZWZhdWx0ICh2YWx1ZSwgMCwgMSlcbmNsYW1wID0gKHZhbHVlLCBtaW4gPSAwLCBtYXggPSAxKSAtPiBNYXRoLm1heChtaW4sIE1hdGgubWluKHZhbHVlLCBtYXgpKVxuXG5yYW5kb21JbnQgPSAobWluLCBtYXgpIC0+IE1hdGguZmxvb3IgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pblxuXG5yYW5kb21GbG9hdCA9IChtaW4sIG1heCkgLT4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluIiwicGxlYXNlLkNvbG9yID0gKGNvbG9yKSAtPiBuZXcgQ29sb3IgY29sb3IiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
