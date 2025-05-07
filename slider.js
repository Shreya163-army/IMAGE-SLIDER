const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pagination = document.querySelector('.pagination');
const loopToggle = document.getElementById('loop-toggle'); // New button for loop toggle
const speedInput = document.getElementById('speed-input'); // Input for custom speed

let index = 0;
let autoSlideInterval;
let isLooping = true; // Default looping
let transitionSpeed = 3000; // Default transition speed

function showSlide() {
    const width = images[0].clientWidth;
    slides.style.transform = `translateX(${-index * width}px)`;
    updatePagination();
}

// Next button functionality
nextButton.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showSlide();
});

// Previous button functionality
prevButton.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showSlide();
});

// Automatic slider functionality
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        if (isLooping || index < images.length - 1) {
            index = (index + 1) % images.length;
            showSlide();
        }
    }, transitionSpeed);
}

// Pause on hover
slides.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
slides.addEventListener('mouseleave', startAutoSlide);

// Adjust slide on window resize
window.addEventListener('resize', showSlide);

// Create pagination dots
images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
        index = i;
        showSlide();
        updatePagination();
    });
    pagination.appendChild(dot);
});

// Update active dot
function updatePagination() {
    const dots = document.querySelectorAll('.pagination span');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Keyboard navigation functionality
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        index = (index + 1) % images.length; // Move to the next slide
        showSlide();
    } else if (event.key === 'ArrowLeft') {
        index = (index - 1 + images.length) % images.length; // Move to the previous slide
        showSlide();
    }
});

// Loop toggle functionality
loopToggle.addEventListener('click', () => {
    isLooping = !isLooping;
    loopToggle.textContent = isLooping ? 'Disable Loop' : 'Enable Loop';
});

// Custom transition speed functionality
speedInput.addEventListener('input', (event) => {
    transitionSpeed = parseInt(event.target.value, 10) || 3000;
    startAutoSlide();
});

// Swipe gesture support
let startX = 0;
slides.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});
slides.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].clientX;
    if (startX - endX > 50) {
        index = (index + 1) % images.length; // Swipe left
        showSlide();
    } else if (endX - startX > 50) {
        index = (index - 1 + images.length) % images.length; // Swipe right
        showSlide();
    }
});

// Touchmove event to prevent scrolling while swiping
slides.addEventListener('touchmove', (event) => {
    event.preventDefault(); // Prevent scrolling
});

// Initialize pagination
updatePagination();

// Start the automatic slider
startAutoSlide();