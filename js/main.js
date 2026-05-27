/* ============================================
   AToZ Pro Services — Main JavaScript
   ============================================ */

// --- Navbar Scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile Nav ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
    }
  });
}

// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// --- Hero Particles ---
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    particlesContainer.appendChild(p);
  }
}

// --- Form: Send to WhatsApp ---
function buildWhatsAppMsg(formId) {
  const name  = document.getElementById(formId + 'Name')?.value || '';
  const phone = document.getElementById(formId + 'Phone')?.value || '';
  const email = document.getElementById(formId + 'Email')?.value || '';
  const visa  = document.getElementById(formId + 'VisaType')?.value || '';
  const date  = document.getElementById(formId + 'TravelDate')?.value || '';
  const msgEl = document.getElementById(formId + 'Message');
  const extra = msgEl ? msgEl.value : '';

  let text = `Hi AToZ Pro, I need help with my Dubai visa.%0A%0A`;
  text += `Name: ${name}%0A`;
  text += `Phone: ${phone}%0A`;
  if (email) text += `Email: ${email}%0A`;
  text += `Visa Type: ${visa}%0A`;
  if (date) text += `Travel Date: ${date}%0A`;
  if (extra) text += `Details: ${extra}`;

  return `https://wa.me/919066151831?text=${text}`;
}

// Hero form
const heroForm = document.getElementById('heroForm');
if (heroForm) {
  heroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(buildWhatsAppMsg('hero'), '_blank');
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(buildWhatsAppMsg('contact'), '_blank');
  });
}
