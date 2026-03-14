// 1. Create the drawing area
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 2. Player position
let x = canvas.width / 2;
let y = canvas.height / 2;

// 3. Draw Loop
function draw() {
    // Clear the screen to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the "Teamer" Square (Green)
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x, y, 50, 50);

    requestAnimationFrame(draw);
}

// 4. Movement
window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') y -= 10;
    if (e.key === 's' || e.key === 'ArrowDown') y += 10;
    if (e.key === 'a' || e.key === 'ArrowLeft') x -= 10;
    if (e.key === 'd' || e.key === 'ArrowRight') x += 10;
});

draw();
