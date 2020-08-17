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
/******/ 	return __webpack_require__(__webpack_require__.s = "./spa-historyState/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./spa-historyState/index.js":
/*!***********************************!*\
  !*** ./spa-historyState/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function promptBeforeUnload(event) {\n  console.log(\"promptBeforeUnload ran\");\n  // Cancel the event.\n  event.preventDefault();\n  // Chrome (and legacy IE) requires returnValue to be set.\n  event.returnValue = \"\";\n}\n\nfunction parsePath(path) {\n  let partialPath = {};\n\n  if (path) {\n    let hashIndex = path.indexOf(\"#\");\n    if (hashIndex >= 0) {\n      partialPath.hash = path.substr(hashIndex);\n      path = path.substr(0, hashIndex);\n    }\n\n    let searchIndex = path.indexOf(\"?\");\n    if (searchIndex >= 0) {\n      partialPath.search = path.substr(searchIndex);\n      path = path.substr(0, searchIndex);\n    }\n\n    if (path) {\n      partialPath.pathname = path;\n    }\n  }\n\n  return partialPath;\n}\n\nconst readOnly = (obj) => obj;\n// __DEV__ ? (obj) => Object.freeze(obj) : (obj) => obj;\n\nfunction createEvents() {\n  let handlers = [];\n  return {\n    get length() {\n      return handlers.length;\n    },\n    push(fn) {\n      handlers.push(fn);\n      return function () {\n        handlers = handlers.filter((handler) => handler !== fn);\n      };\n    },\n    call(arg) {\n      handlers.forEach((fn) => fn && fn(arg));\n    },\n  };\n}\n\nfunction createKey() {\n  return Math.random().toString(36).substr(2, 8);\n}\n\nfunction createPath({ pathname = \"/\", search = \"\", hash = \"\" }) {\n  return pathname + search + hash;\n}\n\nfunction createBrowserHistory(options = {}) {\n  let { window = document.defaultView } = options;\n  let globalHistory = window.history;\n\n  function getIndexAndLocation() {\n    let { pathname, search, hash } = window.location;\n    let state = globalHistory.state || {};\n    return [\n      state.idx,\n      readOnly({\n        pathname,\n        search,\n        hash,\n        state: state.usr || null,\n        key: state.key || \"default\",\n      }),\n    ];\n  }\n\n  let blockedPopTx = null;\n  function handlePop() {\n    console.log(\"in handlePop\", { blockedPopTx });\n    if (blockedPopTx) {\n      blockers.call(blockedPopTx);\n      blockedPopTx = null;\n    } else {\n      let nextAction = \"POP\";\n      let [nextIndex, nextLocation] = getIndexAndLocation();\n\n      if (blockers.length) {\n        console.log({ nextIndex, index, historyState: globalHistory.state });\n        console.log({ nextLocation, location });\n        if (nextIndex != null) {\n          let delta = index - nextIndex;\n          if (delta) {\n            blockedPopTx = {\n              action: nextAction,\n              location: nextLocation,\n              retry() {\n                go(delta * -1);\n              },\n            };\n\n            go(delta);\n          }\n        } else {\n          // Trying to POP to a location with no index. We did not create\n          // this location, so we can't effectively block the navigation.\n          warning(\n            false,\n            // TODO: Write up a doc that explains our blocking strategy in\n            // detail and link to it here so people can understand better what\n            // is going on and how to avoid it.\n            `You are trying to block a POP navigation to a location that was not ` +\n              `created by the history library. The block will fail silently in ` +\n              `production, but in general you should do all navigation with the ` +\n              `history library (instead of using window.history.pushState directly) ` +\n              `to avoid this situation.`\n          );\n        }\n      } else {\n        applyTx(nextAction);\n      }\n    }\n  }\n\n  window.addEventListener(\"popstate\", handlePop);\n\n  let action = \"POP\";\n  let [index, location] = getIndexAndLocation();\n  let listeners = createEvents();\n  let blockers = createEvents();\n  console.log(\"ran\", { globalHistory, historyState: globalHistory.state });\n  if (index == null) {\n    console.log(\"index is null\");\n    index = 0;\n    globalHistory.replaceState(\n      {\n        ...globalHistory.state,\n        idx: index,\n      },\n      \"\"\n    );\n  }\n\n  function createHref(to) {\n    return typeof to === \"string\" ? to : createPath(to);\n  }\n\n  function getNextLocation(to, state = null) {\n    return readOnly({\n      ...location,\n      ...(typeof to === \"string\" ? parsePath(to) : to),\n      state,\n      key: createKey(),\n    });\n  }\n\n  function getHistoryStateAndUrl(nextLocation, index) {\n    return [\n      {\n        usr: nextLocation.state,\n        key: nextLocation.key,\n        idx: index,\n      },\n      createHref(nextLocation),\n    ];\n  }\n\n  function allowTx(action, location, retry) {\n    return (\n      !blockers.length || (blockers.call({ action, location, retry }), false)\n    );\n  }\n\n  function applyTx(nextAction) {\n    action = nextAction;\n    [index, location] = getIndexAndLocation();\n    listeners.call({ action, location });\n  }\n\n  function push(to, state) {\n    let nextAction = \"PUSH\";\n    let nextLocation = getNextLocation(to, state);\n    function retry() {\n      push(to, state);\n    }\n\n    if (allowTx(nextAction, nextLocation, retry)) {\n      let [historyState, url] = getHistoryStateAndUrl(nextLocation, index + 1);\n\n      // TODO: Support forced reloading\n      // try...catch because iOS limits us to 100 pushState calls :/\n      try {\n        globalHistory.pushState(historyState, \"\", url);\n      } catch (error) {\n        // They are going to lose state here, but there is no real\n        // way to warn them about it since the page will refresh...\n        window.location.assign(url);\n      }\n\n      applyTx(nextAction);\n    }\n  }\n\n  function replace(to, state) {\n    let nextAction = \"REPLACE\";\n    let nextLocation = getNextLocation(to, state);\n    function retry() {\n      replace(to, state);\n    }\n\n    if (allowTx(nextAction, nextLocation, retry)) {\n      let [historyState, url] = getHistoryStateAndUrl(nextLocation, index);\n\n      // TODO: Support forced reloading\n      globalHistory.replaceState(historyState, \"\", url);\n\n      applyTx(nextAction);\n    }\n  }\n\n  function go(delta) {\n    globalHistory.go(delta);\n  }\n\n  let history = {\n    get action() {\n      return action;\n    },\n    get location() {\n      return location;\n    },\n    createHref,\n    push,\n    replace,\n    go,\n    back() {\n      go(-1);\n    },\n    forward() {\n      go(1);\n    },\n    listen(listener) {\n      return listeners.push(listener);\n    },\n    block(blocker) {\n      let unblock = blockers.push(blocker);\n      console.log(\"In block(blocker)\", { blockers });\n      if (blockers.length === 1) {\n        window.addEventListener(\"beforeunload\", promptBeforeUnload);\n      }\n\n      return function () {\n        unblock();\n\n        // Remove the beforeunload listener so the document may\n        // still be salvageable in the pagehide event.\n        // See https://html.spec.whatwg.org/#unloading-documents\n        if (!blockers.length) {\n          window.removeEventListener(\"beforeunload\", promptBeforeUnload);\n        }\n      };\n    },\n  };\n\n  return history;\n}\n\nwindow.onload = function () {\n  const history = createBrowserHistory();\n\n  history.listen(({ action, location }) => {\n    init(history.location);\n  });\n\n  // This code blocks navigation just once\n  // const unblock = history.block(({ action, location, retry }) => {\n  //   console.log(\"in history block, traveling to \", { action, location });\n  //   console.log(\"in history block, current location\", {\n  //     currentLocation: history.location,\n  //   });\n  //   let url = location.pathname;\n  //   if (window.confirm(`Are you sure you want to go to ${url}?`)) {\n  //     console.log(\"Said yes to navigate, before unblock() runs\");\n  //     // Unblock the navigation.\n  //     unblock();\n  //     console.log(\"Said yes to navigate, unblock ran, calling retry()\");\n  //     // Retry the transition.\n  //     retry();\n  //   }\n  // });\n\n  function addNavigateEventListener(pathname) {\n    document.getElementById(\"navigate\").addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      history.push(pathname);\n    });\n  }\n\n  function addHistoryBlockToPage() {\n    document.getElementById(\"blockNav\").addEventListener(\"click\", (e) => {\n      e.preventDefault();\n      const unblock = history.block(({ action, location, retry }) => {\n        console.log(\"in history block, traveling to \", { action, location });\n        console.log(\"in history block, current location\", {\n          currentLocation: history.location,\n        });\n        let url = location.pathname;\n        if (window.confirm(`Are you sure you want to go to ${url}?`)) {\n          console.log(\"Said yes to navigate, before unblock() runs\");\n          // Unblock the navigation.\n          unblock();\n          console.log(\"Said yes to navigate, unblock ran, calling retry()\");\n          // Retry the transition.\n          retry();\n        }\n      });\n    });\n  }\n\n  function addLocationRedirect(pathname) {\n    document.getElementById(\"location\").addEventListener(\"click\", (e) => {\n      e.preventDefault();\n      window.location.href = pathname;\n    });\n  }\n\n  function printHistory() {\n    let values = {};\n    for (const property in window.history) {\n      if (typeof window.history[property] === \"function\") {\n        values[property] = \"native function()\";\n      } else {\n        values[property] = window.history[property];\n      }\n    }\n\n    document.getElementById(\"history\").innerText = JSON.stringify(\n      values,\n      null,\n      \"\\t\"\n    );\n  }\n\n  function init(location) {\n    console.log(\"init()\", { location });\n    const { pathname } = location;\n    if (routes.hasOwnProperty(pathname)) {\n      const { render, nextPage } = routes[pathname];\n      document.getElementById(\"app\").innerHTML = render;\n\n      printHistory();\n      addNavigateEventListener(nextPage);\n      addHistoryBlockToPage();\n      addLocationRedirect(nextPage);\n    }\n  }\n\n  init(history.location);\n};\n\nconst routes = {\n  \"/\": {\n    render: createPage(1, 2),\n    nextPage: \"/page2\",\n  },\n  \"/page2\": {\n    render: createPage(2, 1),\n    nextPage: \"/\",\n  },\n};\n\nfunction createPage(currentPage, nextPage) {\n  return `\n    <h1>Page ${currentPage}</h1>\n    <a href=\"#\" id=\"navigate\">Go to page ${nextPage}</a>\n    <br />\n    <a href=\"https://google.com\">Leave SPA</a>\n    <button id=\"blockNav\">Add history blocking</button>\n    <button id=\"location\">Use location API</button>\n    <br />\n    ${\n      currentPage === 2\n        ? \"<label for='text'>Type something here: </label><input id='text' />\"\n        : \"\"\n    }\n    <pre id=\"history\"></pre>\n  `;\n}\n\n\n//# sourceURL=webpack:///./spa-historyState/index.js?");

/***/ })

/******/ });