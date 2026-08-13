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

        this.setup();
    }


    setup() {

        // Find the existing PLAY button
        const playButton =
            document.getElementById(
                "playButton"
            );


        if (!playButton) {

            console.error(
                "Godmother 1: PLAY button not found."
            );

            return;
        }


        // PLAY locks the mouse
        playButton.addEventListener(
            "click",
            () => {

                this.controls.lock();

            }
        );


        // Pointer successfully locked
        this.controls.addEventListener(
            "lock",
            () => {

                console.log(
                    "Godmother 1: Pointer locked"
                );

            }
        );


        // ESC unlocks it
        this.controls.addEventListener(
            "unlock",
            () => {

                console.log(
                    "Godmother 1: Pointer unlocked"
                );

            }
        );
    }


    isLocked() {

        return this.controls.isLocked;

    }


    getControls() {

        return this.controls;

    }
}
