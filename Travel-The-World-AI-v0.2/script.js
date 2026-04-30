/* ============================================
   TRAVEL WORLD — COMPLETE JAVASCRIPT
   Author: Senior Frontend Engineer
   Version: 2.0 — Full Featured
   ============================================ */

'use strict';

// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }
    // Trigger hero animations after load
    animateHeroStats();
    initParticles();
  }, 2200);
});

// ============================================
// 2. NAVBAR — Scroll + Mobile Toggle
// ============================================
const navbar   = document.getElementById('navbar');
const hamburger= document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  updateActiveNavLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ============================================
// 3. SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================
// 4. BACK TO TOP
// ============================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// 5. ANIMATED COUNTER (Stats)
// ============================================
function animateHeroStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ============================================
// 6. PARTICLES (Hero Background)
// ============================================
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;
    Object.assign(p.style, {
      width: size + 'px', height: size + 'px',
      left: left + '%',
      animationDelay: delay + 's',
      animationDuration: duration + 's',
      opacity: Math.random() * 0.6 + 0.2,
    });
    container.appendChild(p);
  }
}

// ============================================
// 7. HERO SLIDER
// ============================================
const heroSlides = [
  {
    tag: '🌴 Tropical Paradise',
    title: 'TRAVEL',
    cursive: 'The World',
    subtitle: 'DISCOVER YOUR ADVENTURE',
    desc: 'Explore breathtaking destinations across the globe. We craft unforgettable journeys tailored to your dreams.',
    bg: 'linear-gradient(135deg,#0a1628 0%,#0d2144 50%,#0d3070 100%)',
    imgBg: 'linear-gradient(145deg,#00b4d8,#0077b6,#023e8a)',
    imgEmoji: '🏖',
    imgLabel: 'Maldives, Indian Ocean',
  },
  {
    tag: '🗼 City Explorer',
    title: 'EXPLORE',
    cursive: 'Paris',
    subtitle: 'CITY OF LIGHTS',
    desc: 'Lose yourself in cobblestone streets, world-class cuisine, and iconic landmarks that have inspired generations.',
    bg: 'linear-gradient(135deg,#1a0a3d 0%,#2d1b69 50%,#11998e 100%)',
    imgBg: 'linear-gradient(145deg,#7b2d8b,#1565d8,#023e8a)',
    imgEmoji: '🗼',
    imgLabel: 'Paris, France',
  },
  {
    tag: '⛰ Mountain Adventure',
    title: 'CONQUER',
    cursive: 'The Alps',
    subtitle: 'ABOVE THE CLOUDS',
    desc: 'Feel the crisp mountain air and stunning alpine scenery that will take your breath away — literally.',
    bg: 'linear-gradient(135deg,#0a1628 0%,#1b4332 50%,#2d6a4f 100%)',
    imgBg: 'linear-gradient(145deg,#2d6a4f,#1b4332,#081c15)',
    imgEmoji: '⛰',
    imgLabel: 'Swiss Alps, Switzerland',
  },
];

let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[currentSlide];

  // Update content
  const titleWord  = document.querySelector('.title-word.title-travel');
  const titleCurs  = document.querySelector('.title-cursive');
  const heroSub    = document.querySelector('.hero-subtitle');
  const heroDesc   = document.querySelector('.hero-desc');
  const heroTag    = document.querySelector('.hero-tag');
  const imgPanel   = document.querySelector('.hero-image-panel');
  const imgEmoji   = document.querySelector('.beach-emoji');
  const imgLabel   = document.querySelector('.img-badge strong');
  const heroEl     = document.querySelector('.hero');

  // Fade out
  document.querySelector('.hero-content').style.opacity = '0';
  document.querySelector('.hero-content').style.transform = 'translateY(10px)';

  setTimeout(() => {
    if (titleWord) titleWord.textContent = slide.title;
    if (titleCurs) titleCurs.textContent = slide.cursive;
    if (heroSub)   heroSub.textContent   = slide.subtitle;
    if (heroDesc)  heroDesc.textContent  = slide.desc;
    if (heroTag)   heroTag.querySelector('span:last-child').textContent = slide.tag;
    if (imgPanel)  imgPanel.style.background = slide.imgBg;
    if (imgLabel)  imgLabel.textContent = slide.imgLabel;
    if (heroEl)    heroEl.style.background = slide.bg;

    // Update emoji
    const heroImgPanel = document.querySelector('.hero-image-panel');
    if (heroImgPanel) {
      const existingEmoji = heroImgPanel.querySelector('.slide-emoji');
      if (existingEmoji) existingEmoji.textContent = slide.imgEmoji;
    }

    // Fade in
    document.querySelector('.hero-content').style.opacity = '1';
    document.querySelector('.hero-content').style.transform = 'translateY(0)';
  }, 300);

  // Update dots
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function startSlideTimer() {
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

document.getElementById('nextBtn')?.addEventListener('click', () => {
  clearInterval(slideTimer);
  goToSlide(currentSlide + 1);
  startSlideTimer();
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
  clearInterval(slideTimer);
  goToSlide(currentSlide - 1);
  startSlideTimer();
});

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(slideTimer);
    goToSlide(i);
    startSlideTimer();
  });
});

startSlideTimer();

// Add slide emoji element to hero panel
const heroPanel = document.querySelector('.hero-image-panel');
if (heroPanel) {
  const emojiEl = document.createElement('div');
  emojiEl.className = 'slide-emoji';
  emojiEl.textContent = '🏖';
  Object.assign(emojiEl.style, {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -60%)',
    fontSize: '5rem', opacity: '0.4',
    zIndex: '1', transition: 'all 0.5s ease',
    pointerEvents: 'none',
  });
  heroPanel.appendChild(emojiEl);
}

// ============================================
// 8. TESTIMONIALS SLIDER
// ============================================
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const tDots = document.querySelectorAll('.t-dot');

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
  tDots[currentTestimonial].classList.add('active');
}

document.getElementById('tNext')?.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
document.getElementById('tPrev')?.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
tDots.forEach((d, i) => d.addEventListener('click', () => showTestimonial(i)));

setInterval(() => showTestimonial(currentTestimonial + 1), 4500);

// ============================================
// 9. DESTINATION FILTER
// ============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.dest-card').forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.transition = 'all 0.4s ease';
      card.style.opacity    = match ? '1' : '0.2';
      card.style.transform  = match ? 'scale(1)' : 'scale(0.95)';
      card.style.pointerEvents = match ? 'all' : 'none';
    });
  });
});

// ============================================
// 10. FAQ ACCORDION
// ============================================
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}
window.toggleFaq = toggleFaq;

// ============================================
// 11. SCROLL-TRIGGERED ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ============================================
// 12. SEARCH BOX FUNCTIONALITY
// ============================================
const searchInput = document.getElementById('searchInput');
const searchOverlay = document.createElement('div');
searchOverlay.id = 'searchOverlay';
searchOverlay.innerHTML = `
  <div class="search-modal">
    <div class="search-modal-inner">
      <input type="text" id="searchModalInput" placeholder="Search destinations, packages, tours..." />
      <button id="closeSearch">✕</button>
    </div>
    <div class="search-suggestions">
      <p>Popular Searches:</p>
      <div class="tags">
        <span onclick="fillSearch('Maldives')">🏖 Maldives</span>
        <span onclick="fillSearch('Swiss Alps')">⛰ Swiss Alps</span>
        <span onclick="fillSearch('Paris')">🗼 Paris</span>
        <span onclick="fillSearch('Bali')">🌴 Bali</span>
        <span onclick="fillSearch('Japan')">🌸 Japan</span>
      </div>
    </div>
  </div>`;
document.body.appendChild(searchOverlay);

searchInput?.addEventListener('focus', () => {
  searchOverlay.classList.add('active');
  document.getElementById('searchModalInput')?.focus();
});

document.getElementById('closeSearch')?.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
});

searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('active');
});

window.fillSearch = (val) => {
  document.getElementById('searchModalInput').value = val;
  searchOverlay.classList.remove('active');
};

// ============================================
// 13. CONTACT FORM SUBMIT
// ============================================
window.submitForm = (e) => {
  e.preventDefault();
  const btn = e.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00b09b, #96c93d)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1800);
};

// ============================================
// 14. CURSOR GLOW EFFECT (Desktop)
// ============================================
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.id = 'cursorGlow';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Scale on hover interactive elements
  document.querySelectorAll('button, a, .service-card, .dest-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
}

// ============================================
// 15. PARALLAX EFFECT (Hero background shapes)
// ============================================
if (window.innerWidth > 768) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelector('.bg-shape-1')?.style.setProperty('transform', `translate(${x * 0.5}px, ${y * 0.5}px)`);
    document.querySelector('.bg-shape-2')?.style.setProperty('transform', `translate(${x * -0.3}px, ${y * -0.3}px)`);
    document.querySelector('.hero-image-panel')?.style.setProperty('transform', `translateX(${x * 0.1}px)`);
  });
}

// ============================================
// 16. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / total) * 100;
  progressBar.style.width = progress + '%';
});

// ============================================
// 17. NEWSLETTER FORM
// ============================================
document.querySelector('.btn-newsletter')?.addEventListener('click', () => {
  const input = document.querySelector('.newsletter-form input');
  if (input && input.value.includes('@')) {
    input.value = '✅ Subscribed!';
    input.disabled = true;
    setTimeout(() => {
      input.value = '';
      input.disabled = false;
      input.placeholder = 'Thanks! Enter another email';
    }, 3000);
  } else {
    input.style.borderColor = '#e74c3c';
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
  }
});

// ============================================
// 18. BOOKING FORM SEARCH BUTTON
// ============================================
document.querySelector('.btn-search-trip')?.addEventListener('click', () => {
  const btn = document.querySelector('.btn-search-trip');
  btn.innerHTML = '⏳ Searching...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Search`;
    btn.disabled = false;
    showToast('🎉 Great news! We found 24 packages for you. Scroll to explore!');
  }, 1500);
});

// ============================================
// 19. TOAST NOTIFICATION
// ============================================
function showToast(msg, duration = 3500) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}
window.showToast = showToast;

// ============================================
// 20. DESTINATION CARD — Book Now
// ============================================
document.querySelectorAll('.btn-dest').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.dest-card');
    const name = card.querySelector('h3')?.textContent || 'Destination';
    showToast(`✈️ Booking ${name}... Our team will contact you shortly!`);
  });
});

// ============================================
// 21. KEYBOARD NAVIGATION (Accessibility)
// ============================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
  if (e.key === 'ArrowRight' && document.querySelector('.hero:hover')) goToSlide(currentSlide + 1);
  if (e.key === 'ArrowLeft'  && document.querySelector('.hero:hover')) goToSlide(currentSlide - 1);
});

// ============================================
// 22. TILT EFFECT ON SERVICE CARDS
// ============================================
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================================
// 23. IMAGE LAZY / ENTRANCE ANIMATION
// ============================================
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.dest-card, .service-card, .about-img').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px) scale(0.97)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  imgObserver.observe(el);
});

// ============================================
// 24. DYNAMIC YEAR IN FOOTER
// ============================================
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) yearEl.innerHTML = yearEl.innerHTML.replace('2024', new Date().getFullYear());

// ============================================
// 25. INIT — Add animate classes
// ============================================
document.querySelectorAll('.section-header, .contact-info, .contact-form-wrap, .booking-header').forEach(el => {
  el.classList.add('animate-on-scroll');
  observer.observe(el);
});

console.log('%c✈ TravelWorld JS Loaded Successfully!', 'color:#f5a623;font-size:1.2rem;font-weight:bold;background:#0a1628;padding:8px 16px;border-radius:8px;');
