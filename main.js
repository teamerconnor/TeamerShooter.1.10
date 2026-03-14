import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 3D Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 3D Player (The Teamer)
const playerGroup = new THREE.Group();
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
const gun = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), new THREE.MeshStandardMaterial({ color: 0x333333 }));
gun.position.set(0.4, 0, -0.6); // Position the pistol
playerGroup.add(body, gun);
scene.add(playerGroup);

camera.position.set(0, 5, 10);
camera.lookAt(playerGroup.position);

// Movement
const keys = {};
window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function animate() {
    requestAnimationFrame(animate);
    
    if (keys['KeyW']) playerGroup.position.z -= 0.1;
    if (keys['KeyS']) playerGroup.position.z += 0.1;
    if (keys['KeyA']) playerGroup.position.x -= 0.1;
    if (keys['KeyD']) playerGroup.position.x += 0.1;

    camera.position.x = playerGroup.position.x;
    camera.position.z = playerGroup.position.z + 10;
    
    renderer.render(scene, camera);
}
animate();
