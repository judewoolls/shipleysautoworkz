const buttons = document.querySelectorAll('[data-carousel-button]');
const slidesContainer = document.querySelector('[data-slides]');
const carousel = document.querySelector('.carousel');

let address = 'images/shipleysautoworkz/';
const totalMedia = 22;
const buffer = 2;
let currentIndex = 0;
let activeSlides = new Set();
let preloadCache = {};

document.addEventListener('DOMContentLoaded', () => {
    if (!slidesContainer) return;
    renderVisibleSlides();
    preloadImages(currentIndex);
    if (window.innerWidth > 991) updateSlideBackground();
});

function renderVisibleSlides() {
    slidesContainer.innerHTML = '';
    activeSlides.clear();

    for (let offset = -buffer; offset <= buffer; offset++) {
        const index = (currentIndex + offset + totalMedia) % totalMedia;
        createSlide(index, offset === 0);
        activeSlides.add(index);
    }
}

function createSlide(index, isActive = false) {
    const li = document.createElement('li');
    li.classList.add('slide');
    if (isActive) li.dataset.active = '';

    const img = document.createElement('img');
    img.src = `${address}${index + 1}.webp`;
    img.alt = `Media ${index + 1}`;
    img.loading = 'lazy';
    li.appendChild(img);

    slidesContainer.appendChild(li);
}

function preloadImages(index) {
    const preloadIndices = [
        (index + buffer + 1) % totalMedia,
        (index - buffer - 1 + totalMedia) % totalMedia
    ];

    preloadIndices.forEach(idx => {
        if (!preloadCache[idx]) {
            const img = new Image();
            img.src = `${address}${idx + 1}.webp`;
            preloadCache[idx] = img;
        }
    });
}

function updateSlideBackground() {
    const activeSlide = slidesContainer.querySelector('[data-active]');
    if (!activeSlide) return;

    const img = activeSlide.querySelector('img');
    if (img && img.complete) {
        carousel.style.backgroundImage = `url(${img.src})`;
    } else if (img) {
        img.onload = () => {
            carousel.style.backgroundImage = `url(${img.src})`;
        };
    }
}

if (buttons.length > 0) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
            currentIndex = (currentIndex + offset + totalMedia) % totalMedia;
            renderVisibleSlides();
            preloadImages(currentIndex);
            updateSlideBackground();
        });
    });
}
