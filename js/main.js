// ========================================
// GODMOTHER 1
// Main Game File
// ========================================

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { Intro } from "./intro.js";

import { createHouse } from "./house.js";


// ========================================
// SCENE
// ========================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x050505);

scene.fog =
    new THREE.Fog(
        0x050505,
        2,
        35
    );


// ========================================
// CAMERA
// ========================================

const camera =
    new THREE.PerspectiveCamera(
        75,

        window.innerWidth /
        window.innerHeight,

        0.1,

        1000
    );

camera.position.set(
    -5,
    1.7,
    6
);


// ========================================
// RENDERER
// ========================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.shadowMap.enabled =
    true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// ========================================
// LIGHTING
// ========================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.25
    );

scene.add(
    ambientLight
);

const moonLight =
    new THREE.DirectionalLight(
        0x8fa7ff,
        0.25
    );

moonLight.position.set(
    -5,
    10,
    5
);

moonLight.castShadow =
    true;

scene.add(
    moonLight
);


// ========================================
// HOUSE
// ========================================

createHouse(
    scene
);


// ========================================
// INTRO
// ========================================

const intro =
    new Intro(
        scene,
        camera
    );


// ========================================
// CLOCK
// ========================================

const clock =
    new THREE.Clock();


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    requestAnimationFrame(
        gameLoop
    );

    const delta =
        clock.getDelta();


    // Update intro
    intro.update(
        delta
    );


    // Render
    renderer.render(
        scene,
        camera
    );
}


// ========================================
// START GAME
// ========================================

gameLoop();


// ========================================
// WINDOW RESIZE
// ========================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
