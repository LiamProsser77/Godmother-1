import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { PointerLockControls } from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";


export class Player {

    constructor(camera, renderer) {

        this.camera = camera;

        this.renderer = renderer;

        this.controls =
            new PointerLockControls(
                camera,
                document.body
            );

        this.speed = 3.5;

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };

        this.setupKeyboard();

        this.setupMouse();
    }


    // =====================================
    // KEYBOARD
    // =====================================

    setupKeyboard() {

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.code === "KeyW") {
                    this.keys.w = true;
                }

                if (event.code === "KeyA") {
                    this.keys.a = true;
                }

                if (event.code === "KeyS") {
                    this.keys.s = true;
                }

                if (event.code === "KeyD") {
                    this.keys.d = true;
                }
            }
        );


        document.addEventListener(
            "keyup",
            (event) => {

                if (event.code === "KeyW") {
                    this.keys.w = false;
                }

                if (event.code === "KeyA") {
                    this.keys.a = false;
                }

                if (event.code === "KeyS") {
                    this.keys.s = false;
                }

                if (event.code === "KeyD") {
                    this.keys.d = false;
                }
            }
        );
    }


    // =====================================
    // MOUSE / POINTER LOCK
    // =====================================

    setupMouse() {

        document.addEventListener(
            "click",
            () => {

                if (
                    !this.controls.isLocked
                ) {

                    this.controls.lock();

                }
            }
        );


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
    }


    // =====================================
    // MOVEMENT
    // =====================================

    update(delta) {

        if (
            !this.controls.isLocked
        ) {

            return;

        }


        const movement =
            this.speed * delta;


        if (this.keys.w) {

            this.controls.moveForward(
                movement
            );

        }


        if (this.keys.s) {

            this.controls.moveForward(
                -movement
            );

        }


        if (this.keys.a) {

            this.controls.moveRight(
                -movement
            );

        }


        if (this.keys.d) {

            this.controls.moveRight(
                movement
            );

        }
    }


    // =====================================
    // LOCK STATE
    // =====================================

    isLocked() {

        return this.controls.isLocked;

    }


    lock() {

        this.controls.lock();

    }


    unlock() {

        this.controls.unlock();

    }
}
