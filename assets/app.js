const bodyPage = document.body.dataset.page;
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");

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
