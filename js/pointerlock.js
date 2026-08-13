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

        const playButton =
            document.getElementById(
                "playButton"
            );


        // Lock the mouse when PLAY is clicked

        if (playButton) {

            playButton.addEventListener(
                "click",
                () => {

                    this.controls.lock();

                }
            );

        }


        // ESC automatically unlocks
        // PointerLockControls handles this.


        this.controls.addEventListener(
            "lock",
            () => {

                console.log(
                    "Pointer locked"
                );

            }
        );


        this.controls.addEventListener(
            "unlock",
            () => {

                console.log(
                    "Pointer unlocked"
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
