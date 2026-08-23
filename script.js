/* =========================================================
   ABOLF AZL TURKMANI PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.add("js-ready");

  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initSkillTabs();
  initJourneyTabs();
  initProjectFilters();
  initProjectModals();
  initScrollReveal();
  initActiveNavigation();
  initImageFallback();
  initKeyboard();
});


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

  const header = document.querySelector(".header");

  if (!header) return;

  function checkHeader() {

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  checkHeader();

  window.addEventListener(
    "scroll",
    checkHeader,
    { passive: true }
  );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuButton || !navLinks) return;


  menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const isOpen =
      navLinks.classList.contains("open");

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuButton.innerHTML =
      isOpen ? "✕" : "☰";

  });


  /* Close menu after clicking link */

  navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.innerHTML = "☰";

      });

    });


  /* Close when clicking outside */

  document.addEventListener("click", event => {

    const clickedInside =
      navLinks.contains(event.target) ||
      menuButton.contains(event.target);

    if (!clickedInside) {

      navLinks.classList.remove("open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.innerHTML = "☰";

    }

  });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

  const links =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  links.forEach(link => {

    link.addEventListener("click", event => {

      const href =
        link.getAttribute("href");

      if (!href || href === "#") return;

      const target =
        document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const header =
        document.querySelector(".header");

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });

}


/* =========================================================
   SKILLS TABS
========================================================= */

function initSkillTabs() {

  const tabs =
    document.querySelectorAll(".skill-tab");

  const panels =
    document.querySelectorAll(".skill-panel");

  if (!tabs.length || !panels.length) return;


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const target =
        tab.dataset.target ||
        tab.getAttribute("data-tab");

      if (!target) return;


      /* Remove active tab */

      tabs.forEach(item => {
        item.classList.remove("active");
      });

      tab.classList.add("active");


      /* Hide panels */

      panels.forEach(panel => {

        panel.classList.remove("active");

      });


      /* Show selected panel */

      let targetPanel =
        document.querySelector(
          `[data-panel="${target}"]`
        );

      if (!targetPanel) {

        targetPanel =
          document.getElementById(target);

      }

      if (targetPanel) {

        targetPanel.classList.add("active");

      }

    });

  });

}


/* =========================================================
   JOURNEY TABS
========================================================= */

function initJourneyTabs() {

  const tabs =
    document.querySelectorAll(".journey-tab");

  if (!tabs.length) return;


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      tabs.forEach(item => {

        item.classList.remove("active");

      });

      tab.classList.add("active");


      const target =
        tab.dataset.target ||
        tab.getAttribute("data-target");


      if (!target) return;


      const panels =
        document.querySelectorAll(
          ".journey-panel"
        );

      panels.forEach(panel => {

        panel.style.display = "none";

      });


      const panel =
        document.querySelector(
          `[data-panel="${target}"]`
        );


      if (panel) {

        panel.style.display = "grid";

      }

    });

  });

}


/* =========================================================
   PROJECT FILTERS
========================================================= */

function initProjectFilters() {

  const filters =
    document.querySelectorAll(".filter");

  const projects =
    document.querySelectorAll(".project-card");

  if (!filters.length || !projects.length) return;


  filters.forEach(filter => {

    filter.addEventListener("click", () => {

      /* Active filter */

      filters.forEach(item => {

        item.classList.remove("active");

      });

      filter.classList.add("active");


      const category =
        filter.dataset.filter ||
        filter.getAttribute("data-category");


      if (!category || category === "all") {

        projects.forEach(project => {

          project.classList.remove("hidden");

        });

        return;

      }


      projects.forEach(project => {

        const categories =
          project.dataset.category ||
          project.getAttribute("data-category") ||
          "";


        const categoryList =
          categories
            .toLowerCase()
            .split(",");


        if (
          categoryList.includes(
            category.toLowerCase()
          )
        ) {

          project.classList.remove("hidden");

        } else {

          project.classList.add("hidden");

        }

      });

    });

  });

}


/* =========================================================
   PROJECT MODALS
========================================================= */

function initProjectModals() {

  const modal =
    document.querySelector(".modal");

  if (!modal) return;


  const modalTitle =
    modal.querySelector(
      "[data-modal-title]"
    );

  const modalDescription =
    modal.querySelector(
      "[data-modal-description]"
    );

  const closeButton =
    modal.querySelector(".modal-close");

  const modalBackground =
    modal.querySelector(".modal-bg");


  const readMoreButtons =
    document.querySelectorAll(
      ".read-more"
    );


  readMoreButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card =
        button.closest(".project-card");

      if (!card) return;


      const title =
        card.dataset.title ||
        card.querySelector("h3")?.textContent ||
        "Project";


      const description =
        card.dataset.description ||
        card.querySelector("p")?.textContent ||
        "Project information.";


      if (modalTitle) {

        modalTitle.textContent = title;

      }

      if (modalDescription) {

        modalDescription.textContent =
          description;

      }


      modal.classList.add("open");

      document.body.style.overflow =
        "hidden";

    });

  });


  function closeModal() {

    modal.classList.remove("open");

    document.body.style.overflow = "";

  }


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeModal
    );

  }


  if (modalBackground) {

    modalBackground.addEventListener(
      "click",
      closeModal
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("open")
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );

  if (!elements.length) return;


  /* If browser doesn't support observer */

  if (
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(element => {

      element.classList.add(
        "revealed"
      );

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "revealed"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      '.nav-link[href^="#"]'
    );

  if (!sections.length || !navLinks.length)
    return;


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting)
            return;


          const id =
            entry.target.getAttribute(
              "id"
            );


          navLinks.forEach(link => {

            link.classList.remove(
              "active"
            );


            const href =
              link.getAttribute(
                "href"
              );


            if (
              href === `#${id}`
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold: 0
      }
    );


  sections.forEach(section => {

    observer.observe(section);

  });

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function initImageFallback() {

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.style.display =
          "none";

        const parent =
          image.parentElement;

        if (!parent) return;


        const placeholder =
          parent.querySelector(
            ".photo-placeholder"
          );


        if (placeholder) {

          placeholder.style.display =
            "grid";

        }

      }
    );


    /* If there is an image, hide placeholder */

    if (
      image.complete &&
      image.naturalWidth > 0
    ) {

      const parent =
        image.parentElement;

      const placeholder =
        parent?.querySelector(
          ".photo-placeholder"
        );


      if (placeholder) {

        placeholder.style.display =
          "none";

      }

    }

  });

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboard() {

  document.addEventListener(
    "keydown",
    event => {

      /* Escape mobile menu */

      if (event.key === "Escape") {

        const navLinks =
          document.querySelector(
            ".nav-links"
          );

        const menuButton =
          document.querySelector(
            ".menu-btn"
          );


        if (navLinks) {

          navLinks.classList.remove(
            "open"
          );

        }


        if (menuButton) {

          menuButton.innerHTML =
            "☰";

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }

      }

    }
  );

}


/* =========================================================
   CONTACT BUTTON
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-contact]"
      );

    if (!button) return;


    const contactType =
      button.dataset.contact;


    if (contactType === "email") {

      window.location.href =
        "mailto:your@email.com";

    }


    if (contactType === "linkedin") {

      window.open(
        "https://www.linkedin.com/",
        "_blank",
        "noopener,noreferrer"
      );

    }


    if (contactType === "github") {

      window.open(
        "https://github.com/",
        "_blank",
        "noopener,noreferrer"
      );

    }

  }
);


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".btn, .nav-cta, .filter, .skill-tab, .journey-tab"
      );

    if (!button) return;


    const ripple =
      document.createElement(
        "span"
      );


    ripple.style.position =
      "absolute";

    ripple.style.width =
      "8px";

    ripple.style.height =
      "8px";

    ripple.style.borderRadius =
      "50%";

    ripple.style.background =
      "rgba(255,255,255,.25)";

    ripple.style.pointerEvents =
      "none";

    ripple.style.transform =
      "scale(1)";

    ripple.style.opacity =
      "1";

    ripple.style.transition =
      "transform .45s ease, opacity .45s ease";


    const rect =
      button.getBoundingClientRect();


    ripple.style.left =
      `${event.clientX - rect.left - 4}px`;

    ripple.style.top =
      `${event.clientY - rect.top - 4}px`;


    const previousPosition =
      getComputedStyle(button)
        .position;


    if (
      previousPosition ===
      "static"
    ) {

      button.style.position =
        "relative";

    }


    button.appendChild(
      ripple
    );


    requestAnimationFrame(() => {

      ripple.style.transform =
        "scale(25)";

      ripple.style.opacity =
        "0";

    });


    setTimeout(() => {

      ripple.remove();

    }, 500);

  }
);


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
  "%cAbolfazl Turkmani Portfolio",
  "font-size:18px;font-weight:bold;color:#ff5b1a;"
);

console.log(
  "HTML • CSS • JavaScript • UI/UX • Figma"
);