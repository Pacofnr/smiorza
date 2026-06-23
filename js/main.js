/* SMI ORZA — main.js */

// --- Nav scroll ---
const nav = document.getElementById('nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// --- Burger menu ---
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// --- Language switcher dropdown ---
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langDropdown.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', () => {
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      langDropdown.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Prevent dropdown clicks from closing
  langDropdown.addEventListener('click', (e) => e.stopPropagation());
}

// --- Scroll reveal ---
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a:not(.nav__cta):not(.lang-switcher__option)');
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--gold)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));
