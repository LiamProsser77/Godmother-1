import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { PointerLockControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/PointerLockControls.js";

export class Player {

    constructor(camera, domElement) {

        this.camera = camera;

        this.controls = new PointerLockControls(
            camera,
            domElement
        );

        this.speed = 3.5;

        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false
        };

        this.setupControls();
    }

    setupControls() {

        document.addEventListener("keydown", (event) => {

            if (event.code === "KeyW")
                this.keys.forward = true;

            if (event.code === "KeyS")
                this.keys.backward = true;

            if (event.code === "KeyA")
                this.keys.left = true;

            if (event.code === "KeyD")
                this.keys.right = true;
        });

        document.addEventListener("keyup", (event) => {

            if (event.code === "KeyW")
                this.keys.forward = false;

            if (event.code === "KeyS")
                this.keys.backward = false;

            if (event.code === "KeyA")
                this.keys.left = false;

            if (event.code === "KeyD")
                this.keys.right = false;
        });
    }

    update(delta) {

        if (!this.controls.isLocked) {
            return;
        }

        const movement =
            this.speed * delta;

        if (this.keys.forward) {
            this.controls.moveForward(movement);
        }

        if (this.keys.backward) {
            this.controls.moveForward(-movement);
        }

        if (this.keys.left) {
            this.controls.moveRight(-movement);
        }

        if (this.keys.right) {
            this.controls.moveRight(movement);
        }

        // Keep player's eyes at a realistic height
        this.camera.position.y = 1.7;
    }

    lock() {
        this.controls.lock();
    }

    isPlaying() {
        return this.controls.isLocked;
    }
}
