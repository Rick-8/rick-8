async function injectHTML(elId, file) {
  const el = document.getElementById(elId);
  if (!el) return;
  const res = await fetch(file, { cache: "no-store" });
  const html = await res.text();
  el.innerHTML = html;
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('a.nav-link[data-nav]').forEach(a => {
    if (a.getAttribute("data-nav") === path) a.classList.add("active");
  });
}

function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", id);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  // Inject header first so we can highlight nav
  await injectHTML("header", "header.html");
  highlightActiveNav();

  // Inject footer and finish bootstrapping
  await injectHTML("footer", "footer.html");
  setYear();
  enableSmoothScroll();
});
