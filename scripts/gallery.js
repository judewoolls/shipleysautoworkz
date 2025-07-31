const buttons = document.querySelectorAll('[data-carousel-button]');

let address = 'images/shipleysautoworkz/';
const mediaItems = [
    ...Array.from({ length: 25 }, (_, i) => ({ type: 'image', src: `${i + 1}.webp` }))
];

const slidesContainer = document.querySelector('[data-slides]');

if (slidesContainer) {
    mediaItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('slide');
        if (index === 0) li.dataset.active = ''; // Set only the first as active

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = address + item.src;
            // img.loading = 'lazy'; // Lazy load images
            img.alt = `Media ${index + 1}`;
            li.appendChild(img);
        } 
        slidesContainer.appendChild(li);
    });
}

function updateSlideBackground() {
    const activeSlide = slidesContainer.querySelector('[data-active]');
    const carousel = document.querySelector('.carousel');
    if (activeSlide) {
        const img = activeSlide.querySelector('img');
        const video = activeSlide.querySelector('video');
        if (img && document.body.clientWidth > 991) {
            if (img.complete) {
                carousel.style.backgroundImage = `url(${img.src})`;
            }
        } else if (video) {
            carousel.style.backgroundImage = ''; // Clear background for videos
        }
    }
}

if (buttons.length > 0 && slidesContainer) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
            const slides = button.closest('[data-carousel]').querySelector('[data-slides]');

            const activeSlide = slides.querySelector('[data-active]');
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) newIndex = slides.children.length - 1;
            if (newIndex >= slides.children.length) newIndex = 0;

            // Remove 'data-active' from current slide
            delete activeSlide.dataset.active;
            // Set 'data-active' on new slide
            slides.children[newIndex].dataset.active = '';
            updateSlideBackground();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateSlideBackground(); // Set initial background
});
// Ensure the background updates when the page loads