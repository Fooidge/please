import { expect } from 'chai';
import { defaults } from '../src/util/util';

describe('defaults', () => {
	it('Adds missing keys', () => {
		let objOne = {
			foo: 1
		};
		let objTwo = {
			bar: 2
		};
		let test = defaults(objOne, objTwo);
		expect(test).to.have.all.keys(['foo', 'bar']);
	});
	it('Overwrites values for shared keys', () => {
		let objOne = {
			foo: 1,
			bar: 2
		};
		let objTwo = {
			foo: 3
		};
		let test = defaults(objOne, objTwo);
		expect(test)
			.to.have.property('foo')
			.that.is.a('number')
			.that.equals(3);
	});
	it('Does nothing for empty objects', () => {
		let test = defaults({}, {});
		expect(test).to.be.empty;
	});
});