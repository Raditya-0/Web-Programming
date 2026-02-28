// slideshow.js — Portrait photo crossfade slideshow

Portfolio.initSlideshow = function () {
    const slides = document.querySelectorAll('.portrait-slide');
    if (slides.length <= 1) return;

    let slideIndex = 0;
    setInterval(() => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 4000);
};
