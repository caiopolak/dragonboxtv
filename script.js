document.addEventListener('DOMContentLoaded', () => {

    // ===================== AOS INIT =====================

    AOS.init({
        duration: 700,
        easing: 'ease-out',
        once: true,
        mirror: false
    });

    // ===================== NAVBAR =====================

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        navbar.classList.toggle('scrolled', sy > 60);
        lastScroll = sy;
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
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                counter.textContent = current.toLocaleString('pt-BR');
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounters();
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ===================== PRICING TOGGLE =====================

    const toggleBtns = document.querySelectorAll('.toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
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

    // ===================== GALLERY FILTERS =====================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            let delay = 0;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.opacity = '1'; }, delay);
                    delay += 40;
                } else {
                    item.style.display = 'none';
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
    let lightboxIndex = -1;
    let lightboxImages = [];

    function openLightbox(index) {
        lightboxIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay span')?.textContent || '';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = `${index + 1} / ${galleryItems.length} — ${title}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(dir) {
        if (lightboxIndex < 0) return;
        const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        let idx = visibleItems.indexOf(galleryItems[lightboxIndex]);
        if (idx < 0) idx = 0;
        idx = (idx + dir + visibleItems.length) % visibleItems.length;
        const newItem = visibleItems[idx];
        const globalIdx = Array.from(galleryItems).indexOf(newItem);
        openLightbox(globalIdx);
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ===================== FAQ ACCORDION =====================

    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

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

    // ===================== TESTIMONIAL CAROUSEL =====================

    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
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
            track.style.transform = `translateX(-${index * 100}%)`;
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

});
