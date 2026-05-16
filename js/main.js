/* ===== Main JS: Nav, Scroll, Typewriter, Animations ===== */
document.addEventListener('DOMContentLoaded', () => {
  /* -- Navbar scroll effect -- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* -- Active nav link on scroll -- */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));

  /* -- Mobile menu -- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const closeMobile = () => { mobileMenu.classList.remove('open'); overlay.classList.remove('open'); };
  if (hamburger) {
    hamburger.addEventListener('click', () => { mobileMenu.classList.add('open'); overlay.classList.add('open'); });
    overlay.addEventListener('click', closeMobile);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  }

  /* -- Typewriter effect -- */
  const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'Problem Solver', 'Open Source Enthusiast'];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typeEl = document.getElementById('typewriter');
  function typewrite() {
    if (!typeEl) return;
    const current = roles[roleIdx];
    typeEl.textContent = current.substring(0, charIdx);
    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) { deleting = true; setTimeout(typewrite, 1500); return; }
    } else {
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typewrite, deleting ? 40 : 80);
  }
  typewrite();

  /* -- Scroll reveal animation -- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* -- Smooth scroll for all anchor links -- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* -- Counter animation for stats -- */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current + suffix;
      }, 30);
    });
  }
  const statsSection = document.getElementById('feedback');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }
});
