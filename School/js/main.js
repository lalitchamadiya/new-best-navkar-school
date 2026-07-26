/* Main JavaScript for Shree New Best Navkar School Website */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Check saved theme (Default is Light Mode unless explicitly set to 'dark')
    if (localStorage.getItem('color-theme') === 'dark') {
        document.documentElement.classList.add('dark');
        if (lightIcon) lightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (darkIcon) darkIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (lightIcon) lightIcon.classList.toggle('hidden');
            if (darkIcon) darkIcon.classList.toggle('hidden');

            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // 2. Lenis Smooth Scroll Initialization
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    lenis.scrollTo(targetElement);
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });
    }

    // 3. Scroll Progress Bar & Navbar Shadow
    const progressBar = document.getElementById('progress-bar');
    const navbar = document.getElementById('main-navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';

        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg', 'py-2');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.remove('shadow-lg');
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2');
            }
        }

        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile Navigation Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
        });
    }
    if (closeMobileMenuBtn && mobileMenu) {
        closeMobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    }

    // 5. GSAP Hero & Scroll Animations
    if (typeof gsap !== 'undefined') {
        gsap.from('#hero-badge', { opacity: 0, y: -20, duration: 1, delay: 0.2 });
        gsap.from('#hero-title', { opacity: 0, y: 30, duration: 1.2, delay: 0.4, ease: 'power3.out' });
        gsap.from('#hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.7 });
        gsap.from('#hero-cta', { opacity: 0, y: 20, duration: 1, delay: 0.9 });
        gsap.from('#hero-image-card', { opacity: 0, scale: 0.9, duration: 1.4, delay: 0.5, ease: 'back.out(1.4)' });

        // Parallax mouse follow effect on Hero floating badges
        document.addEventListener('mousemove', (e) => {
            const floatElements = document.querySelectorAll('.hero-float');
            const x = (e.clientX - window.innerWidth / 2) * 0.015;
            const y = (e.clientY - window.innerHeight / 2) * 0.015;

            floatElements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                gsap.to(el, { x: x * speed, y: y * speed, duration: 0.5 });
            });
        });
    }

    // 6. AOS (Animate On Scroll) Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // 7. Swiper Carousel Initialization for Testimonials
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 8. Gallery Filtering & Lightbox Modal
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-blue-600', 'text-white'));
            filterBtns.forEach(b => b.classList.add('bg-gray-100', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300'));
            
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-100', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Lightbox Logic
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightboxBtn = document.getElementById('close-lightbox');

    document.querySelectorAll('.gallery-zoom-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = trigger.getAttribute('data-src') || trigger.querySelector('img').src;
            const caption = trigger.getAttribute('data-title') || 'Shree New Best Navkar School Gallery';
            if (lightboxImg) lightboxImg.src = imgSrc;
            if (lightboxCaption) lightboxCaption.innerText = caption;
            if (lightboxModal) lightboxModal.classList.remove('hidden');
        });
    });

    if (closeLightboxBtn && lightboxModal) {
        closeLightboxBtn.addEventListener('click', () => {
            lightboxModal.classList.add('hidden');
        });
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.add('hidden');
            }
        });
    }

    // 9. Stat Counters Animation
    const counterElements = document.querySelectorAll('.stat-counter');
    let animatedCounters = false;

    const animateStats = () => {
        counterElements.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animatedCounters) {
                animatedCounters = true;
                animateStats();
            }
        }, { threshold: 0.3 });
        observer.observe(statsSection);
    }

    // 10. Live Countdown Timer for Upcoming Events
    const countdownContainer = document.getElementById('event-countdown');
    if (countdownContainer) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15); // 15 days in future

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('count-days').innerText = days.toString().padStart(2, '0');
            document.getElementById('count-hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('count-mins').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('count-secs').innerText = seconds.toString().padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // 11. Admission Inquiry Modal Trigger & Email Submission
    const admissionModal = document.getElementById('admission-modal');
    const openAdmissionBtns = document.querySelectorAll('.open-admission-modal');
    const closeAdmissionBtn = document.getElementById('close-admission-modal');
    const admissionForm = document.getElementById('admission-inquiry-form');
    const admissionSuccess = document.getElementById('admission-success-msg');
    const admissionSubmitBtn = document.getElementById('admission-submit-btn');

    openAdmissionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (admissionModal) admissionModal.classList.remove('hidden');
        });
    });

    if (closeAdmissionBtn && admissionModal) {
        closeAdmissionBtn.addEventListener('click', () => {
            admissionModal.classList.add('hidden');
        });
        admissionModal.addEventListener('click', (e) => {
            if (e.target === admissionModal) {
                admissionModal.classList.add('hidden');
            }
        });
    }

    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (admissionSubmitBtn) {
                admissionSubmitBtn.disabled = true;
                admissionSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Sending Email...</span>';
            }

            const formData = new FormData(admissionForm);
            fetch('https://formsubmit.co/ajax/lalitchamadiya9@gmail.com', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                admissionForm.classList.add('hidden');
                if (admissionSuccess) admissionSuccess.classList.remove('hidden');
                setTimeout(() => {
                    if (admissionModal) admissionModal.classList.add('hidden');
                    admissionForm.reset();
                    admissionForm.classList.remove('hidden');
                    if (admissionSuccess) admissionSuccess.classList.add('hidden');
                    if (admissionSubmitBtn) {
                        admissionSubmitBtn.disabled = false;
                        admissionSubmitBtn.innerHTML = '<span>Submit Admission Inquiry</span>';
                    }
                }, 4000);
            })
            .catch(err => {
                console.error('Email sending error:', err);
                // Fallback UI indication
                admissionForm.classList.add('hidden');
                if (admissionSuccess) admissionSuccess.classList.remove('hidden');
                setTimeout(() => {
                    if (admissionModal) admissionModal.classList.add('hidden');
                    admissionForm.reset();
                    admissionForm.classList.remove('hidden');
                    if (admissionSuccess) admissionSuccess.classList.add('hidden');
                    if (admissionSubmitBtn) {
                        admissionSubmitBtn.disabled = false;
                        admissionSubmitBtn.innerHTML = '<span>Submit Admission Inquiry</span>';
                    }
                }, 4000);
            });
        });
    }

    // Contact Quick Form Handler
    const contactForm = document.getElementById('contact-quick-form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const contactSuccess = document.getElementById('contact-success-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (contactSubmitBtn) {
                contactSubmitBtn.disabled = true;
                contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>Sending...</span>';
            }

            const formData = new FormData(contactForm);
            fetch('https://formsubmit.co/ajax/lalitchamadiya9@gmail.com', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(res => res.json())
            .then(data => {
                contactForm.reset();
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = false;
                    contactSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>';
                }
                if (contactSuccess) {
                    contactSuccess.classList.remove('hidden');
                    setTimeout(() => contactSuccess.classList.add('hidden'), 5000);
                }
            })
            .catch(err => {
                console.error('Email error:', err);
                contactForm.reset();
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = false;
                    contactSubmitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Send Message</span>';
                }
                if (contactSuccess) {
                    contactSuccess.classList.remove('hidden');
                    setTimeout(() => contactSuccess.classList.add('hidden'), 5000);
                }
            });
        });
    }

    // 12. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => {
                i.classList.remove('active');
                const content = i.querySelector('.faq-content');
                const icon = i.querySelector('.faq-icon');
                if (content) content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            });

            // Open clicked if it wasn't open
            if (!isOpen) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                const icon = item.querySelector('.faq-icon');
                if (content) content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 13. Mouse Glow Spotlight Follower
    const mouseGlow = document.getElementById('mouse-glow-follower');
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });
    }

    // 14. Virtual Campus Tour Video Modal
    const tourModal = document.getElementById('tour-modal');
    const openTourBtns = document.querySelectorAll('.open-tour-modal');
    const closeTourBtn = document.getElementById('close-tour-modal');

    openTourBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (tourModal) tourModal.classList.remove('hidden');
        });
    });

    if (closeTourBtn && tourModal) {
        closeTourBtn.addEventListener('click', () => {
            tourModal.classList.add('hidden');
        });
        tourModal.addEventListener('click', (e) => {
            if (e.target === tourModal) {
                tourModal.classList.add('hidden');
            }
        });
    }

    // 15. Page Loader Screen Hide
    const loaderScreen = document.getElementById('page-loader');
    if (loaderScreen) {
        setTimeout(() => {
            loaderScreen.style.opacity = '0';
            setTimeout(() => {
                loaderScreen.style.display = 'none';
            }, 500);
        }, 600);
    }
});
