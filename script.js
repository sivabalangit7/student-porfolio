// Custom cursor plus reveal effects
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

window.addEventListener('mousemove', e => {
  const x = e.clientX;
  const y = e.clientY;
  if (cursor) cursor.style.transform = `translate(${x}px, ${y}px)`;
  if (ring) ring.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener('mouseover', e => {
  const target = e.target;
  if (target instanceof HTMLElement && (target.closest('a') || target.closest('button'))) {
    cursor?.classList.add('hovering');
    ring?.classList.add('hovering');
  }
});

window.addEventListener('mouseout', e => {
  const target = e.target;
  if (target instanceof HTMLElement && (target.closest('a') || target.closest('button'))) {
    cursor?.classList.remove('hovering');
    ring?.classList.remove('hovering');
  }
});

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => io.observe(el));

if (!cursor || !ring) {
  console.warn('Cursor elements missing in DOM.');
}

