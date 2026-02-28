// main.js — Entry point: init all modules after DOM is ready

document.addEventListener('DOMContentLoaded', () => {
    const { sections, state, smoothScrollTo, initObserver, initNavbar,
        initProjects, initTyping, initSlideshow } = Portfolio;

    // Restore last visited section after refresh
    const savedIndex = parseInt(sessionStorage.getItem('lastSection'));
    if (!isNaN(savedIndex) && savedIndex > 0 && savedIndex < sections.length) {
        state.currentIndex = savedIndex;
        window.scrollTo(0, sections[savedIndex].offsetTop);
    }

    initObserver();
    initNavbar();
    initProjects();
    initTyping();
    initSlideshow();
});
