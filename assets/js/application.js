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

const Test3Page = {
  init: () => {
    console.log("Test 3 initialized");

    var updateFactButton = document.querySelector("#test3 .update-fact");
    updateFactButton.addEventListener("click", (event) => {
      var facts = document.querySelector(`#test3 .dynamic-facts`);
      Test3Page.updateFact(facts);
    });
  },
  updateFact: (element) => {
    fetch(`https://catfact.ninja/fact`)
      .then((response) => response.json())
      .then((htmlContent) => {
        element.innerHTML = htmlContent.fact;
      })
      .catch((error) => {
        console.error("Error loading content:", error);
      });
  },
};

const Test4Page = {
  errors: 0,
  init: () => {
    console.log("Test 4 initialized");
    var validateButton = document.querySelector("#test4 .validate-form");
    var validationFeedback = document.querySelector("#test4 .validate-error");
    validateButton.addEventListener("click", (event) => {
      console.log(validateButton.dataset.loading);
      if (validateButton.dataset.loading == "true") {
        console.log("Validation in process, please wait");
        validationFeedback.innerHTML = `Validation ongoing, please wait...`;
        return false;
      }
      validateButton.dataset.loading = "true";
      Test4Page.validateForm(event, validateButton, validationFeedback);
    });
  },
  validateForm: (event, element, feedbackElement) => {
    Test4Page.errors = 0;
    console.log("Validating form");
    var nameElement = document.querySelector("#test4 .test-form #name");
    var nameError = document.querySelector("#test4 .test-form .name-error");
    if (nameElement.value == null || nameElement.value == "" || nameElement.value.length < 4) {
      Test4Page.errors++;
      nameError.innerHTML = `Inform your name with at least 4 characters`;
      nameElement.setAttribute("validation", "error");
    } else {
      nameError.innerHTML = ``;
      nameElement.setAttribute("validation", "success");
    }

    var emailElement = document.querySelector("#test4 .test-form #email");
    var emailError = document.querySelector("#test4 .test-form .email-error");
    if (nameElement.value == null || emailElement.value == "" || !Test4Page.checkMailFormat(emailElement.value)) {
      Test4Page.errors++;
      emailError.innerHTML = `Inform a valid email address`;
      emailElement.setAttribute("validation", "error");
    } else {
      emailError.innerHTML = ``;
      emailElement.setAttribute("validation", "success");
    }

    setTimeout(() => {
      element.dataset.loading = "false";
      feedbackElement.innerHTML = ``;
    }, 1500);
  },
  checkMailFormat: (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
};
