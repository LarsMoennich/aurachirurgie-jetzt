const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');

const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('is-open', !open);
});

navigation?.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item button').forEach((item) => item.setAttribute('aria-expanded', 'false'));
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

window.addEventListener('load', () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  target.classList.add('is-visible');
  target.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  target.scrollIntoView({ block: 'start' });
});

const cookieBar = document.querySelector('[data-cookie-bar]');
const cookieConfirm = document.querySelector('[data-cookie-confirm]');

try {
  if (cookieBar && localStorage.getItem('aurachirurgie-cookie-notice') !== 'confirmed') {
    cookieBar.hidden = false;
  }
} catch {
  if (cookieBar) cookieBar.hidden = false;
}

cookieConfirm?.addEventListener('click', () => {
  try {
    localStorage.setItem('aurachirurgie-cookie-notice', 'confirmed');
  } catch {
    // Der Hinweis kann auch ohne lokalen Speicher geschlossen werden.
  }
  cookieBar?.classList.add('is-closing');
  window.setTimeout(() => {
    if (cookieBar) cookieBar.hidden = true;
  }, 180);
});

const formStatus = new URLSearchParams(window.location.search).get('status');
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.querySelector('[data-form-success]');
const formError = document.querySelector('[data-form-error]');

if (formStatus === 'success' && contactForm && formSuccess) {
  contactForm.hidden = true;
  formSuccess.hidden = false;
  formSuccess.classList.add('is-visible');
} else if (formStatus === 'error' && formError) {
  formError.hidden = false;
}
