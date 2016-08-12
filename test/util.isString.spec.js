import { expect } from 'chai';
import { isString } from '../src/util/util';

describe('isString', () => {
	it('Accepts Strings', () => {
		let test = isString('a string');
		expect(test).to.equal(true);
	});
	it('Does not accept numbers', () => {
		let test = isString(42);
		expect(test).to.equal(false);
	});
	it('Does not accept Arrays', () => {
		let test = isString([]);
		expect(test).to.equal(false);
	});
	it('Does not accept Objects', () => {
		let test = isString({});
		expect(test).to.equal(false);
	});
	it('Does not accept NaN', () => {
		let test = isString(NaN);
		expect(test).to.equal(false);
	});
	it('Does not accept Infinity', () => {
		let test = isString(Infinity);
		expect(test).to.equal(false);
	});
	it('Does not accept undefined', () => {
		let test = isString(undefined);
		expect(test).to.equal(false);
	});
	it('Does not accept boolean values', () => {
		let test = isString(true);
		expect(test).to.equal(false);
	});
});