const gallery = document.querySelector('.gallery');
const galleryLeftButton = document.querySelector('.gallery-button:first-child');
const galleryRightButton = document.querySelector('.gallery-button:last-child');

let currentIndex = 0;
const images = [
    'images/Copilot_20250728_185951.png',
    'images/pexels-olly-3806288.jpg',
    'images/young-auto-mechanic-1024x683.jpg',
]

function updateGallery() {
    gallery.style.backgroundImage = `url(${images[currentIndex]})`;
    gallery.style.backgroundSize = 'cover';
    gallery.style.backgroundPosition = 'center';
    gallery.style.backgroundRepeat = 'no-repeat';
    gallery.style.transition = 'background-image 0.5s ease-in-out';
}

galleryLeftButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
    console.log(`Current index: ${currentIndex}, Image: ${images[currentIndex]}`);
});

galleryRightButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
    console.log(`Current index: ${currentIndex}, Image: ${images[currentIndex]}`);
});