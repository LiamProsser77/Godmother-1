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

        console.log(
            "PointerLockControls loaded"
        );

        this.setup();
    }


    setup() {

        // ESC automatically unlocks PointerLockControls.
        // This event lets us confirm that it happened.

        this.controls.addEventListener(
            "lock",
            () => {

                console.log(
                    "Mouse locked"
                );

            }
        );


        this.controls.addEventListener(
            "unlock",
            () => {

                console.log(
                    "Mouse unlocked"
                );

            }
        );


        // Explicitly handle ESC as a backup.

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.code === "Escape" &&
                    this.controls.isLocked
                ) {

                    this.controls.unlock();

                }

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

        return this.controls.isLocked;

    }


    getControls() {

        return this.controls;

    }
}
