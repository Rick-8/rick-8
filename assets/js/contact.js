(function () {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const spinner = document.getElementById('spinner');

  if (!form) return; // prevent errors if script loads on other pages

  form.addEventListener('submit', async (e) => {
    // Bootstrap validation
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Use AJAX to stay on-page (prevent default submit)
    e.preventDefault();

    // Disable UI while sending
    spinner.classList.remove('d-none');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.textContent = 'Sending…';

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = 'Thanks! Your message has been sent.';
        form.reset();
        form.classList.remove('was-validated');
      } else {
        let msg = 'Sorry, something went wrong. Please email me directly.';
        try {
          const json = await res.json();
          if (json && json.errors?.length) {
            msg = json.errors.map(e => e.message).join(' ');
          }
        } catch {}
        status.textContent = msg;
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error. Please try again or email me directly.';
    } finally {
      spinner.classList.add('d-none');
      btn.disabled = false;
    }
  });
})();
