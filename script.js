/* =========================================================
   PORTFOLIO JAVASCRIPT
   Theme Toggle + Project Filter + Read More + Skills
   + Journey Tabs + Mobile Menu + Scroll Reveal
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     DARK / LIGHT MODE
  ========================================================= */

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  /*
    Theme system:
    - Dark = default
    - Light = body.light-mode
    - Also sets data-theme="dark/light"
    - Saves user's choice in localStorage
  */

  function updateThemeIcon() {

    if (!themeIcon) return;

    const isLight =
      document.body.classList.contains("light-mode") ||
      document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
      themeIcon.textContent = "☀️";
      themeToggle?.setAttribute("aria-label", "Switch to dark mode");
      themeToggle?.setAttribute("title", "Dark Mode");
    } else {
      themeIcon.textContent = "🌙";
      themeToggle?.setAttribute("aria-label", "Switch to light mode");
      themeToggle?.setAttribute("title", "Light Mode");
    }
  }


  function setTheme(theme, save = true) {

    const isLight = theme === "light";

    /* Body class */
    document.body.classList.toggle(
      "light-mode",
      isLight
    );

    /* HTML data attribute */
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "light" : "dark"
    );

    /* Save selected theme */
    if (save) {
      localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
      );
    }

    updateThemeIcon();
  }


  /* =========================================================
     LOAD SAVED THEME
  ========================================================= */

  let savedTheme = localStorage.getItem("theme");

  /*
    If there is no saved theme:
    use system preference.
  */

  if (!savedTheme) {

    const prefersLight =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    savedTheme =
      prefersLight ? "light" : "dark";
  }


  /*
    Only allow valid values.
    Everything else becomes dark.
  */

  if (
    savedTheme !== "light" &&
    savedTheme !== "dark"
  ) {
    savedTheme = "dark";
  }


  setTheme(savedTheme, false);


  /* =========================================================
     THEME BUTTON
  ========================================================= */

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      (event) => {

        event.preventDefault();
        event.stopPropagation();

        const isLight =
          document.body.classList.contains(
            "light-mode"
          );

        setTheme(
          isLight ? "dark" : "light",
          true
        );

      }
    );

  }


  /* =========================================================
     SYSTEM THEME CHANGE
  ========================================================= */

  /*
    Only follow system theme when the user
    has never manually selected a theme.
  */

  if (window.matchMedia) {

    const systemTheme =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      );

    systemTheme.addEventListener?.(
      "change",
      event => {

        const userTheme =
          localStorage.getItem("theme");

        if (userTheme) return;

        setTheme(
          event.matches ? "light" : "dark",
          false
        );

      }
    );

  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const navLinks =
    document.getElementById("navLinks");


  if (menuBtn && navLinks) {

    menuBtn.addEventListener(
      "click",
      () => {

        navLinks.classList.toggle("open");
        menuBtn.classList.toggle("active");

        const isOpen =
          navLinks.classList.contains("open");

        menuBtn.setAttribute(
          "aria-expanded",
          String(isOpen)
        );

      }
    );


    /* Close menu after clicking a link */

    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove("open");
            menuBtn.classList.remove("active");

            menuBtn.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =========================================================
     PROJECT FILTERING
  ========================================================= */

  const filterButtons =
    document.querySelectorAll(".filter");

  const projectCards =
    document.querySelectorAll(".project-card");


  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");


        const selectedFilter =
          (
            button.dataset.filter || "all"
          ).toLowerCase();


        projectCards.forEach(card => {

          const categories =
            card.dataset.category
              ? card.dataset.category
                  .toLowerCase()
                  .split(/\s+/)
              : [];


          /* Show all */

          if (selectedFilter === "all") {

            card.style.display = "";

            requestAnimationFrame(() => {

              card.classList.remove(
                "filter-hidden"
              );

            });

            return;
          }


          /* Check category */

          const matches =
            categories.includes(
              selectedFilter
            );


          if (matches) {

            card.style.display = "";

            requestAnimationFrame(() => {

              card.classList.remove(
                "filter-hidden"
              );

            });

          } else {

            card.classList.add(
              "filter-hidden"
            );


            setTimeout(() => {

              if (
                card.classList.contains(
                  "filter-hidden"
                )
              ) {

                card.style.display = "none";

              }

            }, 250);

          }

        });

      }
    );

  });


  /* =========================================================
     READ MORE MODAL
  ========================================================= */

  const modal =
    document.getElementById(
      "projectModal"
    );

  const modalTitle =
    document.getElementById(
      "modalTitle"
    );

  const modalText =
    document.getElementById(
      "modalText"
    );

  const modalClose =
    document.getElementById(
      "modalClose"
    );

  const modalBackground =
    modal
      ? modal.querySelector(".modal-bg")
      : null;


  document
    .querySelectorAll(".read-more")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const title =
            button.dataset.project ||
            "Project";


          const description =
            button.dataset.description ||
            "More information about this project will be added soon.";


          if (!modal) return;


          if (modalTitle) {
            modalTitle.textContent =
              title;
          }


          if (modalText) {
            modalText.textContent =
              description;
          }


          modal.classList.add("open");


          modal.setAttribute(
            "aria-hidden",
            "false"
          );


          document.body.classList.add(
            "modal-open"
          );

        }
      );

    });


  function closeModal() {

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  if (modalClose) {

    modalClose.addEventListener(
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


  /* ESC closes modal */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeModal();
      }

    }
  );


  /* =========================================================
     SKILL TABS
  ========================================================= */

  const skillTabs =
    document.querySelectorAll(
      ".skill-tab"
    );

  const skillPanels =
    document.querySelectorAll(
      ".skill-panel"
    );


  skillTabs.forEach(tab => {

    tab.addEventListener(
      "click",
      () => {

        skillTabs.forEach(item => {
          item.classList.remove("active");
        });


        skillPanels.forEach(panel => {
          panel.classList.remove("active");
        });


        tab.classList.add("active");


        const target =
          document.getElementById(
            tab.dataset.target
          );


        if (target) {
          target.classList.add("active");
        }

      }
    );

  });


  /* =========================================================
     JOURNEY TABS
  ========================================================= */

  const journeyTabs =
    document.querySelectorAll(
      ".journey-tab"
    );

  const jobRole =
    document.getElementById(
      "jobRole"
    );

  const jobCompany =
    document.getElementById(
      "jobCompany"
    );

  const jobLocation =
    document.getElementById(
      "jobLocation"
    );

  const jobDate =
    document.getElementById(
      "jobDate"
    );

  const achievements =
    document.getElementById(
      "achievements"
    );

  const techList =
    document.getElementById(
      "techList"
    );

  const highlights =
    document.getElementById(
      "highlights"
    );

  const journeyDots =
    document.querySelectorAll(
      ".journey-dots span"
    );


  const journeyData = [

    {
      role:
        "Web Designer & Front-End Developer",

      company:
        "Personal / Freelance",

      location:
        "Remote",

      date:
        "2025 - Present",

      achievements: [

        [
          "Responsive Websites",
          "Designed responsive websites for desktop, tablet and mobile."
        ],

        [
          "Modern UI Development",
          "Built clean and modern interfaces using HTML, CSS and JavaScript."
        ],

        [
          "UI/UX Design",
          "Created user-focused interfaces and prototypes in Figma."
        ],

        [
          "Performance Focused",
          "Focused on clean structure, smooth interactions and usability."
        ]

      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "UI/UX",
        "Figma",
        "Responsive Design"
      ],

      highlights: [
        "Designed modern and responsive web interfaces",
        "Converted Figma designs into functional websites",
        "Built clean and reusable UI components",
        "Focused on user experience and visual consistency"
      ]

    },


    {
      role:
        "Front-End Developer",

      company:
        "Freelance Projects",

      location:
        "Remote",

      date:
        "2025 - Present",

      achievements: [

        [
          "Interactive Interfaces",
          "Developed interactive interfaces with modern JavaScript."
        ],

        [
          "Responsive Development",
          "Created layouts optimized for desktop, tablet and mobile."
        ],

        [
          "Clean Code",
          "Structured front-end code for easier maintenance."
        ],

        [
          "Performance",
          "Focused on fast loading and smooth user interactions."
        ]

      ],

      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Design",
        "Git",
        "GitHub"
      ],

      highlights: [
        "Developed responsive front-end websites",
        "Added interactive JavaScript functionality",
        "Improved website structure and usability",
        "Created reusable front-end components"
      ]

    },


    {
      role:
        "UI/UX Designer",

      company:
        "Personal / Freelance",

      location:
        "Remote",

      date:
        "2025 - Present",

      achievements: [

        [
          "UI Design",
          "Designed clean and modern user interfaces."
        ],

        [
          "UX Research",
          "Focused on simple and intuitive user experiences."
        ],

        [
          "Figma Prototypes",
          "Created interactive prototypes and reusable components."
        ],

        [
          "Design Systems",
          "Built consistent visual systems for digital products."
        ]

      ],

      technologies: [
        "Figma",
        "UI Design",
        "UX Design",
        "Wireframing",
        "Prototyping",
        "Design Systems"
      ],

      highlights: [
        "Designed modern UI systems",
        "Created interactive Figma prototypes",
        "Designed user flows and wireframes",
        "Focused on visual consistency and usability"
      ]

    }

  ];


  function updateJourney(index) {

    const data =
      journeyData[index];

    if (!data) return;


    if (jobRole) {
      jobRole.textContent =
        data.role;
    }


    if (jobCompany) {
      jobCompany.textContent =
        data.company;
    }


    if (jobLocation) {
      jobLocation.textContent =
        data.location;
    }


    if (jobDate) {
      jobDate.textContent =
        data.date;
    }


    if (achievements) {

      achievements.innerHTML =
        data.achievements
          .map(item => `
            <div class="achievement-item">

              <div class="achievement-icon">
                ✓
              </div>

              <div>
                <strong>${item[0]}</strong>
                <span>${item[1]}</span>
              </div>

            </div>
          `)
          .join("");

    }


    if (techList) {

      techList.innerHTML =
        data.technologies
          .map(
            tech =>
              `<span>${tech}</span>`
          )
          .join("");

    }


    if (highlights) {

      highlights.innerHTML =
        data.highlights
          .map(
            item =>
              `<li>${item}</li>`
          )
          .join("");

    }


    journeyTabs.forEach(
      (tab, tabIndex) => {

        tab.classList.toggle(
          "active",
          tabIndex === index
        );

      }
    );


    journeyDots.forEach(
      (dot, dotIndex) => {

        dot.classList.toggle(
          "active",
          dotIndex === index
        );

      }
    );

  }


  journeyTabs.forEach(
    (tab, index) => {

      tab.addEventListener(
        "click",
        () => updateJourney(index)
      );

    }
  );


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      element => {
        observer.observe(element);
      }
    );

  } else {

    revealElements.forEach(
      element => {
        element.classList.add(
          "visible"
        );
      }
    );

  }


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const navLinksItems =
    document.querySelectorAll(
      ".nav-link"
    );

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              const id =
                entry.target.getAttribute(
                  "id"
                );


              navLinksItems.forEach(
                link => {

                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) === `#${id}`
                  );

                }
              );

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(
      section => {
        sectionObserver.observe(
          section
        );
      }
    );

  }


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          let target = null;

          try {
            target =
              document.querySelector(
                targetId
              );
          } catch (error) {
            return;
          }


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================================
     INITIALIZE
  ========================================================= */

  updateThemeIcon();


  /* First journey tab */

  if (journeyTabs.length) {
    updateJourney(0);
  }

});