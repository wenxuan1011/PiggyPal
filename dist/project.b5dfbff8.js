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
})({"signup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
});
$('#navbar img:nth-child(4)').click(function () {
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
      } else {
        $("#login-output").html("".concat(data));
      }

      ;
    });
  });
});

function transmit() {
  return ID;
}

;
var _default = transmit;
exports.default = _default;
},{}],"project.js":[function(require,module,exports) {
"use strict";

var _signup = _interopRequireDefault(require("./signup.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// type bar (change border-bottom)
$('#project #type_bar p:nth-child(1)').click(function () {
  $('#project #type_bar p:nth-child(1)').css("border-bottom", "2px solid #410ADF");
  $('#personal_project_list').css("display", "none");

  for (var i = 0; i < 4; i++) {
    if (i + 1 !== 1) {
      $('#project #type_bar p:nth-child(' + "".concat(i + 1) + ')').css("border-bottom", "none");
    }
  }
});
$('#project #type_bar p:nth-child(2)').click(function () {
  $('#project #type_bar p:nth-child(2)').css("border-bottom", "2px solid #410ADF");
  $('#personal_project_list').css("display", "flex");

  for (var i = 0; i < 4; i++) {
    if (i + 1 !== 2) {
      $('#project #type_bar p:nth-child(' + "".concat(i + 1) + ')').css("border-bottom", "none");
    }
  }
});
$('#project #type_bar p:nth-child(3)').click(function () {
  $('#project #type_bar p:nth-child(3)').css("border-bottom", "2px solid #410ADF");
  $('#personal_project_list').css("display", "none");

  for (var i = 0; i < 4; i++) {
    if (i + 1 !== 3) {
      $('#project #type_bar p:nth-child(' + "".concat(i + 1) + ')').css("border-bottom", "none");
    }
  }
});
$('#project #type_bar p:nth-child(4)').click(function () {
  $('#project #type_bar p:nth-child(4)').css("border-bottom", "2px solid #410ADF");
  $('#personal_project_list').css("display", "none");

  for (var i = 0; i < 4; i++) {
    if (i + 1 !== 4) {
      $('#project #type_bar p:nth-child(' + "".concat(i + 1) + ')').css("border-bottom", "none");
    }
  }
}); // open/close add_project page

$('#mainpage #project_view .add_project .planned_speed img').click(function () {
  $('#add_project').css("display", "flex");
  setTimeout(function () {
    $('#add_project').css("transform", "translateX(0%)");
  }, 100);
});
$('#personal_project_list #add_project_btn').click(function () {
  $('#add_project').css("display", "flex");
  setTimeout(function () {
    $('#add_project').css("transform", "translateX(0%)");
  }, 100);
});
$('#add_project .bar img').click(function () {
  $('#add_project').css("transform", "translateX(100%)");
  setTimeout(function () {
    $('#add_project').css("display", "none");
  }, 500);
}); // open/close personal_project page

$('.personal_project').click(function () {
  $('#show_personal_project').css("display", "flex");
  setTimeout(function () {
    $('#show_personal_project').css("transform", "translateX(0%)");
  }, 100);
});
$('#show_personal_project .bar img').click(function () {
  $('#show_personal_project').css("transform", "translateX(100%)");
  setTimeout(function () {
    $('#show_personal_project').css("display", "none");
  }, 500);
});
$(document).ready(function () {
  // the project have set or not
  $('#navbar img:nth-child(5)').click(function (event) {
    event.preventDefault();
    $.get('./project_or_not', {
      id: _signup.default
    }, function (data) {
      if (data !== false) {
        $('.project_infor .type_and_date #item').html("".concat(data[0]));
        $('#show_personal_project #project_detail #title #item').html("".concat(data[0]));
        var date = "".concat(data[1]) + '.' + "".concat(data[2]) + '.' + "".concat(data[3]) + '-' + "".concat(data[4]) + '.' + "".concat(data[5]) + '.' + "".concat(data[6]);
        $('.project_infor .type_and_date #date').html(date);
        $('#show_personal_project #project_detail #date_box #date').html(date);
        var money = '$' + "".concat(data[7]);
        $('#show_personal_project #project_detail #planned_speed_graph #money').html(money);
        $('#show_personal_project #project_detail #target_money #money').html(money);
        $('#personal_project_list .personal_project').css("display", "flex");
        $('#personal_project_list #no_project').css("display", "none");
      } else {
        $('#personal_project_list .personal_project').css("display", "none");
        $('#personal_project_list #no_project').css("display", "flex");
      }
    });
  }); // add personal project

  $('#person_project button[type="submit"]').click(function (event) {
    event.preventDefault();
    $.get('./person_project', {
      id: _signup.default,
      project_personal: $('#person_project input[name=project_personal]').val(),
      start_year: $('#person_project input[name=start_year]').val(),
      start_month: $('#person_project input[name=start_month]').val(),
      start_day: $('#person_project input[name=start_day]').val(),
      end_year: $('#person_project input[name=end_year]').val(),
      end_month: $('#person_project input[name=end_month]').val(),
      end_day: $('#person_project input[name=end_day]').val(),
      target_number: $('#person_project input[name=target_number]').val()
    }, function (data) {
      $("#person_project-output").html("".concat(data));
    });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "33974" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","project.js"], null)
//# sourceMappingURL=project.b5dfbff8.js.map