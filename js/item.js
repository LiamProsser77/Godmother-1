import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export class Item {

    constructor(
        scene,
        name,
        position,
        color = 0xffffff
    ) {

        this.scene = scene;

        this.name = name;

        this.collected = false;


        // =====================================
        // ITEM OBJECT
        // =====================================

        this.object =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.25,
                    0.12,
                    0.45
                ),

                new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.6
                })

            );


        this.object.position.copy(
            position
        );

        this.object.castShadow = true;

        this.object.receiveShadow = true;


        scene.add(
            this.object
        );

    }


    // =====================================
    // PICK UP
    // =====================================

    collect() {

        if (this.collected) {
            return;
        }


        this.collected = true;


        this.scene.remove(
            this.object
        );


        console.log(
            "Collected:",
            this.name
        );

    }


    // =====================================
    // CHECK DISTANCE
    // =====================================

    isNear(
        playerPosition,
        distance = 1.5
    ) {

        return (
            this.object.position.distanceTo(
                playerPosition
            ) <= distance
        );

    }

}
