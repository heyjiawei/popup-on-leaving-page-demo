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
    <pre id="history"></pre>
  `;
}

function addNavigateEventListener(pathname) {
  document.getElementById("navigate").addEventListener("click", (event) => {
    event.preventDefault();
    window.history.pushState(
      { index: window.history.length + 1 },
      pathname,
      window.location.origin + pathname
    );
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

window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});

window.addEventListener("popstate", (event) => {
  const isLeaving = window.confirm(
    `popstate listener called. Current location ${window.location.href} Do you wish to leave the page?`
  );

  if (isLeaving) {
    init();
  } else {
    // Impossible at the moment
    // revertPop()
  }
});
