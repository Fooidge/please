import { expect } from 'chai';
import { isObject } from '../src/util/util';

describe('isObject', () => {
	it('Accept Objects', () => {
		let test = isObject({});
		expect(test).to.equal(true);
	});
	it('Does not accept Strings', () => {
		let test = isObject('a string');
		expect(test).to.equal(false);
	});
	it('Does not accept numbers', () => {
		let test = isObject(42);
		expect(test).to.equal(false);
	});
	it('Does not accept Arrays', () => {
		let test = isObject([]);
		expect(test).to.equal(false);
	});
	it('Does not accept NaN', () => {
		let test = isObject(NaN);
		expect(test).to.equal(false);
	});
	it('Does not accept Infinity', () => {
		let test = isObject(Infinity);
		expect(test).to.equal(false);
	});
	it('Does not accept undefined', () => {
		let test = isObject(undefined);
		expect(test).to.equal(false);
	});
	it('Does not accept boolean values', () => {
		let test = isObject(true);
		expect(test).to.equal(false);
	});
});