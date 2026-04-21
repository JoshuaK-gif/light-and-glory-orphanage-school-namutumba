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


/* ====== MULTI-STEP FORM ====== */
let currentStep = 1;
const totalSteps = 3;

function updateUI() {
  document.querySelectorAll('.form-section').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === currentStep);
  });

  document.querySelectorAll('.step-tab').forEach((t, i) => {
    t.classList.remove('active', 'done');
    if (i + 1 === currentStep) t.classList.add('active');
    if (i + 1 < currentStep)   t.classList.add('done');
    t.querySelector('.tab-num').textContent = i + 1 < currentStep ? '✓' : i + 1;
  });

  document.getElementById('progressFill').style.width = ((currentStep / totalSteps) * 100) + '%';
  document.getElementById('stepCounter').textContent  = `Step ${currentStep} of ${totalSteps}`;

  document.getElementById('backBtn').style.display   = currentStep > 1 ? 'inline-flex' : 'none';
  document.getElementById('nextBtn').style.display   = currentStep < totalSteps ? 'inline-flex' : 'none';
  document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'inline-flex' : 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep1() {
  let ok = true;
  const checks = [
    { id: 'firstName',   err: 'err-firstName',   test: v => v.trim().length > 0 },
    { id: 'lastName',    err: 'err-lastName',    test: v => v.trim().length > 0 },
    { id: 'dob',         err: 'err-dob',         test: v => v.trim().length > 0 },
    { id: 'email',       err: 'err-email',       test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'nationality', err: 'err-nationality', test: v => v.trim().length > 0 },
    { id: 'location',    err: 'err-location',    test: v => v.trim().length > 0 },
  ];
  checks.forEach(c => {
    const el = document.getElementById(c.id);
    const valid = c.test(el.value);
    el.classList.toggle('invalid', !valid);
    document.getElementById(c.err).classList.toggle('show', !valid);
    if (!valid) ok = false;
  });
  return ok;
}

function validateStep2() {
  let ok = true;

  const checked = [...document.querySelectorAll('#rolesGroup input[type="checkbox"]')].some(c => c.checked);
  document.getElementById('err-roles').classList.toggle('show', !checked);
  if (!checked) ok = false;

  const dur = [...document.querySelectorAll('input[name="duration"]')].some(r => r.checked);
  document.getElementById('err-duration').classList.toggle('show', !dur);
  if (!dur) ok = false;

  const skills = document.getElementById('skills').value.trim();
  document.getElementById('skills').classList.toggle('invalid', !skills);
  document.getElementById('err-skills').classList.toggle('show', !skills);
  if (!skills) ok = false;

  const mot = document.getElementById('motivation').value.trim();
  document.getElementById('motivation').classList.toggle('invalid', !mot);
  document.getElementById('err-motivation').classList.toggle('show', !mot);
  if (!mot) ok = false;

  return ok;
}

function buildReview() {
  const roles    = [...document.querySelectorAll('#rolesGroup input:checked')].map(c => c.value).join(', ') || '—';
  const duration = (document.querySelector('input[name="duration"]:checked') || {}).value || '—';

  const rows = [
    ['Full Name',           `${getValue('firstName')} ${getValue('lastName')}`],
    ['Date of Birth',       getValue('dob')],
    ['Gender',              document.getElementById('gender').value || '—'],
    ['Email',               getValue('email')],
    ['Phone',               getValue('phone') || '—'],
    ['Nationality',         getValue('nationality')],
    ['Location',            getValue('location')],
    ['', ''],
    ['Volunteer Role(s)',   roles],
    ['Duration',            duration],
    ['Start Date',          getValue('startDate') || '—'],
    ['Qualification',       document.getElementById('qualification').value || '—'],
    ['Skills & Experience', getValue('skills')],
    ['Motivation',          getValue('motivation')],
  ];

  document.getElementById('reviewBox').innerHTML = rows.map(([k, val]) =>
    k
      ? `<div style="display:flex;gap:12px;border-bottom:1px solid #EEE;padding:6px 0">
           <strong style="min-width:160px;color:#333">${k}</strong>
           <span>${val}</span>
         </div>`
      : `<div style="height:8px"></div>`
  ).join('');
}

function getValue(id) {
  return document.getElementById(id).value;
}

function goNext() {
  if (currentStep === 1 && !validateStep1()) return;
  if (currentStep === 2 && !validateStep2()) return;
  if (currentStep === 2) buildReview();
  currentStep++;
  updateUI();
}

function goBack() {
  currentStep--;
  updateUI();
}

/* ====== SUBMIT WITH WEB3FORMS ====== */
async function submitForm() {
  if (!document.getElementById('agreeCheck').checked) {
    alert('Please confirm that your information is accurate before submitting.');
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  const origHTML  = submitBtn.innerHTML;
  submitBtn.innerHTML = '⏳ Sending…';
  submitBtn.disabled  = true;

  const roles    = [...document.querySelectorAll('#rolesGroup input:checked')].map(c => c.value).join(', ') || '—';
  const duration = (document.querySelector('input[name="duration"]:checked') || {}).value || '—';

  const payload = {
    
    access_key: 'ba218a67-85bc-435d-82d1-670578316173',

   
    cc: 'SECOND_EMAIL@example.com, THIRD_EMAIL@example.com',

    subject:   `New Volunteer Application — ${getValue('firstName')} ${getValue('lastName')}`,
    from_name: `${getValue('firstName')} ${getValue('lastName')}`,

    /* Personal Details */
    'Full Name':     `${getValue('firstName')} ${getValue('lastName')}`,
    'Date of Birth': getValue('dob'),
    'Gender':        document.getElementById('gender').value || '—',
    'Email':         getValue('email'),
    'Phone':         getValue('phone') || '—',
    'Nationality':   getValue('nationality'),
    'Location':      getValue('location'),

    /* Volunteer Details */
    'Volunteer Role(s)':    roles,
    'Duration':             duration,
    'Preferred Start Date': getValue('startDate') || '—',
    'Qualification':        document.getElementById('qualification').value || '—',
    'Skills & Experience':  getValue('skills'),
    'Motivation':           getValue('motivation'),
  };

  try {
    const res    = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(payload),
    });
    const result = await res.json();

    if (result.success) {
      window.location.href = 'volunteer-thankyou.html';
    } else {
      alert('Submission failed: ' + (result.message || 'Unknown error.'));
      submitBtn.innerHTML = origHTML;
      submitBtn.disabled  = false;
    }
  } catch (err) {
    alert('Network error — please check your connection and try again.');
    submitBtn.innerHTML = origHTML;
    submitBtn.disabled  = false;
  }
}

function toggleCheck(el) {
  const isChecked = el.classList.toggle('checked');
  el.querySelector('input[type="checkbox"]').checked = isChecked;
}

function selectRadio(label, groupId) {
  document.querySelectorAll(`#${groupId} .radio-item`).forEach(r => r.classList.remove('selected'));
  label.classList.add('selected');
  label.querySelector('input').checked = true;
}

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('photoImg').src = ev.target.result;
    document.getElementById('photoPreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

updateUI();