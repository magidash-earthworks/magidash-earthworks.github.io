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

document.querySelector('#lead-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const project = String(formData.get('project') || '').trim();
  const message = String(formData.get('message') || '').trim();

  const whatsappMessage = [
    'שלום, אשמח לקבל הצעת מחיר עבור עבודה.',
    '',
    `שם: ${name}`,
    `טלפון: ${phone}`,
    `סוג הפרויקט: ${project}`,
    `פרטים: ${message || 'לא נמסרו פרטים נוספים'}`,
  ].join('\n');

  form.querySelector('.form-status').textContent = 'מעבירים אתכם לוואטסאפ להשלמת השליחה…';
  window.location.href = `https://wa.me/972538218845?text=${encodeURIComponent(whatsappMessage)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
