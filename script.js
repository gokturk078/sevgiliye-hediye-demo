/* ===============================================
   ELA & KAAN - ULTRA PREMIUM ROMANTIC WEBSITE
   JavaScript - Interactions & Animations
   =============================================== */

// ============ DOM ELEMENTS ============
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollProgress = document.getElementById('scrollProgress');
const heroSubtitle = document.getElementById('heroSubtitle');
const particlesCanvas = document.getElementById('particlesCanvas');
const footerParticlesCanvas = document.getElementById('footerParticles');
const timelineProgress = document.getElementById('timelineProgress');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const galleryGrid = document.getElementById('galleryGrid');

// ============ LOADING SCREEN ============
document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
        initAnimations();
    }, 3500);
});

// ============ TYPEWRITER EFFECT ============
const typewriterText = "14 Şubat 2021'den Beri Birlikte";
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        heroSubtitle.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

setTimeout(typeWriter, 4000);

// ============ NAVIGATION ============
// Scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar background
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (currentScroll / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
    
    // Timeline progress
    updateTimelineProgress();
    
    // Active nav link
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Update active nav link based on scroll position
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
    if (!timelineSection) return;
    
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
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.pulse += 0.02;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
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

// Initialize particles after loading
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
}

// ============ GALLERY & LIGHTBOX ============
// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
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
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-overlay h4')?.textContent || '';
    const desc = item.querySelector('.gallery-overlay p')?.textContent || '';
    
    lightboxImage.src = img.src;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) currentImageIndex = visibleImages.length - 1;
    if (currentImageIndex >= visibleImages.length) currentImageIndex = 0;
    
    openLightbox(visibleImages[currentImageIndex]);
}

// Lightbox event listeners
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => navigateLightbox(-1));
document.querySelector('.lightbox-next')?.addEventListener('click', () => navigateLightbox(1));

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ============ COUNTDOWN TIMER ============
function updateCountdown() {
    const targetDate = new Date('2025-02-14T00:00:00');
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById('countdownDays').textContent = '🎉';
        document.getElementById('countdownHours').textContent = '🎉';
        document.getElementById('countdownMinutes').textContent = '🎉';
        document.getElementById('countdownSeconds').textContent = '🎉';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdownDays').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdownHours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdownMinutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdownSeconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ============ DATE CALCULATIONS ============
function calculateDaysAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) {
        return `${Math.abs(days)} gün sonra`;
    }
    
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

updateDateAgo();

// ============ SCROLL ANIMATIONS (AOS-like) ============
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============ PARALLAX EFFECT ============
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.photo-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    cards.forEach((card, index) => {
        const intensity = (index + 1) * 10;
        const rotateX = mouseY * intensity;
        const rotateY = mouseX * intensity;
        
        card.style.transform = `
            rotate(${index === 0 ? -5 : 8}deg)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });
});

// ============ IMAGE LAZY LOADING ============
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles after a delay
    setTimeout(initParticles, 3600);
    
    // Add loaded class to images for fade-in effect
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// ============ EASTER EGG - Konami Code ============
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
    
    // Add animation keyframes
    if (!document.querySelector('#heart-fall-style')) {
        const style = document.createElement('style');
        style.id = 'heart-fall-style';
        style.textContent = `
            @keyframes heartFall {
                0% {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(100vh) rotate(720deg) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============ CONSOLE MESSAGE ============
console.log('%c💕 Ela & Kaan 💕', 'color: #FF1744; font-size: 30px; font-weight: bold;');
console.log('%cBu site, sonsuz bir aşkın hikayesini anlatmak için tasarlandı...', 'color: #FFB6C1; font-size: 14px;');
console.log('%c14 Şubat 2021\'den beri birlikte ❤️', 'color: #FFD700; font-size: 12px;');
