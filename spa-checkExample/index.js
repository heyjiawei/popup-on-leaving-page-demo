function promptBeforeUnload(event) {
  // Cancel the event.
  event.preventDefault();
  // Chrome (and legacy IE) requires returnValue to be set.
  event.returnValue = "";
}

function parsePath(path) {
  let partialPath = {};

  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      partialPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      partialPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      partialPath.pathname = path;
    }
  }

  return partialPath;
}

const readOnly = (obj) => obj;
// __DEV__ ? (obj) => Object.freeze(obj) : (obj) => obj;

function createEvents() {
  let handlers = [];
  return {
    get length() {
      return handlers.length;
    },
    push(fn) {
      handlers.push(fn);
      return function () {
        handlers = handlers.filter((handler) => handler !== fn);
      };
    },
    call(arg) {
      handlers.forEach((fn) => fn && fn(arg));
    },
  };
}

function createKey() {
  return Math.random().toString(36).substr(2, 8);
}

function createPath({ pathname = "/", search = "", hash = "" }) {
  return pathname + search + hash;
}

function createBrowserHistory(options = {}) {
  let { window = document.defaultView } = options;
  let globalHistory = window.history;

  function getIndexAndLocation() {
    let { pathname, search, hash } = window.location;
    let state = globalHistory.state || {};
    return [
      state.idx,
      readOnly({
        pathname,
        search,
        hash,
        state: state.usr || null,
        key: state.key || "default",
      }),
    ];
  }

  let blockedPopTx = null;
  function handlePop() {
    console.log("in handlePop", { blockedPopTx });
    if (blockedPopTx) {
      blockers.call(blockedPopTx);
      blockedPopTx = null;
    } else {
      let nextAction = "POP";
      let [nextIndex, nextLocation] = getIndexAndLocation();

      if (blockers.length) {
        console.log({ nextIndex, index, historyState: globalHistory.state });
        console.log({ nextLocation, location });
        if (nextIndex != null) {
          let delta = index - nextIndex;
          if (delta) {
            blockedPopTx = {
              action: nextAction,
              location: nextLocation,
              retry() {
                go(delta * -1);
              },
            };

            go(delta);
          }
        } else {
          // Trying to POP to a location with no index. We did not create
          // this location, so we can't effectively block the navigation.
          warning(
            false,
            // TODO: Write up a doc that explains our blocking strategy in
            // detail and link to it here so people can understand better what
            // is going on and how to avoid it.
            `You are trying to block a POP navigation to a location that was not ` +
              `created by the history library. The block will fail silently in ` +
              `production, but in general you should do all navigation with the ` +
              `history library (instead of using window.history.pushState directly) ` +
              `to avoid this situation.`
          );
        }
      } else {
        applyTx(nextAction);
      }
    }
  }

  window.addEventListener("popstate", handlePop);

  let action = "POP";
  let [index, location] = getIndexAndLocation();
  let listeners = createEvents();
  let blockers = createEvents();
  console.log("ran", { globalHistory, historyState: globalHistory.state });
  if (index == null) {
    console.log("index is null");
    index = 0;
    globalHistory.replaceState(
      {
        ...globalHistory.state,
        idx: index,
      },
      ""
    );
  }

  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }

  function getNextLocation(to, state = null) {
    return readOnly({
      ...location,
      ...(typeof to === "string" ? parsePath(to) : to),
      state,
      key: createKey(),
    });
  }

  function getHistoryStateAndUrl(nextLocation, index) {
    return [
      {
        usr: nextLocation.state,
        key: nextLocation.key,
        idx: index,
      },
      createHref(nextLocation),
    ];
  }

  function allowTx(action, location, retry) {
    return (
      !blockers.length || (blockers.call({ action, location, retry }), false)
    );
  }

  function applyTx(nextAction) {
    action = nextAction;
    [index, location] = getIndexAndLocation();
    listeners.call({ action, location });
  }

  function push(to, state) {
    let nextAction = "PUSH";
    let nextLocation = getNextLocation(to, state);
    function retry() {
      push(to, state);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      let [historyState, url] = getHistoryStateAndUrl(nextLocation, index + 1);

      // TODO: Support forced reloading
      // try...catch because iOS limits us to 100 pushState calls :/
      try {
        globalHistory.pushState(historyState, "", url);
      } catch (error) {
        // They are going to lose state here, but there is no real
        // way to warn them about it since the page will refresh...
        window.location.assign(url);
      }

      applyTx(nextAction);
    }
  }

  function replace(to, state) {
    let nextAction = "REPLACE";
    let nextLocation = getNextLocation(to, state);
    function retry() {
      replace(to, state);
    }

    if (allowTx(nextAction, nextLocation, retry)) {
      let [historyState, url] = getHistoryStateAndUrl(nextLocation, index);

      // TODO: Support forced reloading
      globalHistory.replaceState(historyState, "", url);

      applyTx(nextAction);
    }
  }

  function go(delta) {
    globalHistory.go(delta);
  }

  let history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    createHref,
    push,
    replace,
    go,
    back() {
      go(-1);
    },
    forward() {
      go(1);
    },
    listen(listener) {
      return listeners.push(listener);
    },
    block(blocker) {
      let unblock = blockers.push(blocker);
      console.log("In block(blocker)", { blockers });
      if (blockers.length === 1) {
        window.addEventListener("beforeunload", promptBeforeUnload);
      }

      return function () {
        unblock();

        // Remove the beforeunload listener so the document may
        // still be salvageable in the pagehide event.
        // See https://html.spec.whatwg.org/#unloading-documents
        if (!blockers.length) {
          window.removeEventListener("beforeunload", promptBeforeUnload);
        }
      };
    },
  };

  return history;
}

window.onload = function () {
  const history = createBrowserHistory();

  history.listen(({ action, location }) => {
    init();
  });

  function addHistoryBlockToPage() {
    const unblock = history.block(({ action, location, retry }) => {
      console.log("in history block, traveling to ", { action, location });
      console.log("in history block, current location", {
        currentLocation: history.location,
      });
      let url = location.pathname;
      if (window.confirm(`Are you sure you want to go to ${url}?`)) {
        console.log("Said yes to navigate, before unblock() runs");
        // Unblock the navigation.
        unblock();
        console.log("Said yes to navigate, unblock ran, calling retry()");
        // Retry the transition.
        retry();
      }
    });
  }

  function printHistory() {
    let values = {};
    for (const property in window.history) {
      if (typeof window.history[property] === "function") {
        values[property] = "native function()";
      } else {
        values[property] = window.history[property];
      }
    }

    document.getElementById("history").innerText = JSON.stringify(
      values,
      null,
      "\t"
    );
  }

  function init() {
    document.getElementById("app").innerHTML = createPage();

    printHistory();
    addNavigateEventListener();
    addHistoryBlockToPage();
  }

  function addNavigateEventListener() {
    const links = document.getElementsByTagName("ul")[0];
    links.addEventListener("click", (e) => {
      e.preventDefault();
      const pathname = e.target.attributes.href.value;
      history.push(pathname);
    });
  }

  function createPage() {
    return `
      <h1>Page ${window.location.pathname}</h1>
      <ul>
        <li><a href="/">home</a></li>
        <li><a href="page1">page1</a></li>
        <li><a href="page2">page2</a></li>
      </ul>
      <pre id="history"></pre>
    `;
  }

  init();
};
