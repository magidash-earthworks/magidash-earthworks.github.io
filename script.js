const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#lead-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const project = String(formData.get('project') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const status = form.querySelector('.form-status');
  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  status.textContent = 'שולחים את הפרטים…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/ormegadish@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'שם מלא': name,
        טלפון: phone,
        'סוג הפרויקט': project,
        'פרטי העבודה': message || 'לא נמסרו פרטים נוספים',
        'עמוד מקור': window.location.href,
        _subject: `פנייה חדשה מהאתר — ${project}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'Form submission failed');
    }

    form.reset();
    form.classList.add('sent');
    status.textContent = 'תודה! הפרטים נשלחו בהצלחה ונחזור אליכם בהקדם.';
  } catch (error) {
    console.error('Lead submission failed', error);
    status.textContent = 'לא הצלחנו לשלוח כרגע. אפשר לפנות אלינו ישירות בטלפון או בוואטסאפ.';
    submitButton.disabled = false;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
