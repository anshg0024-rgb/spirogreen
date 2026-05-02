const year = document.getElementById("year");
const form = document.getElementById("inquiryForm");

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(
  ".section-heading, .intro-grid, .split-section, .directors-grid, .roadmap-section, .contact-section, .process-grid, .future-grid, .sdg-section, .sdg-grid, .supply-panels, .timeline"
);
const staggerItems = document.querySelectorAll(
  ".process-grid, .supply-panels, .directors-grid, .future-grid, .sdg-grid, .timeline"
);

revealItems.forEach((item) => item.classList.add("reveal"));
staggerItems.forEach((item) => item.classList.add("reveal-stagger"));

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -70px 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Company: ${data.get("company") || ""}`,
      `Inquiry type: ${data.get("type") || ""}`,
      `Contact: ${data.get("contact") || ""}`,
      "",
      "Message:",
      data.get("message") || ""
    ];

    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `https://wa.me/917024119444?text=${body}`;
  });
}
