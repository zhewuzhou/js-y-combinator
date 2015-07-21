/*
 * Make a javascript curry function
 * For example var multiple = function(x, y, z){return x+y+z} could be curried(1)(2)(3)
 */

var Y = function(f) {
  return (function(g) {
    return g(g);
  })(function(h) {
    return function() {
      return f(h(h)).apply(null, arguments);
    };
  })
};

var curry = function(fn) {
  return Y(function(it_self) {
    return function() {
      var arguments_array = Array.prototype.slice.call(arguments);
      return function() {
        var copy = arguments_array.slice(),
          result_fn;
        Array.prototype.push.apply(copy, arguments);
        result_fn = fn.length > copy.length ? it_self : fn;
        return result_fn.apply(null, copy);
      }
    }
  })();
}

var test_fn = function(x, y, z) {
  return x + y + z;
};

var curry_fn = curry(test_fn);
console.log(curry_fn(2)(3)(4));
