const IndexPage = {
  pagesPath: "./pages",
  htmlSelector: ".app .app-container",
  init: () => {
    console.log("Page started");
    IndexPage.placeListeners();
    IndexPage.loadPage("home");
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
    var accessMenuLinkButton = document.querySelectorAll(`${IndexPage.htmlSelector} .app-menu ul li a`);
    accessMenuLinkButton.forEach((button) => {
      button.addEventListener("click", (event) => {
        var page = button.dataset.page;
        IndexPage.loadPage(page);
        var menuElement = document.querySelector(".app .app-container .app-menu .menu");
        menuElement.removeAttribute("open");
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
        IndexPage.initObject(page);
      })
      .catch((error) => {
        console.error("Error loading content:", error);
      });
  },
  initObject: (obj) => {
    switch (obj) {
      case "test1":
        Test1Page.init();
        break;
      case "test2":
        Test2Page.init();
        break;
      case "test3":
        Test3Page.init();
        break;
      case "test4":
        Test4Page.init();
        break;
    }
  },
};

IndexPage.init();

const Test1Page = {
  init: () => {
    console.log("Test 1 initialized");

    var changeButton = document.querySelector("#test1 .change-paragraph");
    changeButton.addEventListener("click", (event) => {
      var randomNumber = Math.floor(Math.random() * 3) + 1;
      var randomParagraph = document.querySelector(`#test1 pre[data-id="${randomNumber}"]`);
      var randomParagraphContent = randomParagraph.innerHTML;
      var dynamicParagraph = document.querySelector(`#test1 .dynamic-paragraph`);
      dynamicParagraph.innerHTML = randomParagraphContent;
    });
  },
};
