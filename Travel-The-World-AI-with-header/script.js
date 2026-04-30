/* ═══════════════════════════════════════════════
   TRAVEL WORLD — script.js  v3.0
   Senior Frontend Engineer — Full Featured
   ═══════════════════════════════════════════════ */
'use strict';

/* ──────────────────────────────────────────────
   1. PRELOADER
──────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pl = document.getElementById('preloader');
    if (pl) {
      pl.classList.add('hidden');
      setTimeout(() => pl.remove(), 700);
    }
    animateStats();
    initParticles();
  }, 2300);
});

/* ──────────────────────────────────────────────
   2. SCROLL PROGRESS BAR
──────────────────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
function updateScroll() {
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  const pct      = (window.scrollY / total) * 100;
  progressBar.style.width = pct + '%';

  // navbar
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 60);

  // back to top
  document.getElementById('backTop')
    .classList.toggle('visible', window.scrollY > 400);

  updateActiveNav();
}
window.addEventListener('scroll', updateScroll, { passive: true });

/* ──────────────────────────────────────────────
   3. ACTIVE NAV LINK ON SCROLL
──────────────────────────────────────────────── */
function updateActiveNav() {
  const scrollMid = window.scrollY + 130;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop;
    const bot = top + sec.offsetHeight;
    const id  = sec.getAttribute('id');
    const lnk = document.querySelector(`.nav-link[href="#${id}"]`);
    if (lnk) lnk.classList.toggle('active', scrollMid >= top && scrollMid < bot);
  });
}

/* ──────────────────────────────────────────────
   4. HAMBURGER MOBILE MENU
──────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ──────────────────────────────────────────────
   5. SMOOTH SCROLL
──────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ──────────────────────────────────────────────
   6. BACK TO TOP BUTTON
──────────────────────────────────────────────── */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ──────────────────────────────────────────────
   7. ANIMATED NUMBER COUNTERS (Stats)
──────────────────────────────────────────────── */
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = target / (duration / 16);
    let cur = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = Math.floor(cur);
    }, 16);
  });
}

/* ──────────────────────────────────────────────
   8. FLOATING PARTICLES
──────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 12 : 28;
  for (let i = 0; i < count; i++) {
    const p  = document.createElement('div');
    p.className = 'particle';
    const sz = Math.random() * 4 + 1;
    Object.assign(p.style, {
      width:             sz + 'px',
      height:            sz + 'px',
      left:              Math.random() * 100 + '%',
      animationDelay:    Math.random() * 8 + 's',
      animationDuration: (Math.random() * 10 + 8) + 's',
      opacity:           (Math.random() * 0.6 + 0.2).toFixed(2),
    });
    container.appendChild(p);
  }
}

/* ──────────────────────────────────────────────
   9. HERO SLIDER (3 slides with real photos)
──────────────────────────────────────────────── */
const SLIDES = [
  {
    tag:      'Award-Winning Travel Agency',
    title:    'TRAVEL',
    cursive:  'The World',
    subtitle: 'LANDING PAGE',
    desc:     'Discover breathtaking destinations across the globe. We craft unforgettable journeys tailored to your dreams — from serene tropical escapes to thrilling mountain adventures.',
    img:      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=85&auto=format&fit=crop',
    city:     'Santorini, Greece',
  },
  {
    tag:      'City Explorer Series',
    title:    'EXPLORE',
    cursive:  'Paris',
    subtitle: 'CITY OF LIGHTS',
    desc:     'Lose yourself in cobblestone streets, world-class cuisine, and iconic landmarks that have inspired generations of travellers.',
    img:      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=85&auto=format&fit=crop',
    city:     'Paris, France',
  },
  {
    tag:      'Mountain Adventure',
    title:    'CONQUER',
    cursive:  'The Alps',
    subtitle: 'ABOVE THE CLOUDS',
    desc:     'Feel the crisp mountain air and jaw-dropping alpine scenery. An experience that will leave you breathless — and craving more.',
    img:      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&q=85&auto=format&fit=crop',
    city:     'Swiss Alps, Switzerland',
  },
];

let slideIdx = 0;
let slideTimer;

function goToSlide(idx) {
  slideIdx = (idx + SLIDES.length) % SLIDES.length;
  const s       = SLIDES[slideIdx];
  const content = document.querySelector('.hero-content');

  // fade out
  content.style.transition = 'opacity .3s ease, transform .3s ease';
  content.style.opacity    = '0';
  content.style.transform  = 'translateY(10px)';

  setTimeout(() => {
    // update text
    document.getElementById('heroTagText').textContent   = s.tag;
    document.getElementById('heroTitleWord').textContent = s.title;
    document.getElementById('heroCursive').textContent   = s.cursive;
    document.getElementById('heroSubtitle').textContent  = s.subtitle;
    document.getElementById('heroDesc').textContent      = s.desc;
    document.getElementById('badgeCity').textContent     = s.city;

    // update photo with cross-fade
    const img = document.getElementById('heroImg');
    img.style.opacity    = '0';
    img.style.transition = 'opacity .5s ease';
    img.src = s.img;
    img.onload = () => {
      img.style.opacity = '1';
    };

    // fade in content
    content.style.opacity   = '1';
    content.style.transform = 'translateY(0)';
  }, 320);

  // update dots
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === slideIdx);
  });
}

function startSlideAuto() {
  slideTimer = setInterval(() => goToSlide(slideIdx + 1), 5500);
}
function stopSlideAuto() {
  clearInterval(slideTimer);
}

document.getElementById('nextBtn').addEventListener('click', () => {
  stopSlideAuto(); goToSlide(slideIdx + 1); startSlideAuto();
});
document.getElementById('prevBtn').addEventListener('click', () => {
  stopSlideAuto(); goToSlide(slideIdx - 1); startSlideAuto();
});
document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopSlideAuto(); goToSlide(i); startSlideAuto();
  });
});

startSlideAuto();

/* ──────────────────────────────────────────────
   10. TESTIMONIALS SLIDER
──────────────────────────────────────────────── */
let tIdx   = 0;
const tCards = document.querySelectorAll('.t-card');
const tDots  = document.querySelectorAll('.t-dot');

function showTestimonial(idx) {
  tCards.forEach(c => c.classList.remove('active'));
  tDots.forEach(d  => d.classList.remove('active'));
  tIdx = (idx + tCards.length) % tCards.length;
  tCards[tIdx].classList.add('active');
  tDots[tIdx].classList.add('active');
}

document.getElementById('tNext').addEventListener('click', () => showTestimonial(tIdx + 1));
document.getElementById('tPrev').addEventListener('click', () => showTestimonial(tIdx - 1));
tDots.forEach((d, i) => d.addEventListener('click', () => showTestimonial(i)));
setInterval(() => showTestimonial(tIdx + 1), 4800);

/* ──────────────────────────────────────────────
   11. DESTINATION FILTER
──────────────────────────────────────────────── */
document.querySelectorAll('.fbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.f;
    document.querySelectorAll('.dcard').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.style.transition    = 'all .4s ease';
      card.style.opacity       = show ? '1' : '0.18';
      card.style.transform     = show ? 'scale(1)' : 'scale(0.94)';
      card.style.pointerEvents = show ? 'all' : 'none';
    });
  });
});

/* ──────────────────────────────────────────────
   12. FAQ ACCORDION
──────────────────────────────────────────────── */
window.toggleFaq = function(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
};

/* ──────────────────────────────────────────────
   13. SCROLL REVEAL (IntersectionObserver)
──────────────────────────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ──────────────────────────────────────────────
   14. SEARCH OVERLAY
──────────────────────────────────────────────── */
const searchOverlay = document.getElementById('searchOverlay');
const searchInput   = document.getElementById('sInput');

// open on click search box
document.getElementById('openSearch').addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput.focus(), 100);
});
document.querySelector('.search-box').addEventListener('click', () => {
  searchOverlay.classList.add('active');
  setTimeout(() => searchInput.focus(), 100);
});

// close
document.getElementById('sClose').addEventListener('click', () => {
  searchOverlay.classList.remove('active');
});
searchOverlay.addEventListener('click', e => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('active');
});

// fill suggestion
window.fillSearch = function(val) {
  searchInput.value = val;
  searchOverlay.classList.remove('active');
  showToast('🔍 Searching for ' + val + ' packages...');
};

// search on Enter
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && searchInput.value.trim()) {
    window.fillSearch(searchInput.value.trim());
  }
});

/* ──────────────────────────────────────────────
   15. TOAST NOTIFICATION
──────────────────────────────────────────────── */
function showToast(msg, duration = 3500) {
  const toast = document.createElement('div');
  toast.className   = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  // force reflow then show
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 450);
  }, duration);
}
window.showToast = showToast;

/* ──────────────────────────────────────────────
   16. BOOKING FORM SEARCH BUTTON
──────────────────────────────────────────────── */
document.getElementById('searchTripBtn').addEventListener('click', function () {
  const btn = this;
  btn.innerHTML = '⏳ Searching...';
  btn.disabled  = true;
  setTimeout(() => {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Search`;
    btn.disabled  = false;
    showToast('🎉 Found 24 amazing packages for you!');
  }, 1600);
});

/* ──────────────────────────────────────────────
   17. CONTACT FORM SUBMIT
──────────────────────────────────────────────── */
window.submitForm = function (e) {
  e.preventDefault();
  const btn = e.target;
  btn.innerHTML = '⏳ Sending...';
  btn.disabled  = true;
  setTimeout(() => {
    btn.innerHTML           = '✅ Message Sent!';
    btn.style.background    = 'linear-gradient(135deg,#00b09b,#96c93d)';
    showToast('📩 We received your message! Our team will reply within 24h.');
    setTimeout(() => {
      btn.innerHTML        = 'Send Message ✉';
      btn.disabled         = false;
      btn.style.background = '';
    }, 3200);
  }, 1800);
};

/* ──────────────────────────────────────────────
   18. NEWSLETTER FORM
──────────────────────────────────────────────── */
document.getElementById('nlBtn').addEventListener('click', () => {
  const inp = document.getElementById('nlInput');
  const email = inp.value.trim();
  if (email.includes('@') && email.includes('.')) {
    inp.value     = '✅ Subscribed! Thank you.';
    inp.disabled  = true;
    showToast('📬 Welcome aboard! Check your inbox for a confirmation.');
    setTimeout(() => {
      inp.value       = '';
      inp.disabled    = false;
      inp.placeholder = 'Enter another email';
    }, 3500);
  } else {
    inp.style.borderColor = '#e74c3c';
    inp.placeholder       = 'Please enter a valid email';
    setTimeout(() => {
      inp.style.borderColor = '';
      inp.placeholder       = 'Your email address';
    }, 2500);
    showToast('⚠️ Please enter a valid email address');
  }
});

/* ──────────────────────────────────────────────
   19. DESTINATION CARD — Book Now
──────────────────────────────────────────────── */
document.querySelectorAll('.btn-book-dest').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const name = btn.closest('.dcard').querySelector('h3')?.textContent || 'Destination';
    showToast('✈️ Booking ' + name + '... Our team will contact you shortly!');
  });
});

/* ──────────────────────────────────────────────
   20. SERVICE CARD 3D TILT EFFECT
──────────────────────────────────────────────── */
document.querySelectorAll('.srv-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 14;
    card.style.transform = `translateY(-7px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ──────────────────────────────────────────────
   21. CUSTOM CURSOR GLOW (desktop only)
──────────────────────────────────────────────── */
if (window.innerWidth > 768) {
  const cg = document.getElementById('cursorGlow');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
  });

  (function loop() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cg.style.left = cx + 'px';
    cg.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();

  // expand on interactive elements
  document.querySelectorAll('button, a, .srv-card, .dcard, .faq-item').forEach(el => {
    el.addEventListener('mouseenter', () => cg.classList.add('big'));
    el.addEventListener('mouseleave', () => cg.classList.remove('big'));
  });
}

/* ──────────────────────────────────────────────
   22. PARALLAX on hero blobs
──────────────────────────────────────────────── */
if (window.innerWidth > 768) {
  let rafParallax;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafParallax);
    rafParallax = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 22;
      const y = (e.clientY / window.innerHeight - 0.5) * 22;
      const b1 = document.querySelector('.blob-1');
      const b2 = document.querySelector('.blob-2');
      if (b1) b1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      if (b2) b2.style.transform = `translate(${x * -0.3}px, ${y * -0.3}px)`;
    });
  });
}

/* ──────────────────────────────────────────────
   23. KEYBOARD SHORTCUTS
──────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
  // Arrow keys control hero slider when mouse is in hero
  const hero = document.getElementById('home');
  if (hero && hero.matches(':hover')) {
    if (e.key === 'ArrowRight') { stopSlideAuto(); goToSlide(slideIdx + 1); startSlideAuto(); }
    if (e.key === 'ArrowLeft')  { stopSlideAuto(); goToSlide(slideIdx - 1); startSlideAuto(); }
  }
});

/* ──────────────────────────────────────────────
   24. TOUCH SWIPE for hero slider
──────────────────────────────────────────────── */
let touchStartX = 0;
const heroEl = document.getElementById('home');
heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive:true });
heroEl.addEventListener('touchend',   e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    stopSlideAuto();
    goToSlide(diff > 0 ? slideIdx + 1 : slideIdx - 1);
    startSlideAuto();
  }
}, { passive:true });

/* ──────────────────────────────────────────────
   25. FOOTER DYNAMIC YEAR
──────────────────────────────────────────────── */
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

/* ──────────────────────────────────────────────
   INIT LOG
──────────────────────────────────────────────── */
console.log(
  '%c✈ TravelWorld v3.0 — All Systems Go!',
  'color:#f5a623;font-size:1.1rem;font-weight:bold;background:#0a1628;padding:10px 18px;border-radius:8px;'
);
