'use strict';

// Imports

const Lab = require('lab');
const Code = require('code');
const Sinon = require('sinon');
const Sut = require('../');

// Test shortcuts

const lab = module.exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;
const expect = Code.expect;


describe('better-map', () => {

    let test;

    beforeEach((done) => {

        test = new Sut([
            ['one', 1],
            ['two', 2]
        ]);

        return done();
    });

    describe('constructor', () => {

        it('should create a map without entries when called without an iterator', (done) => {

            // Act
            const myMap = new Sut();

            // Assert
            expect(myMap.size).to.equal(0);

            return done();
        });

        it('should create a map with entries when called with a valid iterator', (done) => {

            // Act
            const myOtherMap = new Sut([
                ['one', 1],
                ['two', 2]
            ]);

            // Assert
            expect(myOtherMap.size).to.equal(2);

            return done();
        });
    });

    describe('entriesArray', () => {

        it('should return an array of key and value as an array in the order they were added into the map', (done) => {

            // Act
            const actual = test.entriesArray();

            // Assert
            expect(actual).to.equal([['one', 1], ['two', 2]]);

            return done();
        });
    });

    describe('keysArray', () => {

        it('should return the keys as an array in the order they were added into the map', (done) => {

            // Act
            const actual = test.keysArray();

            // Assert
            expect(actual).to.equal(['one', 'two']);

            return done();
        });
    });

    describe('valuesArray', () => {

        it('should return the values as an array in the order they were added into the map', (done) => {

            // Act
            const actual = test.valuesArray();

            // Assert
            expect(actual).to.equal([1, 2]);

            return done();
        });
    });

    describe('map', () => {

        it('should call the callback with the expected parameters', (done) => {

            // Arrange
            const mapper = Sinon.stub().returns(0);

            // Act
            const actual = test.map(mapper);

            // Assert
            expect(actual).to.equal([0, 0]);
            Sinon.assert.calledTwice(mapper);
            Sinon.assert.calledWithExactly(mapper, 1, 'one', test);
            Sinon.assert.calledWithExactly(mapper, 2, 'two', test);

            return done();
        });

        it('should call the callback with the expected parameters including thisArg', (done) => {

            // Arrange
            const mapper = Sinon.stub().returns(0);
            const thisArg = { a: 'a' };

            // Act
            const actual = test.map(mapper, thisArg);

            // Assert
            expect(actual).to.equal([0, 0]);
            Sinon.assert.calledTwice(mapper);
            Sinon.assert.calledWithExactly(mapper, 1, 'one', test);
            Sinon.assert.calledWithExactly(mapper, 2, 'two', test);
            expect(mapper.thisValues[0]).to.shallow.equal(thisArg);
            expect(mapper.thisValues[1]).to.shallow.equal(thisArg);

            return done();
        });

        it('should return an array of values generated by the callback function', (done) => {

            // Act
            const actual = test.map((value, key) => `${key} = ${value}`);

            // Assert
            expect(actual).to.equal(['one = 1', 'two = 2']);

            return done();
        });
    });

    describe('reduce', () => {

        it('should call the callback with the expected parameters when called without initial', (done) => {

            // Arrange
            const reducer = Sinon.stub().returns(0);

            // Act
            const actual = test.reduce(reducer);

            // Assert
            expect(actual).to.equal(0);
            Sinon.assert.calledTwice(reducer);
            Sinon.assert.calledWithExactly(reducer, undefined, 1, 'one', test);
            Sinon.assert.calledWithExactly(reducer, 0, 2, 'two', test);

            return done();
        });

        it('should call the callback with the expected parameters when called with initial', (done) => {

            // Arrange
            const reducer = Sinon.stub().returns(0);

            // Act
            const actual = test.reduce(reducer, 1337);

            // Assert
            expect(actual).to.equal(0);
            Sinon.assert.calledTwice(reducer);
            Sinon.assert.calledWithExactly(reducer, 1337, 1, 'one', test);
            Sinon.assert.calledWithExactly(reducer, 0, 2, 'two', test);

            return done();
        });

        it('should return an array of values generated by the callback function', (done) => {

            // Act
            const actual = test.reduce((pv, cv) => pv + cv, 0);

            // Assert
            expect(actual).to.equal(3);

            return done();
        });
    });

    describe('some', () => {

        it('should be a function', (done) => {

            // Assert
            expect(test.some).to.exist().and.be.a.function();

            return done();
        });

        it('should return true if at least one callback returns true', (done) => {

            // Arrange
            const callback = Sinon.stub().returns(true);

            // Act
            const actual = test.some(callback);

            // Assert
            expect(actual).to.be.true();
            Sinon.assert.calledOnce(callback);

            return done();
        });

        it('callback should be called with thisArg as the context, this', (done) => {

            // Arrange
            const callback = Sinon.stub().returns(true);
            const thisArg = { a: 'a' };

            // Act
            test.some(callback, thisArg);

            // Assert
            Sinon.assert.calledOnce(callback);
            expect(callback.thisValues[0]).to.shallow.equal(thisArg);

            return done();
        });

        it('should return false no callbacks return true', (done) => {

            // Arrange
            const callback = Sinon.stub().returns(false);

            // Act
            const actual = test.some(callback);

            // Assert
            expect(actual).to.be.false();
            Sinon.assert.calledTwice(callback);

            return done();
        });
    });

    describe('filter', () => {

        it('should be a function', (done) => {

            // Assert
            expect(test.filter).to.exist().and.be.a.function();

            return done();
        });

        it('should return a new BetterMap with the entries filtered where the callback returns true', (done) => {

            // Arrange
            const keepKey = 'one';
            const callback = Sinon.spy((value, key) => key === keepKey);

            // Act
            const actual = test.filter(callback);

            // Assert
            expect(actual).to.be.an.instanceOf(Sut);
            expect(actual).to.not.shallow.equal(test);
            expect(actual.size).to.equal(1);
            expect(actual.has(keepKey)).to.be.true();
            expect(callback.calledTwice).to.be.true();

            return done();
        });

        it('callback should be called with thisArg as the context, this', (done) => {

            // Arrange
            const callback = Sinon.stub().returns(true);
            const thisArg = { a: 'a' };

            // Act
            test.filter(callback, thisArg);

            // Assert
            Sinon.assert.calledTwice(callback);
            expect(callback.thisValues[0]).to.shallow.equal(thisArg);
            expect(callback.thisValues[1]).to.shallow.equal(thisArg);

            return done();
        });

        it('callback should be called with a default context, this, of undefined if thisArg is not defined', (done) => {

            // Arrange
            const callback = Sinon.stub().returns(true);

            // Act
            test.filter(callback);

            // Assert
            Sinon.assert.calledTwice(callback);
            expect(callback.thisValues[0]).to.be.undefined();
            expect(callback.thisValues[1]).to.be.undefined();

            return done();
        });
    });

    describe('toObject', () => {

        it('should be a function', (done) => {

            // Assert
            expect(test.toObject).to.be.a.function();

            return done();
        });

        it('should throw if any keys are not strings', (done) => {

            // Arrange
            const testMap = new Sut().set('a', 1).set(1, 'a');

            // Act
            const act = () => testMap.toObject();

            // Assert
            expect(act).to.throw(Error);

            return done();
        });

        it('should return a valid object with simple parameters', (done) => {

            // Arrange
            const testMap = new Sut()
                .set('one', 1.23)
                .set('two', 'a')
                .set('three', null)
                .set('four', undefined)
                .set('five', ['a', 1, null])
                .set('six', 0)
                .set('seven', 34)
                .set('eight', {
                    'a': 1,
                    'b': 'b'
                });

            // Act
            const actual = testMap.toObject();

            // Assert
            expect(actual).to.equal({
                one: 1.23,
                two: 'a',
                three: null,
                four: undefined,
                five: ['a', 1, null],
                six: 0,
                seven: 34,
                eight: {
                    'a': 1,
                    'b': 'b'
                }
            });

            return done();
        });

        it('should return a valid object with a Map as a value', (done) => {

            // Arrange
            const testMap = new Sut()
                .set('one', 'a')
                .set('two', new Map().set('a', 1));

            // Act
            const actual = testMap.toObject();

            // Assert
            expect(actual.one).to.shallow.equal(testMap.get('one'));
            expect(actual.two).to.shallow.equal(testMap.get('two'));

            return done();
        });
    });

    describe('stringify', () => {

        it('should stringify a simple object', (done) => {

            // Arrange
            const expected = JSON.stringify({
                one: 1,
                two: 2
            });

            // Act
            const actual = test.stringify();

            // Assert
            expect(actual).to.equal(expected);

            return done();
        });

        it('should stringify an object', (done) => {

            // Arrange
            const expected = JSON.stringify({
                one: 1.23,
                two: {
                    'a': 1,
                    'b': null,
                    'c': 'my string'
                }
            });
            const testMap = new Sut()
                .set('one', 1.23)
                .set('two', {
                    a: 1,
                    b: null,
                    c: 'my string'
                });

            // Act
            const actual = testMap.stringify();

            // Assert
            expect(actual).to.equal(expected);

            return done();
        });

        it('should stringify an child map', (done) => {

            // Arrange
            const expected = JSON.stringify({
                one: 1.23,
                two: {
                    'a': 1,
                    'b': null,
                    'c': 'my string'
                },
                four: {
                    x: {
                        b: 'a'
                    }
                }
            });
            const testMap = new Sut()
                .set('one', 1.23)
                .set('two', new Map()
                    .set('a', 1)
                    .set('b', null)
                    .set('c', 'my string')
                )
                .set('three', () => 'a')
                .set('four', {
                    'x': new Map().set('b', 'a')
                });

            // Act
            const actual = testMap.stringify();

            // Assert
            expect(actual).to.equal(expected);

            return done();
        });

        it('should stringify a simple object with a set', (done) => {

            const testMap = new Sut()
                .set('one', 1)
                .set('two', 'a')
                .set('three', null)
                .set('four', new Map([['a', 1]]))
                .set('five', new Set([1, 2, 3]));
            const expected = JSON.stringify({
                one: 1,
                two: 'a',
                three: null,
                four: {
                    a: 1
                },
                five: [1, 2, 3]
            });

            // Act
            const actual = testMap.stringify();

            // Assert
            expect(actual).to.equal(expected);

            return done();
        });
    });
});
