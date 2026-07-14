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

// ==================== SEQUENTIAL FRACTAL OVERLAY ====================
let idleTimer;
let isFractalActive = false;
let fractalCanvas = null;
let currentFractalIndex = 0;
const fractalTypes = ['mandelbrot', 'julia', 'hyperbolic'];

function createFractalCanvas() {
  if (fractalCanvas) return fractalCanvas;
  fractalCanvas = document.createElement('canvas');
  fractalCanvas.id = 'fractal-overlay';
  fractalCanvas.style.position = 'fixed';
  fractalCanvas.style.top = '0';
  fractalCanvas.style.left = '0';
  fractalCanvas.style.width = '100%';
  fractalCanvas.style.height = '100%';
  fractalCanvas.style.zIndex = '9998';
  fractalCanvas.style.opacity = '0';
  fractalCanvas.style.transition = 'opacity 2s ease';
  fractalCanvas.style.pointerEvents = 'none';
  fractalCanvas.style.mixBlendMode = 'multiply';
  fractalCanvas.style.filter = 'contrast(0.9) brightness(0.85)'; // Slightly less dark
  document.body.appendChild(fractalCanvas);
  return fractalCanvas;
}

function drawFractal(canvas, type) {
  const ctx = canvas.getContext('2d');
  const w = window.innerWidth;
  const h = window.innerHeight;
 
  canvas.width = w;
  canvas.height = h;
  const time = Date.now() / 1000;
  const maxIter = 70;

  for (let x = 0; x < w; x += 3) {
    for (let y = 0; y < h; y += 3) {
      let cx, cy, hueOffset = 0;

      if (type === 'mandelbrot') {
        cx = (x - w * 0.5) / (w * 0.27) - 0.68;
        cy = (y - h * 0.5) / (w * 0.27);
        hueOffset = 12;
      }
      else if (type === 'julia') {
        cx = (x - w * 0.5) / (w * 0.33);
        cy = (y - h * 0.5) / (w * 0.33);
        const cReal = -0.79 + Math.sin(time * 0.12) * 0.08;
        const cImag = 0.15 + Math.cos(time * 0.1) * 0.07;
       
        let zx = cx, zy = cy;
        let iter = 0;
        while (zx*zx + zy*zy < 4 && iter < maxIter) {
          const temp = zx*zx - zy*zy + cReal;
          zy = 2*zx*zy + cImag;
          zx = temp;
          iter++;
        }
        const color = (iter * 6 + time * 20) % 360;
        ctx.fillStyle = `hsla(${color}, 72%, 52%, 0.65)`; // A bit brighter
        ctx.fillRect(x, y, 3, 3);
        continue;
      }
      else { // hyperbolic
        cx = (x - w * 0.5) / (w * 0.26);
        cy = (y - h * 0.5) / (w * 0.26);
        hueOffset = 165;
      }

      let zx = 0, zy = 0;
      let iter = 0;
      while (zx * zx + zy * zy < 4 && iter < maxIter) {
        const temp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = temp;
        iter++;
      }

      if (iter < maxIter) {
        const hue = (iter * 8 + time * 14 + hueOffset) % 360;
        ctx.fillStyle = `hsla(${hue}, 75%, 46%, 0.6)`; // More present but still moody
        ctx.fillRect(x, y, 3, 3);
      }
    }
  }
}

function startFractal() {
  if (isFractalActive) return;
  isFractalActive = true;
  const canvas = createFractalCanvas();
  const currentType = fractalTypes[currentFractalIndex];
 
  canvas.style.opacity = '0.37';           // Increased a bit
  drawFractal(canvas, currentType);
  currentFractalIndex = (currentFractalIndex + 1) % 3;
}

function stopFractal() {
  if (!isFractalActive) return;
  isFractalActive = false;
  if (fractalCanvas) {
    fractalCanvas.style.opacity = '0';
  }
}

function resetIdleTimer() {
  stopFractal();
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startFractal, 3000);
}
// ==================== DETECT TOUCH DEVICES ====================
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
    "https://i.imgur.com/B31j1Ow.jpg",
    "https://i.imgur.com/HGPUVRV.jpg",
    "https://i.imgur.com/H3BPatM.jpg",
    "https://i.imgur.com/xQgwxyu.jpg",
    "https://i.imgur.com/PNI9ayY.jpg"
  ];

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

// Toggle Fancy Mode + Hamburger
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

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: contactForm.querySelector('input[name="name"]').value,
      email: contactForm.querySelector('input[name="email"]').value,
      message: contactForm.querySelector('textarea[name="message"]').value
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

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();

  if (!isTouchDevice()) {
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('mousedown', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);
    
    resetIdleTimer();
  }
});
