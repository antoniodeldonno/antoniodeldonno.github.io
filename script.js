// Initialize EmailJS
(function() {
  emailjs.init("Tojo1ys_IV6ZVDLmf");
})();

// Utility: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Detect touch devices
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetElement = document.querySelector(anchor.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== CAROUSEL ====================
let slideIndex = 0;
let slideInterval = null;

function initSlideshow() {
  const container = document.getElementById('slides-container');
  const dotsContainer = document.getElementById('dots-container');
  
  if (!container) return;

  let photoUrls = [
    "https://i.imgur.com/VdB2OMP.jpg",
    "https://i.imgur.com/ohPZApS.jpg",
    "https://i.imgur.com/bxD6pD0.jpg",
    "https://i.imgur.com/ip3Qsdi.jpg",
    "https://i.imgur.com/zvoTiYG.jpg",
    "https://i.imgur.com/OXL4pyn.jpg",
    "https://i.imgur.com/HOKuPTI.jpg",
    "https://i.imgur.com/bHoP4az.jpg",
    "https://i.imgur.com/ylkowuA.jpg",
    "https://i.imgur.com/ZkdXs0R.jpg",
    "https://i.imgur.com/OWYlyn6.jpg",
    "https://i.imgur.com/Ci4Snrl.jpg",
    "https://i.imgur.com/nS46GNX.jpg",
    "https://i.imgur.com/owE5tfB.jpg",
    "https://i.imgur.com/MvDc1ev.jpg",
    "https://i.imgur.com/nKaF7eg.jpg",
    "https://i.imgur.com/Po9zUVQ.jpg",
    "https://i.imgur.com/B31j1Ow.jpg"
  ];

  // Mescola l'ordine delle foto casualmente
  photoUrls = photoUrls.sort(() => Math.random() - 0.5);

  container.innerHTML = '';
  dotsContainer.innerHTML = '';

  photoUrls.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = `slide ${i === 0 ? 'active' : ''}`;
    slide.innerHTML = `<img src="${url}" alt="Photo ${i+1}" loading="lazy">`;
    container.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = `dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  document.querySelector('.prev')?.addEventListener('click', () => goToSlide(slideIndex - 1));
  document.querySelector('.next')?.addEventListener('click', () => goToSlide(slideIndex + 1));

  startAutoplay();
}

function goToSlide(n) {
  clearInterval(slideInterval);
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  if (n >= slides.length) n = 0;
  if (n < 0) n = slides.length - 1;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[n].classList.add('active');
  dots[n].classList.add('active');

  slideIndex = n;
  startAutoplay();
}

function startAutoplay() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    goToSlide(slideIndex + 1);
  }, 5000);
}

// Toggle Fancy Mode, Hamburger, Contact Form (mantieni le tue funzioni originali)
const toggleBtn = document.getElementById('toggleFancyMode');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('sobrio-mode');
    toggleBtn.textContent = document.body.classList.contains('sobrio-mode') ? 'Enable Fancy Mode' : 'Enable Normal Mode';
  });
}

const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburger.textContent = navUl.classList.contains('active') ? '✖' : '☰';
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    try {
      const response = await emailjs.send('service_hqrzjdm', 'template_uq6fkln', formData);
      if (response.status === 200) {
        alert('Message sent successfully!');
        contactForm.reset();
      }
    } catch (err) {
      alert('Connection error.');
    }
  });
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
});
