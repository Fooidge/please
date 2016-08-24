import { expect } from 'chai';
import Color from '../../src/Color.js';


describe('_isHtml', () => {
	let color = new Color();
	it('Accepts valid HTML', () => {
		let test = color._isHtml('rebeccapurple'); // ;(
		expect(test).to.equal(true);
	});
	it('Rejects invalid HTML', () => {
		let test = color._isHtml('rebeccablack'); //gotta get down
		expect(test).to.equal(false);
	});
	it('Rejects non-strings', () => {
		let test = color._isHtml(1337);
		expect(test).to.equal(false);
	});
});