// script.js
// Basic interactivity and form handling.
// Customize / wire to real APIs (Stripe, Mailgun, Airtable, Firebase) when ready.

document.addEventListener('DOMContentLoaded', () => {
  // small runtime values
  document.getElementById('thisYear').textContent = new Date().getFullYear();

  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle && navToggle.addEventListener('click', () => {
    const opened = navMenu.classList.toggle('mobile-open');
    navToggle.setAttribute('aria-expanded', String(opened));
  });

  // Sample events (could be replaced by API)
  const events = [
    { date: '2025-11-22', title: 'Community 3-on-3 Tournament', location: 'Al Mamzar Court' },
    { date: '2025-12-06', title: 'Holiday Skills Clinic', location: 'Port de La Mer Sports Hall' },
    { date: '2026-01-15', title: 'Mentor Meet & Greet', location: 'Community Center' }
  ];

  const eventsList = document.getElementById('eventsList');
  events.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${formatDate(e.date)}</strong> — ${e.title} <span class="muted"> · ${e.location}</span>`;
    eventsList.appendChild(li);
  });

  // Donation form basic flow (demo)
  const donationForm = document.getElementById('donationForm');
  donationForm && donationForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = document.getElementById('donorName').value.trim();
    const email = document.getElementById('donorEmail').value.trim();
    const amount = Number(document.getElementById('donorAmount').value);

    if (!name || !validateEmail(email) || amount < 5) {
      alert('Please provide valid name, email and an amount >= $5.');
      return;
    }

    // For now: show a success message. Replace with payment provider redirect.
    alert(`Thanks ${name}! We received your support intent for $${amount}. We'll contact ${email} with payment options.`);
    donationForm.reset();
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !validateEmail(email) || message.length < 6) {
      alert('Please complete the form with a valid message.');
      return;
    }
    alert(`Thanks ${name}! Your message has been received — we'll reply to ${email}.`);
    contactForm.reset();
  });

  // Sample donate button behavior
  document.getElementById('donateBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    // Link to payment gateway in real deployment
    alert('Demo donation: use the donation form on the right or integrate Stripe/PayPal for live payments.');
  });

  document.getElementById('sponsorBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'mailto:partnerships@hoopsforhope.org?subject=Sponsor%20opportunity';
  });
});

// Helpers
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}