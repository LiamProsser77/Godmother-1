import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";

// =========================
// GODMOTHER 1
// =========================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x050505, 2, 28);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(-5, 1.7, 6);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// =========================
// PLAYER
// =========================

const controls = new PointerLockControls(
    camera,
    document.body
);

document.body.addEventListener("click", () => {
    controls.lock();
});

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

// =========================
// LIGHTING
// =========================

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.25
);

scene.add(ambientLight);

function addLight(x, y, z) {

    const light = new THREE.PointLight(
        0xffd9a3,
        1.4,
        9
    );

    light.position.set(x, y, z);

    light.castShadow = true;

    scene.add(light);
}

// Lights throughout the house
addLight(-5, 3, 5);
addLight(4, 3, 5);
addLight(-5, 3, -4);
addLight(5, 3, -4);

// =========================
// MATERIALS
// =========================

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x3b3027
    });

const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x51443a
    });

const ceilingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x29231f
    });

const doorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x291b15
    });

// =========================
// OBJECT CREATION
// =========================

const walls = [];

function createBox(
    x,
    y,
    z,
    width,
    height,
    depth,
    material,
    collision = true
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            height,
            depth
        );

    const object =
        new THREE.Mesh(
            geometry,
            material
        );

    object.position.set(
        x,
        y,
        z
    );

    object.castShadow = true;
    object.receiveShadow = true;

    scene.add(object);

    if (collision) {
        walls.push(object);
    }

    return object;
}

// =========================
// FLOOR
// =========================

createBox(
    0,
    -0.1,
    0,
    20,
    0.2,
    20,
    floorMaterial,
    false
);

// =========================
// CEILING
// =========================

createBox(
    0,
    4,
    0,
    20,
    0.2,
    20,
    ceilingMaterial,
    false
);

// =========================
// OUTSIDE WALLS
// =========================

// North
createBox(
    0,
    2,
    -10,
    20,
    4,
    0.4,
    wallMaterial
);

// South
createBox(
    0,
    2,
    10,
    20,
    4,
    0.4,
    wallMaterial
);

// West
createBox(
    -10,
    2,
    0,
    0.4,
    4,
    20,
    wallMaterial
);

// East
createBox(
    10,
    2,
    0,
    0.4,
    4,
    20,
    wallMaterial
);

// =========================
// ROOMS
// =========================

// Kitchen / Living Room wall
createBox(
    -4,
    2,
    4,
    0.3,
    4,
    8,
    wallMaterial
);

// Guest Bedroom
createBox(
    -5,
    2,
    -4,
    10,
    4,
    0.3,
    wallMaterial
);

// Godmother Bedroom
createBox(
    5,
    2,
    -4,
    10,
    4,
    0.3,
    wallMaterial
);

// =========================
// DOORS
// =========================

function createDoor(x, y, z, rotation = 0) {

    const door =
        createBox(
            x,
            y,
            z,
            1.2,
            2.5,
            0.15,
            doorMaterial,
            false
        );

    door.rotation.y = rotation;

    return door;
}

// Guest bedroom door
createDoor(-5, 1.25, -2.8);

// Godmother bedroom door
createDoor(5, 1.25, -2.8);

// Kitchen door
createDoor(-2.8, 1.25, 4, Math.PI / 2);

// =========================
// FRONT DOOR
// =========================

const frontDoor = createDoor(
    0,
    1.25,
    9.75
);

// =========================
// PLAYER COLLISION
// =========================

const playerRadius = 0.35;

function canMoveTo(x, z) {

    const playerBox =
        new THREE.Box3(
            new THREE.Vector3(
                x - playerRadius,
                0,
                z - playerRadius
            ),
            new THREE.Vector3(
                x + playerRadius,
                2,
                z + playerRadius
            )
        );

    for (const wall of walls) {

        const wallBox =
            new THREE.Box3()
                .setFromObject(wall);

        if (playerBox.intersectsBox(wallBox)) {
            return false;
        }
    }

    return true;
}

// =========================
// MOVEMENT
// =========================

const clock = new THREE.Clock();

function updatePlayer(delta) {

    if (!controls.isLocked) {
        return;
    }

    const speed = 3.5 * delta;

    const oldPosition =
        camera.position.clone();

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

    if (
        !canMoveTo(
            camera.position.x,
            camera.position.z
        )
    ) {

        camera.position.x =
            oldPosition.x;

        camera.position.z =
            oldPosition.z;
    }
}

// =========================
// GAME LOOP
// =========================

function animate() {

    requestAnimationFrame(animate);

    const delta =
        clock.getDelta();

    updatePlayer(delta);

    renderer.render(
        scene,
        camera
    );
}

animate();

// =========================
// RESIZE
// =========================

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
