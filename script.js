///===== AOS =====
AOS.init({
    duration: 1000, // durasi animasi dalam ms
    once: false     // animasi hanya muncul sekali (bisa false jika ingin animasi berulang)
  });

///===== TOGGLE HAMBURGER =====
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle menu when hamburger is clicked
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent triggering outside click
  mobileMenu.classList.toggle('hidden');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const isClickInside = menuBtn.contains(e.target) || mobileMenu.contains(e.target);
  if (!isClickInside) {
    mobileMenu.classList.add('hidden');
  }
});


///===== AUDIO =====

const bgMusic = document.getElementById('bg-music');
const toggleBtn = document.getElementById('toggle-mute');
const icon = toggleBtn.querySelector('i');

// Mulai musik saat user berinteraksi pertama kali
document.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch((e) => {
      console.log('Autoplay ditolak oleh browser:', e);
    });
  }
}, { once: true }); // hanya sekali saja

// Toggle mute/unmute
toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  bgMusic.muted = !bgMusic.muted;
  icon.className = bgMusic.muted
    ? 'bi bi-volume-mute-fill text-xl'
    : 'bi bi-volume-up-fill text-xl';
});
