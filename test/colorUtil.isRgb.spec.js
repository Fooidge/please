import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isRgb', () => {
	let color = new Color();
	it('Accepts valid RGB', () => {
		let test = color._isRgb({
			r: 120,
			g: 140,
			b: 160
		});
		expect(test).to.equal(true);
	});
});