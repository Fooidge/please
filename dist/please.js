(function(){
var please = {
	version: '2.0.0'
};/**
 * @license
 * lodash 4.5.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash strict include="isObject,isString,isNumber,random,clamp,defaults"`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;(function() {
  'use strict';

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.5.1';

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      numberTag = '[object Number]',
      stringTag = '[object String]';

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `exports`. */
  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
    ? exports
    : undefined;

  /** Detect free variable `module`. */
  var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
    ? module
    : undefined;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = (freeModule && freeModule.exports === freeExports)
    ? freeExports
    : undefined;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

  /** Detect free variable `self`. */
  var freeSelf = checkGlobal(objectTypes[typeof self] && self);

  /** Detect free variable `window`. */
  var freeWindow = checkGlobal(objectTypes[typeof window] && window);

  /** Detect `this` as the global object. */
  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal ||
    ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
      freeSelf || thisGlobal || Function('return this')();

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {...*} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    var length = args.length;
    switch (length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * Checks if `value` is a global object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
   */
  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return value > -1 && value % 1 == 0 && value < length;
  }

  /**
   * Converts `iterator` to an array.
   *
   * @private
   * @param {Object} iterator The iterator to convert.
   * @returns {Array} Returns the converted array.
   */
  function iteratorToArray(iterator) {
    var data,
        result = [];

    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Built-in value references. */
  var Reflect = root.Reflect,
      Symbol = root.Symbol,
      enumerate = Reflect ? Reflect.enumerate : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeFloor = Math.floor,
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeRandom = Math.random;

  /** Used to lookup unminified function names. */
  var realNames = {};

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chaining. Methods that operate on and return arrays, collections, and
   * functions can be chained together. Methods that retrieve a single value or
   * may return a primitive value will automatically end the chain sequence and
   * return the unwrapped value. Otherwise, the value must be unwrapped with
   * `_#value`.
   *
   * Explicit chaining, which must be unwrapped with `_#value` in all cases,
   * may be enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
   * fusion is an optimization to merge iteratee calls; this avoids the creation
   * of intermediate arrays and can greatly reduce the number of iteratee executions.
   * Sections of a chain sequence qualify for shortcut fusion if the section is
   * applied to an array of at least two hundred elements and any iteratees
   * accept only one argument. The heuristic for whether a section qualifies
   * for shortcut fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`,
   * `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropRightWhile`,
   * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flattenDepth`,
   * `flip`, `flow`, `flowRight`, `fromPairs`, `functions`, `functionsIn`,
   * `groupBy`, `initial`, `intersection`, `intersectionBy`, `intersectionWith`,
   * `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`, `keys`, `keysIn`,
   * `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`, `memoize`,
   * `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`, `nthArg`,
   * `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`, `overEvery`,
   * `overSome`, `partial`, `partialRight`, `partition`, `pick`, `pickBy`, `plant`,
   * `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`, `pullAt`, `push`,
   * `range`, `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`,
   * `sampleSize`, `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`,
   * `splice`, `spread`, `tail`, `take`, `takeRight`, `takeRightWhile`,
   * `takeWhile`, `tap`, `throttle`, `thru`, `toArray`, `toPairs`, `toPairsIn`,
   * `toPath`, `toPlainObject`, `transform`, `unary`, `union`, `unionBy`,
   * `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`, `unshift`, `unzip`,
   * `unzipWith`, `values`, `valuesIn`, `without`, `wrap`, `xor`, `xorBy`,
   * `xorWith`, `zip`, `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `endsWith`, `eq`,
   * `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `floor`, `forEach`, `forEachRight`, `forIn`,
   * `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`, `hasIn`,
   * `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`, `isArguments`,
   * `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`,
   * `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`,
   * `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMap`,
   * `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`,
   * `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`, `isSafeInteger`,
   * `isSet`, `isString`, `isUndefined`, `isTypedArray`, `isWeakMap`, `isWeakSet`,
   * `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`, `lowerFirst`,
   * `lt`, `lte`, `max`, `maxBy`, `mean`, `min`, `minBy`, `noConflict`, `noop`,
   * `now`, `pad`, `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`,
   * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `sample`,
   * `shift`, `size`, `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`,
   * `sortedLastIndex`, `sortedLastIndexBy`, `startCase`, `startsWith`, `subtract`,
   * `sum`, `sumBy`, `template`, `times`, `toLower`, `toInteger`, `toLength`,
   * `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`, `trimEnd`,
   * `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`, `upperFirst`,
   * `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash() {
    // No operation performed.
  }

  /*------------------------------------------------------------------------*/

  /**
   * Used by `_.defaults` to customize its `_.assignIn` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to assign.
   * @param {Object} object The parent object of `objValue`.
   * @returns {*} Returns the value to assign.
   */
  function assignInDefaults(objValue, srcValue, key, object) {
    if (objValue === undefined ||
        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
      return srcValue;
    }
    return objValue;
  }

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      object[key] = value;
    }
  }

  /**
   * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
   *
   * @private
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   */
  function baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }

  /**
   * The base implementation of `_.keysIn` which doesn't skip the constructor
   * property of prototypes or treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    object = object == null ? object : Object(object);

    var result = [];
    for (var key in object) {
      result.push(key);
    }
    return result;
  }

  // Fallback for IE < 9 with es6-shim.
  if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
    baseKeysIn = function(object) {
      return iteratorToArray(enumerate(object));
    };
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.random` without support for returning
   * floating-point numbers.
   *
   * @private
   * @param {number} lower The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the random number.
   */
  function baseRandom(lower, upper) {
    return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
  }

  /**
   * This function is like `copyObject` except that it accepts a function to
   * customize copied values.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property names to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObjectWith(source, props, object, customizer) {
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : source[key];

      assignValue(object, key, newValue);
    }
    return object;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return rest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = typeof customizer == 'function'
        ? (length--, customizer)
        : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * Gets the "length" property value of `object`.
   *
   * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
   * that affects Safari on at least iOS 8.1-8.3 ARM64.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {*} Returns the "length" value.
   */
  var getLength = baseProperty('length');

  /**
   * Creates an array of index keys for `object` values of arrays,
   * `arguments` objects, and strings, otherwise `null` is returned.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array|null} Returns index keys, else `null`.
   */
  function indexKeys(object) {
    var length = object ? object.length : undefined;
    if (isLength(length) &&
        (isArray(object) || isString(object) || isArguments(object))) {
      return baseTimes(length, String);
    }
    return null;
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (isFunction(Ctor) && Ctor.prototype) || objectProto;

    return value === proto;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as an array.
   *
   * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.rest(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */
  function rest(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      switch (start) {
        case 0: return func.call(this, array);
        case 1: return func.call(this, args[0], array);
        case 2: return func.call(this, args[0], args[1], array);
      }
      var otherArgs = Array(start + 1);
      index = -1;
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }

  /*------------------------------------------------------------------------*/

  /**
   * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'user': 'fred' };
   * var other = { 'user': 'fred' };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
      (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @type {Function}
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null &&
      !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8 which returns 'object' for typed array constructors, and
    // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
   * as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */
  function isNumber(value) {
    return typeof value == 'number' ||
      (isObjectLike(value) && objectToString.call(value) == numberTag);
  }

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3');
   * // => 3
   */
  function toInteger(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    var remainder = value % 1;
    return value === value ? (remainder ? value - remainder : value) : 0;
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3);
   * // => 3
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3');
   * // => 3
   */
  function toNumber(value) {
    if (isObject(value)) {
      var other = isFunction(value.valueOf) ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  /*------------------------------------------------------------------------*/

  /**
   * This method is like `_.assignIn` except that it accepts `customizer` which
   * is invoked to produce the assigned values. If `customizer` returns `undefined`
   * assignment is handled by the method instead. The `customizer` is invoked
   * with five arguments: (objValue, srcValue, key, object, source).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @alias extendWith
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   return _.isUndefined(objValue) ? srcValue : objValue;
   * }
   *
   * var defaults = _.partialRight(_.assignInWith, customizer);
   *
   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
    copyObjectWith(source, keysIn(source), object, customizer);
  });

  /**
   * Assigns own and inherited enumerable properties of source objects to the
   * destination object for all destination properties that resolve to `undefined`.
   * Source objects are applied from left to right. Once a property is set,
   * additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  var defaults = rest(function(args) {
    args.push(undefined, assignInDefaults);
    return apply(assignInWith, undefined, args);
  });

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    var index = -1,
        isProto = isPrototype(object),
        props = baseKeysIn(object),
        propsLength = props.length,
        indexes = indexKeys(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;

    while (++index < propsLength) {
      var key = props[index];
      if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
          !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Clamps `number` within the inclusive `lower` and `upper` bounds.
   *
   * @static
   * @memberOf _
   * @category Number
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   * @example
   *
   * _.clamp(-10, -5, 5);
   * // => -5
   *
   * _.clamp(10, -5, 5);
   * // => 5
   */
  function clamp(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = toNumber(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = toNumber(lower);
      lower = lower === lower ? lower : 0;
    }
    return baseClamp(toNumber(number), lower, upper);
  }

  /**
   * Produces a random number between the inclusive `lower` and `upper` bounds.
   * If only one argument is provided a number between `0` and the given number
   * is returned. If `floating` is `true`, or either `lower` or `upper` are floats,
   * a floating-point number is returned instead of an integer.
   *
   * **Note:** JavaScript follows the IEEE-754 standard for resolving
   * floating-point values which can produce unexpected results.
   *
   * @static
   * @memberOf _
   * @category Number
   * @param {number} [lower=0] The lower bound.
   * @param {number} [upper=1] The upper bound.
   * @param {boolean} [floating] Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */
  function random(lower, upper, floating) {
    if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
      upper = floating = undefined;
    }
    if (floating === undefined) {
      if (typeof upper == 'boolean') {
        floating = upper;
        upper = undefined;
      }
      else if (typeof lower == 'boolean') {
        floating = lower;
        lower = undefined;
      }
    }
    if (lower === undefined && upper === undefined) {
      lower = 0;
      upper = 1;
    }
    else {
      lower = toNumber(lower) || 0;
      if (upper === undefined) {
        upper = lower;
        lower = 0;
      } else {
        upper = toNumber(upper) || 0;
      }
    }
    if (lower > upper) {
      var temp = lower;
      lower = upper;
      upper = temp;
    }
    if (floating || lower % 1 || upper % 1) {
      var rand = nativeRandom();
      return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
    }
    return baseRandom(lower, upper);
  }

  /*------------------------------------------------------------------------*/

  // Add functions that return wrapped values when chaining.
  lodash.assignInWith = assignInWith;
  lodash.defaults = defaults;
  lodash.keysIn = keysIn;
  lodash.rest = rest;

  // Add aliases.
  lodash.extendWith = assignInWith;

  /*------------------------------------------------------------------------*/

  // Add functions that return unwrapped values when chaining.
  lodash.clamp = clamp;
  lodash.eq = eq;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isArrayLike = isArrayLike;
  lodash.isArrayLikeObject = isArrayLikeObject;
  lodash.isFunction = isFunction;
  lodash.isLength = isLength;
  lodash.isNumber = isNumber;
  lodash.isObject = isObject;
  lodash.isObjectLike = isObjectLike;
  lodash.isString = isString;
  lodash.random = random;
  lodash.toInteger = toInteger;
  lodash.toNumber = toNumber;

  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type {string}
   */
  lodash.VERSION = VERSION;

  /*--------------------------------------------------------------------------*/

  // Expose lodash on the free variable `window` or `self` when available. This
  // prevents errors in cases where lodash is loaded by a script tag in the presence
  // of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch for more details.
  (freeWindow || freeSelf || {})._ = lodash;

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return lodash;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for Node.js.
    if (moduleExports) {
      (freeModule.exports = lodash)._ = lodash;
    }
    // Export for CommonJS support.
    freeExports._ = lodash;
  }
  else {
    // Export to the global object.
    root._ = lodash;
  }
}.call(this));

var Color,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Color = (function() {
  function Color(color) {
    this._hsvToCmyk = bind(this._hsvToCmyk, this);
    this._cmykToHsv = bind(this._cmykToHsv, this);
    this._cmykToRgb = bind(this._cmykToRgb, this);
    this._rgbToCmyk = bind(this._rgbToCmyk, this);
    this.__cmyToCmyk = bind(this.__cmyToCmyk, this);
    this._hsvToLab = bind(this._hsvToLab, this);
    this._labToHsv = bind(this._labToHsv, this);
    this._labToXyz = bind(this._labToXyz, this);
    this._xyzToLab = bind(this._xyzToLab, this);
    this._xyzToRgb = bind(this._xyzToRgb, this);
    this._rgbToXyz = bind(this._rgbToXyz, this);
    this._xyzToHsv = bind(this._xyzToHsv, this);
    this._hsvToXyz = bind(this._hsvToXyz, this);
    this._hslToHsv = bind(this._hslToHsv, this);
    this._hsvToHsl = bind(this._hsvToHsl, this);
    this._hsvToHex = bind(this._hsvToHex, this);
    this._rgbToHex = bind(this._rgbToHex, this);
    this._hexToHsv = bind(this._hexToHsv, this);
    this._hexToRgb = bind(this._hexToRgb, this);
    this._hsvToRgb = bind(this._hsvToRgb, this);
    this._rgbToHsv = bind(this._rgbToHsv, this);
    this.darken = bind(this.darken, this);
    this.lighten = bind(this.lighten, this);
    this.mix = bind(this.mix, this);
    this.contrast = bind(this.contrast, this);
    this.getHtmlColors = bind(this.getHtmlColors, this);
    this.getHtmlColor = bind(this.getHtmlColor, this);
    this.html = bind(this.html, this);
    this.hex = bind(this.hex, this);
    this.xyz = bind(this.xyz, this);
    this.hsv = bind(this.hsv, this);
    this.hslString = bind(this.hslString, this);
    this.hsl = bind(this.hsl, this);
    this.rgbString = bind(this.rgbString, this);
    this.rgb = bind(this.rgb, this);
    this.blue = bind(this.blue, this);
    this.green = bind(this.green, this);
    this.red = bind(this.red, this);
    this.alpha = bind(this.alpha, this);
    this.value = bind(this.value, this);
    this.saturation = bind(this.saturation, this);
    this.hue = bind(this.hue, this);
    this._detectType = bind(this._detectType, this);
    if (color != null) {
      switch (this._detectType(color)) {
        case 'HSV':
          this.__model = {
            h: color.h,
            s: color.s,
            v: color.v
          };
          break;
        case 'HSL':
          this.__model = this._hslToHsv(color);
          break;
        case 'RGB':
          this.__model = this._rgbToHsv(color);
          break;
        case 'HEX':
          this.__model = this._hexToHsv(color);
          break;
        case 'XYZ':
          this.__model = this._xyzToHsv(color);
          break;
        case 'LAB':
          this.__model = this._labToHsv(color);
          break;
        case 'CMYK':
          this.__model = this._cmykToHsv(color);
      }
    } else {
      this.__model = {
        h: 0,
        s: 0,
        v: 0
      };
    }
  }

  Color.prototype._detectType = function(color) {
    if (this._isHsv(color)) {
      return 'HSV';
    }
    if (this._isHsl(color)) {
      return 'HSL';
    }
    if (this._isRgb(color)) {
      return 'RGB';
    }
    if (this._isRgbString(color)) {
      return 'RGB_STRING';
    }
    if (this._isHex(color)) {
      return 'HEX';
    }
    if (this._isXyz(color)) {
      return 'XYZ';
    }
    if (this._isLab(color)) {
      return 'LAB';
    }
    if (this._isCmyk(color)) {
      return 'CMYK';
    }
    throw new Error('Not a valid color type.');
  };

  Color.prototype._isHsv = function(color) {
    if (_.isObject(color) && (color.h != null) && (color.s != null) && (color.v != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHsl = function(color) {
    if (_.isObject(color) && (color.h != null) && (color.s != null) && (color.l != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHslString = function(color) {
    var hslTest;
    hslTest = /hsl\(s?d{1,3},s?d{1,3}%,s?d{1,3}%s?\)/i;
    if (_.isString(color) && hslTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype._isRgb = function(color) {
    if (_.isObject(color) && (color.r != null) && (color.g != null) && (color.b != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isRgbString = function(color) {
    var rgbTest;
    rgbTest = /rgb\(\s?(\d{1,3},\s?){2}\d{1,3}\s?\)/i;
    if (_.isString(color) && rgbTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype._isHex = function(color) {
    var hexTest;
    hexTest = /^#?(?:[0-9a-f]{3}){1,2}$/i;
    if (_.isString(color) && hexTest.test(color)) {
      return true;
    }
    return false;
  };

  Color.prototype._isXyz = function(color) {
    if (_.isObject(color) && (color.x != null) && (color.y != null) && (color.z != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isLab = function(color) {
    if (_.isObject(color) && (color.l != null) && (color.a != null) && (color.b != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isCmy = function(color) {
    if (_.isObject(color) && (color.c != null) && (color.m != null) && (color.y != null)) {
      return true;
    }
    return false;
  };

  Color.prototype._isCmyk = function(color) {
    if (_.isObject(color) && (color.c != null) && (color.m != null) && (color.y != null) && (color.k != null)) {
      return true;
    }
    return false;
  };

  Color.prototype.hue = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.h = Math.abs(value % 360);
      return this;
    }
    return this.__model.h;
  };

  Color.prototype.saturation = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.s = _.clamp(value, 0, 1);
      return this;
    }
    return this.__model.s;
  };

  Color.prototype.sat = Color.prototype.saturation;

  Color.prototype.value = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.v = _.clamp(value, 0, 1);
      return this;
    }
    return this.__model.v;
  };

  Color.prototype.val = Color.prototype.value;

  Color.prototype.brightness = Color.prototype.value;

  Color.prototype.alpha = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.a = _.clamp(value, 0, 1);
      return this;
    }
    return this.__model.a;
  };

  Color.prototype.opacity = Color.prototype.alpha;

  Color.prototype.red = function(value) {
    var rgb;
    if ((value != null) && _.isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.r = _.clamp(value, 0, 255);
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).r;
  };

  Color.prototype.green = function(value) {
    var rgb;
    if ((value != null) && _.isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.g = _.clamp(value, 0, 255);
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).g;
  };

  Color.prototype.blue = function(value) {
    var rgb;
    if ((value != null) && _.isNumber(value)) {
      rgb = this._hsvToRgb(this.__model);
      rgb.b = _.clamp(value, 0, 255);
      this.__model = this._rgbToHsv(rgb);
      return this;
    }
    return this._hsvToRgb(this.__model).b;
  };

  Color.prototype.rgb = function(value) {
    if (value != null) {
      this.__model = this._rgbToHsv(value);
      return this;
    }
    return this._hsvToRgb(this.__model);
  };

  Color.prototype.rgbString = function() {
    var rgb;
    rgb = this._hsvToRgb(this.__model);
    if (this.__model.a == null) {
      return "rgb(" + (Math.round(rgb.r)) + "," + (Math.round(rgb.g)) + "," + (Math.round(rgb.b)) + ")";
    }
    return "rgba(" + (Math.round(rgb.r)) + "," + (Math.round(rgb.g)) + "," + (Math.round(rgb.b)) + "," + this.__model.a + ")";
  };

  Color.prototype.hsl = function(value) {
    if (value != null) {
      this.__model = this._hslToHsv(value);
      return this;
    }
    return this._hsvToHsl(this.__model);
  };

  Color.prototype.hslString = function() {
    var hsl;
    hsl = this._hsvToHsl(this.__model);
    if (this.__model.a == null) {
      return "hsl(" + hsl.h + "," + (hsl.s * 100) + "%," + (hsl.l * 100) + "%)";
    }
    return "hsla(" + hsl.h + "," + (hsl.s * 100) + "%," + (hsl.l * 100) + "%," + this.__model.a + ")";
  };

  Color.prototype.hsv = function(value) {
    if ((value != null) && this._isHsv(value)) {
      this.__model = value;
      return this;
    }
    return this.__model;
  };

  Color.prototype.xyz = function(value) {
    if ((value != null) && this._isXyz(value)) {
      this.__model = this._xyzToHsv(value);
      return this;
    }
    return this._hsvToXyz(this.__model);
  };

  Color.prototype.hex = function(value) {
    if ((value != null) && this._isHex(value)) {
      this.__model = this._hexToHsv(value);
      return this;
    }
    return this._hsvToHex(this.__model);
  };

  Color.prototype.html = function(value) {
    this.__model = this._hexToHsv(this.getHtmlColor(value));
    return this;
  };

  Color.prototype.getHtmlColor = function(value) {
    var colorName;
    if (value != null) {
      colorName = value.toString().toLowerCase();
      if (this._htmlColors[colorName] != null) {
        return this._htmlColors[colorName];
      }
    }
    throw new Error('Not a valid HTML color.');
  };

  Color.prototype.getHtmlColors = function() {
    return this._htmlColors;
  };

  Color.prototype.contrast = function() {
    var rgb, yiq, yiqB, yiqG, yiqR;
    rgb = this.rgb();
    yiqR = rgb.r * 299;
    yiqG = rgb.g * 587;
    yiqB = rgb.b * 114;
    yiq = (yiqR + yiqG + yiqB) / 1000;
    if (yiq < 128) {
      return true;
    }
    return false;
  };

  Color.prototype.mix = function(color, amount) {
    var cmyk, mixer, remainder, result;
    if (amount == null) {
      amount = 0.5;
    }
    cmyk = this._hsvToCmyk(this.__model);
    mixer = this._hsvToCmyk(color);
    amount = _.clamp(amount, 0, 1);
    remainder = 1 - amount;
    result = {
      c: (cmyk.c * remainder) + (mixer.c * amount),
      m: (cmyk.m * remainder) + (mixer.m * amount),
      y: (cmyk.y * remainder) + (mixer.y * amount),
      k: (cmyk.k * remainder) + (mixer.k * amount)
    };
    this.__model = this._cmykToHsv(result);
    return this;
  };

  Color.prototype.lighten = function(amount) {
    var white;
    if (amount == null) {
      amount = 0.25;
    }
    white = new Color(this._htmlColors.white);
    this.mix(white.hsv(), amount);
    return this;
  };

  Color.prototype.darken = function(amount) {
    var black;
    if (amount == null) {
      amount = 0.25;
    }
    black = new Color(this._htmlColors.black);
    this.mix(black.hsv(), amount);
    return this;
  };

  Color.prototype._rgbToHsv = function(rgb) {
    var b, d, g, h, hsvObj, maxRgb, minRgb, r;
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid RGB object.');
    }
    r = rgb.r / 255;
    g = rgb.g / 255;
    b = rgb.b / 255;
    minRgb = Math.min(r, Math.min(g, b));
    maxRgb = Math.max(r, Math.max(g, b));
    if (minRgb === maxRgb) {
      hsvObj = {
        h: 0,
        s: 0,
        v: minRgb
      };
      return hsvObj;
    }
    d = r === minRgb ? g - b : b === minRgb ? r - g : b - r;
    h = r === minRgb ? 3 : b === minRgb ? 1 : 5;
    hsvObj = {
      h: 60 * (h - d / (maxRgb - minRgb)),
      s: (maxRgb - minRgb) / maxRgb,
      v: maxRgb
    };
    return hsvObj;
  };

  Color.prototype._hsvToRgb = function(hsv) {
    var b, computedV, f, g, h, i, p, q, r, rgbObj, s, t, v;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    h = hsv.h % 360;
    s = hsv.s;
    v = hsv.v;
    if (s === 0) {
      computedV = v * 255;
      rgbObj = {
        r: computedV,
        g: computedV,
        b: computedV
      };
      return rgbObj;
    }
    h /= 60;
    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
    }
    rgbObj = {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
    return rgbObj;
  };

  Color.prototype._hexToRgb = function(hex) {
    var parsedHex, rgbObj;
    if (!this._isHex(hex)) {
      throw new Error('Not a valid hex string.');
    }
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    hex = hex.replace(/[^0-9a-f]/gi, '');
    parsedHex = parseInt(hex, 16);
    rgbObj = {
      r: (parsedHex >> 16) & 255,
      g: (parsedHex >> 8) & 255,
      b: parsedHex & 255
    };
    return rgbObj;
  };

  Color.prototype._hexToHsv = function(hex) {
    return this._rgbToHsv(this._hexToRgb(hex));
  };

  Color.prototype._rgbToHex = function(rgb) {
    var base;
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid RGB object.');
    }
    base = rgb.b | (rgb.g << 8) | (rgb.r << 16);
    return "#" + ((0x1000000 + base).toString(16).slice(1));
  };

  Color.prototype._hsvToHex = function(hsv) {
    return this._rgbToHex(this._hsvToRgb(hsv));
  };

  Color.prototype._hsvToHsl = function(hsv) {
    var computedL, computedS, hslObj;
    if (!this._isHsv(hsv)) {
      throw new Error('Not a valid HSV object.');
    }
    computedL = (2 - hsv.s) * hsv.v;
    computedS = hsv.s * hsv.v;
    if (computedL <= 1) {
      computedS = computedS / computedL;
    } else {
      computedS = computedS / (2 - computedL);
    }
    computedL = computedL / 2;
    hslObj = {
      h: hsv.h,
      s: computedS,
      l: computedL
    };
    return hslObj;
  };

  Color.prototype._hslToHsv = function(hsl) {
    var computedS, computedV, hsvObj;
    if (!this._isHsl(hsl)) {
      throw new Error('Not a valid HSL object.');
    }
    hsl.l *= 2;
    if (hsl.l <= 1) {
      hsl.s *= hsl.l;
    } else {
      hsl.s *= 2 - hsl.l;
    }
    computedV = (hsl.l + hsl.s) / 2;
    computedS = (2 * hsl.s) / (hsl.l + hsl.s);
    hsvObj = {
      h: hsl.h,
      s: computedS,
      v: computedV
    };
    return hsvObj;
  };

  Color.prototype._hsvToXyz = function(hsv) {
    return this._rgbToXyz(this._hsvToRgb(hsv));
  };

  Color.prototype._xyzToHsv = function(xyz) {
    return this._rgbToHsv(this._xyzToRgb(xyz));
  };

  Color.prototype.__xyzForward = function(value) {
    if (value > 0.04045) {
      return Math.pow((value + 0.055) / 1.055, 2.4);
    }
    return value / 12.92;
  };

  Color.prototype._rgbToXyz = function(rgb) {
    var b, g, r, xyzObj;
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid RGB object.');
    }
    r = this.__xyzForward(rgb.r);
    g = this.__xyzForward(rgb.g);
    b = this.__xyzForward(rgb.b);
    xyzObj = {
      x: r * 0.4124 + g * 0.3576 + b * 0.1805,
      y: r * 0.2126 + g * 0.7152 + b * 0.0722,
      z: r * 0.0193 + g * 0.1192 + b * 0.9505
    };
    return xyzObj;
  };

  Color.prototype.__xyzBackward = function(value) {
    if (value > 0.0031308) {
      return Math.pow(value, 1 / 2.4) - 0.055;
    }
    return value * 12.92;
  };

  Color.prototype._xyzToRgb = function(xyz) {
    var b, g, r, rgbObj;
    if (!this._isXyz(xyz)) {
      throw new Error('Not a valid XYZ object.');
    }
    r = xyz.x * 3.2406 + xyz.y * -1.5372 + xyz.z * -0.4986;
    g = xyz.x * -0.9689 + xyz.y * 1.8758 + xyz.z * 0.0415;
    b = xyz.x * 0.0557 + xyz.y * -0.2040 + xyz.z * 1.057;
    rgbObj = {
      r: this.__xyzBackward(r),
      g: this.__xyzBackward(g),
      b: this.__xyzBackward(b)
    };
    return rgbObj;
  };

  Color.prototype.__labForward = function(value) {
    if (value > 0.008856) {
      return Math.pow(x, 1 / 3);
    }
    return (7.787 * x) + (16 / 116);
  };

  Color.prototype._xyzToLab = function(xyz) {
    var labObj, x, y, z;
    if (!this._isXyz(xyz)) {
      throw new Error('Not a valid XYZ object.');
    }
    x = this.__labForward(xyz.x * 0.9504285);
    y = this.__labForward(xyz.y);
    z = this.__labForward(xyz.z * 1.0889);
    labObj = {
      l: ((116 * y) - 16) / 100,
      a: ((500 * (x - y)) + 128) / 255,
      b: ((200 * (y - z)) + 128) / 255
    };
    return labObj;
  };

  Color.prototype.__labBackward = function(value) {
    var thirded;
    thirded = Math.pow(value, 3);
    if (thirded > 0.008856) {
      return thirded;
    }
    return (value - 16 / 116) / 7.787;
  };

  Color.prototype._labToXyz = function(lab) {
    var a, b, l, x, xyzObj, y, z;
    if (!this._isLab(lab)) {
      throw new Error('Not a valid LAB object');
    }
    l = lab.l * 100;
    a = (lab.a * 255) - 128;
    b = (lab.b * 255) - 128;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    xyzObj = {
      x: this.__labBackward(x) * 0.9504285,
      y: this.__labBackward(y),
      z: this.__labBackward(z) * 1.0889
    };
    return xyzObj;
  };

  Color.prototype._labToHsv = function(lab) {
    return this._xyzToHsv(this._labToXyz(lab));
  };

  Color.prototype._hsvToLab = function(hsv) {
    return this._xyzToLab(this._hsvToXyz(hsv));
  };

  Color.prototype.__rgbToCmy = function(rgb) {
    var cmyObj;
    cmyObj = {
      c: 1 - rgb.r,
      m: 1 - rgb.g,
      y: 1 - rgb.b
    };
    return cmyObj;
  };

  Color.prototype.__cmyToRgb = function(cmy) {
    var rgbObj;
    rgbObj = {
      r: 1 - cmy.c,
      g: 1 - cmy.m,
      b: 1 - cmy.y
    };
    return rgbObj;
  };

  Color.prototype.__cmyToCmyk = function(cmy) {
    var K, cmykObj;
    if (!this._isCmy(cmy)) {
      throw new Error('Not a valid cmy object.');
    }
    K = 1;
    if (cmy.x < K) {
      K = cmy.c;
    }
    if (cmy.m < K) {
      K = cmy.m;
    }
    if (cmy.y < K) {
      K = cmy.y;
    }
    if (K === 1) {
      cmykObj = {
        c: 0,
        m: 0,
        y: 0,
        k: 1
      };
      return cmykObj;
    }
    cmykObj = {
      c: (cmy.c - K) / (1 - K),
      m: (cmy.m - K) / (1 - K),
      y: (cmy.y - K) / (1 - K),
      k: K
    };
    return cmykObj;
  };

  Color.prototype.__cmykToCmy = function(cmyk) {
    var K, cmyObj;
    K = cmyk.k;
    cmyObj = {
      c: cmyk.c * (1 - K) + K,
      m: cmyk.m * (1 - K) + K,
      y: cmyk.y * (1 - K) + K
    };
    return cmyObj;
  };

  Color.prototype._rgbToCmyk = function(rgb) {
    if (!this._isRgb(rgb)) {
      throw new Error('Not a valid rgb object.');
    }
    return this.__cmyToCmyk(this.__rgbToCmy(rgb));
  };

  Color.prototype._cmykToRgb = function(cmyk) {
    if (!this._isCmyk(cmyk)) {
      throw new Error('Not a valid cmyk object.');
    }
    return this.__cmyToRgb(this.__cmykToCmy(cmyk));
  };

  Color.prototype._cmykToHsv = function(cmyk) {
    return this._rgbToHsv(this._cmykToRgb(cmyk));
  };

  Color.prototype._hsvToCmyk = function(hsv) {
    return this._rgbToCmyk(this._hsvToRgb(hsv));
  };

  Color.prototype._htmlColors = {
    aliceblue: 'F0F8FF',
    antiquewhite: 'FAEBD7',
    aqua: '00FFFF',
    aquamarine: '7FFFD4',
    azure: 'F0FFFF',
    beige: 'F5F5DC',
    bisque: 'FFE4C4',
    black: '000000',
    blanchedalmond: 'FFEBCD',
    blue: '0000FF',
    blueviolet: '8A2BE2',
    brown: 'A52A2A',
    burlywood: 'DEB887',
    cadetblue: '5F9EA0',
    chartreuse: '7FFF00',
    chocolate: 'D2691E',
    coral: 'FF7F50',
    cornflowerblue: '6495ED',
    cornsilk: 'FFF8DC',
    crimson: 'DC143C',
    cyan: '00FFFF',
    darkblue: '00008B',
    darkcyan: '008B8B',
    darkgoldenrod: 'B8860B',
    darkgray: 'A9A9A9',
    darkgrey: 'A9A9A9',
    darkgreen: '006400',
    darkkhaki: 'BDB76B',
    darkmagenta: '8B008B',
    darkolivegreen: '556B2F',
    darkorange: 'FF8C00',
    darkorchid: '9932CC',
    darkred: '8B0000',
    darksalmon: 'E9967A',
    darkseagreen: '8FBC8F',
    darkslateblue: '483D8B',
    darkslategray: '2F4F4F',
    darkslategrey: '2F4F4F',
    darkturquoise: '00CED1',
    darkviolet: '9400D3',
    deeppink: 'FF1493',
    deepskyblue: '00BFFF',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1E90FF',
    firebrick: 'B22222',
    floralwhite: 'FFFAF0',
    forestgreen: '228B22',
    fuchsia: 'FF00FF',
    gainsboro: 'DCDCDC',
    ghostwhite: 'F8F8FF',
    gold: 'FFD700',
    goldenrod: 'DAA520',
    gray: '808080',
    grey: '808080',
    green: '008000',
    greenyellow: 'ADFF2F',
    honeydew: 'F0FFF0',
    hotpink: 'FF69B4',
    indianred: 'CD5C5C',
    indigo: '4B0082',
    ivory: 'FFFFF0',
    khaki: 'F0E68C',
    lavender: 'E6E6FA',
    lavenderblush: 'FFF0F5',
    lawngreen: '7CFC00',
    lemonchiffon: 'FFFACD',
    lightblue: 'ADD8E6',
    lightcoral: 'F08080',
    lightcyan: 'E0FFFF',
    lightgoldenrodyellow: 'FAFAD2',
    lightgray: 'D3D3D3',
    lightgrey: 'D3D3D3',
    lightgreen: '90EE90',
    lightpink: 'FFB6C1',
    lightsalmon: 'FFA07A',
    lightseagreen: '20B2AA',
    lightskyblue: '87CEFA',
    lightslategray: '778899',
    lightslategrey: '778899',
    lightsteelblue: 'B0C4DE',
    lightyellow: 'FFFFE0',
    lime: '00FF00',
    limegreen: '32CD32',
    linen: 'FAF0E6',
    magenta: 'FF00FF',
    maroon: '800000',
    mediumaquamarine: '66CDAA',
    mediumblue: '0000CD',
    mediumorchid: 'BA55D3',
    mediumpurple: '9370D8',
    mediumseagreen: '3CB371',
    mediumslateblue: '7B68EE',
    mediumspringgreen: '00FA9A',
    mediumturquoise: '48D1CC',
    mediumvioletred: 'C71585',
    midnightblue: '191970',
    mintcream: 'F5FFFA',
    mistyrose: 'FFE4E1',
    moccasin: 'FFE4B5',
    navajowhite: 'FFDEAD',
    navy: '000080',
    oldlace: 'FDF5E6',
    olive: '808000',
    olivedrab: '6B8E23',
    orange: 'FFA500',
    orangered: 'FF4500',
    orchid: 'DA70D6',
    palegoldenrod: 'EEE8AA',
    palegreen: '98FB98',
    paleturquoise: 'AFEEEE',
    palevioletred: 'D87093',
    papayawhip: 'FFEFD5',
    peachpuff: 'FFDAB9',
    peru: 'CD853F',
    pink: 'FFC0CB',
    plum: 'DDA0DD',
    powderblue: 'B0E0E6',
    purple: '800080',
    rebeccapurple: '663399',
    red: 'FF0000',
    rosybrown: 'BC8F8F',
    royalblue: '4169E1',
    saddlebrown: '8B4513',
    salmon: 'FA8072',
    sandybrown: 'F4A460',
    seagreen: '2E8B57',
    seashell: 'FFF5EE',
    sienna: 'A0522D',
    silver: 'C0C0C0',
    skyblue: '87CEEB',
    slateblue: '6A5ACD',
    slategray: '708090',
    slategrey: '708090',
    snow: 'FFFAFA',
    springgreen: '00FF7F',
    steelblue: '4682B4',
    tan: 'D2B48C',
    teal: '008080',
    thistle: 'D8BFD8',
    tomato: 'FF6347',
    turquoise: '40E0D0',
    violet: 'EE82EE',
    wheat: 'F5DEB3',
    white: 'FFFFFF',
    whitesmoke: 'F5F5F5',
    yellow: 'FFFF00',
    yellowgreen: '9ACD32'
  };

  return Color;

})();



var PHI, deprecationLayer, makeColorDefaults;

please.Color = function(color) {
  return new Color(color);
};

PHI = 0.618033988749895;

makeColorDefaults = {
  hue: null,
  saturation: null,
  value: null,
  base_color: '',
  baseColor: '',
  greyscale: false,
  grayscale: false,
  golden: true,
  full_random: false,
  fullRandom: false,
  colors_returned: 1,
  colorsReturned: 1,
  format: null
};

please.generateFromBaseColor = function(baseColor) {
  var base, color;
  color = new Color();
  base = new Color(baseColor);
  color.hue(clamp(_.random(base.hue() - 5, base.hue() + 5), 0, 360));
  if (base.saturation() === 0) {
    color.saturation(0);
  } else {
    color.saturation(_.random(0.4, 0.85, true));
  }
  color.value(_.random(0.4, 0.85, true));
  return color;
};

please.generate = please.generateGolden = function() {
  var color, hue;
  color = new Color();
  hue = _.random(0, 359);
  color.hue((hue + (hue / PHI)) % 360);
  color.saturation(_.random(0.4, 0.85, true));
  color.value(_.random(0.4, 0.85, true));
  return color;
};

please.generateRandom = function() {
  var color;
  color = new Color();
  color.hue(_.random(0, 359));
  color.saturation(_.random(0, 1.0, true));
  color.value(_.random(0, 1.0, true));
  return color;
};

deprecationLayer = function(options) {
  if (options.base_color !== makeColorDefaults.baseColor) {
    console.warn('The option base_color is deprecated and will be removed soon. Use baseColor instead.');
    options.baseColor = options.base_color;
  }
  if (options.full_random !== makeColorDefaults.fullRandom) {
    console.warn('The option full_random is deprecated and will be removed soon. Use fullRandom instead.');
    options.fullRandom = options.full_random;
  }
  if (options.colors_returned !== makeColorDefaults.colorsReturned) {
    console.warn('The option colors_returned is deprecated and will be removed soon. Use colorsReturned instead.');
    options.colorsReturned = options.colors_returned;
  }
  return options;
};

please.make_color = function(options) {
  if (options == null) {
    options = {};
  }
  console.warn('The function make_color() is deprecated and will be removed soon. Use makeColor() instead.');
  please.makeColor(options);
};

please.makeColor = function(options) {
  var colors, i, j, opts, ref;
  if (options == null) {
    options = {};
  }
  opts = deprecationLayer(_.defaults(makeColorDefaults, options));
  colors = [];
  for (i = j = 0, ref = opts.colorsReturned; j <= ref; i = j += 1) {
    colors[i] = please.generate();
    if ((opts.hue != null) && _.isNumber(opts.hue)) {
      colors[i].hue(opts.hue);
    }
    if ((opts.saturation != null) && _.isNumber(opts.saturation)) {
      colors[i].saturation(opts.saturation);
    }
    if ((opts.value != null) && _.isNumber(opts.value)) {
      colors[i].value(opts.value);
    }
    switch (opts.format.toLowerCase()) {
      case 'hex':
        colors[i] = colors[i].hex();
        break;
      case 'rgb':
        colors[i] = colors[i].rgbString();
        break;
      case 'hsl':
        colors[i] = colors[i].hslString();
        break;
      default:
        console.warn('Unknown format. Defaulting to hex.');
        colors[i] = colors[i].hex();
    }
  }
  return colors;
};

please.make_scheme = function(options) {
  if (options == null) {
    options = {};
  }
  console.warn('The function make_scheme() is deprecated and will be removed soon. use makeScheme() instead.');
  please.makeScheme(options);
};

please.makeScheme = function(options) {
  var scheme;
  if (options == null) {
    options = {};
  }
  scheme = [];
  return scheme;
};
if ( typeof define === 'function' && define.amd ){
		define(please);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = please;
	}
	this.please = please;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuanMiLCJtYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTs7QUFBTTtFQUNRLGVBQUMsS0FBRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDWixJQUFHLGFBQUg7QUFDQyxjQUFPLElBQUMsQ0FBQSxXQUFELENBQWEsS0FBYixDQUFQO0FBQUEsYUFDTSxLQUROO1VBRUUsSUFBQyxDQUFBLE9BQUQsR0FDQztZQUFBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FBVDtZQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FEVDtZQUVBLENBQUEsRUFBRyxLQUFLLENBQUMsQ0FGVDs7QUFGRztBQUROLGFBTU0sS0FOTjtVQU1pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQU5OLGFBT00sS0FQTjtVQU9pQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVBOLGFBUU0sS0FSTjtVQVFpQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVJOLGFBU00sS0FUTjtVQVNpQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVROLGFBVU0sS0FWTjtVQVVpQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFELENBQVcsS0FBWDtBQUF0QjtBQVZOLGFBV00sTUFYTjtVQVdrQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxVQUFELENBQVksS0FBWjtBQVg3QixPQUREO0tBQUEsTUFBQTtNQWNDLElBQUMsQ0FBQSxPQUFELEdBQ0M7UUFBQSxDQUFBLEVBQUcsQ0FBSDtRQUNBLENBQUEsRUFBRyxDQURIO1FBRUEsQ0FBQSxFQUFHLENBRkg7UUFm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Q0FBRSxDQUFDLFNBQVYsQ0FBQTtBQUF2QjtBQUhOO1FBS0UsT0FBTyxDQUFDLElBQVIsQ0FBYSxvQ0FBYjtRQUNBLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsR0FBVixDQUFBO0FBTmQ7QUFQRDtBQWNBLFNBQU87QUFsQlc7O0FBcUJuQixNQUFNLENBQUMsV0FBUCxHQUFxQixTQUFDLE9BQUQ7O0lBQUMsVUFBVTs7RUFDL0IsT0FBTyxDQUFDLElBQVIsQ0FBYSw4RkFBYjtFQUNBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLE9BQWxCO0FBRm9COztBQUtyQixNQUFNLENBQUMsVUFBUCxHQUFvQixTQUFDLE9BQUQ7QUFDbkIsTUFBQTs7SUFEb0IsVUFBVTs7RUFDOUIsTUFBQSxHQUFTO0FBQ1QsU0FBTztBQUZZIiwiZmlsZSI6InBsZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbG9yXG5cdGNvbnN0cnVjdG9yOiAoY29sb3IpIC0+XG5cdFx0aWYgY29sb3I/XG5cdFx0XHRzd2l0Y2ggQF9kZXRlY3RUeXBlIGNvbG9yXG5cdFx0XHRcdHdoZW4gJ0hTVidcblx0XHRcdFx0XHRAX19tb2RlbCA9XG5cdFx0XHRcdFx0XHRoOiBjb2xvci5oXG5cdFx0XHRcdFx0XHRzOiBjb2xvci5zXG5cdFx0XHRcdFx0XHR2OiBjb2xvci52XG5cdFx0XHRcdHdoZW4gJ0hTTCcgdGhlbiBAX19tb2RlbCA9IEBfaHNsVG9Ic3YgY29sb3Jcblx0XHRcdFx0d2hlbiAnUkdCJyB0aGVuIEBfX21vZGVsID0gQF9yZ2JUb0hzdiBjb2xvclxuXHRcdFx0XHR3aGVuICdIRVgnIHRoZW4gQF9fbW9kZWwgPSBAX2hleFRvSHN2IGNvbG9yXG5cdFx0XHRcdHdoZW4gJ1hZWicgdGhlbiBAX19tb2RlbCA9IEBfeHl6VG9Ic3YgY29sb3Jcblx0XHRcdFx0d2hlbiAnTEFCJyB0aGVuIEBfX21vZGVsID0gQF9sYWJUb0hzdiBjb2xvclxuXHRcdFx0XHR3aGVuICdDTVlLJyB0aGVuIEBfX21vZGVsID0gQF9jbXlrVG9Ic3YgY29sb3Jcblx0XHRlbHNlXG5cdFx0XHRAX19tb2RlbCA9XG5cdFx0XHRcdGg6IDBcblx0XHRcdFx0czogMFxuXHRcdFx0XHR2OiAwXG5cblx0X2RldGVjdFR5cGU6IChjb2xvcikgPT5cblx0XHRpZiBAX2lzSHN2IGNvbG9yIHRoZW4gcmV0dXJuICdIU1YnXG5cdFx0aWYgQF9pc0hzbCBjb2xvciB0aGVuIHJldHVybiAnSFNMJ1xuXHRcdGlmIEBfaXNSZ2IgY29sb3IgdGhlbiByZXR1cm4gJ1JHQidcblx0XHRpZiBAX2lzUmdiU3RyaW5nIGNvbG9yIHRoZW4gcmV0dXJuICdSR0JfU1RSSU5HJ1xuXHRcdGlmIEBfaXNIZXggY29sb3IgdGhlbiByZXR1cm4gJ0hFWCdcblx0XHRpZiBAX2lzWHl6IGNvbG9yIHRoZW4gcmV0dXJuICdYWVonXG5cdFx0aWYgQF9pc0xhYiBjb2xvciB0aGVuIHJldHVybiAnTEFCJ1xuXHRcdGlmIEBfaXNDbXlrIGNvbG9yIHRoZW4gcmV0dXJuICdDTVlLJ1xuXHRcdHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgY29sb3IgdHlwZS4nXG5cblx0X2lzSHN2OiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3Iudj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2w6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuaD8gYW5kIGNvbG9yLnM/IGFuZCBjb2xvci5sP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hzbFN0cmluZzogKGNvbG9yKSAtPlxuXHRcdGhzbFRlc3QgPSAvaHNsXFwocz9kezEsM30scz9kezEsM30lLHM/ZHsxLDN9JXM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzU3RyaW5nKGNvbG9yKSBhbmQgaHNsVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc1JnYjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIF8uaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5yPyBhbmQgY29sb3IuZz8gYW5kIGNvbG9yLmI/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzUmdiU3RyaW5nOiAoY29sb3IpIC0+XG5cdFx0cmdiVGVzdCA9IC9yZ2JcXChcXHM/KFxcZHsxLDN9LFxccz8pezJ9XFxkezEsM31cXHM/XFwpL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzU3RyaW5nKGNvbG9yKSBhbmQgcmdiVGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0hleDogKGNvbG9yKSAtPlxuXHRcdGhleFRlc3QgPSAvXiM/KD86WzAtOWEtZl17M30pezEsMn0kL2lcblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzU3RyaW5nKGNvbG9yKSBhbmQgaGV4VGVzdC50ZXN0KGNvbG9yKVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc1h5ejogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIF8uaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci54PyBhbmQgY29sb3IueT8gYW5kIGNvbG9yLno/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzTGFiOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmw/IGFuZCBjb2xvci5hPyBhbmQgY29sb3IuYj9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNDbXk6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuYz8gYW5kIGNvbG9yLm0/IGFuZCBjb2xvci55P1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc0NteWs6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3IuYz8gYW5kIGNvbG9yLm0/IGFuZCBjb2xvci55PyBhbmQgY29sb3Iuaz9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRodWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5oID0gTWF0aC5hYnMgdmFsdWUgJSAzNjBcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmhcblxuXHRzYXR1cmF0aW9uOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBfLmlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwucyA9IF8uY2xhbXAgdmFsdWUsIDAsIDFcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLnNcblxuXHRzYXQ6IEA6OnNhdHVyYXRpb25cblxuXHR2YWx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgXy5pc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnYgPSBfLmNsYW1wIHZhbHVlLCAwLCAxXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC52XG5cblx0dmFsOiBAOjp2YWx1ZVxuXG5cdGJyaWdodG5lc3M6IEA6OnZhbHVlXG5cblx0YWxwaGE6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5hID0gXy5jbGFtcCB2YWx1ZSwgMCwgMVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwuYVxuXG5cdG9wYWNpdHk6IEA6OmFscGhhXG5cblx0cmVkOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBfLmlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdFx0cmdiLnIgPSBfLmNsYW1wIHZhbHVlLCAwLCAyNTVcblx0XHRcdEBfX21vZGVsID0gQF9yZ2JUb0hzdiByZ2Jcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IoQF9fbW9kZWwpLnJcblxuXHRncmVlbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgXy5pc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5nID0gXy5jbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5nXG5cblx0Ymx1ZTogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgXy5pc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5iID0gXy5jbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5iXG5cblx0cmdiOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9SZ2IgQF9fbW9kZWxcblxuXHRyZ2JTdHJpbmc6ID0+XG5cdFx0cmdiID0gQF9oc3ZUb1JnYiBAX19tb2RlbFxuXHRcdHJldHVybiBcInJnYigje01hdGgucm91bmQgcmdiLnJ9LCN7TWF0aC5yb3VuZCByZ2IuZ30sI3tNYXRoLnJvdW5kIHJnYi5ifSlcIiBpZiBub3QgQF9fbW9kZWwuYT9cblx0XHRyZXR1cm4gXCJyZ2JhKCN7TWF0aC5yb3VuZCByZ2Iucn0sI3tNYXRoLnJvdW5kIHJnYi5nfSwje01hdGgucm91bmQgcmdiLmJ9LCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc2w6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdEBfX21vZGVsID0gQF9oc2xUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXG5cdGhzbFN0cmluZzogPT5cblx0XHRoc2wgPSBAX2hzdlRvSHNsIEBfX21vZGVsXG5cdFx0cmV0dXJuIFwiaHNsKCN7aHNsLmh9LCN7aHNsLnMgKiAxMDB9JSwje2hzbC5sICogMTAwfSUpXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwiaHNsYSgje2hzbC5ofSwje2hzbC5zICogMTAwfSUsI3toc2wubCAqIDEwMH0lLCN7QF9fbW9kZWwuYX0pXCJcblxuXHRoc3Y6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIEBfaXNIc3YodmFsdWUpXG5cdFx0XHRAX19tb2RlbCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbFxuXG5cdHh5ejogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc1h5eih2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gQF94eXpUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1h5eiBAX19tb2RlbFxuXG5cdGhleDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgQF9pc0hleCh2YWx1ZSlcblx0XHRcdEBfX21vZGVsID0gQF9oZXhUb0hzdiB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb0hleCBAX19tb2RlbFxuXG5cdGh0bWw6ICh2YWx1ZSkgPT5cblx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgQGdldEh0bWxDb2xvcih2YWx1ZSlcblx0XHRyZXR1cm4gdGhpc1xuXG5cdGdldEh0bWxDb2xvcjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0Y29sb3JOYW1lID0gdmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG5cdFx0XHRpZiBAX2h0bWxDb2xvcnNbY29sb3JOYW1lXT8gdGhlbiByZXR1cm4gQF9odG1sQ29sb3JzW2NvbG9yTmFtZV1cblx0XHR0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhUTUwgY29sb3IuJ1xuXG5cblx0Z2V0SHRtbENvbG9yczogPT4gQF9odG1sQ29sb3JzXG5cblx0I3RydWUgZm9yIHdoaXRlIGZhbHNlIGZvciBibGFja1xuXHRjb250cmFzdDogPT5cblx0XHRyZ2IgPSBAcmdiKClcblx0XHR5aXFSID0gcmdiLnIgKiAyOTlcblx0XHR5aXFHID0gcmdiLmcgKiA1ODdcblx0XHR5aXFCID0gcmdiLmIgKiAxMTRcblx0XHR5aXEgPSAoeWlxUiArIHlpcUcgKyB5aXFCKSAvIDEwMDBcblx0XHRpZiB5aXEgPCAxMjggdGhlbiByZXR1cm4gdHJ1ZVxuXHRcdHJldHVybiBmYWxzZVxuXG5cdCNjbXlrIHN0eWxlIG1peGluZ1xuXHRtaXg6IChjb2xvciwgYW1vdW50ID0gMC41KSA9PlxuXHRcdGNteWsgPSBAX2hzdlRvQ215ayBAX19tb2RlbFxuXHRcdG1peGVyID0gQF9oc3ZUb0NteWsgY29sb3Jcblx0XHRhbW91bnQgPSBfLmNsYW1wIGFtb3VudCwgMCwgMVxuXHRcdHJlbWFpbmRlciA9IDEgLSBhbW91bnRcblxuXHRcdHJlc3VsdCA9XG5cdFx0XHRjOiAoY215ay5jICogcmVtYWluZGVyKSArIChtaXhlci5jICogYW1vdW50KVxuXHRcdFx0bTogKGNteWsubSAqIHJlbWFpbmRlcikgKyAobWl4ZXIubSAqIGFtb3VudClcblx0XHRcdHk6IChjbXlrLnkgKiByZW1haW5kZXIpICsgKG1peGVyLnkgKiBhbW91bnQpXG5cdFx0XHRrOiAoY215ay5rICogcmVtYWluZGVyKSArIChtaXhlci5rICogYW1vdW50KVxuXG5cdFx0QF9fbW9kZWwgPSBAX2NteWtUb0hzdiByZXN1bHRcblx0XHRyZXR1cm4gdGhpc1xuXG5cdGxpZ2h0ZW46IChhbW91bnQgPSAwLjI1KSA9PlxuXHRcdHdoaXRlID0gbmV3IENvbG9yIEBfaHRtbENvbG9ycy53aGl0ZVxuXHRcdEBtaXggd2hpdGUuaHN2KCksIGFtb3VudFxuXHRcdHJldHVybiB0aGlzXG5cblx0ZGFya2VuOiAoYW1vdW50ID0gMC4yNSkgPT5cblx0XHRibGFjayA9IG5ldyBDb2xvciBAX2h0bWxDb2xvcnMuYmxhY2tcblx0XHRAbWl4IGJsYWNrLmhzdigpLCBhbW91bnRcblx0XHRyZXR1cm4gdGhpc1xuXG5cdF9yZ2JUb0hzdjogKHJnYikgPT5cblx0XHRpZiBub3QgQF9pc1JnYiByZ2IgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIFJHQiBvYmplY3QuJ1xuXHRcdHIgPSByZ2IuciAvIDI1NVxuXHRcdGcgPSByZ2IuZyAvIDI1NVxuXHRcdGIgPSByZ2IuYiAvIDI1NVxuXHRcdG1pblJnYiA9IE1hdGgubWluIHIsIE1hdGgubWluKGcsIGIpXG5cdFx0bWF4UmdiID0gTWF0aC5tYXggciwgTWF0aC5tYXgoZywgYilcblx0XHQjQmxhY2stZ3JheS13aGl0ZVxuXHRcdGlmIG1pblJnYiBpcyBtYXhSZ2Jcblx0XHRcdGhzdk9iaiA9XG5cdFx0XHRcdGg6IDBcblx0XHRcdFx0czogMFxuXHRcdFx0XHR2OiBtaW5SZ2Jcblx0XHRcdHJldHVybiBoc3ZPYmpcblx0XHQjQ29sb3JzIG90aGVyIHRoYW4gYmxhY2stZ3JheS13aGl0ZTpcblx0XHRkID0gaWYgciBpcyBtaW5SZ2IgdGhlbiBnIC0gYiBlbHNlIGlmIGIgaXMgbWluUmdiIHRoZW4gciAtIGcgZWxzZSBiIC0gclxuXHRcdGggPSBpZiByIGlzIG1pblJnYiB0aGVuIDMgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIDEgZWxzZSA1XG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IDYwICogKGggLSBkLyhtYXhSZ2IgLSBtaW5SZ2IpKVxuXHRcdFx0czogKG1heFJnYiAtIG1pblJnYikvbWF4UmdiXG5cdFx0XHR2OiBtYXhSZ2Jcblx0XHRyZXR1cm4gaHN2T2JqXG5cblx0X2hzdlRvUmdiOiAoaHN2KSA9PlxuXHRcdGlmIG5vdCBAX2lzSHN2IGhzdiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNWIG9iamVjdC4nXG5cdFx0aCA9IGhzdi5oICUgMzYwXG5cdFx0cyA9IGhzdi5zXG5cdFx0diA9IGhzdi52XG5cblx0XHQjbm8gc2F0dXJhdGlvbiBjYXNlXG5cdFx0aWYgcyBpcyAwXG5cdFx0XHRjb21wdXRlZFYgPSB2ICogMjU1XG5cdFx0XHRyZ2JPYmogPVxuXHRcdFx0XHRyOiBjb21wdXRlZFZcblx0XHRcdFx0ZzogY29tcHV0ZWRWXG5cdFx0XHRcdGI6IGNvbXB1dGVkVlxuXHRcdFx0cmV0dXJuIHJnYk9ialxuXG5cdFx0aCAvPSA2MFxuXHRcdGkgPSBNYXRoLmZsb29yIGhcblx0XHRmID0gaCAtIGlcblx0XHRwID0gdiAqICgxIC0gcylcblx0XHRxID0gdiAqICgxIC0gcyAqIGYpXG5cdFx0dCA9IHYgKiAoMSAtIHMgKiAoMSAtIGYpKVxuXG5cdFx0c3dpdGNoIGlcblx0XHRcdHdoZW4gMFxuXHRcdFx0XHRyID0gdlxuXHRcdFx0XHRnID0gdFxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAxXG5cdFx0XHRcdHIgPSBxXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSBwXG5cdFx0XHR3aGVuIDJcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHZcblx0XHRcdFx0YiA9IHRcblx0XHRcdHdoZW4gM1xuXHRcdFx0XHRyID0gcFxuXHRcdFx0XHRnID0gcVxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA0XG5cdFx0XHRcdHIgPSB0XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSB2XG5cdFx0XHR3aGVuIDVcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHBcblx0XHRcdFx0YiA9IHFcblxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiBNYXRoLmZsb29yIHIgKiAyNTVcblx0XHRcdGc6IE1hdGguZmxvb3IgZyAqIDI1NVxuXHRcdFx0YjogTWF0aC5mbG9vciBiICogMjU1XG5cblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvUmdiOiAoaGV4KSA9PlxuXHRcdGlmIG5vdCBAX2lzSGV4IGhleCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgaGV4IHN0cmluZy4nXG5cdFx0I2V4cGFuZCB0byBsb25nIHZlcnNpb25cblx0XHRoZXggPSBoZXgucmVwbGFjZSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pLCAobSwgciwgZywgYikgLT4gciArIHIgKyBnICsgZyArIGIgKyBiXG5cdFx0I3JlbW92ZSBldmVyeXRoaW5nIGV4cGVjdCB2YWxpZCBudW1iZXJzXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL1teMC05YS1mXS9naSwgJydcblx0XHRwYXJzZWRIZXggPSBwYXJzZUludCBoZXgsIDE2XG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IChwYXJzZWRIZXggPj4gMTYpICYgMjU1XG5cdFx0XHRnOiAocGFyc2VkSGV4ID4+IDgpICYgMjU1XG5cdFx0XHRiOiBwYXJzZWRIZXggJiAyNTVcblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X2hleFRvSHN2OiAoaGV4KSA9PiBAX3JnYlRvSHN2KEBfaGV4VG9SZ2IoaGV4KSlcblxuXHRfcmdiVG9IZXg6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IocmdiKSB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cdFx0YmFzZSA9IHJnYi5iIHwgKHJnYi5nIDw8IDgpIHwgKHJnYi5yIDw8IDE2KVxuXHRcdHJldHVybiBcIiMjeygweDEwMDAwMDAgKyBiYXNlKS50b1N0cmluZygxNikuc2xpY2UoMSl9XCJcblxuXHRfaHN2VG9IZXg6IChoc3YpID0+IEBfcmdiVG9IZXgoQF9oc3ZUb1JnYihoc3YpKVxuXG5cdF9oc3ZUb0hzbDogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGNvbXB1dGVkTCA9ICgyIC0gaHN2LnMpICogaHN2LnZcblx0XHRjb21wdXRlZFMgPSBoc3YucyAqIGhzdi52XG5cdFx0aWYgY29tcHV0ZWRMIDw9IDEgdGhlbiBjb21wdXRlZFMgPSBjb21wdXRlZFMgLyBjb21wdXRlZExcblx0XHRlbHNlIGNvbXB1dGVkUyA9IGNvbXB1dGVkUyAvICgyIC0gY29tcHV0ZWRMKVxuXHRcdGNvbXB1dGVkTCA9IGNvbXB1dGVkTCAvIDJcblxuXHRcdGhzbE9iaiA9XG5cdFx0XHRoOiBoc3YuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHRsOiBjb21wdXRlZExcblxuXHRcdHJldHVybiBoc2xPYmpcblxuXHRfaHNsVG9Ic3Y6IChoc2wpID0+XG5cdFx0aWYgbm90IEBfaXNIc2wgaHNsIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU0wgb2JqZWN0Lidcblx0XHRoc2wubCAqPSAyXG5cdFx0aWYgKGhzbC5sIDw9IDEpIHRoZW4gaHNsLnMgKj0gaHNsLmxcblx0XHRlbHNlIGhzbC5zICo9ICggMiAtIGhzbC5sKVxuXHRcdGNvbXB1dGVkViA9IChoc2wubCArIGhzbC5zKSAvIDJcblx0XHRjb21wdXRlZFMgPSAoMiAqIGhzbC5zKSAvIChoc2wubCArIGhzbC5zKVxuXG5cdFx0aHN2T2JqID1cblx0XHRcdGg6IGhzbC5oXG5cdFx0XHRzOiBjb21wdXRlZFNcblx0XHRcdHY6IGNvbXB1dGVkVlxuXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9oc3ZUb1h5ejogKGhzdikgPT4gQF9yZ2JUb1h5eihAX2hzdlRvUmdiKGhzdikpXG5cblx0X3h5elRvSHN2OiAoeHl6KSA9PiBAX3JnYlRvSHN2KEBfeHl6VG9SZ2IoeHl6KSlcblxuXHRfX3h5ekZvcndhcmQ6ICh2YWx1ZSkgLT5cblx0XHRpZiB2YWx1ZSA+IDAuMDQwNDUgdGhlbiByZXR1cm4gTWF0aC5wb3cgKHZhbHVlICsgMC4wNTUpIC8gMS4wNTUsIDIuNFxuXHRcdHJldHVybiB2YWx1ZSAvIDEyLjkyXG5cblx0X3JnYlRvWHl6OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiIHJnYiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgUkdCIG9iamVjdC4nXG5cblx0XHRyID0gQF9feHl6Rm9yd2FyZCByZ2IuclxuXHRcdGcgPSBAX194eXpGb3J3YXJkIHJnYi5nXG5cdFx0YiA9IEBfX3h5ekZvcndhcmQgcmdiLmJcblxuXHRcdHh5ek9iaiA9XG5cdFx0XHR4OiByICogMC40MTI0ICsgZyAqIDAuMzU3NiArIGIgKiAwLjE4MDVcblx0XHRcdHk6IHIgKiAwLjIxMjYgKyBnICogMC43MTUyICsgYiAqIDAuMDcyMlxuXHRcdFx0ejogciAqIDAuMDE5MyArIGcgKiAwLjExOTIgKyBiICogMC45NTA1XG5cblx0XHRyZXR1cm4geHl6T2JqXG5cblx0X194eXpCYWNrd2FyZDogKHZhbHVlKSAtPlxuXHRcdGlmIHZhbHVlID4gMC4wMDMxMzA4IHRoZW4gcmV0dXJuIE1hdGgucG93KHZhbHVlLCAoMS8yLjQpKSAtIDAuMDU1XG5cdFx0cmV0dXJuIHZhbHVlICogMTIuOTJcblxuXHRfeHl6VG9SZ2I6ICh4eXopID0+XG5cdFx0aWYgbm90IEBfaXNYeXogeHl6IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBYWVogb2JqZWN0LidcblxuXHRcdHIgPSB4eXoueCAqIDMuMjQwNiArIHh5ei55ICogLTEuNTM3MiArIHh5ei56ICogLTAuNDk4NlxuXHRcdGcgPSB4eXoueCAqIC0wLjk2ODkgKyB4eXoueSAqIDEuODc1OCArIHh5ei56ICogMC4wNDE1XG5cdFx0YiA9IHh5ei54ICogMC4wNTU3ICsgeHl6LnkgKiAtMC4yMDQwICsgeHl6LnogKiAxLjA1N1xuXG5cdFx0cmdiT2JqID1cblx0XHRcdHI6IEBfX3h5ekJhY2t3YXJkIHJcblx0XHRcdGc6IEBfX3h5ekJhY2t3YXJkIGdcblx0XHRcdGI6IEBfX3h5ekJhY2t3YXJkIGJcblxuXHRcdHJldHVybiByZ2JPYmpcblxuXHRfX2xhYkZvcndhcmQ6ICh2YWx1ZSkgLT5cblx0XHRpZiB2YWx1ZSA+IDAuMDA4ODU2IHRoZW4gcmV0dXJuIE1hdGgucG93IHgsICgxIC8gMylcblx0XHRyZXR1cm4gKDcuNzg3ICogeCkgKyAoMTYgLyAxMTYpXG5cblx0X3h5elRvTGFiOiAoeHl6KSA9PlxuXHRcdGlmIG5vdCBAX2lzWHl6IHh5eiB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgWFlaIG9iamVjdC4nXG5cdFx0IyBDSUUtTCphYiBENjUvMicgMTkzMVxuXHRcdHggPSBAX19sYWJGb3J3YXJkIHh5ei54ICogMC45NTA0Mjg1XG5cdFx0eSA9IEBfX2xhYkZvcndhcmQgeHl6Lnlcblx0XHR6ID0gQF9fbGFiRm9yd2FyZCB4eXoueiAqIDEuMDg4OVxuXG5cdFx0bGFiT2JqID1cblx0XHRcdGw6ICgoMTE2ICogeSkgLSAxNikgLyAxMDAgI1swLTEwMF1cblx0XHRcdGE6ICgoNTAwICogKHggLSB5KSkgKyAxMjgpIC8gMjU1ICNbLTEyOC0xMjddXG5cdFx0XHRiOiAoKDIwMCAqICh5IC0geikpICsgMTI4KSAvIDI1NSAjWy0xMjgtMTI3XVxuXG5cdFx0cmV0dXJuIGxhYk9ialxuXG5cdF9fbGFiQmFja3dhcmQ6ICh2YWx1ZSkgLT5cblx0XHR0aGlyZGVkID0gTWF0aC5wb3cgdmFsdWUsIDNcblx0XHRpZiB0aGlyZGVkID4gMC4wMDg4NTYgdGhlbiByZXR1cm4gdGhpcmRlZFxuXHRcdHJldHVybiAodmFsdWUgLSAxNiAvIDExNikgLyA3Ljc4N1xuXG5cdF9sYWJUb1h5ejogKGxhYikgPT5cblx0XHRpZiBub3QgQF9pc0xhYiBsYWIgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIExBQiBvYmplY3QnXG5cblx0XHRsID0gbGFiLmwgKiAxMDBcblx0XHRhID0gKGxhYi5hICogMjU1KSAtIDEyOFxuXHRcdGIgPSAobGFiLmIgKiAyNTUpIC0gMTI4XG5cblx0XHR5ID0gKGwgKyAxNikgLyAxMTZcblx0XHR4ID0gYSAvIDUwMCArIHlcblx0XHR6ID0geSAtIGIgLyAyMDBcblxuXHRcdHh5ek9iaiA9XG5cdFx0XHR4OiBAX19sYWJCYWNrd2FyZCh4KSAqIDAuOTUwNDI4NVxuXHRcdFx0eTogQF9fbGFiQmFja3dhcmQoeSlcblx0XHRcdHo6IEBfX2xhYkJhY2t3YXJkKHopICogMS4wODg5XG5cblx0XHRyZXR1cm4geHl6T2JqXG5cblx0X2xhYlRvSHN2OiAobGFiKSA9PiBAX3h5elRvSHN2KEBfbGFiVG9YeXoobGFiKSlcblxuXHRfaHN2VG9MYWI6IChoc3YpID0+IEBfeHl6VG9MYWIoQF9oc3ZUb1h5eihoc3YpKVxuXG5cdF9fcmdiVG9DbXk6IChyZ2IpIC0+XG5cdFx0Y215T2JqID1cblx0XHRcdGM6IDEgLSByZ2IuclxuXHRcdFx0bTogMSAtIHJnYi5nXG5cdFx0XHR5OiAxIC0gcmdiLmJcblxuXHRcdHJldHVybiBjbXlPYmpcblxuXHRfX2NteVRvUmdiOiAoY215KSAtPlxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiAxIC0gY215LmNcblx0XHRcdGc6IDEgLSBjbXkubVxuXHRcdFx0YjogMSAtIGNteS55XG5cblx0XHRyZXR1cm4gcmdiT2JqXG5cblx0X19jbXlUb0NteWs6IChjbXkpID0+XG5cdFx0aWYgbm90IEBfaXNDbXkgY215IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBjbXkgb2JqZWN0Lidcblx0XHRLID0gMVxuXG5cdFx0aWYgY215LnggPCBLIHRoZW4gSyA9IGNteS5jXG5cdFx0aWYgY215Lm0gPCBLIHRoZW4gSyA9IGNteS5tXG5cdFx0aWYgY215LnkgPCBLIHRoZW4gSyA9IGNteS55XG5cblx0XHRpZiBLIGlzIDFcblx0XHRcdGNteWtPYmogPVxuXHRcdFx0XHRjOiAwXG5cdFx0XHRcdG06IDBcblx0XHRcdFx0eTogMFxuXHRcdFx0XHRrOiAxXG5cblx0XHRcdHJldHVybiBjbXlrT2JqXG5cblx0XHRjbXlrT2JqID1cblx0XHRcdGM6IChjbXkuYyAtIEspLygxIC0gSylcblx0XHRcdG06IChjbXkubSAtIEspLygxIC0gSylcblx0XHRcdHk6IChjbXkueSAtIEspLygxIC0gSylcblx0XHRcdGs6IEtcblxuXHRcdHJldHVybiBjbXlrT2JqXG5cblx0X19jbXlrVG9DbXk6IChjbXlrKSAtPlxuXHRcdEsgPSBjbXlrLmtcblx0XHRjbXlPYmogPVxuXHRcdFx0YzogY215ay5jICogKDEgLSBLKSArIEtcblx0XHRcdG06IGNteWsubSAqICgxIC0gSykgKyBLXG5cdFx0XHR5OiBjbXlrLnkgKiAoMSAtIEspICsgS1xuXG5cdFx0cmV0dXJuIGNteU9ialxuXG5cdF9yZ2JUb0NteWs6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCByZ2Igb2JqZWN0Lidcblx0XHRyZXR1cm4gQF9fY215VG9DbXlrIEBfX3JnYlRvQ215IHJnYlxuXG5cdF9jbXlrVG9SZ2I6IChjbXlrKSA9PlxuXHRcdGlmIG5vdCBAX2lzQ215ayBjbXlrIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBjbXlrIG9iamVjdC4nXG5cdFx0cmV0dXJuIEBfX2NteVRvUmdiIEBfX2NteWtUb0NteSBjbXlrXG5cblx0X2NteWtUb0hzdjogKGNteWspID0+IEBfcmdiVG9Ic3YoQF9jbXlrVG9SZ2IoY215aykpXG5cblx0X2hzdlRvQ215azogKGhzdikgPT4gQF9yZ2JUb0NteWsoQF9oc3ZUb1JnYihoc3YpKVxuXG5cdF9odG1sQ29sb3JzOlxuXHRcdGFsaWNlYmx1ZTogJ0YwRjhGRidcblx0XHRhbnRpcXVld2hpdGU6ICdGQUVCRDcnXG5cdFx0YXF1YTogJzAwRkZGRidcblx0XHRhcXVhbWFyaW5lOiAnN0ZGRkQ0J1xuXHRcdGF6dXJlOiAnRjBGRkZGJ1xuXHRcdGJlaWdlOiAnRjVGNURDJ1xuXHRcdGJpc3F1ZTogJ0ZGRTRDNCdcblx0XHRibGFjazogJzAwMDAwMCdcblx0XHRibGFuY2hlZGFsbW9uZDogJ0ZGRUJDRCdcblx0XHRibHVlOiAnMDAwMEZGJ1xuXHRcdGJsdWV2aW9sZXQ6ICc4QTJCRTInXG5cdFx0YnJvd246ICdBNTJBMkEnXG5cdFx0YnVybHl3b29kOiAnREVCODg3J1xuXHRcdGNhZGV0Ymx1ZTogJzVGOUVBMCdcblx0XHRjaGFydHJldXNlOiAnN0ZGRjAwJ1xuXHRcdGNob2NvbGF0ZTogJ0QyNjkxRSdcblx0XHRjb3JhbDogJ0ZGN0Y1MCdcblx0XHRjb3JuZmxvd2VyYmx1ZTogJzY0OTVFRCdcblx0XHRjb3Juc2lsazogJ0ZGRjhEQydcblx0XHRjcmltc29uOiAnREMxNDNDJ1xuXHRcdGN5YW46ICcwMEZGRkYnXG5cdFx0ZGFya2JsdWU6ICcwMDAwOEInXG5cdFx0ZGFya2N5YW46ICcwMDhCOEInXG5cdFx0ZGFya2dvbGRlbnJvZDogJ0I4ODYwQidcblx0XHRkYXJrZ3JheTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JleTogJ0E5QTlBOSdcblx0XHRkYXJrZ3JlZW46ICcwMDY0MDAnXG5cdFx0ZGFya2toYWtpOiAnQkRCNzZCJ1xuXHRcdGRhcmttYWdlbnRhOiAnOEIwMDhCJ1xuXHRcdGRhcmtvbGl2ZWdyZWVuOiAnNTU2QjJGJ1xuXHRcdGRhcmtvcmFuZ2U6ICdGRjhDMDAnXG5cdFx0ZGFya29yY2hpZDogJzk5MzJDQydcblx0XHRkYXJrcmVkOiAnOEIwMDAwJ1xuXHRcdGRhcmtzYWxtb246ICdFOTk2N0EnXG5cdFx0ZGFya3NlYWdyZWVuOiAnOEZCQzhGJ1xuXHRcdGRhcmtzbGF0ZWJsdWU6ICc0ODNEOEInXG5cdFx0ZGFya3NsYXRlZ3JheTogJzJGNEY0Ridcblx0XHRkYXJrc2xhdGVncmV5OiAnMkY0RjRGJ1xuXHRcdGRhcmt0dXJxdW9pc2U6ICcwMENFRDEnXG5cdFx0ZGFya3Zpb2xldDogJzk0MDBEMydcblx0XHRkZWVwcGluazogJ0ZGMTQ5Mydcblx0XHRkZWVwc2t5Ymx1ZTogJzAwQkZGRidcblx0XHRkaW1ncmF5OiAnNjk2OTY5J1xuXHRcdGRpbWdyZXk6ICc2OTY5NjknXG5cdFx0ZG9kZ2VyYmx1ZTogJzFFOTBGRidcblx0XHRmaXJlYnJpY2s6ICdCMjIyMjInXG5cdFx0ZmxvcmFsd2hpdGU6ICdGRkZBRjAnXG5cdFx0Zm9yZXN0Z3JlZW46ICcyMjhCMjInXG5cdFx0ZnVjaHNpYTogJ0ZGMDBGRidcblx0XHRnYWluc2Jvcm86ICdEQ0RDREMnXG5cdFx0Z2hvc3R3aGl0ZTogJ0Y4RjhGRidcblx0XHRnb2xkOiAnRkZENzAwJ1xuXHRcdGdvbGRlbnJvZDogJ0RBQTUyMCdcblx0XHRncmF5OiAnODA4MDgwJ1xuXHRcdGdyZXk6ICc4MDgwODAnXG5cdFx0Z3JlZW46ICcwMDgwMDAnXG5cdFx0Z3JlZW55ZWxsb3c6ICdBREZGMkYnXG5cdFx0aG9uZXlkZXc6ICdGMEZGRjAnXG5cdFx0aG90cGluazogJ0ZGNjlCNCdcblx0XHRpbmRpYW5yZWQ6ICdDRDVDNUMnXG5cdFx0aW5kaWdvOiAnNEIwMDgyJ1xuXHRcdGl2b3J5OiAnRkZGRkYwJ1xuXHRcdGtoYWtpOiAnRjBFNjhDJ1xuXHRcdGxhdmVuZGVyOiAnRTZFNkZBJ1xuXHRcdGxhdmVuZGVyYmx1c2g6ICdGRkYwRjUnXG5cdFx0bGF3bmdyZWVuOiAnN0NGQzAwJ1xuXHRcdGxlbW9uY2hpZmZvbjogJ0ZGRkFDRCdcblx0XHRsaWdodGJsdWU6ICdBREQ4RTYnXG5cdFx0bGlnaHRjb3JhbDogJ0YwODA4MCdcblx0XHRsaWdodGN5YW46ICdFMEZGRkYnXG5cdFx0bGlnaHRnb2xkZW5yb2R5ZWxsb3c6ICdGQUZBRDInXG5cdFx0bGlnaHRncmF5OiAnRDNEM0QzJ1xuXHRcdGxpZ2h0Z3JleTogJ0QzRDNEMydcblx0XHRsaWdodGdyZWVuOiAnOTBFRTkwJ1xuXHRcdGxpZ2h0cGluazogJ0ZGQjZDMSdcblx0XHRsaWdodHNhbG1vbjogJ0ZGQTA3QSdcblx0XHRsaWdodHNlYWdyZWVuOiAnMjBCMkFBJ1xuXHRcdGxpZ2h0c2t5Ymx1ZTogJzg3Q0VGQSdcblx0XHRsaWdodHNsYXRlZ3JheTogJzc3ODg5OSdcblx0XHRsaWdodHNsYXRlZ3JleTogJzc3ODg5OSdcblx0XHRsaWdodHN0ZWVsYmx1ZTogJ0IwQzRERSdcblx0XHRsaWdodHllbGxvdzogJ0ZGRkZFMCdcblx0XHRsaW1lOiAnMDBGRjAwJ1xuXHRcdGxpbWVncmVlbjogJzMyQ0QzMidcblx0XHRsaW5lbjogJ0ZBRjBFNidcblx0XHRtYWdlbnRhOiAnRkYwMEZGJ1xuXHRcdG1hcm9vbjogJzgwMDAwMCdcblx0XHRtZWRpdW1hcXVhbWFyaW5lOiAnNjZDREFBJ1xuXHRcdG1lZGl1bWJsdWU6ICcwMDAwQ0QnXG5cdFx0bWVkaXVtb3JjaGlkOiAnQkE1NUQzJ1xuXHRcdG1lZGl1bXB1cnBsZTogJzkzNzBEOCdcblx0XHRtZWRpdW1zZWFncmVlbjogJzNDQjM3MSdcblx0XHRtZWRpdW1zbGF0ZWJsdWU6ICc3QjY4RUUnXG5cdFx0bWVkaXVtc3ByaW5nZ3JlZW46ICcwMEZBOUEnXG5cdFx0bWVkaXVtdHVycXVvaXNlOiAnNDhEMUNDJ1xuXHRcdG1lZGl1bXZpb2xldHJlZDogJ0M3MTU4NSdcblx0XHRtaWRuaWdodGJsdWU6ICcxOTE5NzAnXG5cdFx0bWludGNyZWFtOiAnRjVGRkZBJ1xuXHRcdG1pc3R5cm9zZTogJ0ZGRTRFMSdcblx0XHRtb2NjYXNpbjogJ0ZGRTRCNSdcblx0XHRuYXZham93aGl0ZTogJ0ZGREVBRCdcblx0XHRuYXZ5OiAnMDAwMDgwJ1xuXHRcdG9sZGxhY2U6ICdGREY1RTYnXG5cdFx0b2xpdmU6ICc4MDgwMDAnXG5cdFx0b2xpdmVkcmFiOiAnNkI4RTIzJ1xuXHRcdG9yYW5nZTogJ0ZGQTUwMCdcblx0XHRvcmFuZ2VyZWQ6ICdGRjQ1MDAnXG5cdFx0b3JjaGlkOiAnREE3MEQ2J1xuXHRcdHBhbGVnb2xkZW5yb2Q6ICdFRUU4QUEnXG5cdFx0cGFsZWdyZWVuOiAnOThGQjk4J1xuXHRcdHBhbGV0dXJxdW9pc2U6ICdBRkVFRUUnXG5cdFx0cGFsZXZpb2xldHJlZDogJ0Q4NzA5Mydcblx0XHRwYXBheWF3aGlwOiAnRkZFRkQ1J1xuXHRcdHBlYWNocHVmZjogJ0ZGREFCOSdcblx0XHRwZXJ1OiAnQ0Q4NTNGJ1xuXHRcdHBpbms6ICdGRkMwQ0InXG5cdFx0cGx1bTogJ0REQTBERCdcblx0XHRwb3dkZXJibHVlOiAnQjBFMEU2J1xuXHRcdHB1cnBsZTogJzgwMDA4MCdcblx0XHRyZWJlY2NhcHVycGxlOiAnNjYzMzk5J1xuXHRcdHJlZDogJ0ZGMDAwMCdcblx0XHRyb3N5YnJvd246ICdCQzhGOEYnXG5cdFx0cm95YWxibHVlOiAnNDE2OUUxJ1xuXHRcdHNhZGRsZWJyb3duOiAnOEI0NTEzJ1xuXHRcdHNhbG1vbjogJ0ZBODA3Midcblx0XHRzYW5keWJyb3duOiAnRjRBNDYwJ1xuXHRcdHNlYWdyZWVuOiAnMkU4QjU3J1xuXHRcdHNlYXNoZWxsOiAnRkZGNUVFJ1xuXHRcdHNpZW5uYTogJ0EwNTIyRCdcblx0XHRzaWx2ZXI6ICdDMEMwQzAnXG5cdFx0c2t5Ymx1ZTogJzg3Q0VFQidcblx0XHRzbGF0ZWJsdWU6ICc2QTVBQ0QnXG5cdFx0c2xhdGVncmF5OiAnNzA4MDkwJ1xuXHRcdHNsYXRlZ3JleTogJzcwODA5MCdcblx0XHRzbm93OiAnRkZGQUZBJ1xuXHRcdHNwcmluZ2dyZWVuOiAnMDBGRjdGJ1xuXHRcdHN0ZWVsYmx1ZTogJzQ2ODJCNCdcblx0XHR0YW46ICdEMkI0OEMnXG5cdFx0dGVhbDogJzAwODA4MCdcblx0XHR0aGlzdGxlOiAnRDhCRkQ4J1xuXHRcdHRvbWF0bzogJ0ZGNjM0Nydcblx0XHR0dXJxdW9pc2U6ICc0MEUwRDAnXG5cdFx0dmlvbGV0OiAnRUU4MkVFJ1xuXHRcdHdoZWF0OiAnRjVERUIzJ1xuXHRcdHdoaXRlOiAnRkZGRkZGJ1xuXHRcdHdoaXRlc21va2U6ICdGNUY1RjUnXG5cdFx0eWVsbG93OiAnRkZGRjAwJ1xuXHRcdHllbGxvd2dyZWVuOiAnOUFDRDMyJ1xuXG5cblxuIixudWxsLCJwbGVhc2UuQ29sb3IgPSAoY29sb3IpIC0+IG5ldyBDb2xvciBjb2xvclxuXG5QSEkgPSAwLjYxODAzMzk4ODc0OTg5NVxuXG5tYWtlQ29sb3JEZWZhdWx0cyA9XG5cdGh1ZTogbnVsbFxuXHRzYXR1cmF0aW9uOiBudWxsXG5cdHZhbHVlOiBudWxsXG5cdGJhc2VfY29sb3I6ICcnXG5cdGJhc2VDb2xvcjogJydcblx0Z3JleXNjYWxlOiBmYWxzZVxuXHRncmF5c2NhbGU6IGZhbHNlICN3aGF0ZXZlciBJIHN1cHBvcnQgdGhlbSBib3RoLCBtdXJyaWNhXG5cdGdvbGRlbjogdHJ1ZVxuXHRmdWxsX3JhbmRvbTogZmFsc2Vcblx0ZnVsbFJhbmRvbTogZmFsc2Vcblx0Y29sb3JzX3JldHVybmVkOiAxXG5cdGNvbG9yc1JldHVybmVkOiAxXG5cdGZvcm1hdDogbnVsbFxuXG5wbGVhc2UuZ2VuZXJhdGVGcm9tQmFzZUNvbG9yID0gKGJhc2VDb2xvcikgLT5cblx0Y29sb3IgPSBuZXcgQ29sb3IoKVxuXHRiYXNlID0gbmV3IENvbG9yIGJhc2VDb2xvclxuXHRjb2xvci5odWUgY2xhbXAoXy5yYW5kb20oYmFzZS5odWUoKSAtIDUsIGJhc2UuaHVlKCkgKyA1KSwgMCwgMzYwKVxuXHRpZiBiYXNlLnNhdHVyYXRpb24oKSBpcyAwIHRoZW4gY29sb3Iuc2F0dXJhdGlvbiAwXG5cdGVsc2UgY29sb3Iuc2F0dXJhdGlvbiBfLnJhbmRvbSgwLjQsIDAuODUsIHRydWUpXG5cdGNvbG9yLnZhbHVlIF8ucmFuZG9tKDAuNCwgMC44NSwgdHJ1ZSlcblx0cmV0dXJuIGNvbG9yXG5cbnBsZWFzZS5nZW5lcmF0ZSA9IHBsZWFzZS5nZW5lcmF0ZUdvbGRlbiA9IC0+XG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0aHVlID0gXy5yYW5kb20gMCwgMzU5XG5cdGNvbG9yLmh1ZSAoKGh1ZSArIChodWUvUEhJKSkgJSAzNjApXG5cdGNvbG9yLnNhdHVyYXRpb24gXy5yYW5kb20oMC40LCAwLjg1LCB0cnVlKVxuXHRjb2xvci52YWx1ZSBfLnJhbmRvbSgwLjQsIDAuODUsIHRydWUpXG5cdHJldHVybiBjb2xvclxuXG5wbGVhc2UuZ2VuZXJhdGVSYW5kb20gPSAtPlxuXHRjb2xvciA9IG5ldyBDb2xvcigpXG5cdGNvbG9yLmh1ZSBfLnJhbmRvbSgwLCAzNTkpXG5cdGNvbG9yLnNhdHVyYXRpb24gXy5yYW5kb20oMCwgMS4wLCB0cnVlKVxuXHRjb2xvci52YWx1ZSBfLnJhbmRvbSgwLCAxLjAsIHRydWUpXG5cdHJldHVybiBjb2xvclxuXG5kZXByZWNhdGlvbkxheWVyID0gKG9wdGlvbnMpIC0+XG5cdGlmIG9wdGlvbnMuYmFzZV9jb2xvciBpc250IG1ha2VDb2xvckRlZmF1bHRzLmJhc2VDb2xvclxuXHRcdGNvbnNvbGUud2FybiAnVGhlIG9wdGlvbiBiYXNlX2NvbG9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgYmFzZUNvbG9yIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuYmFzZUNvbG9yID0gb3B0aW9ucy5iYXNlX2NvbG9yXG5cblx0aWYgb3B0aW9ucy5mdWxsX3JhbmRvbSBpc250IG1ha2VDb2xvckRlZmF1bHRzLmZ1bGxSYW5kb21cblx0XHRjb25zb2xlLndhcm4gJ1RoZSBvcHRpb24gZnVsbF9yYW5kb20gaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBmdWxsUmFuZG9tIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuZnVsbFJhbmRvbSA9IG9wdGlvbnMuZnVsbF9yYW5kb21cblxuXHRpZiBvcHRpb25zLmNvbG9yc19yZXR1cm5lZCBpc250IG1ha2VDb2xvckRlZmF1bHRzLmNvbG9yc1JldHVybmVkXG5cdFx0Y29uc29sZS53YXJuICdUaGUgb3B0aW9uIGNvbG9yc19yZXR1cm5lZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIGNvbG9yc1JldHVybmVkIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuY29sb3JzUmV0dXJuZWQgPSBvcHRpb25zLmNvbG9yc19yZXR1cm5lZFxuXG5cdHJldHVybiBvcHRpb25zXG5cbiNyZW1vdmUgbWFrZV9jb2xvciBhZnRlciAzIG1vbnRocyBpbiB0aGUgd2lsZFxucGxlYXNlLm1ha2VfY29sb3IgPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRjb25zb2xlLndhcm4gJ1RoZSBmdW5jdGlvbiBtYWtlX2NvbG9yKCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBtYWtlQ29sb3IoKSBpbnN0ZWFkLidcblx0cGxlYXNlLm1ha2VDb2xvciBvcHRpb25zXG5cdHJldHVyblxuXG5wbGVhc2UubWFrZUNvbG9yID0gKG9wdGlvbnMgPSB7fSkgLT5cblx0I3JlbW92ZSBkZXByZWNhdGlvbkxheWVyIGFmdGVyIDMgbW9udGhzIGluIHRoZSB3aWxkXG5cdG9wdHMgPSBkZXByZWNhdGlvbkxheWVyIF8uZGVmYXVsdHMobWFrZUNvbG9yRGVmYXVsdHMsIG9wdGlvbnMpXG5cdGNvbG9ycyA9IFtdXG5cdGZvciBpIGluIFswLi5vcHRzLmNvbG9yc1JldHVybmVkXSBieSAxXG5cdFx0Y29sb3JzW2ldID0gcGxlYXNlLmdlbmVyYXRlKClcblx0XHQjcmVtb3ZlIG92ZXJ3cml0ZXMgYWZ0ZXIgMyBtb250aHMgaW4gdGhlIHdpbGRcblx0XHQjb3ZlcndyaXRlIHZhbHVlcyBpZiBvcHRpb24gZXhpc3RzIHRvXG5cdFx0aWYgb3B0cy5odWU/IGFuZCBfLmlzTnVtYmVyKG9wdHMuaHVlKSB0aGVuIGNvbG9yc1tpXS5odWUgb3B0cy5odWVcblx0XHRpZiBvcHRzLnNhdHVyYXRpb24/IGFuZCBfLmlzTnVtYmVyKG9wdHMuc2F0dXJhdGlvbikgdGhlbiBjb2xvcnNbaV0uc2F0dXJhdGlvbiBvcHRzLnNhdHVyYXRpb25cblx0XHRpZiBvcHRzLnZhbHVlPyBhbmQgXy5pc051bWJlcihvcHRzLnZhbHVlKSB0aGVuIGNvbG9yc1tpXS52YWx1ZSBvcHRzLnZhbHVlXG5cdFx0c3dpdGNoIG9wdHMuZm9ybWF0LnRvTG93ZXJDYXNlKClcblx0XHRcdHdoZW4gJ2hleCcgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaGV4KClcblx0XHRcdHdoZW4gJ3JnYicgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0ucmdiU3RyaW5nKClcblx0XHRcdHdoZW4gJ2hzbCcgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaHNsU3RyaW5nKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29uc29sZS53YXJuICdVbmtub3duIGZvcm1hdC4gRGVmYXVsdGluZyB0byBoZXguJ1xuXHRcdFx0XHRjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaGV4KClcblx0cmV0dXJuIGNvbG9yc1xuXG4jcmVtb3ZlIG1ha2Vfc2NoZW1lIGFmdGVyIDMgbW9udGhzIGluIHRoZSB3aWxkXG5wbGVhc2UubWFrZV9zY2hlbWUgPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRjb25zb2xlLndhcm4gJ1RoZSBmdW5jdGlvbiBtYWtlX3NjaGVtZSgpIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiB1c2UgbWFrZVNjaGVtZSgpIGluc3RlYWQuJ1xuXHRwbGVhc2UubWFrZVNjaGVtZSBvcHRpb25zXG5cdHJldHVyblxuXG5wbGVhc2UubWFrZVNjaGVtZSA9IChvcHRpb25zID0ge30pIC0+XG5cdHNjaGVtZSA9IFtdXG5cdHJldHVybiBzY2hlbWUiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
