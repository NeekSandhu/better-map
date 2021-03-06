# better-map

[![Build Status](https://travis-ci.org/blacksun1/better-map.svg?branch=master)](https://travis-ci.org/blacksun1/better-map)
[![Coverage Status](https://coveralls.io/repos/github/blacksun1/better-map/badge.svg?branch=master)](https://coveralls.io/github/blacksun1/better-map?branch=master)

Map object extended with extra functional goodness.

## Usage

Grab the package and add to your project

```bash
npm install --save better-map
```

Then add it to your code

```js
const BetterMap = require('better-map');
```

## API

### Constructor

Takes an optional parameter of an iteratable object otherwise it returns an
empty map.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const myMap = new BetterMap();
expect(myMap.size).to.equal(0);
const myOtherMap = new BetterMap([
	['one', 1],
	['two', 2]
]);
expect(myOtherMap.size).to.equal(2);
```

### entriesArray

Returns all of the entries as an array in the format of an array of arrays with
key then value. Entries are returned in the order that they were added.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.entriesArray();
expect(actual).to.equal([
	['one', 1],
	['two', 2]
]);
```

### keysArray

Returns all of the keys as an array. Keys are returned in the order that the
entries were added.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.keysArray();
expect(actual).to.equal(['one', 'two']);
```

### filter

Takes a `callback` function and a `thisArg` parameter. It calls the `callback`
function for every entry in the map with the parameter `thisArg` as the
functions context (this) and returns all of the entries where the callback
returned true as a new better-map.

The callback function takes `value`, `key`, `map`.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.filter((value, key) => value === 2);
expect(actual).to.be.an.instanceOf(BetterMap);
expect(actual.size).to.equal(1);
expect(actual.has('one')).to.be.false();
expect(actual.has('two')).to.be.true();
```

### map

Takes a `callback` function and a `thisArg` parameter. It calls the `callback`
function for every entry in the map with the parameter `thisArg` as the
functions context (this) and returns an array of the results of each call.

The callback function takes `value`, `key`, `map`. The value of the array entry
will be the value returned from the callback.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.map((value, key) => `${key} = ${value}`);
expect(actual).to.equal(['one = 1', 'two = 2']);
```

### reduce

Takes a `callback` function and an `initialValue` parameter. It calls the `callback`
function for every entry in the map and returns a single reduced value.

The callback function takes `previousValue`, `value`, `key`, `map`. The
value of the array entry will be the value returned from the callback.
`previousValue` will be `undefined` if an `initialValue` is not given.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.reduce((pv, cv) => pv + cv, 0);
expect(actual).to.equal(3);
```

### some

Takes a `callback` function and a `thisArg` parameter. It calls the `callback`
function for every entry in the map with the parameter `thisArg` as the
functions context (this). Returns a `boolean`.

The callback function takes `value`, `key`, `map` and must return a boolean
value. A value of `true` signifies that a match has been made and will cause the
loop to end straight away.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
expect(test.some((value) => value === 1)).to.equal(true);
expect(test.some((value, key) => key === 'three')).to.equal(false);
```

### stringify

JSON encode the instance. Will also encode child Map and Set objects.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const testMap = new BetterMap()
    .set('one', 1)
    .set('two', 'a')
    .set('three', null)
    .set('a', [1, 2, 3]);
const expected = JSON.stringify({
    one: 1,
    two: 'a',
    three: null,
    a: [1, 2, 3]
});

// Act
const actual = testMap.stringify();

// Assert
expect(actual).to.equal(expected);
```

### toObject

Shallowly maps the current object to a object. Asserts that all of the keys for
the map are strings.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap()
    .set('one', 1)
    .set('two', 'a')
    .set('three', null);
expect(test.toObject()).to.equal({
    one: 1,
    two: 'a',
    three: null
});
```

### valuesArray

Returns all of the values as an array. Values are returned in the order that
the entries were added.

```js
const BetterMap = require('better-map');
const expect = require('code').expect;
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.valuesArray();
expect(actual).to.equal([1, 2]);
```
