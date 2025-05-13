const canvas = document.getElementById('vr-canvas');
const ctx = canvas.getContext('2d');

function init() {
    resizeCanvas();
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Your VR rendering logic here

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
document.addEventListener('DOMContentLoaded', init);
