import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// Create the game world
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x080808);

// Create the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.7, 5);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(renderer.domElement);

// Basic light
const light = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(light);

// Game loop
function gameLoop() {

    requestAnimationFrame(gameLoop);

    renderer.render(
        scene,
        camera
    );
}

gameLoop();

// Resize
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});
