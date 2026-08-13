import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { createHouse } from "./house.js";

import { Intro } from "./intro.js";



// =====================================
// SCENE
// =====================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x050505);

scene.fog =
    new THREE.Fog(
        0x050505,
        3,
        28
    );


// =====================================
// CAMERA
// =====================================

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        100
    );


// =====================================
// RENDERER
// =====================================

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

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

document.body.appendChild(
    renderer.domElement
);


// =====================================
// LIGHTING
// =====================================

const ambient =
    new THREE.AmbientLight(
        0x777777,
        0.28
    );

scene.add(ambient);


const ceilingLight =
    new THREE.PointLight(
        0xffd5a3,
        2.2,
        12
    );

ceilingLight.position.set(
    0,
    3.5,
    1
);

ceilingLight.castShadow = true;

scene.add(ceilingLight);


// =====================================
// HOUSE
// =====================================

createHouse(scene);


// =====================================
// INTRO
// =====================================

const intro =
    new Intro(
        scene,
        camera
    );


// =====================================
// CLOCK
// =====================================

const clock =
    new THREE.Clock();


// =====================================
// GAME LOOP
// =====================================

function animate() {

    requestAnimationFrame(
        animate
    );

    const delta =
        clock.getDelta();

    intro.update(delta);

    renderer.render(
        scene,
        camera
    );
}

animate();


// =====================================
// RESIZE
// =====================================

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
