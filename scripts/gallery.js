const gallery = document.querySelector('.gallery');
const galleryLeftButton = document.querySelector('.gallery-button:first-child');
const galleryRightButton = document.querySelector('.gallery-button:last-child');

let currentIndex = 0;
const images = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', 
    '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', 
    '21.png', '22.png', '23.png', '24.png', '25.png'
]

function updateGallery() {
    gallery.style.backgroundImage = `url(images/shipleysautoworkz/${images[currentIndex]})`;
    gallery.style.backgroundSize = 'contain';
    gallery.style.backgroundPosition = 'center';
    gallery.style.backgroundRepeat = 'no-repeat';
    gallery.style.transition = 'background-image 0.5s ease-in-out';
}

galleryLeftButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
});

galleryRightButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
});