import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


const wallMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x4b4037
    });


const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x29221d
    });


const ceilingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x191614
    });


const woodMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x211611
    });


function box(
    scene,
    x,
    y,
    z,
    width,
    height,
    depth,
    material
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

    return object;
}


export function createHouse(scene) {

    // =================================
    // FLOOR
    // =================================

    box(
        scene,
        0,
        -0.1,
        0,
        18,
        0.2,
        18,
        floorMaterial
    );


    // =================================
    // CEILING
    // =================================

    box(
        scene,
        0,
        4,
        0,
        18,
        0.2,
        18,
        ceilingMaterial
    );


    // =================================
    // OUTER WALLS
    // =================================

    box(
        scene,
        0,
        2,
        -9,
        18,
        4,
        0.3,
        wallMaterial
    );

    box(
        scene,
        -9,
        2,
        0,
        0.3,
        4,
        18,
        wallMaterial
    );

    box(
        scene,
        9,
        2,
        0,
        0.3,
        4,
        18,
        wallMaterial
    );

    /*
       Front wall is split so the
       front door has an opening.
    */

    box(
        scene,
        -6,
        2,
        9,
        6,
        4,
        0.3,
        wallMaterial
    );

    box(
        scene,
        6,
        2,
        9,
        6,
        4,
        0.3,
        wallMaterial
    );


    // =================================
    // ROOM WALLS
    // =================================

    // Kitchen / living-room divider

    box(
        scene,
        -4,
        2,
        3,
        0.25,
        4,
        6,
        wallMaterial
    );


    // Guest bedroom

    box(
        scene,
        -4.5,
        2,
        -4,
        9,
        4,
        0.25,
        wallMaterial
    );


    // Godmother's bedroom

    box(
        scene,
        4.5,
        2,
        -4,
        9,
        4,
        0.25,
        wallMaterial
    );


    // =================================
    // FRONT DOOR
    // =================================

    box(
        scene,
        0,
        1.5,
        8.82,
        2,
        3,
        0.15,
        woodMaterial
    );


    // =================================
    // SIMPLE ATTIC ACCESS
    // =================================

    const atticHole =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2,
                0.1,
                2
            ),
            woodMaterial
        );

    atticHole.position.set(
        5,
        3.9,
        -5
    );

    scene.add(
        atticHole
    );


    // =================================
    // LIGHTS
    // =================================

    createRoomLight(
        scene,
        -5,
        3.3,
        5
    );

    createRoomLight(
        scene,
        4,
        3.3,
        5
    );

    createRoomLight(
        scene,
        -5,
        3.3,
        -5
    );

    createRoomLight(
        scene,
        5,
        3.3,
        -5
    );
}


function createRoomLight(
    scene,
    x,
    y,
    z
) {

    const light =
        new THREE.PointLight(
            0xffc98b,
            0.8,
            8
        );

    light.position.set(
        x,
        y,
        z
    );

    light.castShadow = true;

    scene.add(light);
}
