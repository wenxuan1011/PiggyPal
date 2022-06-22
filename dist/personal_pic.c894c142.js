// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"module.js":[function(require,module,exports) {
/*
This is the place to put some module for easy coding
if you want to use the module in this file, please following the steps below
    Put this code in the beginning of your js:
        import * as mod from './module.js'
    when you want to use the mod inside, use 
        module.functionname()
    to call the function, some may need to put the parameter in the ()


If anyone want to add some new mod in the file, please set the function name as well-known 
as possible. Moreover, rememder to export function at the buttom of the code. 

If it is convenient, use the annotation at the buttom of export to let others know what is 
this function doing

By Maker
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopUpMessage = PopUpMessage;
exports.StringtoInt = StringtoInt;
exports.caldaymoney = caldaymoney;
exports.calprojectpercent = calprojectpercent;
exports.caltotalmoney = caltotalmoney;
exports.checkBlank = checkBlank;
exports.datetransfer = datetransfer;
exports.default = void 0;
exports.detailpicture = detailpicture;
exports.getAllUser = getAllUser;
exports.getColor = getColor;
exports.getMonthlyMoney = getMonthlyMoney;
exports.getProjectMoney = getProjectMoney;
exports.getTodayMoney = getTodayMoney;
exports.getaprojectmoney = getaprojectmoney;
exports.gettabledata = gettabledata;
exports.sergetProject = sergetProject;

require("regenerator-runtime/runtime.js");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var today = new Date();

function gettabledata(table, parameter, row) {
  var result = JSON.stringify(table[row]);
  result = JSON.parse(result);
  result = result[parameter];
  return result;
}

function getTodayMoney(ID, table, year, month, date, selection, type) {
  var result = caldaymoney(ID, table, year, month, date, selection, type);
  return result;
}

function caldaymoney(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
  return _caldaymoney.apply(this, arguments);
}

function _caldaymoney() {
  _caldaymoney = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ID, table, year, month, date, selection, type) {
    var results;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            results = 0;
            _context.next = 3;
            return $.get('./todaymoney', {
              ID: ID,
              table: table,
              selection: selection,
              month: month,
              date: date,
              year: year,
              type: type
            }, function (data) {
              var result = 0;

              if (_typeof(data) != String) {
                var total = 0;

                for (var i in data) {
                  total += StringtoInt(gettabledata(data, "".concat(selection), i));
                  i++;
                }

                result = total;
              } else {
                result = 0;
              }

              results = result;
            });

          case 3:
            return _context.abrupt("return", results);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _caldaymoney.apply(this, arguments);
}

function getMonthlyMoney(ID, table, selection, type) {
  var result = caltotalmoney(ID, table, selection, type);
  return result;
}

function caltotalmoney(_x8, _x9, _x10, _x11) {
  return _caltotalmoney.apply(this, arguments);
} //need to check what is the detail in table


function _caltotalmoney() {
  _caltotalmoney = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ID, table, selection, type) {
    var results, today;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = 0;
            today = new Date();
            _context2.next = 4;
            return $.get('./monthlymoney', {
              ID: ID,
              table: table,
              selection: selection,
              month: datetransfer(today.getMonth() + 1),
              year: StringtoInt(today.getFullYear()),
              type: type
            }, function (data) {
              var result = 0;

              if (_typeof(data) != String) {
                var total = 0;

                for (var i in data) {
                  total += StringtoInt(gettabledata(data, "".concat(selection), i));
                  i++;
                }

                result = total;
              } else {
                result = 0;
              }

              results = result;
            });

          case 4:
            return _context2.abrupt("return", results);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _caltotalmoney.apply(this, arguments);
}

function getProjectMoney(_x12) {
  return _getProjectMoney.apply(this, arguments);
}

function _getProjectMoney() {
  _getProjectMoney = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ID) {
    var results, checkcomplete;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            results = 0;
            checkcomplete = false;
            _context3.next = 4;
            return $.get('./getProject', {
              ID: ID
            }, function (data) {
              var totalremain = 0;

              for (var i in data) {
                var lastday = new Date("".concat(gettabledata(data, "end_month", i), "/").concat(gettabledata(data, "end_day", i), "/").concat(gettabledata(data, "end_year", i)));
                var startday = new Date();

                if (lastday - startday < 0) {
                  continue;
                }

                var remainday = Math.abs(lastday - startday);

                if (remainday > 0 || remainday !== undefined || gettabledata(data, 'personal_or_joint', i) > 0) {
                  remainday = Math.ceil(remainday / (1000 * 3600 * 24)) + 1;
                  var money = StringtoInt(gettabledata(data, "target_number", i)) / StringtoInt(gettabledata(data, 'personal_or_joint', i)) - StringtoInt(gettabledata(data, "saved_money", i)); //0 is for simulating money already save for this project

                  //0 is for simulating money already save for this project
                  if (money > 0) {
                    checkcomplete = false;
                    money = money / remainday;
                    totalremain += money;
                  } else {
                    checkcomplete = true;
                    checkProjectComplete(data, i);
                  }
                } else continue;
              }

              results = totalremain;
            });

          case 4:
            return _context3.abrupt("return", results);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getProjectMoney.apply(this, arguments);
}

function checkProjectComplete(_x13, _x14) {
  return _checkProjectComplete.apply(this, arguments);
}

function _checkProjectComplete() {
  _checkProjectComplete = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, i) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return $.get('./projectcomplete', {
              ID: gettabledata(data, 'id', i),
              project_name: gettabledata(data, 'project_name', i),
              color: gettabledata(data, 'color', i),
              target_number: gettabledata(data, 'target_number', i),
              member: gettabledata(data, 'member', i)
            }, function (data) {});

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _checkProjectComplete.apply(this, arguments);
}

function calprojectpercent(_x15, _x16) {
  return _calprojectpercent.apply(this, arguments);
}

function _calprojectpercent() {
  _calprojectpercent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ID, project_name) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            result = 0;
            _context5.next = 3;
            return $.get('./getproject', {
              ID: ID
            }, function (data) {
              for (var i in data) {
                if (project_name === data[i].project_name) {
                  result = StringtoInt(gettabledata(data, 'saved_money', i)) / StringtoInt(gettabledata(data, 'target_number', i));
                  result = result / 100;
                }
              }
            });

          case 3:
            return _context5.abrupt("return", Math.round(result, -1));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _calprojectpercent.apply(this, arguments);
}

function StringtoInt(x) {
  var parsed = parseInt(x, 10);

  if (isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

function datetransfer(date) {
  if (StringtoInt(date) < 10) {
    date = "0".concat(date);
  } else {
    date = date;
  }

  return date;
}

function checkBlank(page) {
  var lengths = 1;
  var recordmessage = ["項目", "日期", "金額", "分類", "帳戶", "類別"];
  var projectmessage = ["專案名稱", "日期", "目標金額"];
  var financial = ["type", "ITEM", "YEAR", "MONTH", "DAY", "MONEY", "REPEAT"];
  var account = ["NAME", "CURRENCY", "MONEY"];
  var pages = [];

  switch (page) {
    case 'record':
      pages = recordmessage;
      break;

    case 'project':
      pages = projectmessage;
      break;

    case 'financial':
      pages = financial;

    case 'account':
      pages = account;
      break;
  }

  for (var _len = arguments.length, input = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    input[_key - 1] = arguments[_key];
  }

  for (var j = 0; j < input.length; j++) {
    lengths = lengths * (input[j].length - 2);

    if (lengths === 0) {
      return pages[j];
    }

    if (lengths > 1 && j === input.length - 1) {
      return 1;
    }
  }
}

function PopUpMessage(type) {
  if (type < 5) {
    var PopUpTital = ['恭喜本月已存下xx元', '恭喜完成專案！', '請輸入完整資訊', '功能待開發！', '已成功新增！'];
    var PopUpGif = ['pig', 'congrate', 'eye', 'glasses', 'added'];
    $('#popup .box_login, #popup .box_delete').css('display', 'none');
    $('#popup .box_regular').css('display', 'flex');
    $('#popup').css('display', 'flex');
    $('#popup #background .box_regular .message p').html("".concat(PopUpTital[type]));
    $('#popup #background .box_regular .message figure img').attr("src", "./image/PopUpMessage/PopUpMessage_".concat(PopUpGif[type], ".gif"));
  } else if (type == 5) {
    $('#popup .box_regular, #popup .box_delete').css('display', 'none');
    $('#popup .box_login').css('display', 'flex');
    $('#popup').css('display', 'flex');
  } else {
    $('#popup .box_regular, #popup .box_login').css('display', 'none');
    $('#popup .box_delete').css('display', 'flex');
    $('#popup').css('display', 'flex');
  }
}

function getAllUser() {
  return _getAllUser.apply(this, arguments);
}

function _getAllUser() {
  _getAllUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var all_user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            all_user = [];
            _context6.next = 3;
            return $.get('./getAllUser', {}, function (data) {
              all_user = data;
            });

          case 3:
            return _context6.abrupt("return", all_user);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getAllUser.apply(this, arguments);
}

function sergetProject(_x17) {
  return _sergetProject.apply(this, arguments);
}

function _sergetProject() {
  _sergetProject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user) {
    var all_project;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return $.get('./sergetProject', {
              user: user
            }, function (data) {
              all_project = data;
              all_project = all_project.sort(function (a, b) {
                return a.remainday - b.remainday;
              });
            });

          case 2:
            return _context7.abrupt("return", all_project);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _sergetProject.apply(this, arguments);
}

function getColor(color) {
  var ColorCode = ['#F42850', '#F6A93B', '#F4EC28', '#7ED321', '#4A90E2', '#8E5FF4', '#FC75CE'];
  var ColorImgSrc = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

  for (var i = 0; i < 7; i++) {
    if (color === ColorCode[i]) {
      return ColorImgSrc[i];
    }
  }
}

function detailpicture(data, type) {
  var exptype = ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他'];
  var intype = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他'];
  var exppicture = ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other'];
  var inpicture = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other'];

  if (type == '0') {
    for (var i in exptype) {
      if (exptype[i] == data) {
        return exppicture[i];
      }
    }
  }

  if (type == '1') {
    for (var i in intype) {
      if (intype[i] == data) {
        return inpicture[i];
      }
    }
  }
}

function getaprojectmoney(_x18, _x19, _x20, _x21) {
  return _getaprojectmoney.apply(this, arguments);
}

function _getaprojectmoney() {
  _getaprojectmoney = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id, project_name, color, target_number) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            result = 0;
            _context8.next = 3;
            return $.get('./getaprojectmoney', {
              id: id,
              project_name: project_name,
              color: color,
              target_number: target_number
            }, function (data) {
              result = data;
            });

          case 3:
            return _context8.abrupt("return", result);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getaprojectmoney.apply(this, arguments);
}

var _default = {
  gettabledata: gettabledata,
  // get id inside the row of column select from database
  getMonthlyMoney: getMonthlyMoney,
  // get money in each table, remember to use caltotalmoney to get in integer
  caltotalmoney: caltotalmoney,
  // calculate total money
  getProjectMoney: getProjectMoney,
  // get daily project saving
  calprojectpercent: calprojectpercent,
  // calculate project complete %(in .1f )
  StringtoInt: StringtoInt,
  // transfer string to integer
  datetransfer: datetransfer,
  // tranfer date to 0date if date<10
  checkBlank: checkBlank,
  // check if there is a blank in input. Need to input all input to check, and it will return 1 for all inputs are filled
  getAllUser: getAllUser,
  // get all users' id
  sergetProject: sergetProject,
  // FOR SERVER TO GET PROJECT
  PopUpMessage: PopUpMessage,
  // popup message, need to input the word you want to show
  getColor: getColor,
  // turn the color code into the color, need to input the color code of the project
  detailpicture: detailpicture,
  //return detail's picture's name
  getaprojectmoney: getaprojectmoney //use to get a project saved money

};
exports.default = _default;
},{"regenerator-runtime/runtime.js":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"signup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mod = _interopRequireWildcard(require("./module.js"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//import process from './dailymoney.js'
$('#change-to-login').click(function () {
  $("#SignUp").css("display", "none");
  $("#Login").css("display", "flex");
});
$('#change-to-signup').click(function () {
  $("#Login").css("display", "none");
  $("#SignUp").css("display", "flex");
}); // navbar change page

var navbar = ['barcode', 'account', 'mainpage', 'accounting', 'project'];
var present_page = 'mainpage';
$('#navbar img:nth-child(1)').click(function () {
  selected_to_unselected();
  present_page = navbar[0];
  unselected_to_selected();
});
$('#navbar img:nth-child(2)').click(function () {
  selected_to_unselected();
  present_page = navbar[1];
  unselected_to_selected();
});
$('#navbar img:nth-child(3)').click(function () {
  selected_to_unselected();
  present_page = navbar[2];
  unselected_to_selected();
  $('#add_deals').css('display', 'none');
});
$('#navbar img:nth-child(4), #main #mainpage #add_project_btn').click(function () {
  selected_to_unselected();
  present_page = navbar[3];
  unselected_to_selected();
});
$('#navbar img:nth-child(5)').click(function () {
  selected_to_unselected();
  present_page = navbar[4];
  unselected_to_selected();
});

function selected_to_unselected() {
  if (present_page == navbar[0]) {
    $('#navbar img:nth-child(1)').attr("src", "./image/navbar/unselect/barcode_unselect.png");
    $('#barcode').css("display", "none");
  } else if (present_page == navbar[1]) {
    $('#navbar img:nth-child(2)').attr("src", "./image/navbar/unselect/account_unselect.png");
    $('#account').css("display", "none");
  } else if (present_page == navbar[2]) {
    $('#navbar img:nth-child(3)').attr("src", "./image/navbar/unselect/mainpage_unselect.png");
    $('#mainpage').css("display", "none");
  } else if (present_page == navbar[3]) {
    $('#navbar img:nth-child(4)').attr("src", "./image/navbar/unselect/accounting_unselect.png");
    $('#accounting').css("display", "none");
  } else {
    $('#navbar img:nth-child(5)').attr("src", "./image/navbar/unselect/project_unselect.png");
    $('#project').css("display", "none");
  }

  ;
}

;

function unselected_to_selected() {
  if (present_page == navbar[0]) {
    $('#navbar img:nth-child(1)').attr("src", "./image/navbar/selected/barcode_select.png");
    $('#barcode').css("display", "flex");
    window.location.href = 'https://luffy.ee.ncku.edu.tw/~stanly/test_camera/docs/index.html?';
  } else if (present_page == navbar[1]) {
    $('#navbar img:nth-child(2)').attr("src", "./image/navbar/selected/account_select.png");
    $('#account').css("display", "flex");
  } else if (present_page == navbar[2]) {
    $('#navbar img:nth-child(3)').attr("src", "./image/navbar/selected/mainpage_select.png");
    $('#mainpage').css("display", "flex");
  } else if (present_page == navbar[3]) {
    $('#navbar img:nth-child(4)').attr("src", "./image/navbar/selected/accounting_select.png");
    $('#accounting').css("display", "flex");
  } else {
    $('#navbar img:nth-child(5)').attr("src", "./image/navbar/selected/project_select.png");
    $('#project').css("display", "flex");
  }

  ;
}

;
var ID = "";
$(document).ready(function () {
  // sign up
  $('#signup button[type="submit"]').click(function (event) {
    event.preventDefault();
    $.get('./signup', {
      name: $('#signup input[name=name]').val(),
      id: $('#signup input[name=id]').val(),
      password: $('#signup input[name=password]').val()
    }, function (data) {
      if ("".concat(data) === "signup") {
        $('#SignUp').css("display", "none");
        $('#main').css("display", "flex");
        ID = $('#signup input[name=id]').val();
      } else {
        $("#signup-output").html("".concat(data));
        ID = data; //process(ID)
      }

      ;
    });
  }); // login

  $('#login button[type="submit"]').click(function (event) {
    event.preventDefault();
    ID = $('#login input[name=id]').val();
    $.get('./login', {
      id: $('#login input[name=id]').val(),
      password: $('#login input[name=pw]').val()
    }, function (data) {
      if ("".concat(data) !== 'failed,try again') {
        $('#Login').css("display", "none");
        $('#main').css("display", "flex");
        ID = data;
        localStorage.setItem("ID", data); //process(ID)
      } else {
        mod.PopUpMessage(5);
      }

      ;
    });
  });
});
$('#popup #background .confirm').click(function () {
  $('#popup').css('display', 'none');
});

function transmit() {
  return ID;
}

;
var _default = transmit;
exports.default = _default;
},{"./module.js":"module.js","fs":"../node_modules/parcel-bundler/src/builtins/_empty.js"}],"personal_pic.js":[function(require,module,exports) {
"use strict";

var _signup = _interopRequireDefault(require("./signup.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var l_id = localStorage.getItem("ID");

function CheckImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image(); //判断图片是否存在

    ImgObj.src = imgurl;

    ImgObj.onload = function (res) {
      resolve(res);
    };

    ImgObj.onerror = function (err) {
      reject(err);
    };
  });
}

var port = 6165; //使用方式

var have_pic = 0;
CheckImgExists("http://luffy.ee.ncku.edu.tw:" + port + "/image/personal_pic/" + l_id + ".jpg" //imgurl here
).then(function () {
  $("img#change_pic").attr("src", "./image/personal_pic/" + l_id + ".jpg");
  $("#photo_and_name img").attr("src", "./image/personal_pic/" + l_id + ".jpg");
  $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/" + l_id + ".jpg");
  have_pic = 1; //success callback
}).catch(function () {
  // console.log(2)
  if (have_pic === 0) {
    $("img#change_pic").attr("src", "./image/personal_pic/2.jpg");
    $("#photo_and_name img").attr("src", "./image/personal_pic/2.jpg");
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg");
  } //fail callback

});
CheckImgExists("http://luffy.ee.ncku.edu.tw:" + port + "/image/personal_pic/" + l_id + ".png" //imgurl here
).then(function () {
  $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/" + l_id + ".png");
  $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/" + l_id + ".png");
  $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/" + l_id + ".png");
  have_pic = 1; //success callback
}).catch(function () {
  if (have_pic === 0) {
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg");
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg");
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg");
  } //fail callback

});
CheckImgExists("http://luffy.ee.ncku.edu.tw:" + port + "/image/personal_pic/" + l_id + ".jpeg" //imgurl here
).then(function () {
  $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/" + l_id + ".jpeg");
  $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/" + l_id + ".jpeg");
  $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/" + l_id + ".jpeg");
  have_pic = 1; //success callback
}).catch(function () {
  if (have_pic === 0) {
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg");
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg");
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg");
  } //fail callback

});
CheckImgExists("http://luffy.ee.ncku.edu.tw:" + port + "/image/personal_pic/" + l_id + ".MOV" //imgurl here
).then(function () {
  $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/" + l_id + ".MOV");
  $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/" + l_id + ".MOV");
  $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/" + l_id + ".MOV");
  have_pic = 1; //success callback
}).catch(function () {
  if (have_pic === 0) {
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg");
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg");
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg");
  } //fail callback

});
CheckImgExists("http://luffy.ee.ncku.edu.tw:" + port + "/image/personal_pic/" + l_id + ".mp4" //imgurl here
).then(function () {
  $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/" + l_id + ".mp4");
  $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/" + l_id + ".mp4");
  $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/" + l_id + ".mp4");
  have_pic = 1; //success callback
}).catch(function () {
  if (have_pic === 0) {
    $("#change_personal_page img#change_pic").attr("src", "./image/personal_pic/2.jpg");
    $("#personal_page #photo_and_name img").attr("src", "./image/personal_pic/2.jpg");
    $(".personal_btn_bg img#personal_btn").attr("src", "./image/personal_pic/2.jpg");
  } //fail callback

}); // }

$(document).ready(function () {
  $('#image_summit').submit(function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var id = (0, _signup.default)();
    formData.append('usr_name', id);
    $.ajax({
      type: 'POST',
      url: '/upload',
      data: formData,
      processData: false,
      contentType: false,
      success: function success(r) {
        console.log(r);
      },
      error: function error(e) {
        console.log(e);
      }
    });
    setTimeout(function () {
      location.reload();
    }, 500); //
    // $("img#change_pic").attr("src", "./image/personal_pic/"+l_id+".jpg")
    // $("#photo_and_name img").attr("src", "./image/personal_pic/"+l_id+".jpg")
    // $("img#personal_btn").attr("src", "./image/personal_pic/"+l_id+".jpg")
    //$("#change_pic img").attr("src", "./image/personal_pic/F64081127.jpg")
  });
});
},{"./signup.js":"signup.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34584" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","personal_pic.js"], null)
//# sourceMappingURL=personal_pic.c894c142.js.map