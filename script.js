/* ===============================================
   ELA & KAAN - ULTRA PREMIUM ROMANTIC WEBSITE
   JavaScript - Phase 1 Premium Features
   =============================================== */

// ============ DOM ELEMENTS ============
const loadingScreen = document.getElementById('loadingScreen');
const loadingPercentage = document.getElementById('loadingPercentage');
const skipLoadingBtn = document.getElementById('skipLoading');
const loadingParticlesCanvas = document.getElementById('loadingParticles');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollProgress = document.getElementById('scrollProgress');
const particlesCanvas = document.getElementById('particlesCanvas');
const footerParticlesCanvas = document.getElementById('footerParticles');
const timelineProgress = document.getElementById('timelineProgress');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const galleryGrid = document.getElementById('galleryGrid');
const cursorTrailContainer = document.getElementById('cursorTrailContainer');
const soundToggle = document.getElementById('soundToggle');

// Love Meter Elements
const loveMeterFill = document.getElementById('loveMeterFill');
const lovePercentage = document.getElementById('lovePercentage');
const meterStatus = document.getElementById('meterStatus');
const kissBtn = document.getElementById('kissBtn');
const hugBtn = document.getElementById('hugBtn');
const loveBtn = document.getElementById('loveBtn');
const kissCount = document.getElementById('kissCount');
const hugCount = document.getElementById('hugCount');
const loveCount = document.getElementById('loveCount');
const floatingHeartsContainer = document.getElementById('floatingHeartsContainer');

// ============ GLOBAL STATE ============
let isSoundEnabled = false;
let currentLovePercentage = 0;
let loadingProgress = 0;
let loadingComplete = false;

// ============ PREMIUM LOADING SCREEN ============
document.body.classList.add('loading');

// Loading particles
class LoadingParticleSystem {
    constructor(canvas) {
        if (!canvas) return;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 80; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 330
            });
        }
    }

    animate() {
        if (loadingComplete) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Rotating quotes
const loadingQuotes = document.querySelectorAll('.rotating-quote');
let currentQuoteIndex = 0;

function rotateLoadingQuotes() {
    if (loadingComplete) return;
    loadingQuotes.forEach(q => q.classList.remove('active'));
    currentQuoteIndex = (currentQuoteIndex + 1) % loadingQuotes.length;
    loadingQuotes[currentQuoteIndex].classList.add('active');
}

// Progress animation
function animateLoadingProgress() {
    const progressFill = document.querySelector('.circular-progress .progress-fill');
    const circumference = 2 * Math.PI * 54;

    const interval = setInterval(() => {
        if (loadingProgress >= 100 || loadingComplete) {
            clearInterval(interval);
            completeLoading();
            return;
        }

        loadingProgress += Math.random() * 3 + 1;
        if (loadingProgress > 100) loadingProgress = 100;

        if (loadingPercentage) {
            loadingPercentage.textContent = Math.floor(loadingProgress);
        }

        if (progressFill) {
            const offset = circumference - (loadingProgress / 100) * circumference;
            progressFill.style.strokeDashoffset = offset;
        }
    }, 80);
}

function completeLoading() {
    loadingComplete = true;

    // Confetti explosion
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700']
        });
    }

    setTimeout(() => {
        loadingScreen.classList.add('explode');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.remove('loading');
            initAfterLoading();
        }, 800);
    }, 500);
}

// Skip loading
if (skipLoadingBtn) {
    skipLoadingBtn.addEventListener('click', () => {
        loadingProgress = 100;
        completeLoading();
    });
}

// Initialize loading screen
window.addEventListener('load', () => {
    new LoadingParticleSystem(loadingParticlesCanvas);
    animateLoadingProgress();
    setInterval(rotateLoadingQuotes, 2000);
});

// ============ CURSOR TRAIL ============
const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝'];
let lastCursorTime = 0;

function createCursorHeart(x, y) {
    if (!cursorTrailContainer) return;

    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

    cursorTrailContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
}

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastCursorTime > 100) {
        createCursorHeart(e.clientX, e.clientY);
        lastCursorTime = now;
    }
});

// ============ SOUND SYSTEM ============
if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        soundToggle.querySelector('.sound-on').classList.toggle('hidden', !isSoundEnabled);
        soundToggle.querySelector('.sound-off').classList.toggle('hidden', isSoundEnabled);
    });
}

function playSound(type) {
    if (!isSoundEnabled) return;
    // Sound effects would be loaded here
}

// ============ LOVE METER ============
let kissTotal = 12847;
let hugTotal = 8432;

function updateLoveMeter(value) {
    currentLovePercentage = Math.min(100, currentLovePercentage + value);

    if (lovePercentage) {
        lovePercentage.textContent = currentLovePercentage;
    }

    if (loveMeterFill) {
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (currentLovePercentage / 100) * circumference;
        loveMeterFill.style.strokeDashoffset = offset;
    }

    // Update status message
    if (meterStatus) {
        if (currentLovePercentage >= 100) {
            meterStatus.textContent = '💕 AŞK SEVİYESİ: SONSUZ! ♾️';
            celebrate100Percent();
        } else if (currentLovePercentage >= 75) {
            meterStatus.textContent = '🔥 Aşk patlaması yakın!';
        } else if (currentLovePercentage >= 50) {
            meterStatus.textContent = '💖 Sevgi yükseliyor...';
        } else {
            meterStatus.textContent = '💕 Aşk ölçülüyor...';
        }
    }
}

function celebrate100Percent() {
    if (typeof confetti !== 'undefined') {
        // Big celebration confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }
}

function createFloatingHeart(originElement) {
    if (!floatingHeartsContainer || !originElement) return;

    const rect = originElement.getBoundingClientRect();
    const containerRect = floatingHeartsContainer.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-anim';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (rect.left - containerRect.left + rect.width / 2 + (Math.random() - 0.5) * 50) + 'px';
        heart.style.top = (rect.top - containerRect.top) + 'px';
        heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 1 + 2) + 's';

        floatingHeartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}

// Love meter button handlers
if (kissBtn) {
    kissBtn.addEventListener('click', () => {
        kissTotal++;
        if (kissCount) kissCount.textContent = kissTotal.toLocaleString();
        updateLoveMeter(Math.random() * 5 + 3);
        createFloatingHeart(kissBtn);

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#FF6B9F', '#FFB6C1', '#FF1744']
            });
        }
    });
}

if (hugBtn) {
    hugBtn.addEventListener('click', () => {
        hugTotal++;
        if (hugCount) hugCount.textContent = hugTotal.toLocaleString();
        updateLoveMeter(Math.random() * 4 + 2);
        createFloatingHeart(hugBtn);

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 25,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#FFD700', '#FFC107', '#FF9800']
            });
        }
    });
}

if (loveBtn) {
    loveBtn.addEventListener('click', () => {
        updateLoveMeter(Math.random() * 8 + 5);
        createFloatingHeart(loveBtn);

        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 50,
                spread: 80,
                origin: { y: 0.7 },
                colors: ['#FF1744', '#E91E63', '#9C27B0', '#FFD700']
            });
        }
    });
}

// ============ ANIMATED COUNTERS ============
function animateCounter(element, target, duration = 2000) {
    if (!element) return;

    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Calculate relationship stats
function calculateRelationshipStats() {
    const startDate = new Date('2021-02-14');
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = days * 24;
    const minutes = hours * 60;

    return { days, hours, minutes };
}

function initRelationshipStats() {
    const stats = calculateRelationshipStats();

    const statDays = document.getElementById('statDays');
    const statHours = document.getElementById('statHours');
    const statMinutes = document.getElementById('statMinutes');

    if (statDays) {
        statDays.dataset.target = stats.days;
        animateCounter(statDays, stats.days, 2500);
    }
    if (statHours) {
        statHours.dataset.target = stats.hours;
        animateCounter(statHours, stats.hours, 2800);
    }
    if (statMinutes) {
        statMinutes.dataset.target = stats.minutes;
        animateCounter(statMinutes, stats.minutes, 3200);
    }
}

// ============ HERO QUOTE ROTATOR ============
const heroQuotes = document.querySelectorAll('.hero-quote.rotating');
let currentHeroQuote = 0;

function rotateHeroQuotes() {
    heroQuotes.forEach(q => q.classList.remove('active'));
    currentHeroQuote = (currentHeroQuote + 1) % heroQuotes.length;
    heroQuotes[currentHeroQuote].classList.add('active');
}

// ============ NAVIGATION ============
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (currentScroll / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrollPercent + '%';

    updateTimelineProgress();
    updateActiveNavLink();

    lastScroll = currentScroll;
});

// Mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu on overlay click
document.addEventListener('click', (e) => {
    if (document.body.classList.contains('menu-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// ============ TIMELINE PROGRESS ============
function updateTimelineProgress() {
    const timelineSection = document.querySelector('.timeline-section');
    if (!timelineSection || !timelineProgress) return;

    const rect = timelineSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = timelineSection.offsetHeight;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.min(100, Math.max(0,
            ((windowHeight - sectionTop) / (sectionHeight + windowHeight)) * 100
        ));
        timelineProgress.style.height = progress + '%';
    }
}

// ============ PARTICLES ANIMATION ============
class ParticleSystem {
    constructor(canvas, options = {}) {
        if (!canvas) return;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            colors: options.colors || ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700'],
            minSize: options.minSize || 2,
            maxSize: options.maxSize || 5,
            speed: options.speed || 1,
            ...options
        };

        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize,
            speedX: (Math.random() - 0.5) * this.options.speed,
            speedY: (Math.random() - 0.5) * this.options.speed,
            color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
            opacity: Math.random() * 0.5 + 0.2,
            pulse: Math.random() * Math.PI * 2
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.pulse += 0.02;

            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            const currentOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.pulse));
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = currentOpacity;
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

function initParticles() {
    if (particlesCanvas) {
        new ParticleSystem(particlesCanvas, {
            particleCount: 60,
            colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700', '#9C27B0'],
            minSize: 1,
            maxSize: 4,
            speed: 0.5
        });
    }

    if (footerParticlesCanvas) {
        new ParticleSystem(footerParticlesCanvas, {
            particleCount: 40,
            colors: ['#FF1744', '#FFB6C1', '#FFD700'],
            minSize: 1,
            maxSize: 3,
            speed: 0.3
        });
    }

    // Love meter particles
    const loveMeterParticles = document.getElementById('loveMeterParticles');
    if (loveMeterParticles) {
        new ParticleSystem(loveMeterParticles, {
            particleCount: 30,
            colors: ['#FF1744', '#E91E63', '#FFB6C1'],
            minSize: 1,
            maxSize: 3,
            speed: 0.3
        });
    }
}

// ============ GALLERY & LIGHTBOX ============
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

// ============ PROFESSIONAL IMAGE LAZY LOADING ============
function initProfessionalLazyLoading() {
    // Add loading styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .gallery-item.loading {
            position: relative;
        }
        .gallery-item.loading::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,23,68,0.1) 0%, rgba(233,30,99,0.1) 100%);
            z-index: 1;
        }
        .gallery-item.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            margin: -20px 0 0 -20px;
            border: 3px solid rgba(255,23,68,0.3);
            border-top-color: #FF1744;
            border-radius: 50%;
            animation: gallerySpinner 0.8s linear infinite;
            z-index: 2;
        }
        @keyframes gallerySpinner {
            to { transform: rotate(360deg); }
        }
        .gallery-item img {
            transition: opacity 0.5s ease, transform 0.3s ease;
        }
        .gallery-item.loading img {
            opacity: 0;
        }
        .gallery-item.loaded img {
            opacity: 1;
        }
        .gallery-item.loaded {
            animation: imageReveal 0.6s ease forwards;
        }
        @keyframes imageReveal {
            from {
                opacity: 0.8;
                transform: scale(0.98);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Get all images that need lazy loading
    const images = document.querySelectorAll('.gallery-item img, .special-image img, .event-image img, .wedding-moment img');

    // Create IntersectionObserver for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const container = img.closest('.gallery-item, .special-image, .event-image, .wedding-moment');

                // Add loading state
                if (container) {
                    container.classList.add('loading');
                }

                // Get the actual source (might be in data-src or src)
                const src = img.dataset.src || img.src;

                if (src && src !== '') {
                    // Create a new image to preload
                    const preloadImg = new Image();

                    preloadImg.onload = () => {
                        // Set the source if it was deferred
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }

                        // Remove loading state, add loaded state
                        if (container) {
                            container.classList.remove('loading');
                            container.classList.add('loaded');
                        }
                    };

                    preloadImg.onerror = () => {
                        console.error('Failed to load image:', src);
                        if (container) {
                            container.classList.remove('loading');
                            container.classList.add('loaded'); // Still show, might be placeholder
                        }
                    };

                    // Start loading
                    preloadImg.src = src;
                }

                // Stop observing this image
                observer.unobserve(img);
            }
        });
    }, {
        root: null,
        rootMargin: '100px 0px', // Start loading 100px before visible
        threshold: 0.01
    });

    // Observe all images
    images.forEach(img => {
        // If image hasn't loaded yet
        if (!img.complete || img.naturalWidth === 0) {
            imageObserver.observe(img);
        } else {
            // Image already loaded (cached)
            const container = img.closest('.gallery-item, .special-image, .event-image, .wedding-moment');
            if (container) {
                container.classList.add('loaded');
            }
        }
    });

    // Also handle images in lightbox
    const lightboxImg = document.getElementById('lightboxImage');
    if (lightboxImg) {
        lightboxImg.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    }
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfessionalLazyLoading);
} else {
    initProfessionalLazyLoading();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Lightbox
let currentImageIndex = 0;
let visibleImages = [];

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        visibleImages = Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
        currentImageIndex = visibleImages.indexOf(item);
        openLightbox(item);
    });
});

function openLightbox(item) {
    if (!lightbox) return;
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4')?.textContent || '';
    const desc = item.querySelector('.gallery-overlay p')?.textContent || '';

    if (lightboxImage) lightboxImage.src = img.src;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDesc) lightboxDesc.textContent = desc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) currentImageIndex = visibleImages.length - 1;
    if (currentImageIndex >= visibleImages.length) currentImageIndex = 0;

    openLightbox(visibleImages[currentImageIndex]);
}

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ============ COUNTDOWN TIMER ============
function updateCountdown() {
    const targetDate = new Date('2025-02-14T00:00:00');
    const now = new Date();
    const diff = targetDate - now;

    const countdownDays = document.getElementById('countdownDays');
    const countdownHours = document.getElementById('countdownHours');
    const countdownMinutes = document.getElementById('countdownMinutes');
    const countdownSeconds = document.getElementById('countdownSeconds');

    if (diff <= 0) {
        if (countdownDays) countdownDays.textContent = '🎉';
        if (countdownHours) countdownHours.textContent = '🎉';
        if (countdownMinutes) countdownMinutes.textContent = '🎉';
        if (countdownSeconds) countdownSeconds.textContent = '🎉';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (countdownDays) countdownDays.textContent = days.toString().padStart(2, '0');
    if (countdownHours) countdownHours.textContent = hours.toString().padStart(2, '0');
    if (countdownMinutes) countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    if (countdownSeconds) countdownSeconds.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============ DATE CALCULATIONS ============
function calculateDaysAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `${Math.abs(days)} gün sonra`;

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let result = '';
    if (years > 0) result += `${years} yıl `;
    if (months > 0) result += `${months} ay `;
    if (remainingDays > 0 || result === '') result += `${remainingDays} gün`;

    return result.trim() + ' önce';
}

function updateDateAgo() {
    const firstMeeting = document.getElementById('firstMeetingAgo');
    const firstILoveYou = document.getElementById('firstILoveYouAgo');
    const proposal = document.getElementById('proposalAgo');
    const wedding = document.getElementById('weddingAgo');

    if (firstMeeting) firstMeeting.textContent = calculateDaysAgo('2021-02-14');
    if (firstILoveYou) firstILoveYou.textContent = calculateDaysAgo('2021-07-23');
    if (proposal) proposal.textContent = calculateDaysAgo('2023-08-15');
    if (wedding) wedding.textContent = calculateDaysAgo('2024-05-20');
}

// ============ GSAP ANIMATIONS ============
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    // Timeline events
    gsap.utils.toArray('.timeline-event').forEach(event => {
        gsap.from(event, {
            scrollTrigger: {
                trigger: event,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: event.querySelector('.event-content.left') ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Gallery items stagger
    ScrollTrigger.batch('.gallery-item', {
        onEnter: batch => gsap.from(batch, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out'
        }),
        start: 'top 85%'
    });

    // Love meter section
    gsap.from('.love-meter-container', {
        scrollTrigger: {
            trigger: '.love-meter-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

// ============ SCROLL ANIMATIONS ============
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    // First, add aos-init class to prepare for animation
    animatedElements.forEach(el => el.classList.add('aos-init'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============ INITIALIZE AFTER LOADING ============
function initAfterLoading() {
    initAnimations();
    initParticles();
    initRelationshipStats();
    initGSAPAnimations();
    updateDateAgo();

    // Start hero quote rotation
    if (heroQuotes.length > 0) {
        setInterval(rotateHeroQuotes, 5000);
    }

    // Animate love meter initial value
    setTimeout(() => {
        const initialFill = Math.floor(Math.random() * 30 + 20);
        updateLoveMeter(initialFill);
    }, 1000);
}

// ============ CTA BUTTON EFFECTS ============
const heroCtaBtn = document.getElementById('heroCtaBtn');
if (heroCtaBtn) {
    heroCtaBtn.addEventListener('mouseenter', () => {
        if (typeof confetti !== 'undefined') {
            const rect = heroCtaBtn.getBoundingClientRect();
            confetti({
                particleCount: 20,
                spread: 40,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                colors: ['#FF1744', '#FFB6C1', '#FFD700'],
                scalar: 0.8
            });
        }
    });
}

// ============ EASTER EGG ============
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerHeartExplosion();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🥰', '😍'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 30 + 20}px;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                z-index: 100000;
                pointer-events: none;
                animation: heartFall 3s ease-out forwards;
            `;
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }

    if (!document.querySelector('#heart-fall-style')) {
        const style = document.createElement('style');
        style.id = 'heart-fall-style';
        style.textContent = `
            @keyframes heartFall {
                0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
                100% { opacity: 0; transform: translateY(100vh) rotate(720deg) scale(0.5); }
            }
        `;
        document.head.appendChild(style);
    }

    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 200,
            spread: 180,
            origin: { y: 0.5 },
            colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700', '#9C27B0']
        });
    }
}

// ============ PHASE 2: LOVE METER INTERACTIONS ============
function initLoveMeter() {
    if (!kissBtn || !hugBtn || !loveBtn) return;

    let kissTotal = parseInt(localStorage.getItem('kissCount') || '0');
    let hugTotal = parseInt(localStorage.getItem('hugCount') || '0');
    let loveTotal = parseInt(localStorage.getItem('loveCount') || '0');
    currentLovePercentage = parseInt(localStorage.getItem('lovePercentage') || '0');

    // Update display
    if (kissCount) kissCount.textContent = kissTotal.toLocaleString();
    if (hugCount) hugCount.textContent = hugTotal.toLocaleString();
    if (loveCount) loveCount.textContent = loveTotal.toLocaleString();
    updateLoveMeterDisplay();

    // Button handlers
    kissBtn.addEventListener('click', () => {
        kissTotal++;
        localStorage.setItem('kissCount', kissTotal);
        kissCount.textContent = kissTotal.toLocaleString();
        addLovePercentage(5);
        createFloatingHeart('💋');
        playButtonAnimation(kissBtn);
    });

    hugBtn.addEventListener('click', () => {
        hugTotal++;
        localStorage.setItem('hugCount', hugTotal);
        hugCount.textContent = hugTotal.toLocaleString();
        addLovePercentage(7);
        createFloatingHeart('🤗');
        playButtonAnimation(hugBtn);
    });

    loveBtn.addEventListener('click', () => {
        loveTotal++;
        localStorage.setItem('loveCount', loveTotal);
        loveCount.textContent = loveTotal.toLocaleString();
        addLovePercentage(10);
        createFloatingHeart('❤️');
        playButtonAnimation(loveBtn);
    });
}

function addLovePercentage(amount) {
    currentLovePercentage = Math.min(100, currentLovePercentage + amount);
    localStorage.setItem('lovePercentage', currentLovePercentage);
    updateLoveMeterDisplay();

    if (currentLovePercentage >= 100) {
        celebrate100Percent();
    }
}

function updateLoveMeterDisplay() {
    if (!loveMeterFill || !lovePercentage) return;

    const circumference = 565.48;
    const offset = circumference - (currentLovePercentage / 100) * circumference;
    loveMeterFill.style.strokeDashoffset = offset;
    lovePercentage.textContent = Math.round(currentLovePercentage);

    // Update status text
    if (meterStatus) {
        if (currentLovePercentage < 25) meterStatus.textContent = 'Aşk seviyesi düşük... 💔';
        else if (currentLovePercentage < 50) meterStatus.textContent = 'Aşk büyüyor... 💕';
        else if (currentLovePercentage < 75) meterStatus.textContent = 'Çok romantik! 💖';
        else if (currentLovePercentage < 100) meterStatus.textContent = 'Aşk patlaması yakın! 💗';
        else meterStatus.textContent = 'SONSUZ AŞK! ♾️💕';
    }
}

function celebrate100Percent() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF1744', '#E91E63', '#FFB6C1', '#FFD700']
        });
    }
    setTimeout(() => {
        currentLovePercentage = 0;
        localStorage.setItem('lovePercentage', '0');
        updateLoveMeterDisplay();
    }, 3000);
}

function createFloatingHeart(emoji) {
    if (!floatingHeartsContainer) return;
    const heart = document.createElement('div');
    heart.className = 'floating-heart-anim';
    heart.textContent = emoji;
    heart.style.left = Math.random() * 80 + 10 + '%';
    heart.style.bottom = '0';
    floatingHeartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
}

function playButtonAnimation(btn) {
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => btn.style.transform = '', 200);
}

// ============ PHASE 2: LOVE QUIZ ============
const quizQuestions = [
    { q: "Ela'nın en sevdiği çiçek hangisi?", answers: ["🌹 Gül", "🌷 Lale", "🌻 Ayçiçeği", "🌺 Orkide"], correct: 1 },
    { q: "İlk buluşmamız neredeydi?", answers: ["☕ Kafe", "📚 Kitapçı", "🌳 Park", "🎬 Sinema"], correct: 1 },
    { q: "Kaan'ın en sevdiği yemek?", answers: ["🍕 Pizza", "🍔 Hamburger", "🥘 Mantı", "🍝 Makarna"], correct: 2 },
    { q: "Birlikteyiz ne kadar oldu?", answers: ["2 yıl", "3 yıl", "4 yıl", "5 yıl"], correct: 2 },
    { q: "En sevdiğimiz film türü?", answers: ["🎭 Dram", "💕 Romantik", "🎬 Aksiyon", "😂 Komedi"], correct: 1 },
    { q: "Ela'nın burcu nedir?", answers: ["♌ Aslan", "♎ Terazi", "♓ Balık", "♊ İkizler"], correct: 0 },
    { q: "Kaan'ın hobisi nedir?", answers: ["🎮 Oyun", "📷 Fotoğraf", "🎸 Müzik", "📚 Okumak"], correct: 3 },
    { q: "Yıldönümümüz hangi tarihte?", answers: ["14 Şubat", "21 Mart", "10 Nisan", "1 Mayıs"], correct: 0 },
    { q: "En sevdiğimiz mevsim?", answers: ["🌸 İlkbahar", "☀️ Yaz", "🍂 Sonbahar", "❄️ Kış"], correct: 0 },
    { q: "Birlikte gittiğimiz ilk şehir?", answers: ["İstanbul", "İzmir", "Antalya", "Kapadokya"], correct: 3 }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

function initQuiz() {
    const questionCard = document.getElementById('questionCard');
    const quizResults = document.getElementById('quizResults');
    const retryBtn = document.getElementById('retryQuizBtn');

    if (!questionCard) return;

    currentQuestion = 0;
    score = 0;
    quizStarted = true;

    if (quizResults) quizResults.classList.add('hidden');
    questionCard.classList.remove('hidden');

    displayQuestion();

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            quizResults.classList.add('hidden');
            questionCard.classList.remove('hidden');
            displayQuestion();
        });
    }
}

function displayQuestion() {
    const questionText = document.getElementById('questionText');
    const answersGrid = document.getElementById('answersGrid');
    const progressFill = document.getElementById('quizProgressFill');
    const counter = document.getElementById('questionCounter');
    const feedback = document.getElementById('answerFeedback');

    if (!questionText || !answersGrid) return;

    const q = quizQuestions[currentQuestion];
    questionText.textContent = q.q;

    if (progressFill) progressFill.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    if (counter) counter.textContent = `Soru ${currentQuestion + 1} / ${quizQuestions.length}`;
    if (feedback) { feedback.className = 'answer-feedback'; feedback.textContent = ''; }

    answersGrid.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-text">${answer}</span>`;
        btn.addEventListener('click', () => selectAnswer(index, q.correct));
        answersGrid.appendChild(btn);
    });
}

function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.answer-btn');
    const feedback = document.getElementById('answerFeedback');

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add('correct');
        else if (i === selected && selected !== correct) btn.classList.add('wrong');
    });

    if (selected === correct) {
        score++;
        if (feedback) {
            feedback.className = 'answer-feedback correct show';
            feedback.textContent = '✅ Doğru! Harika!';
        }
        if (typeof confetti !== 'undefined') {
            confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        }
    } else {
        if (feedback) {
            feedback.className = 'answer-feedback wrong show';
            feedback.textContent = '❌ Yanlış! Doğru cevap: ' + quizQuestions[currentQuestion].answers[correct];
        }
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const questionCard = document.getElementById('questionCard');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const resultsMessage = document.getElementById('resultsMessage');
    const heartScore = document.getElementById('heartScore');

    if (questionCard) questionCard.classList.add('hidden');
    if (quizResults) quizResults.classList.remove('hidden');
    if (finalScore) finalScore.textContent = score;

    // Heart rating based on score
    const hearts = score >= 8 ? '💕💕💕💕💕' : score >= 6 ? '💕💕💕💕' : score >= 4 ? '💕💕💕' : score >= 2 ? '💕💕' : '💕';
    if (heartScore) heartScore.textContent = hearts;

    // Message based on score
    const messages = {
        10: 'MÜKEMMEL! Birbirinizi çok iyi tanıyorsunuz! 🎉',
        8: 'Harika! Çok iyi bir çift! 💖',
        6: 'Güzel! Biraz daha vakit geçirin! 💕',
        4: 'Fena değil! Birbirinizi daha iyi tanıyın! 😊',
        2: 'Hmm... Birlikte daha fazla zaman geçirin! 💭',
        0: 'Birbirinizi tanımaya başlayın! ❤️'
    };

    const msgKey = Math.floor(score / 2) * 2;
    if (resultsMessage) resultsMessage.textContent = messages[msgKey] || messages[0];

    if (score >= 7 && typeof confetti !== 'undefined') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
}

// ============ PHASE 2: SECRET MESSAGES WALL ============
const secretMessages = [
    { text: "Seni ilk gördüğümde kalbim durdu, sonra senin için atmaya başladı...", date: "14 Şubat 2021" },
    { text: "Gözlerin güneş gibi, her baktığımda içimi ısıtıyor.", date: "21 Mart 2021" },
    { text: "Seninle her an bir ömre bedel.", date: "10 Nisan 2021" },
    { text: "Sen benim en güzel şansım, en değerli hediyemsin.", date: "15 Mayıs 2021" },
    { text: "Aşk ne demek bilmiyordum, sen öğrettin.", date: "20 Haziran 2021" },
    { text: "Seninle olmak, her günü bayrama çeviriyor.", date: "4 Temmuz 2021" },
    { text: "Gülüşün benim için en güzel melodi.", date: "18 Ağustos 2021" },
    { text: "Seni sevmek, hayatımın en kolay ve en güzel işi.", date: "3 Eylül 2021" },
    { text: "Her anımızda seninle mutluyum.", date: "12 Ekim 2021" },
    { text: "Sen benim her şeyimsin, Ela'm.", date: "25 Kasım 2021" },
    { text: "Seninle her gün yeniden aşık oluyorum.", date: "31 Aralık 2021" },
    { text: "Dünyada milyarlarca insan var, ama kalbim sadece seni seçti.", date: "14 Şubat 2022" },
    { text: "Seninle yaşlanmak istiyorum.", date: "8 Mart 2022" },
    { text: "Her sabah uyandığımda ilk düşündüğüm sensin.", date: "22 Nisan 2022" },
    { text: "Aşkımız sonsuza kadar sürecek.", date: "5 Mayıs 2022" },
    { text: "Sen hayatımın anlamısın.", date: "19 Haziran 2022" },
    { text: "Seni her gün biraz daha çok seviyorum.", date: "30 Temmuz 2022" },
    { text: "Kalbim senin için atıyor.", date: "11 Ağustos 2022" },
    { text: "Seninle geçen her an paha biçilemez.", date: "26 Eylül 2022" },
    { text: "Sonsuza kadar seninle... 💕", date: "14 Şubat 2024" }
];

let currentMessageIndex = 0;

function initSecretMessages() {
    const heartsWall = document.getElementById('heartsWall');
    const modal = document.getElementById('messageModal');
    const closeBtn = document.getElementById('closeMessageModal');
    const nextBtn = document.getElementById('nextMessageBtn');

    if (!heartsWall) return;

    // Create floating hearts
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🩷', '🩵', '💜'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'wall-heart';
        heart.textContent = heartEmojis[i % heartEmojis.length];
        heart.style.animationDelay = (Math.random() * 2) + 's';
        heart.addEventListener('click', () => openMessage(i % secretMessages.length));
        heartsWall.appendChild(heart);
    }

    // Modal handlers
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentMessageIndex = (currentMessageIndex + 1) % secretMessages.length;
        showMessage(currentMessageIndex);
    });
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

function openMessage(index) {
    currentMessageIndex = index;
    const modal = document.getElementById('messageModal');
    if (modal) modal.classList.add('active');
    showMessage(index);
}

function showMessage(index) {
    const msg = secretMessages[index];
    const textEl = document.getElementById('secretMessageText');
    const dateEl = document.getElementById('messageDate');

    if (textEl) {
        textEl.textContent = '';
        // Typewriter effect
        let i = 0;
        const typeWriter = () => {
            if (i < msg.text.length) {
                textEl.textContent += msg.text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        typeWriter();
    }
    if (dateEl) dateEl.textContent = msg.date;
}

// ============ PHASE 2: GIFT BOX ============
let giftOpened = false;

function initGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const giftContent = document.getElementById('giftContent');

    if (!giftBox) return;

    giftBox.addEventListener('click', () => {
        if (giftOpened) return;
        giftOpened = true;

        // Open animation
        giftBox.classList.add('opened');

        // Confetti
        if (typeof confetti !== 'undefined') {
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#FF1744', '#E91E63', '#FFD700', '#FFB6C1']
                });
            }, 400);
        }

        // Show content
        setTimeout(() => {
            giftBox.style.display = 'none';
            if (giftContent) giftContent.classList.remove('hidden');
        }, 1000);
    });
}

// ============ INITIALIZE PHASE 2 ============
function initPhase2() {
    // initLoveMeter removed - section was removed
    initQuiz();
    initSecretMessages();
    initGiftBox();
}

// Call Phase 2 init after loading
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPhase2, 100);
});

// ============ PHASE 3: FLIP COUNTDOWN ============
function initFlipCountdown() {
    const flipDays = document.getElementById('flipDays');
    const flipHours = document.getElementById('flipHours');
    const flipMinutes = document.getElementById('flipMinutes');
    const flipSeconds = document.getElementById('flipSeconds');

    if (!flipDays) return;

    // Target date: February 14, 2026 (5th Anniversary)
    const targetDate = new Date('2026-02-14T00:00:00');

    function updateFlipCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            // Countdown finished - show zeros
            updateFlipCard(flipDays, 0);
            updateFlipCard(flipHours, 0);
            updateFlipCard(flipMinutes, 0);
            updateFlipCard(flipSeconds, 0);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        updateFlipCard(flipDays, days);
        updateFlipCard(flipHours, hours);
        updateFlipCard(flipMinutes, minutes);
        updateFlipCard(flipSeconds, seconds);
    }

    function updateFlipCard(card, value) {
        const front = card.querySelector('.flip-card-front .flip-number');
        const back = card.querySelector('.flip-card-back .flip-number');
        const currentValue = front.textContent;
        const newValue = String(value).padStart(2, '0');

        if (currentValue !== newValue) {
            // Trigger flip animation
            card.classList.add('flipping');

            setTimeout(() => {
                front.textContent = newValue;
                back.textContent = newValue;
            }, 300);

            setTimeout(() => {
                card.classList.remove('flipping');
            }, 600);
        }
    }

    // Update every second
    updateFlipCountdown();
    setInterval(updateFlipCountdown, 1000);
}

// ============ PHASE 3: MUSIC PLAYER UI ============
function initMusicPlayer() {
    const playBtn = document.getElementById('playPause');
    const prevBtn = document.getElementById('prevTrack');
    const nextBtn = document.getElementById('nextTrack');
    const playlistTracks = document.querySelectorAll('.track-item');
    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const musicSection = document.querySelector('.music-player-section');
    const progressFill = document.getElementById('musicProgress');
    const timeCurrent = document.querySelector('.time-current');
    const timeTotal = document.querySelector('.time-total');

    if (!playBtn) return;

    let currentTrack = 0;
    let isPlaying = false;
    let shouldAutoPlay = false;
    let audio = null;

    // Şarkı bilgileri - her şarkının anı etiketi de dahil
    const tracks = [
        {
            title: 'Perfect',
            artist: 'Ed Sheeran',
            src: 'musics/Edd_Sheeran_-_Perfect_(mp3.pm).mp3',
            duration: '4:23',
            memory: '💃 İlk dansımızın şarkısı'
        },
        {
            title: 'All of Me',
            artist: 'John Legend',
            src: 'musics/John-Legend-All-Of-Me-93.mp3',
            duration: '4:29',
            memory: '💕 Evlilik teklifi şarkısı'
        },
        {
            title: 'Thinking Out Loud',
            artist: 'Ed Sheeran',
            src: 'musics/Edsheeran_-_thinking_out_loud_(mp3.pm).mp3',
            duration: '4:41',
            memory: '☕ İlk buluşma şarkısı'
        },
        {
            title: 'A Thousand Years',
            artist: 'Christina Perri',
            src: 'musics/Christina-Perri-A-Thousand-Years-5.mp3',
            duration: '4:45',
            memory: '💒 Düğün şarkısı'
        },
        {
            title: "Can't Help Falling in Love",
            artist: 'Elvis Presley',
            src: 'musics/Rondo_-_Can_t_Help_Falling_In_Love_(mp3.pm).mp3',
            duration: '3:00',
            memory: '❤️ En sevdiğimiz şarkı'
        }
    ];

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function createAudioElement() {
        // Create new audio element each time to prevent caching issues
        if (audio) {
            audio.pause();
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleTrackEnd);
            audio.removeEventListener('canplaythrough', handleCanPlay);
            audio.removeEventListener('error', handleError);
            audio.src = '';
            audio.load();
        }

        audio = new Audio();
        audio.preload = 'auto';

        // Add event listeners
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleTrackEnd);
        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', handleError);

        return audio;
    }

    function handleTimeUpdate() {
        if (audio && audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = progress + '%';
            if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
        }
    }

    function handleTrackEnd() {
        // Auto-advance to next track
        currentTrack = (currentTrack + 1) % tracks.length;
        loadAndPlayTrack(currentTrack);
    }

    function handleCanPlay() {
        if (shouldAutoPlay) {
            shouldAutoPlay = false;
            playTrack();
        }
    }

    function handleError(e) {
        console.error('Audio error:', e);
        // Try to recover by reloading
        setTimeout(() => {
            if (audio) {
                audio.load();
            }
        }, 1000);
    }

    function loadTrack(index, autoPlay = false) {
        currentTrack = index;
        shouldAutoPlay = autoPlay;

        // Create fresh audio element
        createAudioElement();

        // Set source and load
        audio.src = tracks[index].src;
        audio.load();

        updateTrackDisplay();
    }

    function loadAndPlayTrack(index) {
        loadTrack(index, true);
    }

    function updateTrackDisplay() {
        const trackMemory = document.querySelector('.track-memory');

        if (trackTitle) trackTitle.textContent = tracks[currentTrack].title;
        if (trackArtist) trackArtist.textContent = tracks[currentTrack].artist;
        if (timeTotal) timeTotal.textContent = tracks[currentTrack].duration;
        if (trackMemory) trackMemory.textContent = tracks[currentTrack].memory;

        playlistTracks.forEach((track, i) => {
            track.classList.toggle('active', i === currentTrack);
        });

        // Reset progress
        if (progressFill) progressFill.style.width = '0%';
        if (timeCurrent) timeCurrent.textContent = '0:00';
    }

    function playTrack() {
        if (!audio) return;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                const playIcon = playBtn.querySelector('.play-icon');
                const pauseIcon = playBtn.querySelector('.pause-icon');
                playIcon?.classList.add('hidden');
                pauseIcon?.classList.remove('hidden');
                musicSection?.classList.add('playing');
            }).catch(err => {
                console.log('Audio play error:', err);
                // User interaction required - wait for next click
                isPlaying = false;
            });
        }
    }

    function pauseTrack() {
        if (!audio) return;

        audio.pause();
        isPlaying = false;
        const playIcon = playBtn.querySelector('.play-icon');
        const pauseIcon = playBtn.querySelector('.pause-icon');
        playIcon?.classList.remove('hidden');
        pauseIcon?.classList.add('hidden');
        musicSection?.classList.remove('playing');
    }

    // Play/Pause button
    playBtn.addEventListener('click', () => {
        if (!audio || audio.paused) {
            // If audio doesn't exist or no source, load current track first
            if (!audio || !audio.src || audio.src === '') {
                loadAndPlayTrack(currentTrack);
            } else {
                playTrack();
            }
        } else {
            pauseTrack();
        }
    });

    // Previous track
    prevBtn?.addEventListener('click', () => {
        const wasPlaying = isPlaying;
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        if (wasPlaying) {
            loadAndPlayTrack(currentTrack);
        } else {
            loadTrack(currentTrack, false);
        }
    });

    // Next track
    nextBtn?.addEventListener('click', () => {
        const wasPlaying = isPlaying;
        currentTrack = (currentTrack + 1) % tracks.length;
        if (wasPlaying) {
            loadAndPlayTrack(currentTrack);
        } else {
            loadTrack(currentTrack, false);
        }
    });

    // Playlist items
    playlistTracks.forEach((track, i) => {
        track.addEventListener('click', () => {
            loadAndPlayTrack(i);
        });
    });

    // Progress bar click to seek
    const progressTrack = document.querySelector('.progress-bar-track');
    progressTrack?.addEventListener('click', (e) => {
        if (!audio || !audio.duration) return;
        const rect = progressTrack.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Load first track (without auto-play)
    loadTrack(0, false);
}

// ============ PHASE 3: CURSOR TRAIL ============
function initCursorTrail() {
    const container = document.getElementById('cursorTrailContainer');
    if (!container) return;

    // Only on desktop
    if (window.innerWidth < 768) return;

    const hearts = ['❤️', '💕', '💖', '💗', '💓'];
    let lastTime = 0;
    const throttle = 80; // ms between hearts

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;

        const heart = document.createElement('span');
        heart.className = 'cursor-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = (Math.random() * 10 + 10) + 'px';

        container.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    });
}

// ============ INITIALIZE PHASE 3 ============
function initPhase3() {
    initFlipCountdown();
    initMusicPlayer();
    initCursorTrail();
}

// Call Phase 3 init after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPhase3, 200);
});

// ============ CONSOLE MESSAGE ============
console.log('%c💕 Ela & Kaan 💕', 'color: #FF1744; font-size: 30px; font-weight: bold;');
console.log('%cBu site, sonsuz bir aşkın hikayesini anlatmak için tasarlandı...', 'color: #FFB6C1; font-size: 14px;');
console.log('%c14 Şubat 2021\'den beri birlikte ❤️', 'color: #FFD700; font-size: 12px;');
console.log('%c🎮 Konami Code: ↑↑↓↓←→←→BA', 'color: #9C27B0; font-size: 10px;');
