import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { Collision } from "./collision.js";


export class Controls {

    constructor(camera, element) {

        this.camera = camera;

        this.element =
            element || document.body;


        // =================================
        // SETTINGS
        // =================================

        this.speed = 3.5;

        this.lookSpeed = 0.002;


        // =================================
        // COLLISION
        // =================================

        this.collision =
            new Collision();


        // =================================
        // PLAYER POSITION
        // =================================

        this.position =
            new THREE.Vector3(
                0,
                2.1,
                7
            );


        // =================================
        // KEYS
        // =================================

        this.keys = {

            w: false,
            a: false,
            s: false,
            d: false

        };


        // =================================
        // CAMERA ROTATION
        // =================================

        this.yaw = 0;

        this.pitch = 0;


        // =================================
        // POINTER LOCK
        // =================================

        this.locked = false;


        // =================================
        // SETUP
        // =================================

        this.setupKeyboard();

        this.setupMouse();

        this.setupPointerLock();


        // Put camera at starting position.

        this.camera.position.copy(
            this.position
        );

    }


    // =====================================
    // KEYBOARD
    // =====================================

    setupKeyboard() {

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.code === "KeyW"
                ) {

                    this.keys.w = true;

                }


                if (
                    event.code === "KeyA"
                ) {

                    this.keys.a = true;

                }


                if (
                    event.code === "KeyS"
                ) {

                    this.keys.s = true;

                }


                if (
                    event.code === "KeyD"
                ) {

                    this.keys.d = true;

                }

            }
        );


        document.addEventListener(
            "keyup",
            (event) => {

                if (
                    event.code === "KeyW"
                ) {

                    this.keys.w = false;

                }


                if (
                    event.code === "KeyA"
                ) {

                    this.keys.a = false;

                }


                if (
                    event.code === "KeyS"
                ) {

                    this.keys.s = false;

                }


                if (
                    event.code === "KeyD"
                ) {

                    this.keys.d = false;

                }

            }
        );

    }


    // =====================================
    // MOUSE
    // =====================================

    setupMouse() {

        document.addEventListener(
            "mousemove",
            (event) => {

                if (!this.locked) {

                    return;

                }


                this.yaw -=
                    event.movementX *
                    this.lookSpeed;


                this.pitch -=
                    event.movementY *
                    this.lookSpeed;


                const limit =
                    Math.PI / 2 -
                    0.05;


                this.pitch =
                    Math.max(
                        -limit,
                        Math.min(
                            limit,
                            this.pitch
                        )
                    );


                this.updateCameraRotation();

            }
        );

    }


    // =====================================
    // POINTER LOCK
    // =====================================

    setupPointerLock() {

        this.element.addEventListener(
            "click",
            () => {

                if (!this.locked) {

                    this.lock();

                }

            }
        );


        document.addEventListener(
            "pointerlockchange",
            () => {

                this.locked =
                    document.pointerLockElement ===
                    this.element;


                if (!this.locked) {

                    this.keys.w = false;
                    this.keys.a = false;
                    this.keys.s = false;
                    this.keys.d = false;

                }

            }
        );

    }


    // =====================================
    // LOCK
    // =====================================

    lock() {

        if (
            document.pointerLockElement !==
            this.element
        ) {

            this.element.requestPointerLock();

        }

    }


    // =====================================
    // UNLOCK
    // =====================================

    unlock() {

        if (
            document.pointerLockElement
        ) {

            document.exitPointerLock();

        }

    }


    // =====================================
    // CAMERA ROTATION
    // =====================================

    updateCameraRotation() {

        this.camera.rotation.order =
            "YXZ";


        this.camera.rotation.y =
            this.yaw;


        this.camera.rotation.x =
            this.pitch;

    }


    // =====================================
    // MOVEMENT
    // =====================================

    update(delta) {

        if (!this.locked) {

            return;

        }


        const distance =
            this.speed * delta;


        // =================================
        // FORWARD / BACKWARD
        // =================================

        let forward = 0;

        if (this.keys.w) {

            forward += 1;

        }

        if (this.keys.s) {

            forward -= 1;

        }


        // =================================
        // LEFT / RIGHT
        // =================================

        let right = 0;

        if (this.keys.d) {

            right += 1;

        }

        if (this.keys.a) {

            right -= 1;

        }


        // =================================
        // NORMALIZE DIAGONAL MOVEMENT
        // =================================

        const length =
            Math.sqrt(
                forward * forward +
                right * right
            );


        if (length > 0) {

            forward /= length;

            right /= length;

        }


        // =================================
        // MOVEMENT DIRECTION
        // =================================

        const direction =
            new THREE.Vector3();


        direction.x =
            Math.sin(this.yaw) *
            forward;


        direction.z =
            Math.cos(this.yaw) *
            forward;


        direction.x +=
            Math.cos(this.yaw) *
            right;


        direction.z +=
            -Math.sin(this.yaw) *
            right;


        // =================================
        // TEST X MOVEMENT
        // =================================

        const newX =
            this.position.x +
            direction.x *
            distance;


        if (
            this.collision.canMoveTo(
                newX,
                this.position.z
            )
        ) {

            this.position.x =
                newX;

        }


        // =================================
        // TEST Z MOVEMENT
        // =================================

        const newZ =
            this.position.z +
            direction.z *
            distance;


        if (
            this.collision.canMoveTo(
                this.position.x,
                newZ
            )
        ) {

            this.position.z =
                newZ;

        }


        // =================================
        // UPDATE CAMERA
        // =================================

        this.camera.position.copy(
            this.position
        );

    }

}
