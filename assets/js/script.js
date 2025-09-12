
// ---- Utilities ----
async function injectHTML(elId, file) {
  const el = document.getElementById(elId);
  if (!el) return;
  const res = await fetch(file, { cache: "no-store" });
  el.innerHTML = await res.text();
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function markActiveNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a.nav-link[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === here) {
      a.setAttribute('aria-current', 'page');        // CSS uses [aria-current="page"]
      a.classList.add('active');                     // Friendly fallback
    }
  });
}

// Smooth scroll for same-page anchors
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

// Scroll reveal (IntersectionObserver)
function setupScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('animate-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-animate-delay');
        if (delay) el.style.setProperty('--anim-delay', `${parseInt(delay, 10)}ms`);
        el.classList.add('animate-in');
        io.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Lottie: respect reduced motion and pause when not visible
(function () {
  const el = document.getElementById('hero-lottie');
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    el.pause && el.pause();
    return;
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!el.play || !el.pause) return;
        if (entry.isIntersecting) el.play();
        else el.pause();
      });
    }, { threshold: 0.25 });
    io.observe(el);
  }
})();

// If the .lottie fails, switch to JSON fallback
(function () {
  const el = document.getElementById('hero-lottie');
  if (!el) return;

  el.addEventListener('error', () => {
    console.warn("⚠️ Lottie .lottie failed, swapping to JSON.");
    el.setAttribute("src", "assets/animations/Desktop and Mobile app development.json");
  });
})();


// Lightweight typewriter for #typewriter (if present)
function runTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const texts = [
    "I build clean, reliable web apps.",
    "Django back end, Bootstrap front end.",
    "Stripe, AWS S3, PWA — ready for production."
  ];
  if (prefersReduced) {
    target.textContent = texts[0];
    return;
  }
  let i = 0, j = 0, deleting = false;
  const speed = 28, pause = 900, eraseSpeed = 16;
  (function tick() {
    const current = texts[i];
    if (!deleting) {
      target.textContent = current.slice(0, j++);
      if (j <= current.length) return setTimeout(tick, speed);
      deleting = true;
      return setTimeout(tick, pause);
    } else {
      target.textContent = current.slice(0, j--);
      if (j >= 0) return setTimeout(tick, eraseSpeed);
      deleting = false; i = (i + 1) % texts.length; j = 0;
      return setTimeout(tick, 250);
    }
  })();
}

// ---- Bootstrap on load ----
window.addEventListener("DOMContentLoaded", async () => {
  await injectHTML("header", "header.html");
  markActiveNav();

  await injectHTML("footer", "footer.html");
  setYear();
  enableSmoothScroll();

  setupScrollReveal();
  runTypewriter();
});
