// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });

  // Initialize Swiper if on homepage
  if (document.querySelector('.gamesSwiper')) {
    new Swiper('.gamesSwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }
    });
  }

  // Initialize LightGallery if on gallery page
  if (document.getElementById('lightgallery')) {
    lightGallery(document.getElementById('lightgallery'), {
      selector: '.gallery-item',
      plugins: [lgZoom, lgThumbnail],
      speed: 500,
      download: false,
    });

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Toggle animation for hamburger icon
      const spans = this.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }

  // Flip card interaction alternative for touch devices
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  const closeButtons = document.querySelectorAll('.close-btn');

  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const gameCard = this.closest('.game-card-lg');
      const cardInner = gameCard.querySelector('.card-inner');
      cardInner.style.transform = 'rotateY(180deg)';
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const cardInner = this.closest('.card-inner');
      cardInner.style.transform = 'rotateY(0deg)';
    });
  });

  // Rules accordion functionality
  const ruleHeaders = document.querySelectorAll('.rule-header');
  
  ruleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const ruleBody = this.nextElementSibling;
      const toggleIcon = this.querySelector('.toggle-icon');
      
      // Check if the clicked section is already open
      const isActive = ruleBody.classList.contains('active');
      
      // Close all sections
      document.querySelectorAll('.rule-body').forEach(body => {
        body.classList.remove('active');
      });
      
      document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.textContent = '+';
      });
      
      // Open the clicked section if it was closed
      if (!isActive) {
        ruleBody.classList.add('active');
        toggleIcon.textContent = '-';
      }
    });
  });

  // Open first accordion by default
  const firstRuleBody = document.querySelector('.rule-body');
  const firstToggleIcon = document.querySelector('.toggle-icon');
  if (firstRuleBody && firstToggleIcon) {
    firstRuleBody.classList.add('active');
    firstToggleIcon.textContent = '-';
  }

  // Registration modal
  const registerBtn = document.getElementById('registerBtn');
  const registrationModal = document.getElementById('registrationModal');
  const closeModal = document.querySelector('.close-modal');
  const registrationForm = document.getElementById('registrationForm');

  if (registerBtn && registrationModal) {
    registerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      registrationModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    closeModal.addEventListener('click', function() {
      registrationModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
      if (e.target === registrationModal) {
        registrationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Form submission (placeholder - would connect to backend in production)
    if (registrationForm) {
      registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red';
          } else {
            field.style.borderColor = '';
          }
        });
        
        if (isValid) {
          // In a real app, you would send the data to a server here
          alert('Registration submitted successfully!');
          this.reset();
          registrationModal.style.display = 'none';
          document.body.style.overflow = 'auto';
        } else {
          alert('Please fill in all required fields.');
        }
      });
    }
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let isValid = true;
      const requiredFields = this.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // In a real app, you would send the data to a server here
        alert('Your message has been sent successfully!');
        this.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

  // Scroll to top button functionality
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.classList.add('scroll-top-btn');
  scrollTopBtn.innerHTML = '⬆️';
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  // Add scroll style to header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Apply neon glow effect to highlight elements
  document.querySelectorAll('.highlight').forEach(el => {
    el.style.animation = 'glow 2s infinite';
  });
});

// Add additional styles dynamically
const style = document.createElement('style');
style.innerHTML = `
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--gold);
    color: var(--black);
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 99;
    box-shadow: var(--neon-glow);
    transition: all 0.3s ease;
  }
  
  .scroll-top-btn:hover {
    background-color: var(--gold-dark);
    transform: scale(1.1);
  }
  
  .header.scrolled {
    background-color: var(--dark-gray);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .nav-toggle span.active:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .nav-toggle span.active:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle span.active:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
  
  @keyframes glowText {
    0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
    50% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6); }
    100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
  }
`;

document.head.appendChild(style);