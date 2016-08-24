import { expect } from 'chai';
import Color from '../../src/Color.js';


describe('_isHslString', () => {
	let color = new Color();
	it('Accepts valid HSL String', () => {
		let test = color._isHslString('hsl(200,40%,50%)');
		expect(test).to.equal(true);
	});
	it('Rejects non strings', () => {
		let test = color._isHslString(1337);
		expect(test).to.equal(false);
	});
	it('Rejects invalid HSL Strings', () => {
		let test = color._isHslString('hsl(2626426,2642626,blarf)');
		expect(test).to.equal(false);
	});
});