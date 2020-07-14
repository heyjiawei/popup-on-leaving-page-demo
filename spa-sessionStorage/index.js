import createHistory from "history-sessionStorage/lib/createBrowserHistory";

window.onload = function () {
  const history = createHistory();
  const { pathname } = history.getCurrentLocation();

  if (routes.hasOwnProperty(pathname)) {
    history.listenBefore((location) => {
      // TODO: check if page 2's input value is filled. If it isn't, block user from leaving page
      console.log({ ...location });
      const isLeaving = window.confirm(`Do you really want to leave?`);
      console.log({ isLeaving });
      return isLeaving;
    });
  }

  function addNavigateEventListener(pathname) {
    document.getElementById("navigate").addEventListener("click", (event) => {
      event.preventDefault();
      history.push({
        pathname,
        state: { index: window.history.length + 1 },
      });
      init();
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
    const pathname = window.location.pathname;
    if (routes.hasOwnProperty(pathname)) {
      const { render, nextPage } = routes[pathname];
      document.getElementById("app").innerHTML = render;

      printHistory();
      addNavigateEventListener(nextPage);
    }
  }

  init();
};

const routes = {
  "/": {
    render: createPage(1, 2),
    nextPage: "/page2",
  },
  "/page2": {
    render: createPage(2, 1),
    nextPage: "/",
  },
};

function createPage(currentPage, nextPage) {
  return `
    <h1>Page ${currentPage}</h1>
    <a href="#" id="navigate">Go to page ${nextPage}</a>
    <br />
    <a href="https://google.com">Leave SPA</a>
    <br />
    ${
      currentPage === 2
        ? "<label for='text'>Type something here: </label><input id='text' />"
        : ""
    }
    <pre id="history"></pre>
  `;
}
