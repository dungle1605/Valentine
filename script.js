// Floating Hearts Background Animation
function createFloatingHearts() {
  const heartsContainer = document.querySelector('.hearts-bg');
  const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💞'];

  function addHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';

    heartsContainer.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
      heart.remove();
    }, 20000);
  }

  // Create initial hearts
  for (let i = 0; i < 15; i++) {
    setTimeout(addHeart, i * 1000);
  }

  // Continue adding hearts periodically
  setInterval(addHeart, 2000);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });

  // Observe other fade-in elements
  document.querySelectorAll('.fade-in').forEach(item => {
    observer.observe(item);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax effect for hero section
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = 1 - (scrolled / 600);
    }
  });
}

// Add sparkle effect on timeline items
function addSparkleEffect() {
  document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function (e) {
      createSparkle(e.currentTarget);
    });
  });
}

function createSparkle(element) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    animation: sparkleFloat 1s ease-out forwards;
    box-shadow: 0 0 10px var(--accent-glow);
  `;

  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';

  element.style.position = 'relative';
  element.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1000);
}

// Add CSS for sparkle animation dynamically
function addSparkleAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleFloat {
      0% {
        transform: translateY(0) scale(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-30px) scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Counter animation for dates or numbers
function animateNumbers() {
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateNumber(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
  });
}

function animateNumber(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Mouse trail effect
let mouseTrailEnabled = false;

function initMouseTrail() {
  if (!mouseTrailEnabled) return;

  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      transform: translate(-50%, -50%);
      animation: trailFade 0.5s ease-out forwards;
    `;

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes trailFade {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
      }
      100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Splash Screen and Music Auto-Start
function initSplashScreen() {
  const splashScreen = document.getElementById('splashScreen');
  const enterBtn = document.getElementById('enterBtn');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicText = musicToggle.querySelector('.music-text');

  let isPlaying = false;

  // Function to start music
  function startMusic() {
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        musicToggle.classList.add('playing');
        musicText.textContent = 'Pause Music';
        isPlaying = true;
        console.log('🎵 Music started playing!');
      }).catch(error => {
        console.log('⚠️ Could not play music:', error);
        musicToggle.classList.remove('playing');
        musicText.textContent = 'Play Music';
        isPlaying = false;
      });
    }
  }

  // Enter button click - remove splash and start music
  enterBtn.addEventListener('click', () => {
    // Fade out splash screen
    splashScreen.classList.add('hidden');

    // Start music immediately
    startMusic();

    // Remove splash screen from DOM after animation
    setTimeout(() => {
      splashScreen.remove();
    }, 1000);
  });

  // Music toggle button functionality
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicText.textContent = 'Play Music';
      isPlaying = false;
    } else {
      startMusic();
    }
  });

  // Handle music end (shouldn't happen with loop, but just in case)
  bgMusic.addEventListener('ended', () => {
    musicToggle.classList.remove('playing');
    musicText.textContent = 'Play Music';
    isPlaying = false;
  });

  // Save preference when music state changes
  bgMusic.addEventListener('play', () => {
    localStorage.setItem('valentineMusicPlaying', 'true');
    isPlaying = true;
  });

  bgMusic.addEventListener('pause', () => {
    localStorage.setItem('valentineMusicPlaying', 'false');
    isPlaying = false;
  });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  createFloatingHearts();
  initScrollAnimations();
  initSmoothScroll();
  initParallax();
  addSparkleEffect();
  addSparkleAnimation();
  animateNumbers();
  initMouseTrail();

  console.log('💕 Valentine website loaded with love! 💕');
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
