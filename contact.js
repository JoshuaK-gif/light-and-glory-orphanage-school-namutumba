 const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Hamburger / Drawer
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('backdrop');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    backdrop.classList.add('visible');
    setTimeout(() => backdrop.classList.add('open'), 10);
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(() => backdrop.classList.remove('visible'), 380);
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close drawer on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Form chips
  function selectChip(el) {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }

  // Form submit
  function handleSubmit() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!fname || !email || !message) {
      alert('Please fill in your name, email, and message before sending.');
      return;
    }
    document.getElementById('successMsg').style.display = 'block';
    ['fname','lname','email','phone','country','message'].forEach(id => {
      document.getElementById(id).value = '';
    });
    setTimeout(() => { document.getElementById('successMsg').style.display = 'none'; }, 5000);
  }
