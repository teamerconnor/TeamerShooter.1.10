import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

const scene = new THREE.Scene();
// Sky with a hint of green
scene.background = new THREE.Color(0x000500); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.PointLight(0x00ff00, 1, 100);
light.position.set(0, 10, 0);
scene.add(light, new THREE.AmbientLight(0x404040));

// Floor & Walls
const wallMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshStandardMaterial({ color: 0x050505 }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Simple Walls
const wallG = new THREE.BoxGeometry(50, 5, 1);
const wall1 = new THREE.Mesh(wallG, wallMat); wall1.position.set(0, 2.5, -25);
const wall2 = new THREE.Mesh(wallG, wallMat); wall2.position.set(0, 2.5, 25);
scene.add(wall1, wall2);

// --- The Sky Claw Marks ---
// Creating 4 glowing green diagonal lines in the sky
for(let i = 0; i < 4; i++) {
    const claw = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 20, 4, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    claw.position.set(-10 + (i * 6), 40, -30);
    claw.rotation.z = Math.PI / 4;
    scene.add(claw);
}

// Player & Weapons
const player = new THREE.Group();
const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
player.add(body);
scene.add(player);

// Weapon Models (Simple Shapes)
const pistol = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.6), new THREE.MeshStandardMaterial({color: 0x333333}));
const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 1.2), new THREE.MeshStandardMaterial({color: 0x222222}));
const knife = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.5), new THREE.MeshStandardMaterial({color: 0xaaaaaa}));
pistol.position.set(0.6, 0, -0.5);
player.add(pistol); // Default weapon

let currentWeapon = 'pistol';
let grenades = 3;

// Input
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if(e.key === '1') switchWeapon('pistol');
    if(e.key === '2') switchWeapon('rifle');
    if(e.key === '3') switchWeapon('knife');
    if(e.key === '4') throwGrenade();
});
window.addEventListener('keyup', (e) => keys[e.code] = false);

function switchWeapon(type) {
    player.remove(pistol, rifle, knife);
    if(type === 'pistol') player.add(pistol);
    if(type === 'rifle') player.add(rifle);
    if(type === 'knife') player.add(knife);
    currentWeapon = type;
}

// Shooting
const bullets = [];
window.addEventListener('mousedown', () => {
    if(currentWeapon === 'knife') return; 
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshBasicMaterial({color: 0xffff00}));
    b.position.copy(player.position);
    b.velocity = new THREE.Vector3(0, 0, -0.5).applyQuaternion(player.quaternion);
    scene.add(b);
    bullets.push(b);
});

function throwGrenade() {
    if(grenades > 0) {
        console.log("Grenade Thrown!");
        grenades--;
    }
}

// NPCs
const enemies = [];
function spawnEnemy() {
    const e = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0xff0000}));
    e.position.set((Math.random()-0.5)*40, 0.5, -20);
    scene.add(e
