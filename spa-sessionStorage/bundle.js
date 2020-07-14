/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./spa-sessionStorage/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/history-sessionStorage/lib/Actions.js":
/*!************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/Actions.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n/**\n * Indicates that navigation was caused by a call to history.push.\n */\nvar PUSH = exports.PUSH = 'PUSH';\n\n/**\n * Indicates that navigation was caused by a call to history.replace.\n */\nvar REPLACE = exports.REPLACE = 'REPLACE';\n\n/**\n * Indicates that navigation was caused by some other action such\n * as using a browser's back/forward buttons and/or manually manipulating\n * the URL in a browser's location bar. This is the default.\n *\n * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate\n * for more information.\n */\nvar POP = exports.POP = 'POP';\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/Actions.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/AsyncUtils.js":
/*!***************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/AsyncUtils.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nvar loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {\n  var currentTurn = 0,\n      isDone = false;\n  var isSync = false,\n      hasNext = false,\n      doneArgs = void 0;\n\n  var done = function done() {\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    isDone = true;\n\n    if (isSync) {\n      // Iterate instead of recursing if possible.\n      doneArgs = args;\n      return;\n    }\n\n    callback.apply(undefined, args);\n  };\n\n  var next = function next() {\n    if (isDone) return;\n\n    hasNext = true;\n\n    if (isSync) return; // Iterate instead of recursing if possible.\n\n    isSync = true;\n\n    while (!isDone && currentTurn < turns && hasNext) {\n      hasNext = false;\n      work(currentTurn++, next, done);\n    }\n\n    isSync = false;\n\n    if (isDone) {\n      // This means the loop finished synchronously.\n      callback.apply(undefined, doneArgs);\n      return;\n    }\n\n    if (currentTurn >= turns && hasNext) {\n      isDone = true;\n      callback();\n    }\n  };\n\n  next();\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/AsyncUtils.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/BrowserProtocol.js":
/*!********************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/BrowserProtocol.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;\n\nvar _LocationUtils = __webpack_require__(/*! ./LocationUtils */ \"./node_modules/history-sessionStorage/lib/LocationUtils.js\");\n\nvar _DOMUtils = __webpack_require__(/*! ./DOMUtils */ \"./node_modules/history-sessionStorage/lib/DOMUtils.js\");\n\nvar _DOMStateStorage = __webpack_require__(/*! ./DOMStateStorage */ \"./node_modules/history-sessionStorage/lib/DOMStateStorage.js\");\n\nvar _PathUtils = __webpack_require__(/*! ./PathUtils */ \"./node_modules/history-sessionStorage/lib/PathUtils.js\");\n\nvar _ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ \"./node_modules/history-sessionStorage/lib/ExecutionEnvironment.js\");\n\nvar PopStateEvent = 'popstate';\nvar HashChangeEvent = 'hashchange';\n\nvar needsHashchangeListener = _ExecutionEnvironment.canUseDOM && !(0, _DOMUtils.supportsPopstateOnHashchange)();\n\nvar _createLocation = function _createLocation(historyState) {\n  var key = historyState && historyState.key;\n\n  return (0, _LocationUtils.createLocation)({\n    pathname: window.location.pathname,\n    search: window.location.search,\n    hash: window.location.hash,\n    state: key ? (0, _DOMStateStorage.readState)(key) : undefined\n  }, undefined, key);\n};\n\nvar getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {\n  var historyState = void 0;\n  try {\n    historyState = window.history.state || {};\n  } catch (error) {\n    // IE 11 sometimes throws when accessing window.history.state\n    // See https://github.com/ReactTraining/history/pull/289\n    historyState = {};\n  }\n\n  return _createLocation(historyState);\n};\n\nvar getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {\n  return callback(window.confirm(message));\n}; // eslint-disable-line no-alert\n\nvar startListener = exports.startListener = function startListener(listener) {\n  var handlePopState = function handlePopState(event) {\n    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) // Ignore extraneous popstate events in WebKit\n      return;\n    listener(_createLocation(event.state));\n  };\n\n  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);\n\n  var handleUnpoppedHashChange = function handleUnpoppedHashChange() {\n    return listener(getCurrentLocation());\n  };\n\n  if (needsHashchangeListener) {\n    (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);\n  }\n\n  return function () {\n    (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);\n\n    if (needsHashchangeListener) {\n      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);\n    }\n  };\n};\n\nvar updateLocation = function updateLocation(location, updateState) {\n  var state = location.state,\n      key = location.key;\n\n\n  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);\n\n  updateState({ key: key }, (0, _PathUtils.createPath)(location));\n};\n\nvar pushLocation = exports.pushLocation = function pushLocation(location) {\n  return updateLocation(location, function (state, path) {\n    return window.history.pushState(state, null, path);\n  });\n};\n\nvar replaceLocation = exports.replaceLocation = function replaceLocation(location) {\n  return updateLocation(location, function (state, path) {\n    return window.history.replaceState(state, null, path);\n  });\n};\n\nvar go = exports.go = function go(n) {\n  if (n) window.history.go(n);\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/BrowserProtocol.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/DOMStateStorage.js":
/*!********************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/DOMStateStorage.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.readState = exports.saveState = undefined;\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/warning/browser.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar QuotaExceededErrors = {\n  QuotaExceededError: true,\n  QUOTA_EXCEEDED_ERR: true\n};\n\nvar SecurityErrors = {\n  SecurityError: true\n};\n\nvar KeyPrefix = '@@History/';\n\nvar createKey = function createKey(key) {\n  return KeyPrefix + key;\n};\n\nvar saveState = exports.saveState = function saveState(key, state) {\n  if (!window.sessionStorage) {\n    // Session storage is not available or hidden.\n    // sessionStorage is undefined in Internet Explorer when served via file protocol.\n     true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : undefined;\n\n    return;\n  }\n\n  try {\n    if (state == null) {\n      window.sessionStorage.removeItem(createKey(key));\n    } else {\n      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));\n    }\n  } catch (error) {\n    if (SecurityErrors[error.name]) {\n      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any\n      // attempt to access window.sessionStorage.\n       true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;\n\n      return;\n    }\n\n    if (QuotaExceededErrors[error.name] && window.sessionStorage.length === 0) {\n      // Safari \"private mode\" throws QuotaExceededError.\n       true ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;\n\n      return;\n    }\n\n    throw error;\n  }\n};\n\nvar readState = exports.readState = function readState(key) {\n  var json = void 0;\n  try {\n    json = window.sessionStorage.getItem(createKey(key));\n  } catch (error) {\n    if (SecurityErrors[error.name]) {\n      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any\n      // attempt to access window.sessionStorage.\n       true ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;\n\n      return undefined;\n    }\n  }\n\n  if (json) {\n    try {\n      return JSON.parse(json);\n    } catch (error) {\n      // Ignore invalid JSON.\n    }\n  }\n\n  return undefined;\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/DOMStateStorage.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/DOMUtils.js":
/*!*************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/DOMUtils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nvar addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {\n  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);\n};\n\nvar removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {\n  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);\n};\n\n/**\n * Returns true if the HTML5 history API is supported. Taken from Modernizr.\n *\n * https://github.com/Modernizr/Modernizr/blob/master/LICENSE\n * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js\n * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586\n */\nvar supportsHistory = exports.supportsHistory = function supportsHistory() {\n  var ua = window.navigator.userAgent;\n\n  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;\n\n  return window.history && 'pushState' in window.history;\n};\n\n/**\n * Returns false if using go(n) with hash history causes a full page reload.\n */\nvar supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {\n  return window.navigator.userAgent.indexOf('Firefox') === -1;\n};\n\n/**\n * Returns true if browser fires popstate on hash change.\n * IE10 and IE11 do not.\n */\nvar supportsPopstateOnHashchange = exports.supportsPopstateOnHashchange = function supportsPopstateOnHashchange() {\n  return window.navigator.userAgent.indexOf('Trident') === -1;\n};\n\n/**\n * Returns true if a given popstate event is an extraneous WebKit event.\n * Accounts for the fact that Chrome on iOS fires real popstate events\n * containing undefined state when pressing the back button.\n */\nvar isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {\n  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/DOMUtils.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/ExecutionEnvironment.js":
/*!*************************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/ExecutionEnvironment.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nvar canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/ExecutionEnvironment.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/LocationUtils.js":
/*!******************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/LocationUtils.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar _invariant2 = _interopRequireDefault(_invariant);\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/warning/browser.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nvar _PathUtils = __webpack_require__(/*! ./PathUtils */ \"./node_modules/history-sessionStorage/lib/PathUtils.js\");\n\nvar _Actions = __webpack_require__(/*! ./Actions */ \"./node_modules/history-sessionStorage/lib/Actions.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar createQuery = exports.createQuery = function createQuery(props) {\n  return _extends(Object.create(null), props);\n};\n\nvar createLocation = exports.createLocation = function createLocation() {\n  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Actions.POP;\n  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n\n  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;\n\n   true ? (0, _warning2.default)(!object.path, 'Location descriptor objects should have a `pathname`, not a `path`.') : undefined;\n\n  var pathname = object.pathname || '/';\n  var search = object.search || '';\n  var hash = object.hash || '';\n  var state = object.state;\n\n  return {\n    pathname: pathname,\n    search: search,\n    hash: hash,\n    state: state,\n    action: action,\n    key: key\n  };\n};\n\nvar isDate = function isDate(object) {\n  return Object.prototype.toString.call(object) === '[object Date]';\n};\n\nvar statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {\n  if (a === b) return true;\n\n  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);\n  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);\n\n  if (typeofA !== typeofB) return false;\n\n  !(typeofA !== 'function') ?  true ? (0, _invariant2.default)(false, 'You must not store functions in location state') : undefined : void 0;\n\n  // Not the same object, but same type.\n  if (typeofA === 'object') {\n    !!(isDate(a) && isDate(b)) ?  true ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : undefined : void 0;\n\n    if (!Array.isArray(a)) {\n      var keysofA = Object.keys(a);\n      var keysofB = Object.keys(b);\n      return keysofA.length === keysofB.length && keysofA.every(function (key) {\n        return statesAreEqual(a[key], b[key]);\n      });\n    }\n\n    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {\n      return statesAreEqual(item, b[index]);\n    });\n  }\n\n  // All other serializable types (string, number, boolean)\n  // should be strict equal.\n  return false;\n};\n\nvar locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {\n  return a.key === b.key &&\n  // a.action === b.action && // Different action !== location change.\n  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/LocationUtils.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/PathUtils.js":
/*!**************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/PathUtils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = undefined;\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/warning/browser.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {\n  var _parsePath = parsePath(path),\n      pathname = _parsePath.pathname,\n      search = _parsePath.search,\n      hash = _parsePath.hash;\n\n  return createPath({\n    pathname: pathname,\n    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,\n    hash: hash\n  });\n};\n\nvar stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {\n  var _parsePath2 = parsePath(path),\n      pathname = _parsePath2.pathname,\n      search = _parsePath2.search,\n      hash = _parsePath2.hash;\n\n  return createPath({\n    pathname: pathname,\n    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {\n      return prefix === '?' ? prefix : suffix;\n    }),\n    hash: hash\n  });\n};\n\nvar getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {\n  var _parsePath3 = parsePath(path),\n      search = _parsePath3.search;\n\n  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));\n  return match && match[1];\n};\n\nvar extractPath = function extractPath(string) {\n  var match = string.match(/^(https?:)?\\/\\/[^\\/]*/);\n  return match == null ? string : string.substring(match[0].length);\n};\n\nvar parsePath = exports.parsePath = function parsePath(path) {\n  var pathname = extractPath(path);\n  var search = '';\n  var hash = '';\n\n   true ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like \"%s\"', path) : undefined;\n\n  var hashIndex = pathname.indexOf('#');\n  if (hashIndex !== -1) {\n    hash = pathname.substring(hashIndex);\n    pathname = pathname.substring(0, hashIndex);\n  }\n\n  var searchIndex = pathname.indexOf('?');\n  if (searchIndex !== -1) {\n    search = pathname.substring(searchIndex);\n    pathname = pathname.substring(0, searchIndex);\n  }\n\n  if (pathname === '') pathname = '/';\n\n  return {\n    pathname: pathname,\n    search: search,\n    hash: hash\n  };\n};\n\nvar createPath = exports.createPath = function createPath(location) {\n  if (location == null || typeof location === 'string') return location;\n\n  var basename = location.basename,\n      pathname = location.pathname,\n      search = location.search,\n      hash = location.hash;\n\n  var path = (basename || '') + pathname;\n\n  if (search && search !== '?') path += search;\n\n  if (hash) path += hash;\n\n  return path;\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/PathUtils.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/RefreshProtocol.js":
/*!********************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/RefreshProtocol.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;\n\nvar _BrowserProtocol = __webpack_require__(/*! ./BrowserProtocol */ \"./node_modules/history-sessionStorage/lib/BrowserProtocol.js\");\n\nObject.defineProperty(exports, 'getUserConfirmation', {\n  enumerable: true,\n  get: function get() {\n    return _BrowserProtocol.getUserConfirmation;\n  }\n});\nObject.defineProperty(exports, 'go', {\n  enumerable: true,\n  get: function get() {\n    return _BrowserProtocol.go;\n  }\n});\n\nvar _LocationUtils = __webpack_require__(/*! ./LocationUtils */ \"./node_modules/history-sessionStorage/lib/LocationUtils.js\");\n\nvar _PathUtils = __webpack_require__(/*! ./PathUtils */ \"./node_modules/history-sessionStorage/lib/PathUtils.js\");\n\nvar getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {\n  return (0, _LocationUtils.createLocation)(window.location);\n};\n\nvar pushLocation = exports.pushLocation = function pushLocation(location) {\n  window.location.href = (0, _PathUtils.createPath)(location);\n  return false; // Don't update location\n};\n\nvar replaceLocation = exports.replaceLocation = function replaceLocation(location) {\n  window.location.replace((0, _PathUtils.createPath)(location));\n  return false; // Don't update location\n};\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/RefreshProtocol.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/createBrowserHistory.js":
/*!*************************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/createBrowserHistory.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar _invariant2 = _interopRequireDefault(_invariant);\n\nvar _ExecutionEnvironment = __webpack_require__(/*! ./ExecutionEnvironment */ \"./node_modules/history-sessionStorage/lib/ExecutionEnvironment.js\");\n\nvar _BrowserProtocol = __webpack_require__(/*! ./BrowserProtocol */ \"./node_modules/history-sessionStorage/lib/BrowserProtocol.js\");\n\nvar BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);\n\nvar _RefreshProtocol = __webpack_require__(/*! ./RefreshProtocol */ \"./node_modules/history-sessionStorage/lib/RefreshProtocol.js\");\n\nvar RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);\n\nvar _DOMUtils = __webpack_require__(/*! ./DOMUtils */ \"./node_modules/history-sessionStorage/lib/DOMUtils.js\");\n\nvar _createHistory = __webpack_require__(/*! ./createHistory */ \"./node_modules/history-sessionStorage/lib/createHistory.js\");\n\nvar _createHistory2 = _interopRequireDefault(_createHistory);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Creates and returns a history object that uses HTML5's history API\n * (pushState, replaceState, and the popstate event) to manage history.\n * This is the recommended method of managing history in browsers because\n * it provides the cleanest URLs.\n *\n * Note: In browsers that do not support the HTML5 history API full\n * page reloads will be used to preserve clean URLs. You can force this\n * behavior using { forceRefresh: true } in options.\n */\nvar createBrowserHistory = function createBrowserHistory() {\n  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n  !_ExecutionEnvironment.canUseDOM ?  true ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : undefined : void 0;\n\n  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();\n  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;\n\n  var getUserConfirmation = Protocol.getUserConfirmation,\n      getCurrentLocation = Protocol.getCurrentLocation,\n      pushLocation = Protocol.pushLocation,\n      replaceLocation = Protocol.replaceLocation,\n      go = Protocol.go;\n\n\n  var history = (0, _createHistory2.default)(_extends({\n    getUserConfirmation: getUserConfirmation }, options, {\n    getCurrentLocation: getCurrentLocation,\n    pushLocation: pushLocation,\n    replaceLocation: replaceLocation,\n    go: go\n  }));\n\n  var listenerCount = 0,\n      stopListener = void 0;\n\n  var startListener = function startListener(listener, before) {\n    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);\n\n    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);\n\n    return function () {\n      unlisten();\n\n      if (--listenerCount === 0) stopListener();\n    };\n  };\n\n  var listenBefore = function listenBefore(listener) {\n    return startListener(listener, true);\n  };\n\n  var listen = function listen(listener) {\n    return startListener(listener, false);\n  };\n\n  return _extends({}, history, {\n    listenBefore: listenBefore,\n    listen: listen\n  });\n};\n\nexports.default = createBrowserHistory;\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/createBrowserHistory.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/createHistory.js":
/*!******************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/createHistory.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _AsyncUtils = __webpack_require__(/*! ./AsyncUtils */ \"./node_modules/history-sessionStorage/lib/AsyncUtils.js\");\n\nvar _PathUtils = __webpack_require__(/*! ./PathUtils */ \"./node_modules/history-sessionStorage/lib/PathUtils.js\");\n\nvar _runTransitionHook = __webpack_require__(/*! ./runTransitionHook */ \"./node_modules/history-sessionStorage/lib/runTransitionHook.js\");\n\nvar _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);\n\nvar _Actions = __webpack_require__(/*! ./Actions */ \"./node_modules/history-sessionStorage/lib/Actions.js\");\n\nvar _LocationUtils = __webpack_require__(/*! ./LocationUtils */ \"./node_modules/history-sessionStorage/lib/LocationUtils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar createHistory = function createHistory() {\n  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var getCurrentLocation = options.getCurrentLocation,\n      getUserConfirmation = options.getUserConfirmation,\n      pushLocation = options.pushLocation,\n      replaceLocation = options.replaceLocation,\n      go = options.go,\n      keyLength = options.keyLength;\n\n\n  var currentLocation = void 0;\n  var pendingLocation = void 0;\n  var beforeListeners = [];\n  var listeners = [];\n  var allKeys = [];\n\n  var getCurrentIndex = function getCurrentIndex() {\n    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);\n\n    if (currentLocation) return allKeys.indexOf(currentLocation.key);\n\n    return -1;\n  };\n\n  var updateLocation = function updateLocation(nextLocation) {\n    var currentIndex = getCurrentIndex();\n\n    currentLocation = nextLocation;\n\n    if (currentLocation.action === _Actions.PUSH) {\n      allKeys = [].concat(allKeys.slice(0, currentIndex + 1), [currentLocation.key]);\n    } else if (currentLocation.action === _Actions.REPLACE) {\n      allKeys[currentIndex] = currentLocation.key;\n    }\n\n    listeners.forEach(function (listener) {\n      return listener(currentLocation);\n    });\n  };\n\n  var listenBefore = function listenBefore(listener) {\n    beforeListeners.push(listener);\n\n    return function () {\n      return beforeListeners = beforeListeners.filter(function (item) {\n        return item !== listener;\n      });\n    };\n  };\n\n  var listen = function listen(listener) {\n    listeners.push(listener);\n\n    return function () {\n      return listeners = listeners.filter(function (item) {\n        return item !== listener;\n      });\n    };\n  };\n\n  var confirmTransitionTo = function confirmTransitionTo(location, callback) {\n    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {\n      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {\n        return result != null ? done(result) : next();\n      });\n    }, function (message) {\n      if (getUserConfirmation && typeof message === 'string') {\n        getUserConfirmation(message, function (ok) {\n          return callback(ok !== false);\n        });\n      } else {\n        callback(message !== false);\n      }\n    });\n  };\n\n  var transitionTo = function transitionTo(nextLocation) {\n    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do\n\n    pendingLocation = nextLocation;\n\n    confirmTransitionTo(nextLocation, function (ok) {\n      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation\n\n      pendingLocation = null;\n\n      if (ok) {\n        // Treat PUSH to same path like REPLACE to be consistent with browsers\n        if (nextLocation.action === _Actions.PUSH) {\n          var prevPath = (0, _PathUtils.createPath)(currentLocation);\n          var nextPath = (0, _PathUtils.createPath)(nextLocation);\n\n          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;\n        }\n\n        if (nextLocation.action === _Actions.POP) {\n          updateLocation(nextLocation);\n        } else if (nextLocation.action === _Actions.PUSH) {\n          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);\n        } else if (nextLocation.action === _Actions.REPLACE) {\n          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);\n        }\n      } else if (currentLocation && nextLocation.action === _Actions.POP) {\n        var prevIndex = allKeys.indexOf(currentLocation.key);\n        var nextIndex = allKeys.indexOf(nextLocation.key);\n\n        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL\n      }\n    });\n  };\n\n  var push = function push(input) {\n    return transitionTo(createLocation(input, _Actions.PUSH));\n  };\n\n  var replace = function replace(input) {\n    return transitionTo(createLocation(input, _Actions.REPLACE));\n  };\n\n  var goBack = function goBack() {\n    return go(-1);\n  };\n\n  var goForward = function goForward() {\n    return go(1);\n  };\n\n  var createKey = function createKey() {\n    return Math.random().toString(36).substr(2, keyLength || 6);\n  };\n\n  var createHref = function createHref(location) {\n    return (0, _PathUtils.createPath)(location);\n  };\n\n  var createLocation = function createLocation(location, action) {\n    var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : createKey();\n    return (0, _LocationUtils.createLocation)(location, action, key);\n  };\n\n  return {\n    getCurrentLocation: getCurrentLocation,\n    listenBefore: listenBefore,\n    listen: listen,\n    transitionTo: transitionTo,\n    push: push,\n    replace: replace,\n    go: go,\n    goBack: goBack,\n    goForward: goForward,\n    createKey: createKey,\n    createPath: _PathUtils.createPath,\n    createHref: createHref,\n    createLocation: createLocation\n  };\n};\n\nexports.default = createHistory;\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/createHistory.js?");

/***/ }),

/***/ "./node_modules/history-sessionStorage/lib/runTransitionHook.js":
/*!**********************************************************************!*\
  !*** ./node_modules/history-sessionStorage/lib/runTransitionHook.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/warning/browser.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar runTransitionHook = function runTransitionHook(hook, location, callback) {\n  var result = hook(location, callback);\n\n  if (hook.length < 2) {\n    // Assume the hook runs synchronously and automatically\n    // call the callback with the return value.\n    callback(result);\n  } else {\n     true ? (0, _warning2.default)(result === undefined, 'You should not \"return\" in a transition hook with a callback argument; ' + 'call the callback instead') : undefined;\n  }\n};\n\nexports.default = runTransitionHook;\n\n//# sourceURL=webpack:///./node_modules/history-sessionStorage/lib/runTransitionHook.js?");

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar invariant = function(condition, format, a, b, c, d, e, f) {\n  if (true) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  }\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error(\n        'Minified exception occurred; use the non-minified dev environment ' +\n        'for the full error message and additional helpful warnings.'\n      );\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(\n        format.replace(/%s/g, function() { return args[argIndex++]; })\n      );\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n};\n\nmodule.exports = invariant;\n\n\n//# sourceURL=webpack:///./node_modules/invariant/browser.js?");

/***/ }),

/***/ "./node_modules/warning/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright 2014-2015, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n\n\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = function() {};\n\nif (true) {\n  warning = function(condition, format, args) {\n    var len = arguments.length;\n    args = new Array(len > 2 ? len - 2 : 0);\n    for (var key = 2; key < len; key++) {\n      args[key - 2] = arguments[key];\n    }\n    if (format === undefined) {\n      throw new Error(\n        '`warning(condition, format, ...args)` requires a warning ' +\n        'message argument'\n      );\n    }\n\n    if (format.length < 10 || (/^[s\\W]*$/).test(format)) {\n      throw new Error(\n        'The warning format should be able to uniquely identify this ' +\n        'warning. Please, use a more descriptive format than: ' + format\n      );\n    }\n\n    if (!condition) {\n      var argIndex = 0;\n      var message = 'Warning: ' +\n        format.replace(/%s/g, function() {\n          return args[argIndex++];\n        });\n      if (typeof console !== 'undefined') {\n        console.error(message);\n      }\n      try {\n        // This error was thrown as a convenience so that you can use this stack\n        // to find the callsite that caused this warning to fire.\n        throw new Error(message);\n      } catch(x) {}\n    }\n  };\n}\n\nmodule.exports = warning;\n\n\n//# sourceURL=webpack:///./node_modules/warning/browser.js?");

/***/ }),

/***/ "./spa-sessionStorage/index.js":
/*!*************************************!*\
  !*** ./spa-sessionStorage/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var history_sessionStorage_lib_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! history-sessionStorage/lib/createBrowserHistory */ \"./node_modules/history-sessionStorage/lib/createBrowserHistory.js\");\n/* harmony import */ var history_sessionStorage_lib_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(history_sessionStorage_lib_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0__);\n\n\nwindow.onload = function () {\n  const history = history_sessionStorage_lib_createBrowserHistory__WEBPACK_IMPORTED_MODULE_0___default()();\n  const { pathname } = history.getCurrentLocation();\n\n  if (routes.hasOwnProperty(pathname)) {\n    history.listenBefore((location) => {\n      // TODO: check if page 2's input value is filled. If it isn't, block user from leaving page\n      console.log({ ...location });\n      const isLeaving = window.confirm(`Do you really want to leave?`);\n      console.log({ isLeaving });\n      return isLeaving;\n    });\n  }\n\n  function addNavigateEventListener(pathname) {\n    document.getElementById(\"navigate\").addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      history.push({\n        pathname,\n        state: { index: window.history.length + 1 },\n      });\n      init();\n    });\n  }\n\n  function printHistory() {\n    let values = {};\n    for (const property in window.history) {\n      if (typeof window.history[property] === \"function\") {\n        values[property] = \"native function()\";\n      } else {\n        values[property] = window.history[property];\n      }\n    }\n\n    document.getElementById(\"history\").innerText = JSON.stringify(\n      values,\n      null,\n      \"\\t\"\n    );\n  }\n\n  function init() {\n    const pathname = window.location.pathname;\n    if (routes.hasOwnProperty(pathname)) {\n      const { render, nextPage } = routes[pathname];\n      document.getElementById(\"app\").innerHTML = render;\n\n      printHistory();\n      addNavigateEventListener(nextPage);\n    }\n  }\n\n  init();\n};\n\nconst routes = {\n  \"/\": {\n    render: createPage(1, 2),\n    nextPage: \"/page2\",\n  },\n  \"/page2\": {\n    render: createPage(2, 1),\n    nextPage: \"/\",\n  },\n};\n\nfunction createPage(currentPage, nextPage) {\n  return `\n    <h1>Page ${currentPage}</h1>\n    <a href=\"#\" id=\"navigate\">Go to page ${nextPage}</a>\n    <br />\n    <a href=\"https://google.com\">Leave SPA</a>\n    <br />\n    ${\n      currentPage === 2\n        ? \"<label for='text'>Type something here: </label><input id='text' />\"\n        : \"\"\n    }\n    <pre id=\"history\"></pre>\n  `;\n}\n\n\n//# sourceURL=webpack:///./spa-sessionStorage/index.js?");

/***/ })

/******/ });