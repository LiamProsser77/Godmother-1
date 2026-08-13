import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x080808);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.7, 8);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const mainLight = new THREE.PointLight(0xffe8c0, 2, 30);
mainLight.position.set(0, 4, 0);
scene.add(mainLight);

// Floor
const floorGeometry = new THREE.BoxGeometry(20, 0.2, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a3028
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.position.y = -0.1;
scene.add(floor);

// Create walls
function createWall(x, y, z, width, height, depth) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const material = new THREE.MeshStandardMaterial({
        color: 0x4b4038
    });

    const wall = new THREE.Mesh(
        geometry,
        material
    );

    wall.position.set(x, y, z);

    scene.add(wall);

    return wall;
}

// Outer walls
createWall(0, 2, -10, 20, 4, 0.4);
createWall(-10, 2, 0, 0.4, 4, 20);
createWall(10, 2, 0, 0.4, 4, 20);

// Back of house
createWall(0, 2, 10, 20, 4, 0.4);

// Interior walls

// Kitchen
createWall(-4, 2, 4, 12, 4, 0.3);

// Living room
createWall(4, 2, 0, 0.3, 4, 8);

// Guest bedroom
createWall(-5, 2, -4, 10, 4, 0.3);

// Godmother bedroom
createWall(5, 2, -4, 10, 4, 0.3);

// Controls
const controls = new PointerLockControls(
    camera,
    document.body
);

document.body.addEventListener("click", () => {
    controls.lock();
});

const keys = {};

document.addEventListener("keydown", event => {
    keys[event.code] = true;
});

document.addEventListener("keyup", event => {
    keys[event.code] = false;
});

const clock = new THREE.Clock();

function updatePlayer(delta) {

    if (!controls.isLocked) return;

    const speed = 4 * delta;

    if (keys["KeyW"]) {
        controls.moveForward(speed);
    }

    if (keys["KeyS"]) {
        controls.moveForward(-speed);
    }

    if (keys["KeyA"]) {
        controls.moveRight(-speed);
    }

    if (keys["KeyD"]) {
        controls.moveRight(speed);
    }

    camera.position.y = 1.7;
}

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    updatePlayer(delta);

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
