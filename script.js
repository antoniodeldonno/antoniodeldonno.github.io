// Initialize EmailJS
(function() {
  emailjs.init("Tojo1ys_IV6ZVDLmf");
})();

// Utility: Debounce function to optimize event handlers
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

// Scroll Animations with Staggered Effects
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (!isTouchDevice()) addParallaxEffect(entry.target); // Disable parallax on touch
      addPulseEffect(entry.target);
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: "0px 0px -30px 0px"
});

// Observe sections with preloading
document.querySelectorAll('.section').forEach(section => {
  section.style.willChange = 'opacity, transform';
  observer.observe(section);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth'
      });
    }
  });
});

// Spark Effect on Links
const sparkColors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-yellow)'];
function addSparkEffect(link) {
  const createSpark = (e) => {
    if (document.body.classList.contains('sobrio-mode')) return;
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.position = 'absolute';
    spark.style.width = '5px';
    spark.style.height = '5px';
    spark.style.background = sparkColors[Math.floor(Math.random() * sparkColors.length)];
    spark.style.borderRadius = '50%';
    spark.style.pointerEvents = 'none';
    const offsetX = e.offsetX || (e.touches && e.touches[0].clientX - link.getBoundingClientRect().left) || 0;
    const offsetY = e.offsetY || (e.touches && e.touches[0].clientY - link.getBoundingClientRect().top) || 0;
    spark.style.left = `${offsetX}px`;
    spark.style.top = `${offsetY}px`;
    spark.style.boxShadow = `0 0 6px ${spark.style.background}`;
    spark.style.animation = 'sparkle 0.5s ease-out';
    link.appendChild(spark);
    setTimeout(() => spark.remove(), 500);
  };

  link.addEventListener('mouseover', createSpark);
  link.addEventListener('touchstart', createSpark, { passive: true });
}

document.querySelectorAll('.neon-link, nav a').forEach(addSparkEffect);

// Animation Styles with Reduced Motion Support
const animationStyle = document.createElement('style');
animationStyle.innerHTML = `
  @keyframes sparkle {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.03); opacity: 0.95; }
    100% { transform: scale(1); opacity: 1; }
  }
  .section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .section.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .section, .section-title, .slide, .spark {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  }
`;
document.head.appendChild(animationStyle);

// Parallax Effect (Desktop Only)
function addParallaxEffect(section) {
  const handleMouseMove = debounce((e) => {
    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * 0.005;
    const moveY = (e.clientY - centerY) * 0.005;
    section.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }, 5);
  section.addEventListener('mousemove', handleMouseMove);
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'translate(0, 0)';
  }, { once: true });
}

// Pulse Effect
function addPulseEffect(section) {
  if (document.body.classList.contains('sobrio-mode')) return;
  const title = section.querySelector('.section-title');
  if (title) {
    title.style.animation = 'pulse 1.5s ease-in-out 1';
    setTimeout(() => title.style.animation = '', 1500);
  }
}

// GIF/Photo Toggle
const gifToggle = document.getElementById('gif-toggle');
if (gifToggle) {
  gifToggle.addEventListener('click', () => {
    const gifImage = document.getElementById('gif-image');
    const photoImage = document.getElementById('photo-image');
    gifImage.style.display = gifImage.style.display === 'none' ? 'block' : 'none';
    photoImage.style.display = photoImage.style.display === 'none' ? 'block' : 'none';
  });
}

// Slideshow with Crossfade and Touch Support
let slideIndex = 0;
const imgurSlides = document.getElementById('imgur-slides');

function loadImgurPhotos() {
  const imgurPhotoUrls = [
    'https://drscdn.500px.org/photo/1107053312/q%3D80_m%3D600/v2?sig=0a64a02ac77777737f74e5d7f0ad1f16f0586b85095c252cb8a35d0c1182451c',
    'https://drscdn.500px.org/photo/1107053310/q%3D80_m%3D600/v2?sig=93837c665eda92f6b2393148b469f7f997adbd13e8238076b09f4236e9161cb9',
    'https://drscdn.500px.org/photo/1106525925/q%3D80_m%3D600/v2?sig=85b3730a58fe349958d91a9df9e549e9d08844d1d894c20e0ce9e4e6207510ea',
    'https://drscdn.500px.org/photo/1100494818/q%3D80_m%3D600/v2?sig=8736ed36f16ca11f2f79383663bbd8ba5da21ba698dffa3e6307f3a2afa05e20',
    'https://drscdn.500px.org/photo/1095383565/q%3D80_m%3D600/v2?sig=082a17336c987e693b6a4d3a46b4dcd669b95e4782e1790d60322aa93bc01690'
  ];

  // Preload first image
  const preloadLink = document.createElement('link');
  preloadLink.rel = 'preload';
  preloadLink.as = 'image';
  preloadLink.href = imgurPhotoUrls[0];
  document.head.appendChild(preloadLink);

  if (imgurPhotoUrls.length === 0) {
    imgurSlides.innerHTML = '<p>No photos specified. Please add Imgur URLs in the script.</p>';
    return;
  }

  imgurPhotoUrls.forEach((url, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `<img src="${url}" alt="Photo ${index + 1}" class="hologram" loading="lazy">`;
    imgurSlides.appendChild(slide);
  });

  document.querySelectorAll('.slide img').forEach(img => {
    const handleInteraction = () => {
      if (!document.body.classList.contains('sobrio-mode')) {
        img.style.transform = 'scale(1.05)';
        img.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
      }
    };
    const resetInteraction = () => {
      img.style.transform = 'scale(1)';
      img.style.filter = '';
    };
    img.addEventListener('mouseenter', handleInteraction);
    img.addEventListener('touchstart', handleInteraction, { passive: true });
    img.addEventListener('mouseleave', resetInteraction);
    img.addEventListener('touchend', resetInteraction, { passive: true });
  });

  showSlides();
}

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;
  slides.forEach((slide, index) => {
    slide.style.display = 'block';
    slide.classList.toggle('active', index === slideIndex);
  });
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 6000);
}

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

loadImgurPhotos();

// Sticky Header
const header = document.querySelector('header');
const handleScroll = debounce(() => {
  if (window.scrollY > 100) {
    header.classList.add('shrunk');
  } else {
    header.classList.remove('shrunk');
  }
}, 10); // Slightly increased for mobile stability

window.addEventListener('scroll', handleScroll, { passive: true });

// Toggle Fancy Mode
const toggleFancyModeButton = document.getElementById('toggleFancyMode');
if (toggleFancyModeButton) {
  toggleFancyModeButton.addEventListener('click', () => {
    document.body.classList.toggle('sobrio-mode');
    toggleFancyModeButton.textContent = document.body.classList.contains('sobrio-mode') 
      ? 'Enable Fancy Mode' 
      : 'Enable Normal Mode';
    document.querySelectorAll('.slide').forEach(slide => {
      slide.style.filter = '';
      slide.style.transform = '';
    });
    document.querySelectorAll('.section-title').forEach(title => {
      title.style.animation = '';
    });
    document.querySelectorAll('.section').forEach(section => {
      section.style.transform = 'translate(0, 0)';
    });
  });
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
    hamburger.textContent = navUl.classList.contains('active') ? '✖' : '☰';
  });
}

// Contact Form
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
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error. Please check your network.');
    }
  });
}

// Mobile Navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navUl.classList.remove('active');
      hamburger.textContent = '☰';
    }
  });
});
