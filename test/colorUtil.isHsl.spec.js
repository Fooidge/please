import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isHsl', () => {
	let color = new Color();
	it('Accepts valid HSL', () => {
		let test = color._isHsl({
			h: 100,
			s: 50,
			l: 50
		});
		expect(test).to.equal(true);
	});
});