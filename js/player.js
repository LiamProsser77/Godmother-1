import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { PointerLockControls } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";


export class Player {

    constructor(camera, renderer) {

        this.camera = camera;

        this.renderer = renderer;

        // =====================================
        // MOVEMENT SETTINGS
        // =====================================

        this.speed = 3.5;

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };


        // =====================================
        // POINTER LOCK
        // =====================================

        this.controls =
            new PointerLockControls(
                this.camera,
                document.body
            );


        // =====================================
        // SETUP
        // =====================================

        this.setupKeyboard();

        this.setupPointerLock();

    }


    // =====================================
    // KEYBOARD
    // =====================================

    setupKeyboard() {

        document.addEventListener(
            "keydown",
            (event) => {

                switch (event.code) {

                    case "KeyW":
                        this.keys.w = true;
                        break;

                    case "KeyA":
                        this.keys.a = true;
                        break;

                    case "KeyS":
                        this.keys.s = true;
                        break;

                    case "KeyD":
                        this.keys.d = true;
                        break;

                }

            }
        );


        document.addEventListener(
            "keyup",
            (event) => {

                switch (event.code) {

                    case "KeyW":
                        this.keys.w = false;
                        break;

                    case "KeyA":
                        this.keys.a = false;
                        break;

                    case "KeyS":
                        this.keys.s = false;
                        break;

                    case "KeyD":
                        this.keys.d = false;
                        break;

                }

            }
        );

    }


    // =====================================
    // POINTER LOCK
    // =====================================

    setupPointerLock() {

        // Click the game to lock the mouse

        document.addEventListener(
            "click",
            (event) => {

                // Don't steal the mouse from
                // the intro PLAY button.

                const playButton =
                    document.getElementById(
                        "playButton"
                    );


                if (
                    playButton &&
                    playButton.contains(
                        event.target
                    )
                ) {

                    return;

                }


                if (
                    !this.controls.isLocked
                ) {

                    this.controls.lock();

                }

            }
        );


        // Mouse successfully locked

        this.controls.addEventListener(
            "lock",
            () => {

                console.log(
                    "MABEL 1: Mouse locked"
                );

            }
        );


        // Mouse released with ESC

        this.controls.addEventListener(
            "unlock",
            () => {

                console.log(
                    "MABEL 1: Mouse unlocked"
                );

                this.keys.w = false;
                this.keys.a = false;
                this.keys.s = false;
                this.keys.d = false;

            }
        );

    }


    // =====================================
    // MOVEMENT
    // =====================================

    update(delta) {

        // Don't move unless the mouse
        // is currently locked.

        if (
            !this.controls.isLocked
        ) {

            return;

        }


        const movement =
            this.speed * delta;


        // Forward

        if (this.keys.w) {

            this.controls.moveForward(
                movement
            );

        }


        // Backward

        if (this.keys.s) {

            this.controls.moveForward(
                -movement
            );

        }


        // Left

        if (this.keys.a) {

            this.controls.moveRight(
                -movement
            );

        }


        // Right

        if (this.keys.d) {

            this.controls.moveRight(
                movement
            );

        }

    }


    // =====================================
    // LOCK
    // =====================================

    lock() {

        if (
            !this.controls.isLocked
        ) {

            this.controls.lock();

        }

    }


    // =====================================
    // UNLOCK
    // =====================================

    unlock() {

        if (
            this.controls.isLocked
        ) {

            this.controls.unlock();

        }

    }


    // =====================================
    // CHECK LOCK
    // =====================================

    isLocked() {

        return this.controls.isLocked;

    }

}
