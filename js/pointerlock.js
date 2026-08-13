import {
    PointerLockControls
} from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";


export class PointerLock {

    constructor(camera) {

        this.camera = camera;

        this.controls =
            new PointerLockControls(
                camera,
                document.body
            );

        this.locked = false;

        this.setupEvents();
    }


    setupEvents() {

        this.controls.addEventListener(
            "lock",
            () => {

                this.locked = true;

                console.log(
                    "Mouse locked"
                );

            }
        );


        this.controls.addEventListener(
            "unlock",
            () => {

                this.locked = false;

                console.log(
                    "Mouse unlocked"
                );

            }
        );
    }


    lock() {

        this.controls.lock();

    }


    unlock() {

        this.controls.unlock();

    }


    isLocked() {

        return this.locked;

    }
}
