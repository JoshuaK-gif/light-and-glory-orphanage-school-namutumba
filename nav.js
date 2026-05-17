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

});

function toggleMobileDropdown(e) {
  e.preventDefault();
  const toggle = e.currentTarget;
  const content = toggle.nextElementSibling;

  if (content && content.classList.contains('mobile-dropdown-content')) {
    content.classList.toggle('open');
    toggle.classList.toggle('active');
  }
}