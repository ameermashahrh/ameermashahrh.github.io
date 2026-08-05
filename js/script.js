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
// MOBILE MENU TOGGLE
// =========================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        const icon = menuToggle.querySelector("i");
        if (icon) {
            if (navMenu.classList.contains("active")) {
                icon.className = "fas fa-times";
            } else {
                icon.className = "fas fa-bars";
            }
        }
    });
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) {
            navMenu.classList.remove("active");
            const icon = menuToggle?.querySelector("i");
            if (icon) {
                icon.className = "fas fa-bars";
            }
        }
    });
});

// =========================================
// DARK / LIGHT MODE TOGGLE
// =========================================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function(e) {
        e.preventDefault();
        document.body.classList.toggle("light-mode");
        
        const icon = this.querySelector("i");
        if (document.body.classList.contains("light-mode")) {
            icon.className = "fas fa-sun";
            localStorage.setItem("theme", "light");
        } else {
            icon.className = "fas fa-moon";
            localStorage.setItem("theme", "dark");
        }
    });
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    const icon = themeToggle?.querySelector("i");
    if (icon) {
        icon.className = "fas fa-sun";
    }
} else {
    document.body.classList.remove("light-mode");
    const icon = themeToggle?.querySelector("i");
    if (icon) {
        icon.className = "fas fa-moon";
    }
}

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

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {
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

window.dispatchEvent(new Event("scroll"));

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
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
            const width = fill.dataset.width;
            fill.style.width = width + '%';
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
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

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
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

if (typingElement) {
    setTimeout(typeEffect, 1500);
}

// =========================================
// BACK TO TOP BUTTON
// =========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
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
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// =========================================
// EMAILJS - CONTACT FORM
// =========================================

// تهيئة EmailJS مع Public Key
(function() {
    emailjs.init("3zRaobthulBt87hD0");
})();

// معالجة نموذج الاتصال
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        
        // تغيير شكل الزر أثناء الإرسال
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // جمع البيانات من النموذج
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        // إعداد parameters للإرسال
        const templateParams = {
            name: name,
            email: email,
            message: message,
            to_email: "ameermashahreh3@gmail.com"
        };
        
        // إرسال البريد عبر EmailJS
        emailjs.send("service_0bb9kgj", "template_awu0e3e", templateParams)
            .then(function(response) {
                console.log("✅ Email sent successfully!", response.status, response.text);
                
                // إنشاء رسالة نجاح
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. I will get back to you soon.</p>
                `;
                
                // إضافة رسالة النجاح
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                contactForm.style.display = 'none';
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
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
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
// CONSOLE WELCOME MESSAGE
// =========================================
console.log("🚀 Welcome to Ameer Mashahreh's Portfolio");
console.log("💻 Let's build something amazing!");
console.log("📜 Check out my certificates!");
console.log("🌟 Made with ❤️ by Ameer Mashahreh");