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
})({"selectormodule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialColor = InitialColor;
exports.default = void 0;
var TIME = new Date(); // --------------- color selector in project ---------------

var COLOR = '#F6A93B'; // project color
// open/close color_select_box

$('#add_project .box:nth-child(2) .color_selector').click(function () {
  $('.color_select_box').css("display", "flex");
  setTimeout(function () {
    $('.color_select_box').css("transform", "translateY(0%)");
    document.addEventListener("click", clickHiddenColorBox);
  }, 100);
});

function clickHiddenColorBox(eve) {
  if (eve.target.class != "color_select_box") {
    $('.color_select_box').css("transform", "translateY(100%)");
    setTimeout(function () {
      $('.color_select_box').css("display", "none");
    }, 500);
  }

  document.removeEventListener("click", clickHiddenColorBox);
} // setting project color


var ColorCode = ['#F42850', '#F6A93B', '#F4EC28', '#7ED321', '#4A90E2', '#8E5FF4', '#FC75CE'];
var ColorImgSrc = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

var _loop = function _loop(i) {
  $('.color_select_box #color_bar img:nth-child(' + "".concat(i) + ')').click(function () {
    COLOR = ColorCode[i - 1];
    $('#add_project .box:nth-child(2) .color_selector img:nth-child(1)').attr("src", "./image/project/Project_colordot_" + "".concat(ColorImgSrc[i - 1]) + ".png");
  });
};

for (var i = 1; i < 8; i++) {
  _loop(i);
} // initial the color (orange)


function InitialColor() {
  COLOR = '#F6A93B';
  return;
} // transmit the COLOR to other project


function transmitCOLOR() {
  // I'm not sure it need 'export' or not
  return COLOR;
}

; // ------------------ number keyboard selector ------------------

var money = '';
var t = document.getElementById("spend"); // open number keyboard selector

$('#spend').click(function () {
  $('.NumKeyBoard_select_box').css("display", "flex");
  setTimeout(function () {
    $('.NumKeyBoard_select_box').css("transform", "translateY(0%)");
  }, 100);
  document.activeElement.blur();
}); // let every number a button to print number

$('#zero').click(function () {
  money = money + "0";
  t.value = money;
});
$('#one').click(function () {
  money = money + "1";
  t.value = money;
});
$('#two').click(function () {
  money = money + "2";
  t.value = money;
});
$('#three').click(function () {
  money = money + "3";
  t.value = money;
});
$('#four').click(function () {
  money = money + "4";
  t.value = money;
});
$('#five').click(function () {
  money = money + "5";
  t.value = money;
});
$('#six').click(function () {
  money = money + "6";
  t.value = money;
});
$('#seven').click(function () {
  money = money + "7";
  t.value = money;
});
$('#eight').click(function () {
  money = money + "8";
  t.value = money;
});
$('#nine').click(function () {
  money = money + "9";
  t.value = money;
});
$('#backspace').click(function () {
  money = money.slice(0, -1);
  t.value = money;
});
$('#ok').click(function () {
  // close number keyboard selector
  $('.NumKeyBoard_select_box').css("transform", "translateY(100%)");
  setTimeout(function () {
    $('.NumKeyBoard_select_box').css("display", "none");
    money = '';
  }, 500);
}); // ------------------ expend and income sort selector box ------------------
// open/close sort_select_box

$('#add_deals #fin .box:nth-child(3) .input_div').click(function () {
  $('.sort_select_box').css("display", "flex");
  setTimeout(function () {
    $('.sort_select_box').css("transform", "translateY(0%)");
    document.addEventListener("click", clickHiddenSortBox);
  }, 100);
});

function clickHiddenSortBox(eve) {
  if (eve.target.class != "sort_select_box") {
    $('.sort_select_box').css("transform", "translateY(100%)");
    setTimeout(function () {
      $('.sort_select_box').css("display", "none");
    }, 500);
  }

  document.removeEventListener("click", clickHiddenSortBox);
}

var ExpendSortName = ['飲食', '購物', '家居', '個人', '交通', '娛樂', '醫療', '其他'];
var IncomeSortName = ['薪水', '獎金', '投資', '還款', '中獎', '利息', '其他'];
var ExpendSortImage = ['food', 'shopping', 'house', 'personal', 'transport', 'entertainment', 'hospital', 'other'];
var IncomeSortImage = ['salary', 'bonus', 'investment', 'repayment', 'win', 'intersest', 'other'];
$('#expend, #add_deals_btn').click(function (event) {
  CreateSortBox(ExpendSortImage, ExpendSortName);
});
$('#income').click(function (event) {
  CreateSortBox(IncomeSortImage, IncomeSortName);
});

function CreateSortBox(image, name) {
  var container = document.querySelector('.sort_select_box .sort_bar');
  container.innerHTML = "<div></div>";
  var ImageList = image;
  var NameList = name;

  for (var _i = 0; _i < ImageList.length; _i++) {
    var block = document.createElement('div');
    var ImageBox = document.createElement('img');
    var NameBox = document.createElement('p');
    block.setAttribute("class", "sort_box");
    ImageBox.setAttribute("src", "./image/Accounting/".concat(ImageList[_i], "_icon.png"));
    ImageBox.setAttribute("width", "100%");
    NameBox.textContent = "".concat(NameList[_i]);
    container.appendChild(block);
    block.appendChild(ImageBox);
    block.appendChild(NameBox);
  }

  var _loop2 = function _loop2(_i2) {
    $(".sort_select_box .sort_bar .sort_box:nth-child(".concat(_i2, ")")).click(function () {
      var sort_word = $(".sort_select_box .sort_bar .sort_box:nth-child(".concat(_i2, ") p")).text();
      $('#add_deals #fin #sort').html("".concat(sort_word));
    });
  };

  for (var _i2 = 2; _i2 < 10; _i2++) {
    _loop2(_i2);
  }
} // ------------------ other selector boxs ------------------
// open/close other_select_box


$('#add_financial_page .box:nth-child(4) .repeat_div').click(function () {
  $('.other_select_box').css("display", "flex");
  setTimeout(function () {
    $('.other_select_box').css("transform", "translateY(0%)");
    document.addEventListener("click", clickHiddenOtherBox);
  }, 100);
});

function clickHiddenOtherBox(eve) {
  if (eve.target.class != "other_select_box") {
    $('.other_select_box').css("transform", "translateY(100%)");
    setTimeout(function () {
      $('.other_select_box').css("display", "none");
    }, 500);
  }

  document.removeEventListener("click", clickHiddenOtherBox);
}

var Repeat = ['重複循環', '不重複', '每天', '每週', '每月', '每年', '自訂'];
$('#personal_page #financial_setting .list li').click(function (event) {
  CreateOtherBox(Repeat);
});

function CreateOtherBox(name) {
  var container = document.querySelector('.other_select_box .other_bar');
  container.innerHTML = "<div></div>";
  var NameList = name;

  for (var _i3 = 1; _i3 < NameList.length; _i3++) {
    var block = document.createElement('div');
    var NameBox = document.createElement('p');
    block.setAttribute("class", "other_box");
    NameBox.textContent = "".concat(NameList[_i3]);
    container.appendChild(block);
    block.appendChild(NameBox);
  }

  var _loop3 = function _loop3(_i4) {
    $(".other_select_box .other_bar .other_box:nth-child(".concat(_i4, ")")).click(function () {
      var word = $(".other_select_box .other_bar .other_box:nth-child(".concat(_i4, ") p")).text();
      $('#add_financial_page #financial .box:nth-child(4) .repeat_div p').html("".concat(word));
    });
  };

  for (var _i4 = 1; _i4 < NameList.length; _i4++) {
    _loop3(_i4);
  }
}

var _default = {
  transmitCOLOR: transmitCOLOR,
  InitialColor: InitialColor
};
exports.default = _default;
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46555" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","selectormodule.js"], null)
//# sourceMappingURL=selectormodule.24371b44.js.map