// typing.js — Typing animation and dynamic hero content

Portfolio.typingData = [
    {
        text: "Raditya Akmal",
        subtitle: "✨ Welcome to my portfolio",
        tags: ["Problem Solver", "Tech Enthusiast", "Fast Learner"]
    },
    {
        text: "an AI Engineer",
        subtitle: "🧠 Building intelligent models and LLM",
        tags: ["Python", "Transformer", "Hugging Face", "Kaggle", "LLM", "Machine Learning", "Deep Learning", "Computer Vision"]
    },
    {
        text: "a Robot Programmer",
        subtitle: "🤖 Developing advanced control and navigation",
        tags: ["ROS 2", "STM32", "C++", "Computer Vision", "FAST-LIVO2"]
    },
    {
        text: "a Game Developer",
        subtitle: "🎮 Crafting interactive mechanics and experiences",
        tags: ["Unity", "Godot", "Game Design", "2D Games", "3D Games", "C#", "GDScript"]
    }
];

Portfolio.initTyping = function () {
    const typingData = Portfolio.typingData;
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;

    let textArrayIndex = 0;
    let charIndex = 0;

    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const dynamicSubtitle = document.querySelector('.dynamic-subtitle');
    const dynamicTags = document.querySelector('.dynamic-tags');

    function updateDynamicContent() {
        const currentData = typingData[textArrayIndex];
        dynamicSubtitle.textContent = currentData.subtitle;

        dynamicTags.innerHTML = '';
        currentData.tags.forEach((tag, index) => {
            const span = document.createElement('span');
            span.className = 'dynamic-tag';
            span.textContent = tag;
            span.style.animationDelay = `${index * 0.1}s`;
            dynamicTags.appendChild(span);

            if ((index + 1) % 4 === 0 && index + 1 < currentData.tags.length) {
                const br = document.createElement('div');
                br.className = 'tags-row-break';
                dynamicTags.appendChild(br);
            }
        });
    }

    function type() {
        if (charIndex === 0) updateDynamicContent();
        if (charIndex < typingData[textArrayIndex].text.length) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += typingData[textArrayIndex].text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = typingData[textArrayIndex].text.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex = (textArrayIndex + 1) % typingData.length;
            setTimeout(type, typingDelay + 500);
        }
    }

    updateDynamicContent();
    setTimeout(type, newTextDelay);
};
