export class Controls {

    constructor(camera, element) {

        this.camera = camera;

        this.element = element || document.body;

        // =====================================
        // SETTINGS
        // =====================================

        this.speed = 3.5;

        this.lookSpeed = 0.002;

        // =====================================
        // KEY STATE
        // =====================================

        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false
        };

        // =====================================
        // ROTATION
        // =====================================

        this.yaw = 0;

        this.pitch = 0;

        this.locked = false;

        // =====================================
        // SETUP
        // =====================================

        this.setupKeyboard();

        this.setupMouse();

        this.setupPointerLock();

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


                // Stop the player looking
                // completely upside down.

                const limit =
                    Math.PI / 2 - 0.05;

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

                if (
                    !this.locked
                ) {

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


        // Forward / backward

        if (this.keys.w) {

            this.camera.translateZ(
                -distance
            );

        }

        if (this.keys.s) {

            this.camera.translateZ(
                distance
            );

        }


        // Left / right

        if (this.keys.a) {

            this.camera.translateX(
                -distance
            );

        }

        if (this.keys.d) {

            this.camera.translateX(
                distance
            );

        }

    }

}
