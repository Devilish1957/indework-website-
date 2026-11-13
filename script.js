
document.addEventListener("DOMContentLoaded", () => {

  // 1. Automatically update copyright year
  document.querySelectorAll("#year, [data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // 2. Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
    });
  }

  // 3. Scroll reveal animations
  const revealElements = document.querySelectorAll(
    ".hero, .page-hero, .section, .card, .steps article"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  }

  // 4. Highlight current page navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".primary-nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 5. Smooth scrolling for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 6. Automatically select requested service
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service");
  const serviceSelect = document.querySelector("#service");

  if (requestedService && serviceSelect) {
    const matchingOption = [...serviceSelect.options].find((option) =>
      option.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === requestedService.toLowerCase()
    );

    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    }
  }

});


.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
