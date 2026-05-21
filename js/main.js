/* ===== Main JS — Nav, Typewriter, Scroll Reveal, Tilt ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* -- Navbar scroll + scroll-to-top -- */
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* -- Active nav link on scroll -- */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.25 });
  sections.forEach(s => navObserver.observe(s));

  /* -- Mobile menu -- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const closeMobile = () => {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
  };
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      overlay.classList.add('open');
    });
    overlay.addEventListener('click', closeMobile);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  }

  /* -- Typewriter effect -- */
  const roles = ['Software Developer', 'ML Enthusiast', 'CS Undergrad @ IIITDM', '320+ DSA Problems Solved'];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typeEl = document.getElementById('typewriter');
  function typewrite() {
    if (!typeEl) return;
    const current = roles[roleIdx];
    typeEl.textContent = current.substring(0, charIdx);
    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) { deleting = true; setTimeout(typewrite, 2000); return; }
    } else {
      charIdx--;
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typewrite, deleting ? 30 : 60);
  }
  typewrite();

  /* -- Scroll reveal with stagger -- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger siblings
    const parent = el.parentElement;
    const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.setProperty('--i', idx);
    revealObserver.observe(el);
  });

  /* -- Smooth scroll for anchor links -- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* -- 3D Tilt on project cards -- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Re-attach tilt after projects render
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    const mo = new MutationObserver(() => {
      projectsGrid.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    });
    mo.observe(projectsGrid, { childList: true });
  }
});
