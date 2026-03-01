// ===== MOBILE NAVIGATION TOGGLE =====
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.textContent = '☰';
    });
  });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 12, 16, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.background = 'rgba(10, 12, 16, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll(
  'section > div, .skill-card, .project-card, .stat-card'
);

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealOnScroll.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
      animateSkills.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.setAttribute('data-width', bar.style.width);
  animateSkills.observe(bar);
});

// ===== TYPING EFFECT FOR HERO =====
const typingText = document.querySelector('.typing-text');
if (typingText) {
  const words = ['digital', 'creative', 'modern', 'stunning'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 300;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }

    // Simulate sending
    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      this.reset();
      btn.textContent = 'Send Message ➤';
      btn.disabled = false;
    }, 1500);
  });
}

// ===== NOTIFICATION TOAST =====
function showNotification(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; z-index: 9999;
    padding: 16px 24px; border-radius: 10px; font-size: 14px;
    color: #fff; max-width: 350px; animation: slideIn 0.3s ease;
    background: ${type === 'success' ? 'hsl(150, 80%, 35%)' : 'hsl(0, 70%, 50%)'};
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'hsl(150, 80%, 55%)';
    }
  });
});

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Toast slide-in */
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Mobile nav active state */
.nav-links.active {
  display: flex !important;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid hsl(220, 15%, 16%);
}
