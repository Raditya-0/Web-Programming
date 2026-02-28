// scroll.js — Snap-scroll engine (plain script, no ES modules)
// Shares global scope with other scripts loaded via <script defer>

const Portfolio = window.Portfolio = window.Portfolio || {};

Portfolio.state = {
    currentIndex: 0,
    isLocked: false,
    wheelAccumulator: 0,
};

Portfolio.scrollThreshold = 150;
const touchThreshold = 80;

Portfolio.sections = [
    document.querySelector('.hero'),
    document.querySelector('#education'),
    document.querySelector('#experience'),
    document.querySelector('#projects'),
    document.querySelector('#achievement'),
    document.querySelector('#contact')
];

const progressContainer = document.querySelector('.scroll-progress-container');
const progressBar = document.querySelector('.scroll-progress-bar');

// Easing
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

Portfolio.smoothScrollTo = function (targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
};

// Progress bar
Portfolio.updateProgressBar = function (percentage) {
    progressContainer.classList.add('active');
    progressBar.style.width = `${percentage}%`;
};

Portfolio.hideProgressBar = function () {
    progressContainer.classList.remove('active');
    setTimeout(() => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => { progressBar.style.transition = 'width 0.15s ease-out'; }, 50);
    }, 400);
};

// Section snap
Portfolio.handleScroll = function (direction) {
    const { state, sections, hideProgressBar, smoothScrollTo, updateProgressBar } = Portfolio;

    if (direction > 0) {
        if (state.currentIndex === sections.length - 1) { hideProgressBar(); return; }
        state.currentIndex++;
    } else {
        if (state.currentIndex === 0) { hideProgressBar(); return; }
        state.currentIndex--;
    }

    state.isLocked = true;
    state.wheelAccumulator = 0;

    const targetPosition = sections[state.currentIndex].offsetTop;
    smoothScrollTo(targetPosition, 1200);
    sessionStorage.setItem('lastSection', state.currentIndex);

    progressBar.style.width = '100%';
    setTimeout(() => hideProgressBar(), 200);
    setTimeout(() => {
        state.isLocked = false;
        state.wheelAccumulator = 0;
    }, 1200);
};

// Wheel handler
let resetTimeout;
let wasScrollingInternally = false;

window.addEventListener('wheel', (e) => {
    const { state, sections, handleScroll, updateProgressBar, hideProgressBar } = Portfolio;
    if (state.isLocked) { e.preventDefault(); return; }

    const currentSection = sections[state.currentIndex];
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const canScrollDown = currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1;
    const canScrollUp = currentSection.scrollTop > 0;

    if ((scrollingDown && canScrollDown) || (scrollingUp && canScrollUp)) {
        wasScrollingInternally = true;
        state.wheelAccumulator = 0;
        hideProgressBar();
        return;
    }

    if (wasScrollingInternally) {
        wasScrollingInternally = false;
        state.wheelAccumulator = 0;
        e.preventDefault();
        return;
    }

    e.preventDefault();
    state.wheelAccumulator += e.deltaY;

    const percentage = Math.min((Math.abs(state.wheelAccumulator) / Portfolio.scrollThreshold) * 100, 100);
    updateProgressBar(percentage);

    clearTimeout(resetTimeout);
    if (Math.abs(state.wheelAccumulator) >= Portfolio.scrollThreshold) {
        handleScroll(state.wheelAccumulator);
    } else {
        resetTimeout = setTimeout(() => {
            state.wheelAccumulator = 0;
            hideProgressBar();
        }, 300);
    }
}, { passive: false });

// Touch handlers
let touchStartY = 0;
let currentTouchY = 0;

window.addEventListener('touchstart', (e) => {
    if (Portfolio.state.isLocked) return;
    touchStartY = e.touches[0].clientY;
    currentTouchY = touchStartY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    const { state, sections, handleScroll, updateProgressBar } = Portfolio;
    if (state.isLocked) { e.preventDefault(); return; }

    currentTouchY = e.touches[0].clientY;
    const deltaY = touchStartY - currentTouchY;
    const currentSection = sections[state.currentIndex];
    const scrollingDown = deltaY > 0;
    const scrollingUp = deltaY < 0;
    const canScrollDown = currentSection.scrollTop + currentSection.clientHeight < currentSection.scrollHeight - 1;
    const canScrollUp = currentSection.scrollTop > 0;

    if ((scrollingDown && canScrollDown) || (scrollingUp && canScrollUp)) return;

    e.preventDefault();
    const percentage = Math.min((Math.abs(deltaY) / touchThreshold) * 100, 100);
    updateProgressBar(percentage);
    if (Math.abs(deltaY) >= touchThreshold) handleScroll(deltaY);
}, { passive: false });

window.addEventListener('touchend', () => {
    if (Portfolio.state.isLocked) return;
    const deltaY = touchStartY - currentTouchY;
    if (Math.abs(deltaY) < touchThreshold) Portfolio.hideProgressBar();
});
