import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

// 1. Setup the Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Add Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 3. Create the Player (Teamer)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green like the claw marks
const player = new THREE.Mesh(geometry, material);
scene.add(player);

camera.position.z = 5;

// 4. Movement Controls
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

// 5. Game Loop
function animate() {
    requestAnimationFrame(animate);

    if (keys['ArrowUp'] || keys['KeyW']) player.position.y += 0.1;
    if (keys['ArrowDown'] || keys['KeyS']) player.position.y -= 0.1;
    if (keys['ArrowLeft'] || keys['KeyA']) player.position.x -= 0.1;
    if (keys['ArrowRight'] || keys['KeyD']) player.position.x += 0.1;

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
