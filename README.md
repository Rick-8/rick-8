# 🌐 Rick-8 Portfolio Website

![GitHub repo size](https://img.shields.io/github/repo-size/Rick-8/rick-8)
![GitHub stars](https://img.shields.io/github/stars/Rick-8/rick-8?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/Rick-8/rick-8)
![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20Bootstrap%20%7C%20JavaScript-blue?logo=html5)

## ✨ Overview

This is my personal **portfolio website**, built with **HTML, CSS, Bootstrap, and vanilla JavaScript**.  
It showcases my projects, skills, and contact details in a **clean, responsive, and modern** design, hosted on **GitHub Pages**.

🔗 **Live Site:** https://rick-8.github.io/rick-8/

---

## 🎨 Features

- 📱 **Responsive layout** (Bootstrap 5.3)
- 🧩 **Reusable header & footer** injected via JS (DRY pages)
- 📨 **Contact form** via Formspree (AJAX + noscript fallback)
- 🟢 **WhatsApp link obfuscation** (number rebuilt from `data-` attributes)
- 🖼️ **Lottie** hero animation on the homepage
- 🎛️ Small UX sprinkles: reveal-on-scroll, typewriter headline, subtle hover effects
- 🧭 Active nav highlighting + accessible focus states
- 🔎 Basic **SEO** touch: `schema.org/Person` JSON-LD on the About page
- 🌍 **GitHub Pages** deployment (no backend required)

---

## 🧱 Tech Stack

- **HTML5**, **CSS**, **Bootstrap 5.3**
- **JavaScript** (no build step)
- **Font Awesome** icons
- **Lottie** web component
- **Formspree** for form handling

---

## 📂 Project Structure


rick-8/
├─ index.html
├─ about.html
├─ projects.html
├─ contact.html
├─ header.html
├─ footer.html
├─ assets/
│ ├─ css/
│ │ └─ style.css # Theme variables, components, utilities
│ ├─ js/
│ │ ├─ script.js # Header/footer injection, small UI helpers
│ │ ├─ contact.js # Contact form validation + AJAX submit
│ │ └─ whatsapp.js # Obfuscated WhatsApp link builder
│ ├─ animations/
│ │ └─ Desktop and Mobile app development.json
│ ├─ favicon.ico
│ └─ images/...