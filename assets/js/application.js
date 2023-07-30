const IndexPage = {
  pagesPath: "./pages",
  htmlSelector: ".app .app-container",
  init: () => {
    console.log("Page started");
    IndexPage.placeListeners();
    IndexPage.loadPage("test");
  },
  placeListeners: () => {
    /* Show more or less information (mobile) */
    var showMoreButton = document.querySelector(`${IndexPage.htmlSelector} .app-header .show-more`);
    showMoreButton.addEventListener("click", (event) => {
      IndexPage.showMore(event, showMoreButton);
    });
    /* Toggle menu (mobile) */
    var toggleMenuButton = document.querySelectorAll(`${IndexPage.htmlSelector} .app-menu .toggle`);
    toggleMenuButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        IndexPage.toggleMenu(event, button);
      });
    });
  },
  showMore: (event, element) => {
    var state = element.dataset.action;
    var pageElement = document.querySelector(".app .app-container .app-header .page");
    var idElement = document.querySelector(".app .app-container .app-header .id");
    if (state == "open") {
      pageElement.dataset.show = true;
      idElement.dataset.show = true;
      element.dataset.action = "close";
      element.innerHTML = element.innerHTML.trim().replace("more", "less");
    } else {
      pageElement.dataset.show = false;
      idElement.dataset.show = false;
      element.dataset.action = "open";
      element.innerHTML = element.innerHTML.trim().replace("less", "more");
    }
    return false;
  },
  toggleMenu: (event, element) => {
    console.log("Toggle menu");
    var state = element.dataset.action;
    var menuElement = document.querySelector(".app .app-container .app-menu .menu");
    if (state == "open") {
      menuElement.setAttribute("open", true);
    } else {
      menuElement.removeAttribute("open");
    }
    return false;
  },
  loadPage: (page) => {
    fetch(`${IndexPage.pagesPath}/${page}.html`)
      .then((response) => response.text())
      .then((htmlContent) => {
        var appBodyElement = document.querySelector(`${IndexPage.htmlSelector} .app-body`);
        appBodyElement.innerHTML = htmlContent;
      })
      .catch((error) => {
        console.error("Error loading content:", error);
      });
  },
};

IndexPage.init();
