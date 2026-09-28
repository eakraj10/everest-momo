// Delivery dialog
const dialog = document.getElementById('delivery-dialog');
let lastTrigger = null;
document.querySelectorAll('[data-delivery]').forEach(btn => btn.addEventListener('click', () => {
  lastTrigger = btn;
  dialog.showModal();
}));
dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  const r = dialog.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
});
dialog.addEventListener('close', () => lastTrigger?.focus());

// Open/closed status (truck hours: every day 11:30–22:00, Pacific time)
const status = document.querySelector('[data-status]');
if (status) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const minutes = +parts.find(p => p.type === 'hour').value * 60 + +parts.find(p => p.type === 'minute').value;
  const open = minutes >= 11 * 60 + 30 && minutes < 22 * 60;
  status.classList.toggle('is-open', open);
  status.querySelector('[data-status-text]').textContent = open ? 'Open now · until 10 PM' : 'Closed now · opens 11:30 AM';
}

// Highlight the current menu section tab
const tabs = document.querySelectorAll('.menu-tabs a');
if (tabs.length && 'IntersectionObserver' in window) {
  const byId = Object.fromEntries([...tabs].map(a => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    tabs.forEach(a => a.classList.remove('is-active'));
    const tab = byId[en.target.id];
    tab.classList.add('is-active');
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }), { rootMargin: '-130px 0px -65% 0px' });
  document.querySelectorAll('.menu-section').forEach(s => io.observe(s));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
