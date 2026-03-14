import * as THREE from 'https://unpkg.com/three@0.132.2/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000500);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040); 
scene.add(light);
const dLight = new THREE.DirectionalLight(0x00ff00, 1);
dLight.position.set(5, 10, 7);
scene.add(dLight);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x111111 }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

for(let i = 0; i < 4; i++) {
    const claw = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 20, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    claw.position.set(-15 + (i * 10), 40, -40);
    claw.rotation.z = Math.PI / 4;
    scene.add(claw);
}

const player = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
scene.add(player);

camera.position.set(0, 10, 20);
camera.lookAt(player.position);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
