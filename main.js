const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000500); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0x00ff00, 1, 100);
light.position.set(0, 10, 0);
scene.add(light, new THREE.AmbientLight(0x404040));

// Arena Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshStandardMaterial({ color: 0x050505 }));
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// GREEN CLAW SKY
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

// Weapons
const pistol = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.6), new THREE.MeshStandardMaterial({color: 0x333333}));
pistol.position.set(0.6, 0, -0.5);
player.add(pistol)
let cameraMode = 2; 

const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    // Switch Camera with V
    if(e.code === 'KeyV') {
        cameraMode = (cameraMode + 1) % 3;
    }
});
window.addEventListener('keyup', (e) => keys[e.code] = false);

// NPCs
const enemies = [];
function spawnEnemy() {
    const e = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0xff0000}));
    e.position.set((Math.random()-0.5)*80, 0.
