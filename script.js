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
  rootMargin: "0px 0px -100px 0px"
});

document.querySelectorAll('.section').forEach((section) => {
  observer.observe(section);
});

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
  setTimeout(showSlides, 5000);
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

// Effetti casuali ottimizzati
const elements = document.querySelectorAll('*');
setInterval(() => {
  elements.forEach(el => {
    if (Math.random() > 0.98) {
      el.style.transform = `rotate(${Math.random() * 0.2 - 0.1}deg)`;
      el.style.filter = `hue-rotate(${Math.random() * 90}deg)`;
    }
  });
}, 200);

// Toggle Fancy Mode
const toggleFancyModeButton = document.getElementById('toggleFancyMode');
toggleFancyModeButton.addEventListener('click', () => {
  document.body.classList.toggle('sobrio-mode');
  toggleFancyModeButton.textContent = document.body.classList.contains('sobrio-mode') 
    ? 'Toggle Fancy Mode' 
    : 'Toggle Normal Mode';
  
  // Aggiorna il tema dell'iframe di Lichess in base alla modalità
  const chessPuzzleIframe = document.getElementById('chess-puzzle');
  if (chessPuzzleIframe) {
    const isSobrio = document.body.classList.contains('sobrio-mode');
    chessPuzzleIframe.src = `https://lichess.org/training/frame?theme=${isSobrio ? 'dark' : 'cyber'}&bg=${isSobrio ? 'dark' : 'cyber'}`;
  }
});

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
      document.querySelector('nav ul').style.display = 'none';
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
