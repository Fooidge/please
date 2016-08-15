import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isRgbString', () => {
	let color = new Color();
	it('Accepts valid rgb String', () => {
		let test = color._isRgbString('rgb(200,220,240)');
		expect(test).to.equal(true);
	});
	it('Rejects non strings', () => {
		let test = color._isRgbString(1337);
		expect(test).to.equal(false);
	});
	it('Rejects invalid RGB Strings', () => {
		let test = color._isRgbString('rgb(2626426,2642626,blarf)');
		expect(test).to.equal(false);
	});
});