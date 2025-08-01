const buttons = document.querySelectorAll('[data-carousel-button]');
const slidesContainer = document.querySelector('[data-slides]');
const carousel = document.querySelector('.carousel');

const address = 'images/shipleysautoworkz/';
const mediaItems = Array.from({ length: 22 }, (_, i) => ({
    type: 'image',
    src: `${i + 1}.webp`
}));

let activeIndex = 0;
const buffer = 2; // how many to keep before/after

document.addEventListener('DOMContentLoaded', () => {
    if (!slidesContainer) return;
    renderSlides();
    if (window.innerWidth > 991) updateSlideBackground();
});

function renderSlides() {
    slidesContainer.innerHTML = ''; // Clear old slides

    const start = Math.max(0, activeIndex - buffer);
    const end = Math.min(mediaItems.length - 1, activeIndex + buffer);

    for (let i = start; i <= end; i++) {
        const li = document.createElement('li');
        li.classList.add('slide');
        if (i === activeIndex) li.dataset.active = '';

        if (mediaItems[i].type === 'image') {
            const img = document.createElement('img');
            img.src = `${address}${mediaItems[i].src}`;
            img.alt = `Media ${i + 1}`;
            img.loading = 'lazy';
            li.appendChild(img);
        }
        slidesContainer.appendChild(li);
    }
}

function updateSlideBackground() {
    const activeSlide = slidesContainer.querySelector('[data-active]');
    if (!activeSlide) return;

    const img = activeSlide.querySelector('img');
    if (img && window.innerWidth > 991) {
        if (img.complete) {
            carousel.style.backgroundImage = `url(${img.src})`;
        } else {
            img.onload = () => {
                carousel.style.backgroundImage = `url(${img.src})`;
            };
        }
    }
}

if (buttons.length > 0) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
            activeIndex = (activeIndex + offset + mediaItems.length) % mediaItems.length;
            renderSlides();
            updateSlideBackground();
        });
    });
}
