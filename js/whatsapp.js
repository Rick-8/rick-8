// /js/whatsapp.js
(function () {
  const link = document.getElementById('waLink');
  if (!link) return;

  // Prefer split parts so the number isn't present in HTML
  const cc = link.getAttribute('data-cc') || '';             // e.g. "44"
  const parts = (link.getAttribute('data-parts') || '').split('|');
  const local = parts.join('');
  const phone = `${cc}${local}`;

  const text = encodeURIComponent(link.getAttribute('data-text') || '');
  const url = `https://wa.me/${phone}${text ? `?text=${text}` : ''}`;

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener');
})();
