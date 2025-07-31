// Gallery Script with Mobile-Safe Checks

const buttons = document.querySelectorAll('[data-carousel-button]');
const slidesContainer = document.querySelector('[data-slides]');
const carousel = document.querySelector('.carousel');

let address = 'images/shipleysautoworkz/';
const mediaItems = [
    ...Array.from({ length: 22 }, (_, i) => ({ type: 'image', src: `${i + 1}.webp` }))
];

document.addEventListener('DOMContentLoaded', () => {
    // Disable gallery setup on very small screens if needed
    if (!slidesContainer) return;

    mediaItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('slide');
        if (index === 0) li.dataset.active = '';

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = `${address}${item.src}`;
            img.alt = `Media ${index + 1}`;
            img.loading = 'lazy';
            li.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = `${address}${item.src}`;
            video.controls = true;
            video.alt = `Media ${index + 1}`;
            li.appendChild(video);
        }

        slidesContainer.appendChild(li);
    });
    if (window.innerWidth > 991) {
    updateSlideBackground();
    }
});

function updateSlideBackground() {
    if (!slidesContainer || !carousel) return;

    const activeSlide = slidesContainer.querySelector('[data-active]');
    if (!activeSlide) return;

    const img = activeSlide.querySelector('img');
    const video = activeSlide.querySelector('video');
    if (img && window.innerWidth > 991) {
        if (img.complete) {
            carousel.style.backgroundImage = `url(${img.src})`;
        } else {
            img.onload = () => {
                carousel.style.backgroundImage = `url(${img.src})`;
            };
        }
    } else if (video) {
        carousel.style.backgroundImage = '';
    }
}

if (buttons.length > 0) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const slidesWrapper = button.closest('[data-carousel]')?.querySelector('[data-slides]');
            if (!slidesWrapper) return;

            const activeSlide = slidesWrapper.querySelector('[data-active]');
            if (!activeSlide) return;

            const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
            let newIndex = [...slidesWrapper.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) newIndex = slidesWrapper.children.length - 1;
            if (newIndex >= slidesWrapper.children.length) newIndex = 0;

            delete activeSlide.dataset.active;
            slidesWrapper.children[newIndex].dataset.active = '';
            updateSlideBackground();
        });
    });
}
