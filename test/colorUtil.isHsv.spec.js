import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isHsv', () => {
	let color = new Color();
	it('Accepts valid HSV', () => {
		let test = color._isHsv({
			h: 100,
			s: 0.5,
			v: 0.5
		});
		expect(test).to.equal(true);
	});
});