import * as THREE from 'https://unpkg.com/three@0.132.2/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000500); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const light = new THREE.PointLight(0x00ff00, 1, 100);
light.position.set(0, 10, 0);
scene.add(light, new THREE.AmbientLight(0x404040));


const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x050505 }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const wallG = new THREE.BoxGeometry(100, 10, 1);
const w1 = new THREE.Mesh(wallG, wallMat); w1.position.set(0, 5, -50);
const w2 = new THREE.Mesh(wallG, wallMat); w2.position.set(0, 5, 50);
scene.add(w1, w2);


for(let i = 0; i < 4; i++) {
    const claw = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 20, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    claw.position.set(-15 + (i * 10), 40, -40);
    claw.rotation.z = Math.PI / 4;
    scene.add(claw);
}


const player = new THREE.Group();
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
player.add(body);
scene.add(player);

const pistol = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.6), new THREE.MeshStandardMaterial({color: 0x333333}));
const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 1.2), new THREE.MeshStandardMaterial({color: 0x222222}));
const knife = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.05, 0.5), new THREE.MeshStandardMaterial({color: 0xaaaaaa}));
pistol.position.set(0.6, 0, -0.5);
player.add(pistol);

let currentWeapon = 'pistol';
let grenades = 3;


const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if(e.key === '1') { player.remove(rifle, knife); player.add(pistol); currentWeapon = 'pistol'; }
    if(e.key === '2') { player.remove(pistol, knife); player.add(rifle); currentWeapon = 'rifle'; }
    if(e.key === '3') { player.remove(pistol, rifle); player.add(knife); currentWeapon = 'knife'; }
    if(e.key === '4') throwGrenade();
});
window.addEventListener('keyup', (e) => keys[e.code] = false);


const bullets = [];
window.addEventListener('mousedown', () => {
    if(currentWeapon === 'knife') return;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({color: 0x00ff00}));
    b.position.copy(player.position);
    b.velocity = new THREE.Vector3(0, 0, -0.8).applyQuaternion(player.quaternion);
    scene.add(b);
    bullets.push(b);
});

function throwGrenade() { if(grenades > 0) { console.log("Grenade!"); grenades--; } }


const enemies = [];
function spawnEnemy() {
    const e = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0xff0000}));
    e.position.set((Math.random()-0.5)*80, 0.5, -40);
    scene.add(e);
    enemies.push(e);
}
setInterval(spawnEnemy, 2000);

function animate() {
    requestAnimationFrame(animate);
    if(keys['KeyW']) player.position.z -= 0.15;
    if(keys['KeyS']) player.position.z += 0.15;
    if(keys['KeyA']) player.position.x -= 0.15;
    if(keys['KeyD']) player.position.x += 0.15;

    bullets.forEach((b, i) => {
        b.position.add(b.velocity);
        if(b.position.length() > 100) { scene.remove(b); bullets.splice(i, 1); }
    });

    enemies.forEach(e => {
        const dir = new THREE.Vector3().subVectors(player.position, e.position).normalize();
        e.position.addScaledVector(dir, 0.05);
        e.lookAt(player.position);
    });

    camera.position.set(player.position.x, player.position.y + 10, player.position.z + 15);
    camera.lookAt(player.position);
    renderer.render(scene, camera);
}
animate();
