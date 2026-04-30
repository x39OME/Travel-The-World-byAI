/* ============================================================
   TRAVEL WORLD — JavaScript v3.0
   Fixed: hero images, chevron arrows, slider, LTR layout
   ============================================================ */
'use strict';

/* ── 1. PRELOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pl = document.getElementById('preloader');
    if (pl) { pl.classList.add('hidden'); setTimeout(() => pl.remove(), 700); }
    animateStats();
    spawnParticles();
  }, 2300);
});

/* ── 2. NAVBAR scroll + mobile ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const backTop   = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('visible', window.scrollY > 400);
  revealOnScroll();
  highlightNavLink();
});

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close when clicking a nav link
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));
// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

function highlightNavLink() {
  const pos = window.scrollY + 130;
  document.querySelectorAll('section[id]').forEach(sec => {
    const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (!link) return;
    link.classList.toggle('active', pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight);
  });
}

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* Back to top */
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── 3. HERO SLIDER DATA ── */
const slides = [
  {
    tag:    'Award-Winning Travel Agency',
    bold:   'TRAVEL',
    cursive:'The World',
    sub:    'LANDING PAGE',
    desc:   'Discover breathtaking destinations across the globe. We craft unforgettable journeys tailored to your dreams — from serene tropical escapes to thrilling mountain adventures.',
    img:    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=85&auto=format&fit=crop',
    city:   'Santorini, Greece',
  },
  {
    tag:    '🗼 City Explorer',
    bold:   'EXPLORE',
    cursive:'Paris',
    sub:    'CITY OF LIGHTS',
    desc:   'Lose yourself in cobblestone streets, world-class cuisine, and iconic landmarks. The City of Lights awaits your next great adventure.',
    img:    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1400&q=85&auto=format&fit=crop',
    city:   'Paris, France',
  },
  {
    tag:    '⛰ Mountain Adventure',
    bold:   'CONQUER',
    cursive:'The Alps',
    sub:    'ABOVE THE CLOUDS',
    desc:   'Feel the crisp mountain air and jaw-dropping alpine scenery. The Swiss Alps offer an adventure that will take your breath away — literally.',
    img:    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&q=85&auto=format&fit=crop',
    city:   'Swiss Alps, Switzerland',
  },
];

let curSlide = 0;
let slideTimer;

/* Elements */
const heroImg     = document.getElementById('heroImg'); // panel hidden, img unused
const heroTagEl   = document.getElementById('heroTagText');
const heroBoldEl  = document.getElementById('heroTitleWord');
const heroCursEl  = document.getElementById('heroCursive');
const heroSubEl   = document.getElementById('heroSubtitle');
const heroDescEl  = document.getElementById('heroDesc');
const badgeCityEl = document.getElementById('badgeCity');
const heroContent = document.querySelector('.hero-content');
const dots        = document.querySelectorAll('.dot');

function goSlide(index) {
  curSlide = ((index % slides.length) + slides.length) % slides.length;
  const s = slides[curSlide];

  /* Fade content out */
  heroContent.style.opacity   = '0';
  heroContent.style.transform = 'translateY(12px)';

  setTimeout(() => {
    /* Update text */
    heroTagEl.textContent   = s.tag;
    heroBoldEl.textContent  = s.bold;
    heroCursEl.textContent  = s.cursive;
    heroSubEl.textContent   = s.sub;
    heroDescEl.textContent  = s.desc;
    badgeCityEl.textContent = s.city;

    /* Image panel hidden — gradient bg only, no img update needed */

    /* Fade content in */
    heroContent.style.opacity   = '1';
    heroContent.style.transform = 'translateY(0)';

    /* Update dots */
    dots.forEach((d, i) => d.classList.toggle('active', i === curSlide));

    /* Change hero background per slide */
    const heroEl = document.querySelector('.hero');
    heroEl.classList.remove('slide-0','slide-1','slide-2');
    heroEl.classList.add('slide-' + curSlide);
  }, 380);
}

function startTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(curSlide + 1), 5500);
}

/* Slider buttons */
document.getElementById('prevBtn').addEventListener('click', () => { goSlide(curSlide - 1); startTimer(); });
document.getElementById('nextBtn').addEventListener('click', () => { goSlide(curSlide + 1); startTimer(); });
dots.forEach((d, i) => d.addEventListener('click', () => { goSlide(i); startTimer(); }));

/* Touch/swipe support */
let touchStartX = 0;
document.querySelector('.hero').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
document.querySelector('.hero').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { goSlide(diff > 0 ? curSlide + 1 : curSlide - 1); startTimer(); }
});

startTimer();

/* Init hero image transition style */
heroImg.style.transition = 'opacity .5s ease';

/* ── 4. ANIMATED COUNTERS ── */
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let cur = 0;
    const step = target / (1800 / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = Math.floor(cur);
    }, 16);
  });
}

/* ── 5. PARTICLES + STARS + PREMIUM BG FX ── */
function spawnParticles() {
  const c = document.getElementById('particles');
  if (!c) return;

  const isMobile = window.innerWidth < 768;

  /* 1 — Floating particles going UP — fewer & slower on mobile */
  const pCount = isMobile ? 6 : 35;
  for (let i = 0; i < pCount; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const colors = [
      'rgba(0,200,255,.9)',
      'rgba(255,255,255,.85)',
      'rgba(245,166,35,.7)',
      'rgba(140,220,255,.8)',
    ];
    Object.assign(p.style, {
      width:  size + 'px',
      height: size + 'px',
      left:   Math.random() * 100 + '%',
      bottom: '-10px',                         /* start from bottom */
      background: colors[Math.floor(Math.random() * colors.length)],
      boxShadow: `0 0 ${size*2}px rgba(0,200,255,.5)`,
      animationDelay:    Math.random() * 12 + 's',
      animationDuration: Math.random() * 12 + 8 + 's',
      animationName: 'floatUp',               /* always go UP */
    });
    c.appendChild(p);
  }

  /* 2 — Stars: HALF fixed (twinkle in place) + HALF drift upward slowly */
  const heroEl = document.querySelector('.hero-bg');
  const sCount = isMobile ? 10 : 60;
  for (let i = 0; i < sCount; i++) {
    const s = document.createElement('div');
    const isFixed = i < sCount * 0.6; /* 60% fixed, 40% drifting up */
    const size = Math.random() * 2.8 + 0.5;
    const isGold = Math.random() > .72;
    s.className = 'hero-star';
    Object.assign(s.style, {
      width:  size + 'px',
      height: size + 'px',
      left:   Math.random() * 100 + '%',
      top:    Math.random() * 100 + '%',
      background: isGold ? 'rgba(255,210,80,.95)' : 'rgba(255,255,255,.92)',
      boxShadow: isGold
        ? `0 0 ${size*3}px rgba(255,200,50,.7)`
        : `0 0 ${size*2}px rgba(200,240,255,.6)`,
      animationName: isFixed ? 'starTwinkle' : 'starDriftUp',
      animationDuration: isFixed
        ? (Math.random() * 4 + 3) + 's'
        : isMobile
          ? (Math.random() * 6 + 8)  + 's'   /* slower on mobile */
          : (Math.random() * 4 + 4)  + 's',
      animationDelay:  (Math.random() * 6) + 's',
      animationIterationCount: 'infinite',
      animationTimingFunction: isFixed ? 'ease-in-out' : 'linear',
    });
    heroEl.appendChild(s);
  }

  /* 3 — Shooting stars — desktop only */
  if (!isMobile) spawnShootingStars();
  /* Disable rings animation on mobile for performance */
  if (isMobile) {
    document.querySelectorAll('.hero-ring').forEach(r => r.style.display = 'none');
    document.querySelectorAll('.hero-grid').forEach(g => g.style.display = 'none');
  }
}

function spawnShootingStars() {
  const hero = document.querySelector('.hero');
  function shoot() {
    const s = document.createElement('div');
    Object.assign(s.style, {
      position: 'absolute',
      top:  Math.random() * 60 + '%',
      left: Math.random() * 40 + '%',
      width: (Math.random() * 80 + 40) + 'px',
      height: '1.5px',
      background: 'linear-gradient(to right, rgba(255,255,255,.0), rgba(0,220,255,.9), rgba(255,255,255,.0))',
      transform: 'rotate(-25deg)',
      zIndex: 3,
      pointerEvents: 'none',
      borderRadius: '2px',
      opacity: 0,
      transition: 'none',
    });
    hero.appendChild(s);
    // Animate via keyframes
    s.animate([
      { opacity: 0, transform: 'rotate(-25deg) translateX(0)' },
      { opacity: 1, transform: 'rotate(-25deg) translateX(30px)', offset: 0.1 },
      { opacity: 0, transform: 'rotate(-25deg) translateX(120px)' },
    ], { duration: 900, easing: 'ease-out' }).onfinish = () => s.remove();
    // Schedule next
    setTimeout(shoot, Math.random() * 4000 + 2000);
  }
  setTimeout(shoot, 1000);
}

/* ── 6. TESTIMONIALS ── */
let curT = 0;
const tCards = document.querySelectorAll('.t-card');
const tDots  = document.querySelectorAll('.t-dot');

function showT(i) {
  tCards.forEach(c => c.classList.remove('active'));
  tDots.forEach(d  => d.classList.remove('active'));
  curT = ((i % tCards.length) + tCards.length) % tCards.length;
  tCards[curT].classList.add('active');
  tDots[curT].classList.add('active');
}
document.getElementById('tNext').addEventListener('click', () => showT(curT + 1));
document.getElementById('tPrev').addEventListener('click', () => showT(curT - 1));
tDots.forEach((d, i) => d.addEventListener('click', () => showT(i)));
setInterval(() => showT(curT + 1), 4800);

/* ── 7. DESTINATION FILTER ── */
document.querySelectorAll('.f-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.d-card').forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.style.transition = 'all .4s ease';
      card.style.opacity    = show ? '1' : '0.2';
      card.style.transform  = show ? 'scale(1)' : 'scale(0.95)';
      card.style.pointerEvents = show ? 'all' : 'none';
    });
  });
});

/* ── 8. FAQ ACCORDION ── */
window.toggleFaq = el => {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
};

/* ── 9. REVEAL ON SCROLL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

function revealOnScroll() { /* observer handles it */ }

/* ── 10. SEARCH MODAL ── */
const modal  = document.getElementById('searchModal');
const smIn   = document.getElementById('smInput');

document.getElementById('openSearch').addEventListener('click',  () => { modal.classList.add('open'); smIn.focus(); });
document.getElementById('smClose').addEventListener('click',     () =>  modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

window.fillSearch = val => {
  document.getElementById('searchInput').value = val;
  smIn.value = val;
  modal.classList.remove('open');
  showToast(`🔍 Searching for ${val} packages...`);
};

/* Also open on clicking the text input */
document.getElementById('searchInput').addEventListener('click', () => { modal.classList.add('open'); smIn.focus(); });

/* ── 11. TOAST ── */
window.showToast = (msg, dur = 3500) => {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, dur);
};

/* ── 12. CONTACT FORM ── */
window.submitContact = e => {
  e.preventDefault();
  const btn = e.target;
  btn.innerHTML = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#00b09b,#96c93d)';
    setTimeout(() => {
      btn.innerHTML = 'Send Message ✉';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1800);
};

/* ── 13. BOOKING SEARCH ── */
document.getElementById('searchTripBtn').addEventListener('click', () => {
  const btn = document.getElementById('searchTripBtn');
  btn.textContent = '⏳ Searching...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> Search`;
    btn.disabled = false;
    showToast('🎉 Found 24 amazing packages for you!');
  }, 1600);
});

/* ── 14. NEWSLETTER ── */
document.getElementById('nlBtn').addEventListener('click', () => {
  const inp = document.getElementById('nlInput');
  if (inp.value.includes('@')) {
    showToast('📧 You\'re subscribed! Welcome aboard.');
    inp.value = '';
  } else {
    inp.style.borderColor = '#e74c3c';
    inp.placeholder = 'Enter a valid email';
    setTimeout(() => { inp.style.borderColor = ''; inp.placeholder = 'Your email address'; }, 2000);
  }
});

/* ── 15. SCROLL PROGRESS ── */
window.addEventListener('scroll', () => {
  const prog = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = prog + '%';
});

/* ── 16. CURSOR GLOW ── */
if (window.innerWidth > 768) {
  const glow = document.getElementById('cursorGlow');
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animC() {
    cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
    glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
    requestAnimationFrame(animC);
  })();
  document.querySelectorAll('button,a,.srv-card,.d-card').forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('big'));
    el.addEventListener('mouseleave', () => glow.classList.remove('big'));
  });
}

/* ── 17. PARALLAX (mouse move on hero) ── */
if (window.innerWidth > 900) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 22;
    const y = (e.clientY / window.innerHeight - 0.5) * 22;
    const b1 = document.querySelector('.blob-1');
    const b2 = document.querySelector('.blob-2');
    if (b1) b1.style.transform = `translate(${x*.5}px,${y*.5}px)`;
    if (b2) b2.style.transform = `translate(${x*-.3}px,${y*-.3}px)`;
  });
}

/* ── 18. 3D TILT on service cards ── */
document.querySelectorAll('.srv-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - .5) * 12;
    const y = ((e.clientY - r.top)  / r.height - .5) * 12;
    card.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform .1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all .35s ease';
  });
});

/* ── 19. KEYBOARD shortcuts ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modal.classList.remove('open'); hamburger.classList.remove('open'); navLinks.classList.remove('open'); }
  if (e.key === 'ArrowRight') { goSlide(curSlide + 1); startTimer(); }
  if (e.key === 'ArrowLeft')  { goSlide(curSlide - 1); startTimer(); }
});

/* ── 20. FOOTER YEAR ── */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ── DONE ── */
console.log('%c✈ TravelWorld v3.0 — All systems operational', 'color:#f5a623;font-weight:bold;font-size:1.1rem;background:#0a1628;padding:6px 14px;border-radius:6px');
