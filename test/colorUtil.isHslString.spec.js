import { expect } from 'chai';
import Color from '../src/Color.js';


describe('_isHslString', () => {
	let color = new Color();
	it('Accepts valid HSL String', () => {
		let test = color._isHslString('hsl(200,40%,50%)');
		expect(test).to.equal(true);
	});
});