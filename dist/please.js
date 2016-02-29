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
    this._hslToHsv = bind(this._hslToHsv, this);
    this._hsvToHsl = bind(this._hsvToHsl, this);
    this._hsvToHex = bind(this._hsvToHex, this);
    this._rgbToHex = bind(this._rgbToHex, this);
    this._hexToHsv = bind(this._hexToHsv, this);
    this._hexToRgb = bind(this._hexToRgb, this);
    this._hsvToRgb = bind(this._hsvToRgb, this);
    this._rgbToHsv = bind(this._rgbToHsv, this);
    this._detectType = bind(this._detectType, this);
    this.mix = bind(this.mix, this);
    this.contrast = bind(this.contrast, this);
    this.getHtmlColors = bind(this.getHtmlColors, this);
    this.getHtmlColor = bind(this.getHtmlColor, this);
    this.html = bind(this.html, this);
    this.hex = bind(this.hex, this);
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
      }
    } else {
      this.__model = {
        h: 0,
        s: 0,
        v: 0
      };
    }
  }

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

  Color.prototype.hue = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.h = _.clamp(value, 0, 360);
      return this;
    }
    return this.__model.h;
  };

  Color.prototype.saturation = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.s = _.clamp(value);
      return this;
    }
    return this.__model.s;
  };

  Color.prototype.sat = Color.prototype.saturation;

  Color.prototype.value = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.v = _.clamp(value);
      return this;
    }
    return this.__model.v;
  };

  Color.prototype.val = Color.prototype.value;

  Color.prototype.brightness = Color.prototype.value;

  Color.prototype.alpha = function(value) {
    if ((value != null) && _.isNumber(value)) {
      this.__model.a = _.clamp(value);
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
      return "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
    }
    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + this.__model.a + ")";
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
    } else {
      return false;
    }
  };

  Color.prototype.mix = function(color, amount) {
    var remainder;
    if (amount == null) {
      amount = 0.5;
    }
    amount = _.clamp(amount, 0, 1);
    remainder = 1 - amount;
    this.hue((this.hue() * remainder) + (color.hue() * amount));
    this.sat((this.sat() + color.sat()) / 2);
    this.val((this.val() + color.val()) / 2);
    return this;
  };

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
    throw new Error('Not a valid color type.');
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
  fillRandom: false,
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
  if (options.base_color !== '') {
    console.warn('The option base_color is deprecated and will be removed soon. Use baseColor instead.');
    options.baseColor = options.base_color;
  }
  if (options.full_random !== false) {
    console.warn('The option full_random is deprecated and will be removed soon. Use fullRandom instead.');
    options.fullRandom = options.full_random;
  }
  if (options.colors_returned !== 1) {
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
if ( typeof define === 'function' && define.amd ){
		define(please);
	}
	else if ( typeof module === 'object' && module.exports ){
		module.exports = please;
	}
	this.please = please;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbG9yLmNvZmZlZSIsIlV0aWxpdHkuanMiLCJtYWluLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTs7QUFBTTtFQUNRLGVBQUMsS0FBRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNaLElBQUcsYUFBSDtBQUNDLGNBQU8sSUFBQyxDQUFBLFdBQUQsQ0FBYSxLQUFiLENBQVA7QUFBQSxhQUNNLEtBRE47VUFFRSxJQUFDLENBQUEsT0FBRCxHQUNDO1lBQUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUFUO1lBQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQURUO1lBRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxDQUZUOztBQUZHO0FBRE4sYUFNTSxLQU5OO1VBTWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBTk4sYUFPTSxLQVBOO1VBT2lCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBQXRCO0FBUE4sYUFRTSxLQVJOO1VBUWlCLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBVyxLQUFYO0FBUjVCLE9BREQ7S0FBQSxNQUFBO01BV0MsSUFBQyxDQUFBLE9BQUQsR0FDQztRQUFBLENBQUEsRUFBRyxDQUFIO1FBQ0EsQ0FBQSxFQUFHLENBREg7UUFFQSxDQUFBLEVBQUcsQ0FGSDtRQVpGOztFQURZOztrQkFpQmIsTUFBQSxHQUFRLFNBQUMsS0FBRDtJQUNQLElBQWUsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxLQUFYLENBQUEsSUFBc0IsaUJBQXRCLElBQW1DLGlCQUFuQyxJQUFnRCxpQkFBL0Q7QUFBQSxhQUFPLEtBQVA7O0FBQ0EsV0FBTztFQUZBOztrQkFJUixNQUFBLEdBQVEsU0FBQyxLQUFEO0lBQ1AsSUFBZSxDQUFDLENBQUMsUUFBRixDQUFXLEtBQVgsQ0FBQSxJQUFzQixpQkFBdEIsSUFBbUMs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QUMsUUFBRixDQUFXLGlCQUFYLEVBQThCLE9BQTlCLENBQWpCO0VBQ1AsTUFBQSxHQUFTO0FBQ1QsT0FBUywwREFBVDtJQUNDLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxNQUFNLENBQUMsUUFBUCxDQUFBO0FBQ1osWUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBQSxDQUFQO0FBQUEsV0FDTSxLQUROO1FBQ2lCLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsR0FBVixDQUFBO0FBQXZCO0FBRE4sV0FFTSxLQUZOO1FBRWlCLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBVixDQUFBO0FBQXZCO0FBRk4sV0FHTSxLQUhOO1FBR2lCLE1BQU8sQ0FBQSxDQUFBLENBQVAsR0FBWSxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsU0FBVixDQUFBO0FBQXZCO0FBSE47UUFLRSxPQUFPLENBQUMsSUFBUixDQUFhLG9DQUFiO1FBQ0EsTUFBTyxDQUFBLENBQUEsQ0FBUCxHQUFZLE1BQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxHQUFWLENBQUE7QUFOZDtBQUZEO0FBV0EsU0FBTztBQWZXIiwiZmlsZSI6InBsZWFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbG9yXG5cdGNvbnN0cnVjdG9yOiAoY29sb3IpIC0+XG5cdFx0aWYgY29sb3I/XG5cdFx0XHRzd2l0Y2ggQF9kZXRlY3RUeXBlIGNvbG9yXG5cdFx0XHRcdHdoZW4gJ0hTVidcblx0XHRcdFx0XHRAX19tb2RlbCA9XG5cdFx0XHRcdFx0XHRoOiBjb2xvci5oXG5cdFx0XHRcdFx0XHRzOiBjb2xvci5zXG5cdFx0XHRcdFx0XHR2OiBjb2xvci52XG5cdFx0XHRcdHdoZW4gJ0hTTCcgdGhlbiBAX19tb2RlbCA9IEBfaHNsVG9Ic3YgY29sb3Jcblx0XHRcdFx0d2hlbiAnUkdCJyB0aGVuIEBfX21vZGVsID0gQF9yZ2JUb0hzdiBjb2xvclxuXHRcdFx0XHR3aGVuICdIRVgnIHRoZW4gQF9fbW9kZWwgPSBAX2hleFRvSHN2IGNvbG9yXG5cdFx0ZWxzZVxuXHRcdFx0QF9fbW9kZWwgPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogMFxuXG5cdF9pc0hzdjogKGNvbG9yKSAtPlxuXHRcdHJldHVybiB0cnVlIGlmIF8uaXNPYmplY3QoY29sb3IpIGFuZCBjb2xvci5oPyBhbmQgY29sb3Iucz8gYW5kIGNvbG9yLnY/XG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0X2lzSHNsOiAoY29sb3IpIC0+XG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc09iamVjdChjb2xvcikgYW5kIGNvbG9yLmg/IGFuZCBjb2xvci5zPyBhbmQgY29sb3IubD9cblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIc2xTdHJpbmc6IChjb2xvcikgLT5cblx0XHRoc2xUZXN0ID0gL2hzbFxcKHM/ZHsxLDN9LHM/ZHsxLDN9JSxzP2R7MSwzfSVzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc1N0cmluZyhjb2xvcikgYW5kIGhzbFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNSZ2I6IChjb2xvcikgLT5cblx0XHRyZXR1cm4gdHJ1ZSBpZiBfLmlzT2JqZWN0KGNvbG9yKSBhbmQgY29sb3Iucj8gYW5kIGNvbG9yLmc/IGFuZCBjb2xvci5iP1xuXHRcdHJldHVybiBmYWxzZVxuXG5cdF9pc1JnYlN0cmluZzogKGNvbG9yKSAtPlxuXHRcdHJnYlRlc3QgPSAvcmdiXFwoXFxzPyhcXGR7MSwzfSxcXHM/KXsyfVxcZHsxLDN9XFxzP1xcKS9pXG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc1N0cmluZyhjb2xvcikgYW5kIHJnYlRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfaXNIZXg6IChjb2xvcikgLT5cblx0XHRoZXhUZXN0ID0gL14jPyg/OlswLTlhLWZdezN9KXsxLDJ9JC9pXG5cdFx0cmV0dXJuIHRydWUgaWYgXy5pc1N0cmluZyhjb2xvcikgYW5kIGhleFRlc3QudGVzdChjb2xvcilcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRodWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC5oID0gXy5jbGFtcCB2YWx1ZSwgMCwgMzYwXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5oXG5cblx0c2F0dXJhdGlvbjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgXy5pc051bWJlcih2YWx1ZSlcblx0XHRcdEBfX21vZGVsLnMgPSBfLmNsYW1wIHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX19tb2RlbC5zXG5cblx0c2F0OiBAOjpzYXR1cmF0aW9uXG5cblx0dmFsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRAX19tb2RlbC52ID0gXy5jbGFtcCB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWwudlxuXG5cdHZhbDogQDo6dmFsdWVcblxuXHRicmlnaHRuZXNzOiBAOjp2YWx1ZVxuXG5cdGFscGhhOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBfLmlzTnVtYmVyKHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwuYSA9IF8uY2xhbXAgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfX21vZGVsLmFcblxuXHRvcGFjaXR5OiBAOjphbHBoYVxuXG5cdHJlZDogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlPyBhbmQgXy5pc051bWJlcih2YWx1ZSlcblx0XHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRcdHJnYi5yID0gXy5jbGFtcCB2YWx1ZSwgMCwgMjU1XG5cdFx0XHRAX19tb2RlbCA9IEBfcmdiVG9Ic3YgcmdiXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiKEBfX21vZGVsKS5yXG5cblx0Z3JlZW46ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuZyA9IF8uY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuZ1xuXG5cdGJsdWU6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIF8uaXNOdW1iZXIodmFsdWUpXG5cdFx0XHRyZ2IgPSBAX2hzdlRvUmdiIEBfX21vZGVsXG5cdFx0XHRyZ2IuYiA9IF8uY2xhbXAgdmFsdWUsIDAsIDI1NVxuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHJnYlxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9oc3ZUb1JnYihAX19tb2RlbCkuYlxuXG5cdHJnYjogKHZhbHVlKSA9PlxuXHRcdGlmIHZhbHVlP1xuXHRcdFx0QF9fbW9kZWwgPSBAX3JnYlRvSHN2IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdHJldHVybiBAX2hzdlRvUmdiIEBfX21vZGVsXG5cblx0cmdiU3RyaW5nOiA9PlxuXHRcdHJnYiA9IEBfaHN2VG9SZ2IgQF9fbW9kZWxcblx0XHRyZXR1cm4gXCJyZ2IoI3tyZ2Iucn0sI3tyZ2IuZ30sI3tyZ2IuYn0pXCIgaWYgbm90IEBfX21vZGVsLmE/XG5cdFx0cmV0dXJuIFwicmdiYSgje3JnYi5yfSwje3JnYi5nfSwje3JnYi5ifSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHNsOiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/XG5cdFx0XHRAX19tb2RlbCA9IEBfaHNsVG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9Ic2wgQF9fbW9kZWxcblxuXHRoc2xTdHJpbmc6ID0+XG5cdFx0aHNsID0gQF9oc3ZUb0hzbCBAX19tb2RlbFxuXHRcdHJldHVybiBcImhzbCgje2hzbC5ofSwje2hzbC5zICogMTAwfSUsI3toc2wubCAqIDEwMH0lKVwiIGlmIG5vdCBAX19tb2RlbC5hP1xuXHRcdHJldHVybiBcImhzbGEoI3toc2wuaH0sI3toc2wucyAqIDEwMH0lLCN7aHNsLmwgKiAxMDB9JSwje0BfX21vZGVsLmF9KVwiXG5cblx0aHN2OiAodmFsdWUpID0+XG5cdFx0aWYgdmFsdWU/IGFuZCBAX2lzSHN2KHZhbHVlKVxuXHRcdFx0QF9fbW9kZWwgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRyZXR1cm4gQF9fbW9kZWxcblxuXHRoZXg6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT8gYW5kIEBfaXNIZXgodmFsdWUpXG5cdFx0XHRAX19tb2RlbCA9IEBfaGV4VG9Ic3YgdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0cmV0dXJuIEBfaHN2VG9IZXggQF9fbW9kZWxcblxuXHRodG1sOiAodmFsdWUpID0+XG5cdFx0QF9fbW9kZWwgPSBAX2hleFRvSHN2IEBnZXRIdG1sQ29sb3IodmFsdWUpXG5cdFx0cmV0dXJuIHRoaXNcblxuXHRnZXRIdG1sQ29sb3I6ICh2YWx1ZSkgPT5cblx0XHRpZiB2YWx1ZT9cblx0XHRcdGNvbG9yTmFtZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKVxuXHRcdFx0aWYgQF9odG1sQ29sb3JzW2NvbG9yTmFtZV0/IHRoZW4gcmV0dXJuIEBfaHRtbENvbG9yc1tjb2xvck5hbWVdXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIVE1MIGNvbG9yLidcblxuXG5cdGdldEh0bWxDb2xvcnM6ID0+IEBfaHRtbENvbG9yc1xuXG5cdCN0cnVlIGZvciB3aGl0ZSBmYWxzZSBmb3IgYmxhY2tcblx0Y29udHJhc3Q6ID0+XG5cdFx0cmdiID0gQHJnYigpXG5cdFx0eWlxUiA9IHJnYi5yICogMjk5XG5cdFx0eWlxRyA9IHJnYi5nICogNTg3XG5cdFx0eWlxQiA9IHJnYi5iICogMTE0XG5cdFx0eWlxID0gKHlpcVIgKyB5aXFHICsgeWlxQikvMTAwMFxuXHRcdGlmIHlpcSA8IDEyOCB0aGVuIHJldHVybiB0cnVlIGVsc2UgcmV0dXJuIGZhbHNlXG5cblx0bWl4OiAoY29sb3IsIGFtb3VudCA9IDAuNSkgPT5cblx0XHRhbW91bnQgPSBfLmNsYW1wIGFtb3VudCwgMCwgMVxuXHRcdHJlbWFpbmRlciA9IDEgLSBhbW91bnRcblx0XHRAaHVlIChAaHVlKCkgKiByZW1haW5kZXIpICsgKGNvbG9yLmh1ZSgpICogYW1vdW50KVxuXHRcdEBzYXQgKEBzYXQoKSArIGNvbG9yLnNhdCgpKS8yXG5cdFx0QHZhbCAoQHZhbCgpICsgY29sb3IudmFsKCkpLzJcblx0XHRyZXR1cm4gdGhpc1xuXG5cdF9kZXRlY3RUeXBlOiAoY29sb3IpID0+XG5cdFx0aWYgQF9pc0hzdiBjb2xvciB0aGVuIHJldHVybiAnSFNWJ1xuXHRcdGlmIEBfaXNIc2wgY29sb3IgdGhlbiByZXR1cm4gJ0hTTCdcblx0XHRpZiBAX2lzUmdiIGNvbG9yIHRoZW4gcmV0dXJuICdSR0InXG5cdFx0aWYgQF9pc1JnYlN0cmluZyBjb2xvciB0aGVuIHJldHVybiAnUkdCX1NUUklORydcblx0XHRpZiBAX2lzSGV4IGNvbG9yIHRoZW4gcmV0dXJuICdIRVgnXG5cdFx0dGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBjb2xvciB0eXBlLidcblxuXHRfcmdiVG9Ic3Y6IChyZ2IpID0+XG5cdFx0aWYgbm90IEBfaXNSZ2IgcmdiIHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBSR0Igb2JqZWN0Lidcblx0XHRyID0gcmdiLnIgLyAyNTVcblx0XHRnID0gcmdiLmcgLyAyNTVcblx0XHRiID0gcmdiLmIgLyAyNTVcblx0XHRtaW5SZ2IgPSBNYXRoLm1pbiByLCBNYXRoLm1pbihnLCBiKVxuXHRcdG1heFJnYiA9IE1hdGgubWF4IHIsIE1hdGgubWF4KGcsIGIpXG5cdFx0I0JsYWNrLWdyYXktd2hpdGVcblx0XHRpZiBtaW5SZ2IgaXMgbWF4UmdiXG5cdFx0XHRoc3ZPYmogPVxuXHRcdFx0XHRoOiAwXG5cdFx0XHRcdHM6IDBcblx0XHRcdFx0djogbWluUmdiXG5cdFx0XHRyZXR1cm4gaHN2T2JqXG5cdFx0I0NvbG9ycyBvdGhlciB0aGFuIGJsYWNrLWdyYXktd2hpdGU6XG5cdFx0ZCA9IGlmIHIgaXMgbWluUmdiIHRoZW4gZyAtIGIgZWxzZSBpZiBiIGlzIG1pblJnYiB0aGVuIHIgLSBnIGVsc2UgYiAtIHJcblx0XHRoID0gaWYgciBpcyBtaW5SZ2IgdGhlbiAzIGVsc2UgaWYgYiBpcyBtaW5SZ2IgdGhlbiAxIGVsc2UgNVxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiA2MCAqIChoIC0gZC8obWF4UmdiIC0gbWluUmdiKSlcblx0XHRcdHM6IChtYXhSZ2IgLSBtaW5SZ2IpL21heFJnYlxuXHRcdFx0djogbWF4UmdiXG5cdFx0cmV0dXJuIGhzdk9ialxuXG5cdF9oc3ZUb1JnYjogKGhzdikgPT5cblx0XHRpZiBub3QgQF9pc0hzdiBoc3YgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIEhTViBvYmplY3QuJ1xuXHRcdGggPSBoc3YuaCAlIDM2MFxuXHRcdHMgPSBoc3Yuc1xuXHRcdHYgPSBoc3YudlxuXG5cdFx0I25vIHNhdHVyYXRpb24gY2FzZVxuXHRcdGlmIHMgaXMgMFxuXHRcdFx0Y29tcHV0ZWRWID0gdiAqIDI1NVxuXHRcdFx0cmdiT2JqID1cblx0XHRcdFx0cjogY29tcHV0ZWRWXG5cdFx0XHRcdGc6IGNvbXB1dGVkVlxuXHRcdFx0XHRiOiBjb21wdXRlZFZcblx0XHRcdHJldHVybiByZ2JPYmpcblxuXHRcdGggLz0gNjBcblx0XHRpID0gTWF0aC5mbG9vciBoXG5cdFx0ZiA9IGggLSBpXG5cdFx0cCA9IHYgKiAoMSAtIHMpXG5cdFx0cSA9IHYgKiAoMSAtIHMgKiBmKVxuXHRcdHQgPSB2ICogKDEgLSBzICogKDEgLSBmKSlcblxuXHRcdHN3aXRjaCBpXG5cdFx0XHR3aGVuIDBcblx0XHRcdFx0ciA9IHZcblx0XHRcdFx0ZyA9IHRcblx0XHRcdFx0YiA9IHBcblx0XHRcdHdoZW4gMVxuXHRcdFx0XHRyID0gcVxuXHRcdFx0XHRnID0gdlxuXHRcdFx0XHRiID0gcFxuXHRcdFx0d2hlbiAyXG5cdFx0XHRcdHIgPSBwXG5cdFx0XHRcdGcgPSB2XG5cdFx0XHRcdGIgPSB0XG5cdFx0XHR3aGVuIDNcblx0XHRcdFx0ciA9IHBcblx0XHRcdFx0ZyA9IHFcblx0XHRcdFx0YiA9IHZcblx0XHRcdHdoZW4gNFxuXHRcdFx0XHRyID0gdFxuXHRcdFx0XHRnID0gcFxuXHRcdFx0XHRiID0gdlxuXHRcdFx0d2hlbiA1XG5cdFx0XHRcdHIgPSB2XG5cdFx0XHRcdGcgPSBwXG5cdFx0XHRcdGIgPSBxXG5cblx0XHRyZ2JPYmogPVxuXHRcdFx0cjogTWF0aC5mbG9vciByICogMjU1XG5cdFx0XHRnOiBNYXRoLmZsb29yIGcgKiAyNTVcblx0XHRcdGI6IE1hdGguZmxvb3IgYiAqIDI1NVxuXG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb1JnYjogKGhleCkgPT5cblx0XHRpZiBub3QgQF9pc0hleCBoZXggdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIGhleCBzdHJpbmcuJ1xuXHRcdCNleHBhbmQgdG8gbG9uZyB2ZXJzaW9uXG5cdFx0aGV4ID0gaGV4LnJlcGxhY2UgL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSwgKG0sIHIsIGcsIGIpIC0+IHIgKyByICsgZyArIGcgKyBiICsgYlxuXHRcdCNyZW1vdmUgZXZlcnl0aGluZyBleHBlY3QgdmFsaWQgbnVtYmVyc1xuXHRcdGhleCA9IGhleC5yZXBsYWNlIC9bXjAtOWEtZl0vZ2ksICcnXG5cdFx0cGFyc2VkSGV4ID0gcGFyc2VJbnQgaGV4LCAxNlxuXHRcdHJnYk9iaiA9XG5cdFx0XHRyOiAocGFyc2VkSGV4ID4+IDE2KSAmIDI1NVxuXHRcdFx0ZzogKHBhcnNlZEhleCA+PiA4KSAmIDI1NVxuXHRcdFx0YjogcGFyc2VkSGV4ICYgMjU1XG5cdFx0cmV0dXJuIHJnYk9ialxuXG5cdF9oZXhUb0hzdjogKGhleCkgPT4gQF9yZ2JUb0hzdihAX2hleFRvUmdiKGhleCkpXG5cblx0X3JnYlRvSGV4OiAocmdiKSA9PlxuXHRcdGlmIG5vdCBAX2lzUmdiKHJnYikgdGhlbiB0aHJvdyBuZXcgRXJyb3IgJ05vdCBhIHZhbGlkIFJHQiBvYmplY3QuJ1xuXHRcdGJhc2UgPSByZ2IuYiB8IChyZ2IuZyA8PCA4KSB8IChyZ2IuciA8PCAxNilcblx0XHRyZXR1cm4gXCIjI3soMHgxMDAwMDAwICsgYmFzZSkudG9TdHJpbmcoMTYpLnNsaWNlKDEpfVwiXG5cblx0X2hzdlRvSGV4OiAoaHN2KSA9PiBAX3JnYlRvSGV4KEBfaHN2VG9SZ2IoaHN2KSlcblxuXHRfaHN2VG9Ic2w6IChoc3YpID0+XG5cdFx0aWYgbm90IEBfaXNIc3YgaHN2IHRoZW4gdGhyb3cgbmV3IEVycm9yICdOb3QgYSB2YWxpZCBIU1Ygb2JqZWN0Lidcblx0XHRjb21wdXRlZEwgPSAoMiAtIGhzdi5zKSAqIGhzdi52XG5cdFx0Y29tcHV0ZWRTID0gaHN2LnMgKiBoc3YudlxuXHRcdGlmIGNvbXB1dGVkTCA8PSAxIHRoZW4gY29tcHV0ZWRTID0gY29tcHV0ZWRTIC8gY29tcHV0ZWRMXG5cdFx0ZWxzZSBjb21wdXRlZFMgPSBjb21wdXRlZFMgLyAoMiAtIGNvbXB1dGVkTClcblx0XHRjb21wdXRlZEwgPSBjb21wdXRlZEwgLyAyXG5cblx0XHRoc2xPYmogPVxuXHRcdFx0aDogaHN2Lmhcblx0XHRcdHM6IGNvbXB1dGVkU1xuXHRcdFx0bDogY29tcHV0ZWRMXG5cblx0XHRyZXR1cm4gaHNsT2JqXG5cblx0X2hzbFRvSHN2OiAoaHNsKSA9PlxuXHRcdGlmIG5vdCBAX2lzSHNsIGhzbCB0aGVuIHRocm93IG5ldyBFcnJvciAnTm90IGEgdmFsaWQgSFNMIG9iamVjdC4nXG5cdFx0aHNsLmwgKj0gMlxuXHRcdGlmIChoc2wubCA8PSAxKSB0aGVuIGhzbC5zICo9IGhzbC5sXG5cdFx0ZWxzZSBoc2wucyAqPSAoIDIgLSBoc2wubClcblx0XHRjb21wdXRlZFYgPSAoaHNsLmwgKyBoc2wucykgLyAyXG5cdFx0Y29tcHV0ZWRTID0gKDIgKiBoc2wucykgLyAoaHNsLmwgKyBoc2wucylcblxuXHRcdGhzdk9iaiA9XG5cdFx0XHRoOiBoc2wuaFxuXHRcdFx0czogY29tcHV0ZWRTXG5cdFx0XHR2OiBjb21wdXRlZFZcblxuXHRcdHJldHVybiBoc3ZPYmpcblxuXHRfaHRtbENvbG9yczpcblx0XHRhbGljZWJsdWU6ICdGMEY4RkYnXG5cdFx0YW50aXF1ZXdoaXRlOiAnRkFFQkQ3J1xuXHRcdGFxdWE6ICcwMEZGRkYnXG5cdFx0YXF1YW1hcmluZTogJzdGRkZENCdcblx0XHRhenVyZTogJ0YwRkZGRidcblx0XHRiZWlnZTogJ0Y1RjVEQydcblx0XHRiaXNxdWU6ICdGRkU0QzQnXG5cdFx0YmxhY2s6ICcwMDAwMDAnXG5cdFx0YmxhbmNoZWRhbG1vbmQ6ICdGRkVCQ0QnXG5cdFx0Ymx1ZTogJzAwMDBGRidcblx0XHRibHVldmlvbGV0OiAnOEEyQkUyJ1xuXHRcdGJyb3duOiAnQTUyQTJBJ1xuXHRcdGJ1cmx5d29vZDogJ0RFQjg4Nydcblx0XHRjYWRldGJsdWU6ICc1RjlFQTAnXG5cdFx0Y2hhcnRyZXVzZTogJzdGRkYwMCdcblx0XHRjaG9jb2xhdGU6ICdEMjY5MUUnXG5cdFx0Y29yYWw6ICdGRjdGNTAnXG5cdFx0Y29ybmZsb3dlcmJsdWU6ICc2NDk1RUQnXG5cdFx0Y29ybnNpbGs6ICdGRkY4REMnXG5cdFx0Y3JpbXNvbjogJ0RDMTQzQydcblx0XHRjeWFuOiAnMDBGRkZGJ1xuXHRcdGRhcmtibHVlOiAnMDAwMDhCJ1xuXHRcdGRhcmtjeWFuOiAnMDA4QjhCJ1xuXHRcdGRhcmtnb2xkZW5yb2Q6ICdCODg2MEInXG5cdFx0ZGFya2dyYXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZXk6ICdBOUE5QTknXG5cdFx0ZGFya2dyZWVuOiAnMDA2NDAwJ1xuXHRcdGRhcmtraGFraTogJ0JEQjc2Qidcblx0XHRkYXJrbWFnZW50YTogJzhCMDA4Qidcblx0XHRkYXJrb2xpdmVncmVlbjogJzU1NkIyRidcblx0XHRkYXJrb3JhbmdlOiAnRkY4QzAwJ1xuXHRcdGRhcmtvcmNoaWQ6ICc5OTMyQ0MnXG5cdFx0ZGFya3JlZDogJzhCMDAwMCdcblx0XHRkYXJrc2FsbW9uOiAnRTk5NjdBJ1xuXHRcdGRhcmtzZWFncmVlbjogJzhGQkM4Ridcblx0XHRkYXJrc2xhdGVibHVlOiAnNDgzRDhCJ1xuXHRcdGRhcmtzbGF0ZWdyYXk6ICcyRjRGNEYnXG5cdFx0ZGFya3NsYXRlZ3JleTogJzJGNEY0Ridcblx0XHRkYXJrdHVycXVvaXNlOiAnMDBDRUQxJ1xuXHRcdGRhcmt2aW9sZXQ6ICc5NDAwRDMnXG5cdFx0ZGVlcHBpbms6ICdGRjE0OTMnXG5cdFx0ZGVlcHNreWJsdWU6ICcwMEJGRkYnXG5cdFx0ZGltZ3JheTogJzY5Njk2OSdcblx0XHRkaW1ncmV5OiAnNjk2OTY5J1xuXHRcdGRvZGdlcmJsdWU6ICcxRTkwRkYnXG5cdFx0ZmlyZWJyaWNrOiAnQjIyMjIyJ1xuXHRcdGZsb3JhbHdoaXRlOiAnRkZGQUYwJ1xuXHRcdGZvcmVzdGdyZWVuOiAnMjI4QjIyJ1xuXHRcdGZ1Y2hzaWE6ICdGRjAwRkYnXG5cdFx0Z2FpbnNib3JvOiAnRENEQ0RDJ1xuXHRcdGdob3N0d2hpdGU6ICdGOEY4RkYnXG5cdFx0Z29sZDogJ0ZGRDcwMCdcblx0XHRnb2xkZW5yb2Q6ICdEQUE1MjAnXG5cdFx0Z3JheTogJzgwODA4MCdcblx0XHRncmV5OiAnODA4MDgwJ1xuXHRcdGdyZWVuOiAnMDA4MDAwJ1xuXHRcdGdyZWVueWVsbG93OiAnQURGRjJGJ1xuXHRcdGhvbmV5ZGV3OiAnRjBGRkYwJ1xuXHRcdGhvdHBpbms6ICdGRjY5QjQnXG5cdFx0aW5kaWFucmVkOiAnQ0Q1QzVDJ1xuXHRcdGluZGlnbzogJzRCMDA4Midcblx0XHRpdm9yeTogJ0ZGRkZGMCdcblx0XHRraGFraTogJ0YwRTY4Qydcblx0XHRsYXZlbmRlcjogJ0U2RTZGQSdcblx0XHRsYXZlbmRlcmJsdXNoOiAnRkZGMEY1J1xuXHRcdGxhd25ncmVlbjogJzdDRkMwMCdcblx0XHRsZW1vbmNoaWZmb246ICdGRkZBQ0QnXG5cdFx0bGlnaHRibHVlOiAnQUREOEU2J1xuXHRcdGxpZ2h0Y29yYWw6ICdGMDgwODAnXG5cdFx0bGlnaHRjeWFuOiAnRTBGRkZGJ1xuXHRcdGxpZ2h0Z29sZGVucm9keWVsbG93OiAnRkFGQUQyJ1xuXHRcdGxpZ2h0Z3JheTogJ0QzRDNEMydcblx0XHRsaWdodGdyZXk6ICdEM0QzRDMnXG5cdFx0bGlnaHRncmVlbjogJzkwRUU5MCdcblx0XHRsaWdodHBpbms6ICdGRkI2QzEnXG5cdFx0bGlnaHRzYWxtb246ICdGRkEwN0EnXG5cdFx0bGlnaHRzZWFncmVlbjogJzIwQjJBQSdcblx0XHRsaWdodHNreWJsdWU6ICc4N0NFRkEnXG5cdFx0bGlnaHRzbGF0ZWdyYXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzbGF0ZWdyZXk6ICc3Nzg4OTknXG5cdFx0bGlnaHRzdGVlbGJsdWU6ICdCMEM0REUnXG5cdFx0bGlnaHR5ZWxsb3c6ICdGRkZGRTAnXG5cdFx0bGltZTogJzAwRkYwMCdcblx0XHRsaW1lZ3JlZW46ICczMkNEMzInXG5cdFx0bGluZW46ICdGQUYwRTYnXG5cdFx0bWFnZW50YTogJ0ZGMDBGRidcblx0XHRtYXJvb246ICc4MDAwMDAnXG5cdFx0bWVkaXVtYXF1YW1hcmluZTogJzY2Q0RBQSdcblx0XHRtZWRpdW1ibHVlOiAnMDAwMENEJ1xuXHRcdG1lZGl1bW9yY2hpZDogJ0JBNTVEMydcblx0XHRtZWRpdW1wdXJwbGU6ICc5MzcwRDgnXG5cdFx0bWVkaXVtc2VhZ3JlZW46ICczQ0IzNzEnXG5cdFx0bWVkaXVtc2xhdGVibHVlOiAnN0I2OEVFJ1xuXHRcdG1lZGl1bXNwcmluZ2dyZWVuOiAnMDBGQTlBJ1xuXHRcdG1lZGl1bXR1cnF1b2lzZTogJzQ4RDFDQydcblx0XHRtZWRpdW12aW9sZXRyZWQ6ICdDNzE1ODUnXG5cdFx0bWlkbmlnaHRibHVlOiAnMTkxOTcwJ1xuXHRcdG1pbnRjcmVhbTogJ0Y1RkZGQSdcblx0XHRtaXN0eXJvc2U6ICdGRkU0RTEnXG5cdFx0bW9jY2FzaW46ICdGRkU0QjUnXG5cdFx0bmF2YWpvd2hpdGU6ICdGRkRFQUQnXG5cdFx0bmF2eTogJzAwMDA4MCdcblx0XHRvbGRsYWNlOiAnRkRGNUU2J1xuXHRcdG9saXZlOiAnODA4MDAwJ1xuXHRcdG9saXZlZHJhYjogJzZCOEUyMydcblx0XHRvcmFuZ2U6ICdGRkE1MDAnXG5cdFx0b3JhbmdlcmVkOiAnRkY0NTAwJ1xuXHRcdG9yY2hpZDogJ0RBNzBENidcblx0XHRwYWxlZ29sZGVucm9kOiAnRUVFOEFBJ1xuXHRcdHBhbGVncmVlbjogJzk4RkI5OCdcblx0XHRwYWxldHVycXVvaXNlOiAnQUZFRUVFJ1xuXHRcdHBhbGV2aW9sZXRyZWQ6ICdEODcwOTMnXG5cdFx0cGFwYXlhd2hpcDogJ0ZGRUZENSdcblx0XHRwZWFjaHB1ZmY6ICdGRkRBQjknXG5cdFx0cGVydTogJ0NEODUzRidcblx0XHRwaW5rOiAnRkZDMENCJ1xuXHRcdHBsdW06ICdEREEwREQnXG5cdFx0cG93ZGVyYmx1ZTogJ0IwRTBFNidcblx0XHRwdXJwbGU6ICc4MDAwODAnXG5cdFx0cmViZWNjYXB1cnBsZTogJzY2MzM5OSdcblx0XHRyZWQ6ICdGRjAwMDAnXG5cdFx0cm9zeWJyb3duOiAnQkM4RjhGJ1xuXHRcdHJveWFsYmx1ZTogJzQxNjlFMSdcblx0XHRzYWRkbGVicm93bjogJzhCNDUxMydcblx0XHRzYWxtb246ICdGQTgwNzInXG5cdFx0c2FuZHlicm93bjogJ0Y0QTQ2MCdcblx0XHRzZWFncmVlbjogJzJFOEI1Nydcblx0XHRzZWFzaGVsbDogJ0ZGRjVFRSdcblx0XHRzaWVubmE6ICdBMDUyMkQnXG5cdFx0c2lsdmVyOiAnQzBDMEMwJ1xuXHRcdHNreWJsdWU6ICc4N0NFRUInXG5cdFx0c2xhdGVibHVlOiAnNkE1QUNEJ1xuXHRcdHNsYXRlZ3JheTogJzcwODA5MCdcblx0XHRzbGF0ZWdyZXk6ICc3MDgwOTAnXG5cdFx0c25vdzogJ0ZGRkFGQSdcblx0XHRzcHJpbmdncmVlbjogJzAwRkY3Ridcblx0XHRzdGVlbGJsdWU6ICc0NjgyQjQnXG5cdFx0dGFuOiAnRDJCNDhDJ1xuXHRcdHRlYWw6ICcwMDgwODAnXG5cdFx0dGhpc3RsZTogJ0Q4QkZEOCdcblx0XHR0b21hdG86ICdGRjYzNDcnXG5cdFx0dHVycXVvaXNlOiAnNDBFMEQwJ1xuXHRcdHZpb2xldDogJ0VFODJFRSdcblx0XHR3aGVhdDogJ0Y1REVCMydcblx0XHR3aGl0ZTogJ0ZGRkZGRidcblx0XHR3aGl0ZXNtb2tlOiAnRjVGNUY1J1xuXHRcdHllbGxvdzogJ0ZGRkYwMCdcblx0XHR5ZWxsb3dncmVlbjogJzlBQ0QzMidcblxuXG5cbiIsbnVsbCwicGxlYXNlLkNvbG9yID0gKGNvbG9yKSAtPiBuZXcgQ29sb3IgY29sb3JcblxuUEhJID0gMC42MTgwMzM5ODg3NDk4OTVcblxubWFrZUNvbG9yRGVmYXVsdHMgPVxuXHRodWU6IG51bGxcblx0c2F0dXJhdGlvbjogbnVsbFxuXHR2YWx1ZTogbnVsbFxuXHRiYXNlX2NvbG9yOiAnJ1xuXHRiYXNlQ29sb3I6ICcnXG5cdGdyZXlzY2FsZTogZmFsc2Vcblx0Z3JheXNjYWxlOiBmYWxzZSAjd2hhdGV2ZXIgSSBzdXBwb3J0IHRoZW0gYm90aCwgbXVycmljYVxuXHRnb2xkZW46IHRydWVcblx0ZnVsbF9yYW5kb206IGZhbHNlXG5cdGZpbGxSYW5kb206IGZhbHNlXG5cdGNvbG9yc19yZXR1cm5lZDogMVxuXHRjb2xvcnNSZXR1cm5lZDogMVxuXHRmb3JtYXQ6IG51bGxcblxucGxlYXNlLmdlbmVyYXRlRnJvbUJhc2VDb2xvciA9IChiYXNlQ29sb3IpIC0+XG5cdGNvbG9yID0gbmV3IENvbG9yKClcblx0YmFzZSA9IG5ldyBDb2xvciBiYXNlQ29sb3Jcblx0Y29sb3IuaHVlIGNsYW1wKF8ucmFuZG9tKGJhc2UuaHVlKCkgLSA1LCBiYXNlLmh1ZSgpICsgNSksIDAsIDM2MClcblx0aWYgYmFzZS5zYXR1cmF0aW9uKCkgaXMgMCB0aGVuIGNvbG9yLnNhdHVyYXRpb24gMFxuXHRlbHNlIGNvbG9yLnNhdHVyYXRpb24gXy5yYW5kb20oMC40LCAwLjg1LCB0cnVlKVxuXHRjb2xvci52YWx1ZSBfLnJhbmRvbSgwLjQsIDAuODUsIHRydWUpXG5cdHJldHVybiBjb2xvclxuXG5wbGVhc2UuZ2VuZXJhdGUgPSBwbGVhc2UuZ2VuZXJhdGVHb2xkZW4gPSAtPlxuXHRjb2xvciA9IG5ldyBDb2xvcigpXG5cdGh1ZSA9IF8ucmFuZG9tIDAsIDM1OVxuXHRjb2xvci5odWUgKChodWUgKyAoaHVlL1BISSkpICUgMzYwKVxuXHRjb2xvci5zYXR1cmF0aW9uIF8ucmFuZG9tKDAuNCwgMC44NSwgdHJ1ZSlcblx0Y29sb3IudmFsdWUgXy5yYW5kb20oMC40LCAwLjg1LCB0cnVlKVxuXHRyZXR1cm4gY29sb3JcblxucGxlYXNlLmdlbmVyYXRlUmFuZG9tID0gLT5cblx0Y29sb3IgPSBuZXcgQ29sb3IoKVxuXHRjb2xvci5odWUgXy5yYW5kb20oMCwgMzU5KVxuXHRjb2xvci5zYXR1cmF0aW9uIF8ucmFuZG9tKDAsIDEuMCwgdHJ1ZSlcblx0Y29sb3IudmFsdWUgXy5yYW5kb20oMCwgMS4wLCB0cnVlKVxuXHRyZXR1cm4gY29sb3JcblxuZGVwcmVjYXRpb25MYXllciA9IChvcHRpb25zKSAtPlxuXHRpZiBvcHRpb25zLmJhc2VfY29sb3IgaXNudCAnJ1xuXHRcdGNvbnNvbGUud2FybiAnVGhlIG9wdGlvbiBiYXNlX2NvbG9yIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgYmFzZUNvbG9yIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuYmFzZUNvbG9yID0gb3B0aW9ucy5iYXNlX2NvbG9yXG5cblx0aWYgb3B0aW9ucy5mdWxsX3JhbmRvbSBpc250IGZhbHNlXG5cdFx0Y29uc29sZS53YXJuICdUaGUgb3B0aW9uIGZ1bGxfcmFuZG9tIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgZnVsbFJhbmRvbSBpbnN0ZWFkLidcblx0XHRvcHRpb25zLmZ1bGxSYW5kb20gPSBvcHRpb25zLmZ1bGxfcmFuZG9tXG5cblx0aWYgb3B0aW9ucy5jb2xvcnNfcmV0dXJuZWQgaXNudCAxXG5cdFx0Y29uc29sZS53YXJuICdUaGUgb3B0aW9uIGNvbG9yc19yZXR1cm5lZCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gVXNlIGNvbG9yc1JldHVybmVkIGluc3RlYWQuJ1xuXHRcdG9wdGlvbnMuY29sb3JzUmV0dXJuZWQgPSBvcHRpb25zLmNvbG9yc19yZXR1cm5lZFxuXG5cdHJldHVybiBvcHRpb25zXG5cblxucGxlYXNlLm1ha2VfY29sb3IgPSAob3B0aW9ucyA9IHt9KSAtPlxuXHRjb25zb2xlLndhcm4gJ1RoZSBmdW5jdGlvbiBtYWtlX2NvbG9yKCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBtYWtlQ29sb3IoKSBpbnN0ZWFkLidcblx0cGxlYXNlLm1ha2VDb2xvciBvcHRpb25zXG5cdHJldHVyblxuXG5wbGVhc2UubWFrZUNvbG9yID0gKG9wdGlvbnMgPSB7fSkgLT5cblx0I3JlbW92ZSBkZXByZWNhdGlvbiBsYXllciBhZnRlciAzIG1vbnRocyBpbiB0aGUgd2lsZFxuXHRvcHRzID0gZGVwcmVjYXRpb25MYXllciBfLmRlZmF1bHRzKG1ha2VDb2xvckRlZmF1bHRzLCBvcHRpb25zKVxuXHRjb2xvcnMgPSBbXVxuXHRmb3IgaSBpbiBbMC4ub3B0cy5jb2xvcnNSZXR1cm5lZF0gYnkgMVxuXHRcdGNvbG9yc1tpXSA9IHBsZWFzZS5nZW5lcmF0ZSgpXG5cdFx0c3dpdGNoIG9wdHMuZm9ybWF0LnRvTG93ZXJDYXNlKClcblx0XHRcdHdoZW4gJ2hleCcgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaGV4KClcblx0XHRcdHdoZW4gJ3JnYicgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0ucmdiU3RyaW5nKClcblx0XHRcdHdoZW4gJ2hzbCcgdGhlbiBjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaHNsU3RyaW5nKClcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y29uc29sZS53YXJuICdVbmtub3duIGZvcm1hdC4gRGVmYXVsdGluZyB0byBoZXguJ1xuXHRcdFx0XHRjb2xvcnNbaV0gPSBjb2xvcnNbaV0uaGV4KClcblxuXG5cdHJldHVybiBjb2xvcnMiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
