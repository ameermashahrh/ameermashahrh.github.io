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
// LANGUAGE TOGGLE (AR/EN)
// =========================================
const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');
let isArabic = false;

// محتوى الترجمة
const translations = {
    en: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        certificates: 'Certificates',
        education: 'Education',
        contact: 'Contact',
        greeting: "Hello, I'm",
        title: 'Computer Engineering Student',
        description: 'I am a Computer Engineering student passionate about software development, artificial intelligence, cybersecurity, and building practical technology solutions.',
        viewProjects: 'View My Projects',
        contactMe: 'Contact Me',
        aboutLabel: 'GET TO KNOW ME',
        aboutText: "I'm Ameer Mashahreh, a Computer Engineering student at Al-Quds University – Abu Dis.",
        aboutText2: 'I am interested in software development, artificial intelligence, cybersecurity, networking, and modern technology.',
        aboutText3: 'I enjoy transforming ideas into practical projects and continuously improving my programming and engineering skills.',
        fullName: 'Full Name:',
        field: 'Field:',
        university: 'University:',
        location: 'Location:',
        phone: 'Phone:',
        email: 'Email:',
        skillsLabel: 'WHAT I WORK WITH',
        workLabel: 'MY WORK',
        certificatesLabel: 'MY CERTIFICATES',
        certificatesDesc: 'Professional certifications and academic achievements',
        educationLabel: 'MY ACADEMIC JOURNEY',
        contactLabel: "LET'S CONNECT",
        contactTitle: "Let's connect.",
        contactText: 'If you have a project idea, opportunity, collaboration, or simply want to connect, feel free to reach out.',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        message: 'Message',
        sendMessage: 'Send Message',
        contactDesc: "Let's build something together.",
        technologies: 'Technologies',
        interests: 'Interests'
    },
    ar: {
        home: 'الرئيسية',
        about: 'عني',
        skills: 'المهارات',
        projects: 'المشاريع',
        certificates: 'الشهادات',
        education: 'التعليم',
        contact: 'اتصل بي',
        greeting: 'مرحباً، أنا',
        title: 'طالب هندسة حاسوب',
        description: 'أنا طالب هندسة حاسوب شغوف بتطوير البرمجيات، الذكاء الاصطناعي، الأمن السيبراني، وبناء حلول تقنية عملية.',
        viewProjects: 'عرض مشاريعي',
        contactMe: 'تواصل معي',
        aboutLabel: 'تعرف علي',
        aboutText: 'أنا عمير مشاهرة، طالب هندسة حاسوب في جامعة القدس – أبو ديس.',
        aboutText2: 'أنا مهتم بتطوير البرمجيات، الذكاء الاصطناعي، الأمن السيبراني، الشبكات، والتكنولوجيا الحديثة.',
        aboutText3: 'أستمتع بتحويل الأفكار إلى مشاريع عملية وتحسين مهاراتي في البرمجة والهندسة باستمرار.',
        fullName: 'الاسم الكامل:',
        field: 'التخصص:',
        university: 'الجامعة:',
        location: 'الموقع:',
        phone: 'الهاتف:',
        email: 'البريد الإلكتروني:',
        skillsLabel: 'ماذا أعمل',
        workLabel: 'أعمالي',
        certificatesLabel: 'شهاداتي',
        certificatesDesc: 'الشهادات المهنية والإنجازات الأكاديمية',
        educationLabel: 'رحلتي الأكاديمية',
        contactLabel: 'تواصل معي',
        contactTitle: 'تواصل معي',
        contactText: 'إذا كان لديك فكرة مشروع، فرصة، تعاون، أو ببساطة تريد التواصل، لا تتردد في الاتصال بي.',
        yourName: 'الاسم',
        yourEmail: 'البريد الإلكتروني',
        message: 'الرسالة',
        sendMessage: 'إرسال الرسالة',
        contactDesc: 'لنبني شيئاً معاً.',
        technologies: 'التقنيات',
        interests: 'الاهتمامات'
    }
};

if (langToggle) {
    langToggle.addEventListener('click', function() {
        isArabic = !isArabic;
        langText.textContent = isArabic ? 'عربي' : 'EN';
        
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
        document.documentElement.lang = isArabic ? 'ar' : 'en';
        
        updateContent(isArabic ? 'ar' : 'en');
    });
}

function updateContent(lang) {
    const t = translations[lang];
    if (!t) return;
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });
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
// CONTACT FORM HANDLER
// =========================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual EmailJS when ready)
        setTimeout(() => {
            const name = document.getElementById('name').value;
            alert(`✅ Thank you ${name}! Your message has been sent successfully. I will get back to you soon.`);
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
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