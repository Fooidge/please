import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isHex', () => {
	let color = new Color();
	it('Accepts valid Hex Strings', () => {
		let test = color._isHex('#F00'); //short form
		expect(test).to.equal(true);
		test = color._isHex('#FF0000'); //long form
		expect(test).to.equal(true);
		test = color._isHex('F00'); //without octothorpe
		expect(test).to.equal(true);
		test = color._isHex('#fFfFfF'); //with varying case
		expect(test).to.equal(true);
	});
	it('Rejects invalid Hex Strings', () => {
		let test = color._isHex('#F00F'); //not short or long form
		expect(test).to.equal(false);
		test = color._isHex('#123456789'); //too long
		expect(test).to.equal(false);
		test = color._isHex('#GHIJKLMN'); //invalid characters
		expect(test).to.equal(false);
	});
});