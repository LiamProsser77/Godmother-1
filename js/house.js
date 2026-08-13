import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4038
});

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x302820
});

const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0x211c19
});

function createBox(scene, x, y, z, width, height, depth, material) {

    const geometry = new THREE.BoxGeometry(
        width,
        height,
        depth
    );

    const mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.position.set(x, y, z);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(mesh);

    return mesh;
}

export function createHouse(scene) {

    // =========================
    // FLOOR
    // =========================

    createBox(
        scene,
        0,
        -0.1,
        0,
        20,
        0.2,
        20,
        floorMaterial
    );

    // =========================
    // CEILING
    // =========================

    createBox(
        scene,
        0,
        4,
        0,
        20,
        0.2,
        20,
        ceilingMaterial
    );

    // =========================
    // OUTSIDE WALLS
    // =========================

    // Back
    createBox(
        scene,
        0,
        2,
        -10,
        20,
        4,
        0.3,
        wallMaterial
    );

    // Left
    createBox(
        scene,
        -10,
        2,
        0,
        0.3,
        4,
        20,
        wallMaterial
    );

    // Right
    createBox(
        scene,
        10,
        2,
        0,
        0.3,
        4,
        20,
        wallMaterial
    );

    // Front
    createBox(
        scene,
        0,
        2,
        10,
        20,
        4,
        0.3,
        wallMaterial
    );

    // =========================
    // KITCHEN
    // =========================

    createBox(
        scene,
        -4,
        2,
        4,
        0.3,
        4,
        8,
        wallMaterial
    );

    // =========================
    // GUEST BEDROOM
    // =========================

    createBox(
        scene,
        -5,
        2,
        -4,
        10,
        4,
        0.3,
        wallMaterial
    );

    // =========================
    // GODMOTHER'S BEDROOM
    // =========================

    createBox(
        scene,
        5,
        2,
        -4,
        10,
        4,
        0.3,
        wallMaterial
    );

    console.log("Godmother 1 house loaded.");
}
