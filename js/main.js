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

// --- Scroll to Top ---
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(fi => fi.classList.remove('open'));
    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// --- Form: Send to WhatsApp ---
function buildWhatsAppMsg(formId) {
  const name  = document.getElementById(formId + 'Name')?.value || '';
  const phone = document.getElementById(formId + 'Phone')?.value || '';
  const email = document.getElementById(formId + 'Email')?.value || '';
  const visa  = document.getElementById(formId + 'VisaType')?.value || '';
  const date  = document.getElementById(formId + 'TravelDate')?.value || '';
  const country = document.getElementById(formId + 'Country')?.value || '';
  const msgEl = document.getElementById(formId + 'Message');
  const extra = msgEl ? msgEl.value : '';

  let text = `Hi AToZ Pro, I need help with my Dubai visa.%0A%0A`;
  text += `Name: ${name}%0A`;
  text += `Phone: ${phone}%0A`;
  if (email) text += `Email: ${email}%0A`;
  if (country) text += `Country: ${country}%0A`;
  text += `Visa Type: ${visa}%0A`;
  if (date) text += `Travel Date: ${date}%0A`;
  if (extra) text += `Details: ${extra}`;

  return `https://wa.me/971521888594?text=${text}`;
}

// --- Review Form ---
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const city = document.getElementById('reviewCity').value;
    const visa = document.getElementById('reviewVisaType').value;
    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value;
    const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    let msg = `Hi AToZ Pro, I'd like to leave a review!%0A%0A`;
    msg += `Name: ${name}%0A`;
    msg += `City: ${city}%0A`;
    msg += `Visa Type: ${visa}%0A`;
    msg += `Rating: ${stars} (${rating}/5)%0A%0A`;
    msg += `Review:%0A${text}`;
    window.open(`https://wa.me/971521888594?text=${msg}`, '_blank');
  });
}

// ============================================
// PROMO VIDEO EXPERIENCE — Timeline Engine
// ============================================
const promoVideo = (() => {
  const container = document.getElementById('promoVideo');
  if (!container) return;

  const scenes = container.querySelectorAll('.promo-scene');
  const progressBar = document.getElementById('promoProgress');
  const dotsContainer = document.getElementById('promoDots');
  const prevBtn = document.getElementById('promoPrev');
  const nextBtn = document.getElementById('promoNext');
  const pauseBtn = document.getElementById('promoPause');

  if (!scenes.length) return;

  const SCENE_DURATION = 5000; // 5 seconds per scene
  const TOTAL_SCENES = scenes.length;

  let currentScene = 0;
  let isPlaying = true;
  let sceneTimer = null;
  let progressTimer = null;
  let progressStart = 0;
  let progressPaused = false;
  let pausedProgress = 0;

  // Create dots
  scenes.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'promo-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToScene(i));
    dotsContainer.appendChild(dot);
  });

  // Create particles for scene 1 & 7
  function createParticles(containerId) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'promo-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay = (Math.random() * 5) + 's';
      p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
      wrap.appendChild(p);
    }
  }
  createParticles('scene1Particles');
  createParticles('scene7Particles');

  // Floating emojis for select scenes
  const sceneEmojis = {
    0: ['✈️', '🌆', '🌅'],
    1: ['📱', '💬', '✉️'],
    2: ['📋', '🔍', '✅'],
    3: ['💻', '📤', '🇦🇪'],
    4: ['🎉', '🛂', '✨'],
    5: ['👨‍👩‍👧', '💼', '🌴'],
    6: ['🎷', '🏆', '💫']
  };

  function spawnEmojis(sceneIdx) {
    const emojis = sceneEmojis[sceneIdx];
    if (!emojis) return;
    const stage = document.getElementById('promoStage');
    emojis.forEach((emoji, i) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'float-emoji';
        el.textContent = emoji;
        el.style.left = (20 + Math.random() * 60) + '%';
        el.style.bottom = '20%';
        el.style.zIndex = '3';
        stage.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 600);
    });
  }

  function updateDots(idx) {
    const dots = dotsContainer.querySelectorAll('.promo-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function showScene(idx) {
    scenes.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    updateDots(idx);
    spawnEmojis(idx);
  }

  function startProgress(duration) {
    if (progressTimer) cancelAnimationFrame(progressTimer);
    progressStart = performance.now() - pausedProgress;
    progressPaused = false;

    function tick(now) {
      if (progressPaused) return;
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / duration) * 100, 100);
      progressBar.style.width = pct + '%';
      if (pct < 100 && isPlaying) {
        progressTimer = requestAnimationFrame(tick);
      }
    }
    progressTimer = requestAnimationFrame(tick);
  }

  function pauseProgress() {
    progressPaused = true;
    pausedProgress = performance.now() - progressStart;
    if (progressTimer) cancelAnimationFrame(progressTimer);
  }

  function startSceneTimer() {
    if (sceneTimer) clearTimeout(sceneTimer);
    sceneTimer = setTimeout(() => {
      if (isPlaying) {
        goToScene((currentScene + 1) % TOTAL_SCENES);
      }
    }, SCENE_DURATION);
  }

  function goToScene(idx) {
    currentScene = idx;
    pausedProgress = 0;
    showScene(idx);
    startProgress(SCENE_DURATION);
    startSceneTimer();
  }

  function togglePause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      pauseBtn.textContent = '⏸';
      startSceneTimer();
      startProgress(SCENE_DURATION);
    } else {
      pauseBtn.textContent = '▶';
      clearTimeout(sceneTimer);
      pauseProgress();
    }
  }

  // Controls
  prevBtn.addEventListener('click', () => {
    goToScene((currentScene - 1 + TOTAL_SCENES) % TOTAL_SCENES);
  });

  nextBtn.addEventListener('click', () => {
    goToScene((currentScene + 1) % TOTAL_SCENES);
  });

  pauseBtn.addEventListener('click', togglePause);

  // Keyboard
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === ' ') { e.preventDefault(); togglePause(); }
  });
  container.setAttribute('tabindex', '0');

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    if (isPlaying) {
      clearTimeout(sceneTimer);
      pauseProgress();
    }
  });

  container.addEventListener('mouseleave', () => {
    if (isPlaying) {
      startSceneTimer();
      startProgress(SCENE_DURATION);
    }
  });

  // Touch swipe
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextBtn.click();
      else prevBtn.click();
    }
  }, { passive: true });

  // Start
  progressBar.style.width = '0%';
  spawnEmojis(0);
  startProgress(SCENE_DURATION);
  startSceneTimer();
})();

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
