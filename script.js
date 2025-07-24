// Initialize EmailJS
(function(){
    emailjs.init("Tojo1ys_IV6ZVDLmf");
})();

// Animazioni allo scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Aggiungi parallasse e pulse per i titoli
      addParallaxEffect(entry.target);
      addPulseEffect(entry.target);
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { 
  threshold: 0.2, // Aumentato per attivare leggermente dopo
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.section').forEach((section) => {
  observer.observe(section);
});

// Smooth scrolling per anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Effetto scintilla potenziato sui link
const sparkColors = ['#00ffff', '#ff00cc', '#ffff00']; // Colori dal tuo CSS
document.querySelectorAll('.neon-link, nav a').forEach(link => {
  link.addEventListener('mouseover', (e) => {
    if (document.body.classList.contains('sobrio-mode')) return;

    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.position = 'absolute';
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.background = sparkColors[Math.floor(Math.random() * sparkColors.length)];
    spark.style.borderRadius = '50%';
    spark.style.pointerEvents = 'none';
    spark.style.left = `${e.offsetX}px`;
    spark.style.top = `${e.offsetY}px`;
    spark.style.boxShadow = `0 0 8px ${spark.style.background}`;
    spark.style.animation = 'sparkle 0.6s ease-out';
    link.appendChild(spark);

    // Aggiungi una scia
    const trail = document.createElement('span');
    trail.className = 'spark-trail';
    trail.style.position = 'absolute';
    trail.style.width = '10px';
    trail.style.height = '2px';
    trail.style.background = `linear-gradient(90deg, ${spark.style.background}, transparent)`;
    trail.style.left = `${e.offsetX - 5}px`;
    trail.style.top = `${e.offsetY}px`;
    trail.style.animation = 'trail 0.4s ease-out';
    link.appendChild(trail);

    setTimeout(() => {
      spark.remove();
      trail.remove();
    }, 600);
  });
});

// Stile per scintilla e scia
const style = document.createElement('style');
style.innerHTML = `
  @keyframes sparkle {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes trail {
    0% { transform: translateX(0); opacity: 0.7; }
    100% { transform: translateX(20px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Effetto parallasse con rotazione
function addParallaxEffect(section) {
  if (document.body.classList.contains('sobrio-mode')) return;

  const handleMouseMove = (e) => {
    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = (e.clientX - centerX) * 0.03; // Movimento più pronunciato
    const moveY = (e.clientY - centerY) * 0.03;
    const rotate = (e.clientX - centerX) * 0.005; // Rotazione max 2°
    section.style.transform = `translateY(0) translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
  };

  section.addEventListener('mousemove', handleMouseMove);
  section.addEventListener('mouseleave', () => {
    section.style.transform = 'translateY(0)';
  }, { once: true });
}

// Effetto pulse sui titoli
function addPulseEffect(section) {
  if (document.body.classList.contains('sobrio-mode')) return;

  const title = section.querySelector('.section-title');
  if (title) {
    title.style.animation = 'pulse 1.5s ease-in-out 2';
    setTimeout(() => {
      title.style.animation = ''; // Rimuove dopo 2 cicli
    }, 3000);
  }
}

// Stile per il pulse
const pulseStyle = document.createElement('style');
pulseStyle.innerHTML = `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(pulseStyle);

// Toggle GIF/Foto
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

// Gestione Slideshow con dissolvenza
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

  // Aggiungi evento zoom su hover
  document.querySelectorAll('.slide img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      if (!document.body.classList.contains('sobrio-mode')) {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease';
      }
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });

  showSlides();
}

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
      slide.style.opacity = '1';
      if (!document.body.classList.contains('sobrio-mode')) {
        slide.style.filter = `hue-rotate(${Math.random() * 60}deg)`;
      }
    } else {
      slide.style.display = 'none';
      slide.style.opacity = '0';
    }
  });
  
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 7000); // 7s per un ritmo vivace
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

// Toggle Fancy Mode
const toggleFancyModeButton = document.getElementById('toggleFancyMode');
if (toggleFancyModeButton) {
  toggleFancyModeButton.addEventListener('click', () => {
    document.body.classList.toggle('sobrio-mode');
    toggleFancyModeButton.textContent = document.body.classList.contains('sobrio-mode') 
      ? 'Toggle Fancy Mode' 
      : 'Toggle Normal Mode';
    // Ripristina filtri e trasformazioni
    if (document.body.classList.contains('sobrio-mode')) {
      document.querySelectorAll('.slide').forEach(slide => {
        slide.style.filter = '';
        slide.style.transform = '';
      });
      document.querySelectorAll('.section-title').forEach(title => {
        title.style.animation = '';
      });
      document.querySelectorAll('.section').forEach(section => {
        section.style.transform = 'translateY(0)';
      });
    }
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

// Form Contatto
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
        'service_hqrzjdm',
        'template_uq6fkln',
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

// Navigazione mobile
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if(window.innerWidth < 768) {
      document.querySelector('nav ul').classList.remove('active');
      document.querySelector('.hamburger').textContent = '☰';
    }
  });
});
