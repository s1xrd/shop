document.addEventListener('DOMContentLoaded', () => {

    // ===== ПРЕЛОАДЕР =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
        // Fallback: скрыть через 3 секунды
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000);
    }

    // ===== БУРГЕР-МЕНЮ =====
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие при клике на ссылку
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== ХЕДЕР ПРИ СКРОЛЛЕ =====
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Тень хедера
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }

        // Кнопка "наверх"
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', scrollY > 400);
        }
    });

    // Кнопка наверх — клик
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== REVEAL ON SCROLL =====
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger-эффект
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== FAQ АККОРДЕОН =====
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            // Закрываем другие
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // ===== ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ =====
    const privacyBtn = document.getElementById('togglePrivacy');
    const privacyContent = document.getElementById('privacyText');

    if (privacyBtn && privacyContent) {
        privacyBtn.addEventListener('click', () => {
            const isVisible = privacyContent.style.display === 'block';
            privacyContent.style.display = isVisible ? 'none' : 'block';
            privacyBtn.textContent = isVisible ? 'Показать текст' : 'Скрыть текст';

            if (!isVisible) {
                privacyContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Авто-открытие если #privacyText в URL
    if (window.location.hash === '#privacyText' || window.location.hash === '#privacySection') {
        if (privacyContent) {
            privacyContent.style.display = 'block';
            if (privacyBtn) privacyBtn.textContent = 'Скрыть текст';
            setTimeout(() => {
                const section = document.getElementById('privacySection') || privacyContent;
                section.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    // ===== СЧЁТЧИК СТАТИСТИКИ =====
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    const duration = 1500;
                    const stepTime = duration / (target / increment);

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }
                        el.textContent = current;
                    }, stepTime);

                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // ===== ДИНАМИЧЕСКАЯ ВЫСОТА IFRAME =====
    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'iframe-resize') {
            const iframe = document.querySelector('iframe[name="ya-form-order"]');
            if (iframe && e.data.height) {
                iframe.style.height = e.data.height + 'px';
                const box = document.querySelector('.iframe-box');
                if (box) box.style.minHeight = e.data.height + 'px';
            }
        }
    });

    // ===== ПЛАВНАЯ ПРОКРУТКА К ФОРМЕ =====
    if (window.location.hash === '#order-form') {
        const formElement = document.querySelector('.order-form');
        if (formElement) {
            setTimeout(() => {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});