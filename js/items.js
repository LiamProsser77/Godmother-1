import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { Item } from "./item.js";


export function createItems(scene) {

    // =====================================
    // GUEST DOOR KEY
    // =====================================

    const guestKey =
        new Item(
            scene,
            "Guest Door Key",
            new THREE.Vector3(
                0,
                1,
                0
            ),
            0xd6b21f
        );


    return {
        guestKey
    };

}
