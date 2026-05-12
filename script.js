// Sidebar toggle (mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
}
function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
}
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', openSidebar);
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

// Sidebar nav active link tracking
const sections = document.querySelectorAll('section[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
function updateActiveLink() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  sidebarLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Close sidebar on link click (mobile)
sidebarLinks.forEach(a => {
  a.addEventListener('click', () => {
    closeSidebar();
  });
});

// Level tabs
document.querySelectorAll('.level-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const parent = tab.closest('section');
    parent.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.level-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', (e) => {
    // 如果点击的是链接，不阻止默认行为
    if (e.target.tagName === 'A') return;
    item.classList.toggle('open');
  });
});

// Easter egg toggle
document.querySelectorAll('.egg-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // 如果点击的是链接，不阻止默认行为
    if (e.target.tagName === 'A') return;
    card.classList.toggle('expanded');
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
