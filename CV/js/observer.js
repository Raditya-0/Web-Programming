// observer.js — IntersectionObserver for scroll-in animations

Portfolio.initObserver = function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
            } else {
                entry.target.classList.remove('show-element');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.achievement-card, .project-card, .section-header')
        .forEach((el) => observer.observe(el));
};
