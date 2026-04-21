// ── GLOBAL closeMenu ──────────────────────────────────────────
function closeMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('drawerBackdrop');
  if (!hamburger) return;
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  backdrop.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}
// Helper: always OPEN the gallery (never toggle closed)
function openGallery() {
  const btn = document.getElementById('galleryBtn');
  const col = document.getElementById('galleryCollapsible');
  if (!col.classList.contains('open')) {
    col.classList.add('open');
    btn.classList.add('open');
    btn.querySelector('.btn-icon').textContent  = '×';
    btn.querySelector('.btn-label').textContent = 'Hide Photo Gallery';
  }
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Condition 2: coming from another page
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash === '#gallery') {
    openGallery();
  }
});

// Condition 1: already on about.html, click navbar gallery link
const galleryNavLink = document.querySelector('a[href="about.html#gallery"]');
if (galleryNavLink) {
  galleryNavLink.addEventListener('click', function(e) {
    e.preventDefault();
    openGallery();
  });
}
// ── GLOBAL gallery images ─────────────────────────────────────
const images = [
  { src: 'light1.jpeg',  cap: 'Our Children — the heart of everything we do.' },
  { src: 'light2.jpeg',  cap: 'Learning Together — classrooms full of curiosity.' },
  { src: 'light3.jpeg',  cap: 'Lake Victoria Trip — adventure and discovery.' },
  { src: 'light4.jpeg',  cap: 'Sunday Worship — praising God together.' },
  { src: 'light5.jpeg',  cap: 'Annual Sports Day — healthy competition and fun.' },
  { src: 'light6.jpeg',  cap: 'Celebrations — marking milestones with joy.' },
  { src: 'light7.jpeg',  cap: 'Meal Time Together — nourishment and fellowship.' },
  { src: 'light8.jpeg',  cap: 'Playtime & Joy — laughter fills our compound.' },
  { src: 'light9.jpeg',  cap: 'Graduation Day — proud moments of achievement.' },
  { src: 'light10.jpeg', cap: 'Morning Devotion — starting each day in prayer.' },
  { src: 'light11.jpeg', cap: 'Our School Garden — learning about creation.' },
  { src: 'light12.jpeg', cap: 'Community Day — serving Namutumba district together.' },
  { src: 'light13.jpeg', cap: ' image loading' },
  { src: 'light14.jpeg', cap: ' ' },
  { src: 'light15.jpeg', cap: ' ' },
  { src: 'light16.jpeg', cap: ' ' },
  { src: 'light17.jpeg', cap: ' ' },
  { src: 'light18.jpeg', cap: ' ' },
  { src: 'light19.jpeg', cap: ' ' },
  { src: 'light20.jpeg', cap: ' ' },
  { src: 'light21.jpeg', cap: ' ' },
  { src: 'light22.jpeg', cap: ' ' },
  { src: 'light23.jpeg', cap: ' ' },
  { src: 'light24.jpeg', cap: ' ' },
  { src: 'light25.jpeg', cap: ' ' },
  { src: 'light26.jpeg', cap: ' ' },
  { src: 'light27.jpeg', cap: ' ' },
  { src: 'light28.jpeg', cap: ' ' },
  { src: 'light29.jpeg', cap: ' ' },
  { src: 'light30.jpeg', cap: ' ' },
  { src: 'light31.jpeg', cap: ' ' },
  { src: 'light32.jpeg', cap: ' ' },
  { src: 'light33.jpeg', cap: ' ' },
  { src: 'light34.jpeg', cap: ' ' },
  { src: 'light35.jpeg', cap: ' ' },
  { src: 'light36.jpeg', cap: ' ' },
  { src: 'light37.jpeg', cap: ' ' },
  { src: 'light38.jpeg', cap: ' ' },
  { src: 'light39.jpeg', cap: ' ' },
  { src: 'light40.jpeg', cap: ' ' },
  { src: 'light41.jpeg', cap: ' ' },
  { src: 'light42.jpeg', cap: ' ' },

];

let current = 0;

// ── GLOBAL gallery functions (must be global for onclick to work) ──
function toggleGallery() {
  const btn = document.getElementById('galleryBtn');
  const col = document.getElementById('galleryCollapsible');
  const isOpen = col.classList.contains('open');
  col.classList.toggle('open');
  btn.classList.toggle('open');
  btn.querySelector('.btn-icon').textContent  = isOpen ? '+' : '×';
  btn.querySelector('.btn-label').textContent = isOpen ? 'View Photo Gallery' : 'Hide Photo Gallery';
}

function openLightbox(i) {
  current = i;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

function changeImage(dir) {
  current = (current + dir + images.length) % images.length;
  updateLightbox();
}

function updateLightbox() {
  const img = document.getElementById('lbImg');
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = images[current].src;
    img.alt = images[current].cap;
    document.getElementById('lbCaption').textContent = images[current].cap;
    document.getElementById('lbCounter').textContent = (current + 1) + ' / ' + images.length;
    img.style.opacity = 1;
  }, 150);
}

// ── Keyboard navigation (global) ─────────────────────────────
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft')  changeImage(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// ── DOM-dependent code ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Scroll progress bar
  const bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // Navbar
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('drawerBackdrop');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  if (hamburger && mobileNav && backdrop) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      backdrop.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Scroll reveal observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.querySelectorAll('.val-card').forEach((c, i) => {
    c.style.transition = `opacity 0.6s ${i * 0.09}s var(--ease), transform 0.6s ${i * 0.09}s var(--ease), border-color 0.3s, box-shadow 0.3s`;
    io.observe(c);
  });

  document.querySelectorAll('.tl-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
    io.observe(item);
  });

});