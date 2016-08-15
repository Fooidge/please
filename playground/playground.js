var test = document.getElementById('test');
var rgb = document.getElementById('rgb');
var hex = document.getElementById('hex');
var hsv = document.getElementById('hsv');
var hsl = document.getElementById('hsl');
var cmyk = document.getElementById('cmyk');

var color = please.Color();
var inputs = [rgb, hex, hsv, hsl, cmyk];

var setTestColor = function(color) {
	test.style.backgroundColor = color.rgbString();
	return;
}

var setRgbValue = function(color) {
	rgb.value = color.red() + ", " + color.green() + ", " + color.blue();
	return;
}

var setHexValue = function(color) {
	hex.value = color.hex();
	return;
}

var setHsvValue = function(color) {
	hsv.value = color.hue() + ", " + color.sat() + ", " + color.val();
	return;
}

var setHslValue = function(color) {
	var hslVals = color.hsl();
	hsl.value = hslVals.h + ", " + hslVals.s + ", " + hslVals.l;
	return;
}

var setCmykValue = function(color) {
	var cmykVals = color.cmyk();
	cmyk.value =
		cmykVals.c + ", " +
		cmykVals.m + ", " +
		cmykVals.y + ", " +
		cmykVals.k;
	return;
}

var stringToValues = function(string) {
	var values = string.replace(/ /g,'').split(',');
	var parsedValues = [];
	for (var i = values.length - 1; i >= 0; i--) {
		parsedValues[i] = parseFloat(values[i]);
	}
	return parsedValues;
}

var getRgbValue = function() {
	var values = stringToValues(rgb.value);
	var rgbVal = {
		r: values[0],
		g: values[1],
		b: values[2]
	};
	return rgbVal;
}

var getHexValue = function() {
	return hex.value;
}

var getHsvValue = function() {
	var values = stringToValues(hsv.value);
	var hsvVal = {
		h: values[0],
		s: values[1],
		v: values[2]
	};
	return hsvVal;
}

var getHslValue = function() {
	var values = stringToValues(hsl.value);
	var hslVal = {
		h: values[0],
		s: values[1],
		l: values[2]
	};
	return hslVal;
}

var getCmykValue = function() {
	var values = stringToValues(cmyk.value);
	var cmykVal = {
		c: values[0],
		m: values[1],
		y: values[2],
		k: values[3]
	};
	return cmykVal;
}

var setters = [setTestColor, setRgbValue, setHexValue, setHsvValue, setHslValue, setCmykValue];

var getShit = function(input) {
	var colorValue;
	switch(input.id) {
		case 'rgb':
			colorValue = getRgbValue();
			break;
		case 'hex':
			colorValue = getHexValue();
			break;
		case 'hsv':
			colorValue = getHsvValue();
			break
		case 'hsl':
			colorValue = getHslValue();
			break;
		case 'cmyk':
			colorValue = getCmykValue();
			break;

	}
	return please.Color(colorValue);
}

var setShit = function(color) {
	for (var i = setters.length - 1; i >= 0; i--) {
		setters[i](color);
	}
}

for (var i = inputs.length - 1; i >= 0; i--) {
	inputs[i].addEventListener('blur', function(){
		setShit(getShit(this));
	});
	inputs[i].addEventListener('keydown', function(e){
		if(e.keyCode === 13) {
			setShit(getShit(this));
		}
	});
}