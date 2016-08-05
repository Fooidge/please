import {
	random,
	isNumber,
	defaults
} from 'lodash';
import Color from './Color';


let please = {};
export default please;

please.Color = color => new Color(color);

const PHI = 0.618033988749895;

let makeColorDefaults = {
	hue: null,
	saturation: null,
	value: null,
	base_color: '',
	baseColor: '',
	greyscale: false,
	grayscale: false, //whatever I support them both, murrica
	golden: true,
	full_random: false,
	fullRandom: false,
	colors_returned: 1,
	colorsReturned: 1,
	format: null
};

please.generateFromBaseColor = function(baseColor) {
	let color = new Color();
	let base = new Color(baseColor);
	color.hue(clamp(random(base.hue() - 5, base.hue() + 5), 0, 360));
	if (base.saturation() === 0) { color.saturation(0);
	} else { color.saturation(random(0.4, 0.85, true)); }
	color.value(random(0.4, 0.85, true));
	return color;
};

please.generate = please.generateGolden = function() {
	let color = new Color();
	let hue = random(0, 359);
	color.hue(((hue + (hue/PHI)) % 360));
	color.saturation(random(0.4, 0.85, true));
	color.value(random(0.4, 0.85, true));
	return color;
};

please.generateRandom = function() {
	let color = new Color();
	color.hue(random(0, 359));
	color.saturation(random(0, 1.0, true));
	color.value(random(0, 1.0, true));
	return color;
};

let deprecationLayer = function(options) {
	if (options.base_color !== makeColorDefaults.baseColor) {
		console.warn('The option base_color is deprecated and will be removed soon. Use baseColor instead.');
		options.baseColor = options.base_color;
	}

	if (options.full_random !== makeColorDefaults.fullRandom) {
		console.warn('The option full_random is deprecated and will be removed soon. Use fullRandom instead.');
		options.fullRandom = options.full_random;
	}

	if (options.colors_returned !== makeColorDefaults.colorsReturned) {
		console.warn('The option colors_returned is deprecated and will be removed soon. Use colorsReturned instead.');
		options.colorsReturned = options.colors_returned;
	}

	return options;
};

//remove make_color after 3 months in the wild
please.make_color = function(options = {}) {
	console.warn('The function make_color() is deprecated and will be removed soon. Use makeColor() instead.');
	please.makeColor(options);
};

please.makeColor = function(options = {}) {
	//remove deprecationLayer after 3 months in the wild
	let opts = deprecationLayer(defaults(makeColorDefaults, options));
	let colors = [];
	for (let i = 0; i < opts.colorsReturned; i++) {
		colors[i] = please.generate();
		//remove overwrites after 3 months in the wild
		//overwrite values if option exists to
		if ((opts.hue != null) && isNumber(opts.hue)) { colors[i].hue(opts.hue); }
		if ((opts.saturation != null) && isNumber(opts.saturation)) { colors[i].saturation(opts.saturation); }
		if ((opts.value != null) && isNumber(opts.value)) { colors[i].value(opts.value); }
		switch (opts.format.toLowerCase()) {
			case 'hex': colors[i] = colors[i].hex(); break;
			case 'rgb': colors[i] = colors[i].rgbString(); break;
			case 'hsl': colors[i] = colors[i].hslString(); break;
			default:
				console.warn('Unknown format. Defaulting to hex.');
				colors[i] = colors[i].hex();
		}
	}
	return colors;
};

//remove make_scheme after 3 months in the wild
please.make_scheme = function(options = {}) {
	console.warn('The function make_scheme() is deprecated and will be removed soon. use makeScheme() instead.');
	please.makeScheme(options);
};

please.makeScheme = function(options = {}) {
	let scheme = [];
	return scheme;
};