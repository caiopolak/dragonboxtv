document.addEventListener('DOMContentLoaded', () => {

    // ===================== AOS ANIMATIONS =====================
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false
    });

    // ===================== STICKY NAVBAR =====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===================== ANIMATED COUNTERS =====================
    const counters = document.querySelectorAll('.stat-num');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();
            
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // Cubic Ease Out
                const current = Math.round(eased * target);
                
                counter.textContent = current.toLocaleString('pt-BR');
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    const observerOptions = {
        threshold: 0.6
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounters();
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);

    // ===================== INTERACTIVE MOCKUP APP SIMULATOR =====================
    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    const screenContents = document.querySelectorAll('.screen-content');

    sidebarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            sidebarBtns.forEach(b => b.classList.remove('active'));
            screenContents.forEach(s => s.classList.remove('active'));

            // Set active states
            btn.classList.add('active');
            const targetId = `screen-${btn.dataset.target}`;
            const targetScreen = document.getElementById(targetId);
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
        });
    });

    // ===================== NETFLIX STYLE SLIDER ROW =====================
    const sliderTrack = document.getElementById('gallery-track-viewport');
    const prevBtn = document.querySelector('.row-prev');
    const nextBtn = document.querySelector('.row-next');

    if (sliderTrack && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({
                left: -336, // width + gap
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            sliderTrack.scrollBy({
                left: 336,
                behavior: 'smooth'
            });
        });
    }

    // ===================== GALLERY FILTERS =====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; }, 20);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    // ===================== LIGHTBOX =====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentIdx = -1;
    let visibleItems = [];

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    function openLightbox(index) {
        updateVisibleItems();
        currentIdx = index;
        const item = visibleItems[index];
        const img = item.querySelector('img');
        const titleText = item.querySelector('.gallery-overlay span')?.innerText || '';

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${titleText}</strong> — ${index + 1} de ${visibleItems.length}`;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(dir) {
        if (visibleItems.length === 0) return;
        currentIdx = (currentIdx + dir + visibleItems.length) % visibleItems.length;
        openLightbox(currentIdx);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const index = visibleItems.indexOf(item);
            if (index > -1) {
                openLightbox(index);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ===================== PRICING PERIOD TOGGLE =====================
    const pricingToggleBtns = document.querySelectorAll('.plans-toggle .toggle-btn');

    pricingToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pricingToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const period = btn.dataset.period;
            
            document.querySelectorAll('.plan-card').forEach(card => {
                const amount = card.querySelector('.plan-amount');
                const periodEl = card.querySelector('.plan-period');
                const saving = card.querySelector('.plan-saving');
                
                if (amount && periodEl) {
                    const key = period === 'monthly' ? 'monthly' : period === 'quarterly' ? 'quarterly' : 'yearly';
                    amount.textContent = amount.dataset[key];
                    periodEl.textContent = periodEl.dataset[key];
                    
                    if (saving) {
                        const saveText = saving.dataset[key] || '';
                        saving.textContent = saveText;
                    }
                }
            });
        });
    });

    // ===================== FAQ ACCORDION =====================
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===================== TESTIMONIAL CAROUSEL =====================
    const testimonialTrack = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    const cards = testimonialTrack ? testimonialTrack.querySelectorAll('.testimonial-card') : [];
    let currentSlide = 0;
    let autoSlideInterval;

    if (cards.length > 0) {
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentSlide = index;
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            dotsContainer.querySelectorAll('button').forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });
        }

        document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + cards.length) % cards.length);
            resetAutoSlide();
        });

        document.querySelector('.testimonial-next')?.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % cards.length);
            resetAutoSlide();
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                goToSlide((currentSlide + 1) % cards.length);
            }, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();
    }

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

});
