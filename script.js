// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// scrollspy
const navLinks = document.querySelectorAll('[data-nav]');
const sections = ['work-experience', 'recent-works', 'softwares', 'testimonials'].map(id => document.getElementById(id));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`[data-nav][href="#${id}"]`);
    if (entry.isIntersecting && link) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// mobile menu
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// contact form -> opens the visitor's email app with a pre-filled message
// (this is a static, no-backend site, so this is the reliable way to make "send" actually work)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector('.send-btn');
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailtoLink = `mailto:khuzeemajofficial@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    const originalText = btn.textContent;
    btn.textContent = 'Opening your email app…';
    setTimeout(() => { btn.textContent = originalText; }, 3000);
  });
}
