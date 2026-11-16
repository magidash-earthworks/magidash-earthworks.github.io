const menuButton = document.querySelector('.menuButton');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const WHATSAPP_NUMBER = '972538218845';

const LEAD_EMAIL = 'yosi081067@gmail.com';

const buildLeadMessage = (form) => {
  const data = new FormData(form);
  const get = (key) => {
    const value = data.get(key);
    return typeof value === 'string' ? value : '';
  };
  return [
    'שלום מגידש, אשמח לקבל הצעת מחיר.',
    `שם: ${get('name')}`,
    `טלפון: ${get('phone')}`,
    `סוג עבודה: ${get('service')}`,
    `פרטים: ${get('details') || 'לא צוינו'}`,
  ].join('\n');
};

document.querySelector('#lead-email').addEventListener('click', () => {
  const form = document.querySelector('#lead-form');
  if (!form.reportValidity()) return;
  const subject = 'פנייה מהאתר - בקשה להצעת מחיר';
  window.location.href = `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLeadMessage(form))}`;
});

document.querySelector('#lead-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = buildLeadMessage(form);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
