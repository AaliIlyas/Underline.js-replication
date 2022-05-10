_.first = function (array, n) {
  if (array == null || !array.length) {
    return [];
  }

  if (!Array.isArray(array)) { // Arguments obj
    if (n > array.length) {
      return Array.from(array);
    } else {
      return Array.from(array).slice(0,n);
    }

  } else {
    if (n<1 || typeof(n) !== 'number') {
      return [array[0]];
    } else if (n > array.length) {
      return Array.from(array);
    } else {
      return array.slice(0, n);
    }
  }
};

_.last = function (array, n) {
  if (array == null || !array.length) {
    return [];
  }

  if (!Array.isArray(array)) {
    if (n > array.length) {
      return Array.from(reversed);
    } else {
      return Array.from(array).slice(array.length-n);
    }

  } else {
    if (n<1 || typeof(n) !== 'number') {
      return [array[array.length-1]];
    } else if (n > array.length) {
      return Array.from(array);
    } else {
      return array.slice(array.length-n);
    }
  }
};

_.uniq = function (array) {
  let final = [];
  for (let i=0; i<array.length; i++) {
    if (!final.includes(array[i])) {
      final.push(array[i]);
    }
  }
  return final;
};

_.extend = function (destination, source) {
  for (let x=0; x < Object.keys(source).length; x++) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }
  return destination;
};

_.defaults = function (destination, source) {
  let collection = Array.from(arguments);
  let dest = collection[0]; //pick the obj from the array
  let srcs = collection.slice(1);
  for (let x=0; x<srcs.length; x++) {  //iterate array
    for (let key in srcs[x]) {  // iterate obj
      if (key in dest || srcs.hasOwnProperty(key)) { //purposely empty
      } else {
        dest[key] = srcs[x][key];
      }
    }

    destination = dest;
    return destination;
  }
};

_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i<collection.length; i++) {
      let val = collection[i], object = collection;
      iteratee.call(context, val, i, object);
    }
    return collection;
  } else if (typeof(collection) === 'object') {
    for (const element in collection) {
      if (collection.hasOwnProperty(element)) {
        let val = collection[element], key = element, object = collection;
        iteratee.call(context, val, key, object);
      }
    }
    return collection;
  }
};

_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

_.map = function (collection, iteratee, context) {
  var result = [];
  _.each(collection, function (el, index) {
    result.push(iteratee.call(context, el, index, collection));
  });
  return result;
};

_.reduce = function (collection, iteratee, accumulator, context) {
  _.each(collection, function (value, key) {
    if (accumulator === undefined) {
      accumulator = value;
    } else {
      accumulator = iteratee.call(this, accumulator, value, key, collection);
    }
  }, context);
  return accumulator;
};

_.filter = function (collection, predicate, context) {
  const final = [];
  _.each(collection, function (val, key) {
    if (predicate.call(context, val, key, collection)) {
      final.push(val);
    }
  });
  return final;
};

_.reject = function (collection, predicate, context) {
  const final = [];
  _.each(collection, function (val, key) {
    if (!predicate.call(context, val, key, collection)) {
      final.push(val);
    }
  });
  return final;
};

_.every = function (collection, predicate, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        if (i === collection.length -1) {
          return true;
        }
      } else {
        return false;
      }
    }
  } else if (typeof(collection) === 'object') {
    const objLength = Object.keys(collection).length;
    let current = 1;
    for (const key in collection) {
      if (collection.hasOwnProperty(key)) {
        current++;
        if (predicate.call(context, collection[key], key, collection)) {
          if (current === objLength) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }
};

_.some = function (collection, predicate, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        if (i === collection.length -1) {
          return false;
        }
      } else {
        return true;
      }
    }
  } else if (typeof(collection) === 'object') {
    const objLength = Object.keys(collection).length;
    let current = 1;
    for (const key in collection) {
      if (collection.hasOwnProperty(key)) {
        current++;
        if (!predicate.call(context, collection[key], key, collection)) {
          if (current === objLength) {
            return false;
          }
        } else {
          return true;
        }
      }
    }
  }
};

_.invoke = function (collection, methodName) {

  let args = Array.from(arguments).slice(2);
  let final = _.map(collection, function (val) {
    return val[methodName].apply(val, args);
  });
  return final;
};

_.pluck = function (collection, propertyName) {
  let final = _.map(collection, function (value) {
    return value[propertyName];
  });
  return final;
};

_.once = function (func) {
  let passed = false;
  let ans;
  return function () {
    if (passed) {
      return ans;
    }
    passed = true;
    ans = func.apply(null, arguments);
    return ans;
  };
};

_.memoize = function (func) {
  let cache = {};

  return function () {
    const args = Array.from(arguments);
    if (args in cache) {
      return cache[args];
    }
    cache[args] = func.apply(null, arguments);
    return cache[args];
  };
};

_.delay = function (func, wait) {
  const args = Array.from(arguments).slice(2);

  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
};

_.throttle = function (func, wait) {
  let flag = false;
  let result;

  return function () {
    let args = Array.from(arguments);
    if (!flag) {
      result = func.apply(null, args);
      flag = true;
      setTimeout(function () {
        flag = false;
      }, wait);
      return result;
    }
    return result;
  };
};
