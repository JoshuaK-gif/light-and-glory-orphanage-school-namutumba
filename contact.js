/* ====== NAVBAR ====== */
(function () {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('drawerBackdrop');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', openMenu);

  function openMenu() {
    mobileNav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    backdrop.style.display = 'block';
    setTimeout(() => backdrop.classList.add('open'), 10);
    document.body.style.overflow = 'hidden';
  }

  window.closeMenu = function () {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { backdrop.style.display = 'none'; }, 400);
  };

  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMenu();
  });
})();


/* ====== MOBILE DROPDOWN (Programs accordion) ====== */
function toggleMobileDropdown(e) {
  e.preventDefault();
  e.stopPropagation();

  const toggle  = e.currentTarget;
  const content = toggle.nextElementSibling;
  
  if (content && content.classList.contains('mobile-dropdown-content')) {
    content.classList.toggle('open');
    toggle.classList.toggle('active');
  }
}


/* ====== FORM CHIPS ====== */
function selectChip(el) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}


/* ====== FORM SUBMIT ====== */
function handleSubmit() {
  const fname   = document.getElementById('fname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!fname || !email || !message) {
    alert('Please fill in your name, email, and message before sending.');
    return;
  }

  document.getElementById('successMsg').style.display = 'block';
  ['fname', 'lname', 'email', 'phone', 'country', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
  }, 5000);
}