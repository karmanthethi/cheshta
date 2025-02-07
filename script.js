const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const pixelSize = 1.5; 
const numPixels = 30000; 
const colors = ['#F10166', '#F90E91', '#FFC4D8', '#F9BCC3', '#FAF4E7']; // Love-themed colors
const pixels = []; 

function initPixels() {
    for (let i = 0; i < numPixels; i++) {
        pixels.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.5 + 1,
            angle: Math.random() * Math.PI * 2,
        });
    }
}

function drawHeart() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 250;

    for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];
        const dx = (pixel.x - centerX) / scale;
        const dy = (pixel.y - centerY) / scale;

        const heartEquation =
            Math.pow(dx * dx + (-dy) * (-dy) - 1, 3) - dx * dx * (-dy) * (-dy) * (-dy);

        if (heartEquation < 0) {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
        }
    }
}

function animatePixels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i];

        pixel.x += Math.cos(pixel.angle) * pixel.speed;
        pixel.y += Math.sin(pixel.angle) * pixel.speed;

        if (pixel.x < 0) pixel.x = canvas.width;
        if (pixel.x > canvas.width) pixel.x = 0;
        if (pixel.y < 0) pixel.y = canvas.height;
        if (pixel.y > canvas.height) pixel.y = 0;
    }

    drawHeart();
    requestAnimationFrame(animatePixels);
}

initPixels();
animatePixels();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});