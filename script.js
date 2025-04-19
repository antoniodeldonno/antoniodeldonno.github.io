// Initialize EmailJS with your public key
(function(){
    emailjs.init("Tojo1ys_IV6ZVDLmf"); // Replace with your EmailJS public key
})();

// Animazioni allo scroll ottimizzate
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.willChange = 'auto';
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px" // Adjusted for smoother triggering
});

document.querySelectorAll('.section').forEach((section) => {
  observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor jump
    const targetId = anchor.getAttribute('href'); // e.g., "#about"
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80; // Adjust based on header height (~80px)
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Native smooth scrolling
      });
    }
  });
});

// Fractal hallucination effect with sequence
const fractalOverlay = document.createElement('canvas');
fractalOverlay.className = 'fractal-overlay';
document.body.appendChild(fractalOverlay);

function resizeCanvas() {
  fractalOverlay.width = window.innerWidth;
  fractalOverlay.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const ctx = fractalOverlay.getContext('2d');

// Fractal drawing functions
function drawMandelbrot(t, zoomLevel = 0.005, cxOffset = 0, cyOffset = 0) {
  ctx.clearRect(0, 0, fractalOverlay.width, fractalOverlay.height);
  const maxIter = 50;
  const offsetX = fractalOverlay.width / 2;
  const offsetY = fractalOverlay.height / 2;

  for (let x = 0; x < fractalOverlay.width; x += 2) {
    for (let y = 0; y < fractalOverlay.height; y += 2) {
      let zx = (x - offsetX) * zoomLevel + cxOffset;
      let zy = (y - offsetY) * zoomLevel + cyOffset;
      let cx = zx;
      let cy = zy;
      let iter = 0;
      let zxx = zx;
      let zyy = zy;

      while (zxx * zxx + zyy * zyy < 4 && iter < maxIter) {
        let temp = zxx * zxx - zyy * zyy + cx;
        zyy = 2 * zxx * zyy + cy;
        zxx = temp;
        iter++;
      }

      if (iter < maxIter) {
        const hue = (iter * 10 + t * 0.1) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.3)`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
}

function drawJulia(t) {
  ctx.clearRect(0, 0, fractalOverlay.width, fractalOverlay.height);
  const maxIter = 50;
  const zoom = 0.005;
  const offsetX = fractalOverlay.width / 2;
  const offsetY = fractalOverlay.height / 2;
  const cx = -0.8 + Math.sin(t * 0.001) * 0.2; // Dynamic Julia parameter
  const cy = 0.156 + Math.cos(t * 0.001) * 0.2;

  for (let x = 0; x < fractalOverlay.width; x += 2) {
    for (let y = 0; y < fractalOverlay.height; y += 2) {
      let zx = (x - offsetX) * zoom;
      let zy = (y - offsetY) * zoom;
      let iter = 0;

      while (zx * zx + zy * zy < 4 && iter < maxIter) {
        let temp = zx * zx - zy * zy + cx;
        zy = 2 * zx * zy + cy;
        zx = temp;
        iter++;
      }

      if (iter < maxIter) {
        const hue = (iter * 10 + t * 0.1) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.3)`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }
}

function drawSierpinskiCarpet(t) {
  ctx.clearRect(0, 0, fractalOverlay.width, fractalOverlay.height);
  const size = Math.min(fractalOverlay.width, fractalOverlay.height) * 0.8;
  const offsetX = (fractalOverlay.width - size) / 2;
  const offsetY = (fractalOverlay.height - size) / 2;

  function drawCarpet(x, y, size, level) {
    if (level === 0) {
      const hue = (t * 0.1) % 360;
      ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.3)`;
      ctx.fillRect(x, y, size, size);
      return;
    }

    const newSize = size / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) continue; // Skip center
        drawCarpet(x + i * newSize, y + j * newSize, newSize, level - 1);
      }
    }
  }

  drawCarpet(offsetX, offsetY, size, 4); // Level 4 for detail
}

function drawDeepMandelbrot(t) {
  // Zoom into a specific region of Mandelbrot set
  const zoomLevel = 0.00005 * (1 + Math.sin(t * 0.001) * 0.5); // Dynamic zoom
  const cxOffset = -0.75; // Interesting region
  const cyOffset = 0.1;
  drawMandelbrot(t, zoomLevel, cxOffset, cyOffset);
}

// Fractal sequence
let fractalTime = 0;
let currentFractal = 0;
const fractalSequence = [
  { time: 7000, draw: drawMandelbrot, name: 'Mandelbrot' },
  { time: 14000, draw: drawJulia, name: 'Julia' },
  { time: 21000, draw: drawSierpinskiCarpet, name: 'Sierpinski Carpet' },
  { time: 28000, draw: drawDeepMandelbrot, name: 'Deep Mandelbrot' }
];

function animateFractal() {
  if (fractalOverlay.classList.contains('active') && !document.body.classList.contains('sobrio-mode')) {
    const fractal = fractalSequence[currentFractal % fractalSequence.length];
    fractal.draw(fractalTime);
    fractalTime += 50;
    requestAnimationFrame(animateFractal);
  }
}

function triggerFractal(index) {
  if (!document.body.classList.contains('sobrio-mode')) {
    currentFractal = index % fractalSequence.length;
    fractalOverlay.classList.add('active');
    animateFractal();
    setTimeout(() => {
      fractalOverlay.classList.remove('active');
    }, 3000); // Visible for 3 seconds
  }
}

// Schedule fractal sequence
setInterval(() => {
  triggerFractal(0); // Mandelbrot at 7s
}, 28000);
setInterval(() => {
  triggerFractal(1); // Julia at 14s
}, 28000);
setInterval(() => {
  triggerFractal(2); // Sierpinski at 21s
}, 28000);
setInterval(() => {
  triggerFractal(3); // Deep Mandelbrot at 28s
}, 28000);

// Trigger immediately to start the cycle
setTimeout(() => triggerFractal(0), 7000);
setTimeout(() => triggerFractal(1), 14000);
setTimeout(() => triggerFractal(2), 21000);
setTimeout(() => triggerFractal(3), 28000);

// Toggle GIF/Foto nella sezione About Me
const gifToggle = document.getElementById('gif-toggle');
const gifImage = document.getElementById('gif-image');
const photoImage = document.getElementById('photo-image');

if(gifToggle) {
  gifToggle.addEventListener('click', () => {
    if(gifImage.style.display === 'none') {
      gifImage.style.display = 'block';
      photoImage.style.display = 'none';
    } else {
      gifImage.style.display = 'none';
      photoImage.style.display = 'block';
    }
  });
}

// Gestione Slideshow Imgur
let slideIndex = 0;
const imgurSlides = document.getElementById('imgur-slides');

function loadImgurPhotos() {
  // Array di URL diretti delle immagini caricate su Imgur
  const imgurPhotoUrls = [
    'https://drscdn.500px.org/photo/1107053312/q%3D80_m%3D600/v2?sig=0a64a02ac77777737f74e5d7f0ad1f16f0586b85095c252cb8a35d0c1182451c',
    'https://drscdn.500px.org/photo/1107053310/q%3D80_m%3D600/v2?sig=93837c665eda92f6b2393148b469f7f997adbd13e8238076b09f4236e9161cb9',
    'https://drscdn.500px.org/photo/1106525925/q%3D80_m%3D600/v2?sig=85b3730a58fe349958d91a9df9e549e9d08844d1d894c20e0ce9e4e6207510ea',
    'https://drscdn.500px.org/photo/1100494818/q%3D80_m%3D600/v2?sig=8736ed36f16ca11f2f79383663bbd8ba5da21ba698dffa3e6307f3a2afa05e20',
    'https://drscdn.500px.org/photo/1095383565/q%3D80_m%3D600/v2?sig=082a17336c987e693b6a4d3a46b4dcd669b95e4782e1790d60322aa93bc01690'
  ];

  if (imgurPhotoUrls.length === 0) {
    imgurSlides.innerHTML = '<p>No photos specified. Please add Imgur URLs in the script.</p>';
    return;
  }

  imgurPhotoUrls.forEach((url, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `<img src="${url}" alt="Photo ${index + 1}" class="hologram">`;
    imgurSlides.appendChild(slide);
  });

  showSlides();
}

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? 'block' : 'none';
    slide.style.filter = `hue-rotate(${Math.random() * 120}deg)`;
  });
  
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 10000); // 10 seconds for slideshow refresh
}

// Pulsanti prev/next manuali
document.querySelector('.prev')?.addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlides();
});

document.querySelector('.next')?.addEventListener('click', () => {
  const slides = document.querySelectorAll('.slide');
  slideIndex = (slideIndex + 1) % slides.length;
  showSlides();
});

// Carica le foto da Imgur
loadImgurPhotos();

// Effetti casuali ottimizzati con glitch potenziati, escludendo nav e link
const glitchElements = document.querySelectorAll('*:not(nav):not(nav *):not(a):not(a *)');
setInterval(() => {
  if (!document.body.classList.contains('sobrio-mode')) {
    glitchElements.forEach(el => {
      if (Math.random() > 0.95) {
        el.style.transform = `rotate(${Math.random() * 0.5 - 0.25}deg) translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        el.style.filter = `hue-rotate(${Math.random() * 180}deg) contrast(${1 + Math.random() * 0.5})`;
        setTimeout(() => {
          el.style.transform = '';
          el.style.filter = '';
        }, 200);
      }
    });
  }
}, 200);

// Toggle Fancy Mode
const toggleFancyModeButton = document.getElementById('toggleFancyMode');
if (toggleFancyModeButton) {
  toggleFancyModeButton.addEventListener('click', () => {
    console.log('Toggle button clicked, current sobrio-mode:', document.body.classList.contains('sobrio-mode'));
    document.body.classList.toggle('sobrio-mode');
    toggleFancyModeButton.textContent = document.body.classList.contains('sobrio-mode') 
      ? 'Toggle Fancy Mode' 
      : 'Toggle Normal Mode';
  });
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');

if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburger.textContent = navUl.classList.contains('active') ? '✖' : '☰';
  });
}

// Gestione Form Contatto con EmailJS
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    
    try {
      const response = await emailjs.send(
        'service_hqrzjdm', // Your service ID
        'template_uq6fkln', // Replace with your EmailJS template ID
        formData
      );
      
      if(response.status === 200) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error. Please check your network.');
    }
  });
}

// Ottimizzazione prestazioni mobile
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if(Math.abs(currentScroll - lastScroll) > 50) {
    document.body.style.setProperty('--scroll-rate', Math.min(1, currentScroll / 500));
    lastScroll = currentScroll;
  }
});

// Pulsanti di navigazione mobile
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if(window.innerWidth < 768) {
      document.querySelector('nav ul').classList.remove('active');
      document.querySelector('.hamburger').textContent = '☰';
    }
  });
});

// Inizializzazione effetti supplementari
document.querySelectorAll('.neon-link').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.animation = 'linkGlow 0.5s alternate infinite';
  });
  
  link.addEventListener('mouseout', () => {
    link.style.animation = '';
  });
});
