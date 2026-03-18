/* ============================================
   GET IN TO TRAVEL — script.js
   Interactions, animations, form → WhatsApp
   ============================================ */

(function () {
  'use strict';

  /* ── 1. STICKY NAVBAR ───────────────────── */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  /* ── 2. ACTIVE NAV LINK ON SCROLL ───────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightActiveNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  /* ── 3. HAMBURGER MENU ───────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
    document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
  });

  // Close button inside the mobile overlay
  const navCloseBtn = document.getElementById('navCloseBtn');
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close menu when any link is clicked
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinksEl.classList.contains('open') &&
        !navLinksEl.contains(e.target) &&
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── 4. SCROLL REVEAL ANIMATIONS ────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position among siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(idx * 80, 400));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 5. CONTACT FORM → WHATSAPP ─────────── */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('fname').value.trim();
    const phone   = document.getElementById('fphone').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmessage').value.trim();

    // Basic validation
    if (!name) { showFormError('Please enter your name.'); return; }
    if (!phone) { showFormError('Please enter your phone number.'); return; }

    // Build WhatsApp message
    let wa = `Hi, I would like to enquire about your travel services.\n\n`;
    wa += `*Name:* ${name}\n`;
    wa += `*Phone:* ${phone}\n`;
    if (email) wa += `*Email:* ${email}\n`;
    if (service) wa += `*Interested In:* ${service}\n`;
    if (message) wa += `\n*Message:* ${message}`;

    const encoded = encodeURIComponent(wa);
    const waUrl = `https://wa.me/919176723888?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  function showFormError(msg) {
    // Remove existing
    const existing = document.querySelector('.form-error-msg');
    if (existing) existing.remove();

    const div = document.createElement('p');
    div.className = 'form-error-msg';
    div.style.cssText = 'color:#e53e3e;font-size:0.85rem;margin-bottom:0.5rem;font-weight:600;';
    div.textContent = '⚠️ ' + msg;
    contactForm.prepend(div);
    setTimeout(() => div.remove(), 4000);
  }

  /* ── 6. SMOOTH SCROLL FOR ANCHOR LINKS ──── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 7. FLOATING WA BUTTON SHOW/HIDE ────── */
  const floatWa = document.getElementById('floatWa');
  function handleFloatWa() {
    if (window.scrollY > 300) {
      floatWa.style.opacity = '1';
      floatWa.style.transform = 'translateY(0)';
    } else {
      floatWa.style.opacity = '0';
      floatWa.style.transform = 'translateY(20px)';
    }
  }
  floatWa.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  floatWa.style.opacity = '0';
  floatWa.style.transform = 'translateY(20px)';
  window.addEventListener('scroll', handleFloatWa, { passive: true });
  handleFloatWa();

  /* ── 8. HERO PARALLAX (subtle) ───────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  /* ── Done ─────────────────────────────────── */
  console.log('✈️ Get In To Travel — site loaded successfully!');

})();
