
document.addEventListener("DOMContentLoaded", () => {

  // Automatically update copyright year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Reveal sections when scrolling
  const revealElements = document.querySelectorAll(
    ".hero, .section, .service-card, .steps p"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => {
    observer.observe(element);
  });

  // Highlight active navigation link
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".navbar nav a");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Enable horizontal scrolling with mouse wheel on smaller screens
  const serviceTrack = document.querySelector(".service-track");

  if (serviceTrack) {
    serviceTrack.addEventListener("wheel", (event) => {
      if (window.innerWidth <= 900 &&
          Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        serviceTrack.scrollLeft += event.deltaY;
      }
    }, { passive: true });
  }

  // Smooth scrolling for navigation links
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

});
