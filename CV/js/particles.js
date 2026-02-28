// particles.js — Animated particle background for CV

(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function Particle() { this.reset(true); }

    Particle.prototype.reset = function (init) {
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : -5;
        this.r = Math.random() * 1.6 + 0.2;
        this.alpha = Math.random() * 0.45 + 0.05;
        this.speed = Math.random() * 0.4 + 0.08;
        this.drift = (Math.random() - 0.5) * 0.25;
    };

    Particle.prototype.update = function () {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > h + 5) this.reset(false);
    };

    function init() {
        resize();
        particles = Array.from({ length: 100 }, () => new Particle());
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 144, 226, ${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    init();
    draw();
})();
