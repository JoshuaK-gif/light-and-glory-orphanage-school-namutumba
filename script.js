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

document.addEventListener('DOMContentLoaded', function () {

  // ── Scroll progress bar ──────────────────────────────────────
  var bar = document.getElementById('scroll-progress');
  if (bar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Navbar ───────────────────────────────────────────────────
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

  // ── Slideshow ────────────────────────────────────────────────
  const SLIDES   = 5;
  const DURATION = 6000;
  let current = 0;
  let timer   = null;

  const slides      = document.querySelectorAll('.slide');
  const dots        = document.querySelectorAll('.dot');
  const progressBar = document.getElementById('progress-bar');

  if (slides.length && dots.length && progressBar) {

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + SLIDES) % SLIDES;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      startProgress();
    }

    function next() { goTo(current + 1); }

    function startProgress() {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      progressBar.offsetWidth;
      progressBar.style.transition = `width ${DURATION}ms linear`;
      progressBar.style.width = '100%';
      clearTimeout(timer);
      timer = setTimeout(next, DURATION);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(+dot.dataset.index));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    });

    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? next() : goTo(current - 1);
    }, { passive: true });

    startProgress();
  }

}); // end DOMContentLoaded
function toggleCard(btn) {
  const content = btn.previousElementSibling;
  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  btn.textContent = isHidden ? 'Read Less' : 'Read More';
}

// ===== NEWS MODAL LOGIC =====
const newsData = [
  {
    img: "light1.jpeg",
    alt: "End of Term Celebration",
    date: "March 2025",
    title: "End of Term Celebration",
    body: "Children celebrated another successful term with songs, dance and prizes for top performers. The atmosphere was filled with joy, laughter and gratitude as every child was recognised for their effort and growth throughout the term."
  },
  {
    img: "light2.jpeg",
    alt: "New Children Welcomed",
    date: "January 2025",
    title: "New Children Welcomed",
    body: "This term we welcomed 15 new children into the Light & Glory family. Every child deserves a home, love and a chance at education. We are honoured to extend that chance to each new member of our growing community."
  },
  {
    img: "light6.jpeg",
    alt: "PLE Exam Results",
    date: "December 2024",
    title: "PLE Exam Results",
    body: "Our Primary Seven candidates sat their PLE exams this year. We are proud of every single one of them for the dedication and hard work they showed throughout the year. Results reflected the commitment of both our children and teachers."
  }
];

const modal      = document.getElementById('newsModal');
const modalImg   = document.getElementById('modalImg');
const modalDate  = document.getElementById('modalDate');
const modalTitle = document.getElementById('modalTitle');
const modalBody  = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.read-more').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const data = newsData[index];
    modalImg.src           = data.img;
    modalImg.alt           = data.alt;
    modalDate.textContent  = data.date;
    modalTitle.textContent = data.title;
    modalBody.textContent  = data.body;
    modal.style.display    = 'flex';
  });
});

function closeModal() {
  modal.style.display = 'none';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});