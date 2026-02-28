// navbar.js — Navbar click handler + hero button anchor sync

Portfolio.initNavbar = function () {
    const { sections, state, smoothScrollTo } = Portfolio;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Handle internal section links: navbar + hero buttons
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId) ||
                (targetId === '' ? document.querySelector('.hero') : null);
            if (!targetSection) return;

            e.preventDefault();

            const idx = sections.indexOf(targetSection);
            if (idx === -1) return;

            sections.forEach(s => { s.scrollTop = 0; });

            state.currentIndex = idx;
            state.isLocked = true;
            state.wheelAccumulator = 0;

            smoothScrollTo(targetSection.offsetTop, 1000);
            sessionStorage.setItem('lastSection', idx);

            setTimeout(() => { state.isLocked = false; }, 1000);
        });
    });
};
