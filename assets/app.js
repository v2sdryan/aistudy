const bodyPage = document.body.dataset.page;
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const themeButtons = document.querySelectorAll("[data-theme-mode]");
const themeStorageKey = "site-theme-mode";
const themeClassMap = {
  default: "",
  focus: "theme-focus",
};

const applyThemeMode = (mode) => {
  Object.values(themeClassMap).forEach((className) => {
    if (className) {
      document.body.classList.remove(className);
    }
  });

  const nextClass = themeClassMap[mode] ?? "";
  if (nextClass) {
    document.body.classList.add(nextClass);
  }

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeMode === mode));
  });
};

if (themeButtons.length > 0) {
  const savedMode = window.localStorage.getItem(themeStorageKey);
  const initialMode = savedMode && themeClassMap[savedMode] !== undefined ? savedMode : "default";

  applyThemeMode(initialMode);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.themeMode || "default";
      applyThemeMode(nextMode);
      window.localStorage.setItem(themeStorageKey, nextMode);
    });
  });
}

if (nav && bodyPage) {
  nav.querySelectorAll("a[data-page]").forEach((link) => {
    if (link.dataset.page === bodyPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const nextState = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(nextState));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
