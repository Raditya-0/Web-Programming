// projects.js — See More / See Less toggle

Portfolio.initProjects = function () {
    const seeMoreBtn = document.getElementById('see-more-btn');
    const projectsExtra = document.getElementById('projects-extra');
    const projectsSection = document.getElementById('projects');

    if (!seeMoreBtn || !projectsExtra) return;

    seeMoreBtn.addEventListener('click', () => {
        const isOpen = projectsExtra.classList.toggle('expanded');
        seeMoreBtn.classList.toggle('open', isOpen);
        seeMoreBtn.firstChild.textContent = isOpen ? 'See Less ' : 'See More Projects ';

        if (!isOpen) {
            projectsSection.scrollTop = 0;
        }
    });
};
