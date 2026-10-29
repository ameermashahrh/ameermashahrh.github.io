// =========================================
// LOADING SCREEN
// =========================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 500);
    }
});

// =========================================
// READING PROGRESS BAR
// =========================================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

// =========================================
// CUSTOM CURSOR
// =========================================
const customCursor = document.getElementById('customCursor');
const customCursorFollower = document.getElementById('customCursorFollower');

if (customCursor && customCursorFollower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        customCursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        customCursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .btn, .project-card, .certificate-card, .skill-card, .experience-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
            customCursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
            customCursorFollower.classList.remove('hover');
        });
    });
}

// =========================================
// 3D TILT EFFECT
// =========================================
document.querySelectorAll('.project-card, .certificate-card, .experience-card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.3s ease';
    
    const glare = document.createElement('div');
    glare.className = 'tilt-glare';
    glare.style.position = 'absolute';
    glare.style.inset = '0';
    glare.style.background = 'linear-gradient(135deg, rgba(56,189,248,0.15), transparent)';
    glare.style.opacity = '0';
    glare.style.pointerEvents = 'none';
    glare.style.borderRadius = '16px';
    glare.style.transition = 'opacity 0.3s ease';
    glare.style.zIndex = '1';
    card.style.position = 'relative';
    card.appendChild(glare);

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        glare.style.opacity = '0';
    });
});

// =========================================
// PARALLAX SCROLL
// =========================================
const parallaxElements = document.querySelectorAll('[data-parallax]');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.3;
                el.style.transform = `translateY(${scrollY * speed * 0.15}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// =========================================
// SMOOTH SECTION REVEAL
// =========================================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// =========================================
// CONFETTI ON FORM SUBMIT
// =========================================
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#38bdf8', '#facc15', '#22c55e', '#a855f7', '#ec4899', '#f97316'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
    
    let startTime = Date.now();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1;
            p.rotation += p.rotationSpeed;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, 1 - (Date.now() - startTime) / 3000);
            
            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }
            ctx.restore();
        });
        
        if (Date.now() - startTime < 3500) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.classList.remove('active');
        }
    }
    animate();
}

// =========================================
// RIPPLE EFFECT ON CLICK
// =========================================
document.querySelectorAll('.btn, .btn-3d').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleAnim 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

// =========================================
// MOBILE MENU TOGGLE
// =========================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if (icon) {
            icon.className = navMenu.classList.contains("active") ? "fas fa-times" : "fas fa-bars";
        }
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
            const icon = menuToggle?.querySelector("i");
            if (icon) icon.className = "fas fa-bars";
        }
    });
});

// تم إزالة كود زر الوضع الفاتح بالكامل

// =========================================
// ACTIVE NAVIGATION SCROLL SPY
// =========================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    updateCounter();
}

const observerCounter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            if (!isNaN(target)) {
                animateCounter(el, target);
                observerCounter.unobserve(el);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => {
    observerCounter.observe(el);
});

// =========================================
// SKILL PROGRESS BARS
// =========================================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.width + '%';
            progressObserver.unobserve(fill);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.progress-fill').forEach(el => {
    progressObserver.observe(el);
});

// =========================================
// TYPING EFFECT
// =========================================
const typingElement = document.querySelector('.typing-text');
const texts = [
    "Computer Engineering Student",
    "Software Developer",
    "AI Enthusiast",
    "Cybersecurity Learner"
];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typingElement) return;
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

if (typingElement) setTimeout(typeEffect, 1500);

// =========================================
// BACK TO TOP BUTTON
// =========================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// LIGHTBOX GALLERY
// =========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.querySelector('.lightbox-close');

document.querySelectorAll('.certificate-image img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
});

// =========================================
// EMAILJS - CONTACT FORM
// =========================================
(function() {
    emailjs.init("3zRaobthulBt87hD0");
})();

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const templateParams = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            to_email: "ameermashahreh3@gmail.com"
        };
        
        emailjs.send("service_0bb9kgj", "template_awu0e3e", templateParams)
            .then(function() {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. I will get back to you soon.</p>
                `;
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                contactForm.style.display = 'none';
                launchConfetti();
            })
            .catch(function(error) {
                console.error("❌ EmailJS Error:", error);
                alert("❌ Failed to send message. Please try again.");
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// =========================================
// SMOOTH SCROLL FOR NAV LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// =========================================
// AOS INITIALIZATION
// =========================================
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// =========================================
// CONSOLE MESSAGE
// =========================================
console.log("🚀 Welcome to Ameer Mashahreh's Portfolio");
console.log("🎬 Animation System: 10+ animations active!");
console.log("✨ Cursor, Blob, Confetti, Tilt, Parallax, Reveal, Borders, Waves, Ripple, Pulse");
console.log("💻 Made with ❤️ by Ameer Mashahreh");