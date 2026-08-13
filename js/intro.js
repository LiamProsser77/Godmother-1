import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export class Intro {

    constructor(scene, camera) {

        this.scene = scene;
        this.camera = camera;

        this.time = 0;
        this.started = false;
        this.titleShown = false;
        this.finished = false;

        this.createGodmother();
        this.setupButton();
    }

    createGodmother() {

        this.godmother = new THREE.Group();

        // Dress
        const dress = new THREE.Mesh(
            new THREE.ConeGeometry(0.75, 2.1, 32),
            new THREE.MeshStandardMaterial({
                color: 0x171717,
                roughness: 0.85
            })
        );

        dress.position.y = 1.05;
        dress.castShadow = true;
        this.godmother.add(dress);

        // Upper body
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.38,
                0.48,
                0.8,
                24
            ),
            new THREE.MeshStandardMaterial({
                color: 0x111111,
                roughness: 0.85
            })
        );

        body.position.y = 2;
        body.castShadow = true;
        this.godmother.add(body);

        // Head
        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.34, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0xb88970,
                roughness: 0.95
            })
        );

        head.position.y = 2.65;
        head.castShadow = true;
        this.godmother.add(head);

        // Gray hair
        const hair = new THREE.Mesh(
            new THREE.SphereGeometry(0.38, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0x777777,
                roughness: 1
            })
        );

        hair.position.set(0, 2.8, -0.04);
        hair.scale.set(1, 0.85, 0.9);
        hair.castShadow = true;
        this.godmother.add(hair);

        // Left arm
        const armGeometry = new THREE.CylinderGeometry(
            0.11,
            0.14,
            1.3,
            16
        );

        const armMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x151515,
                roughness: 0.9
            });

        this.leftArm = new THREE.Mesh(
            armGeometry,
            armMaterial
        );

        this.leftArm.position.set(
            -0.48,
            1.75,
            0
        );

        this.leftArm.rotation.z = -0.2;
        this.leftArm.castShadow = true;

        this.godmother.add(this.leftArm);

        // Right arm
        this.rightArm = new THREE.Mesh(
            armGeometry,
            armMaterial
        );

        this.rightArm.position.set(
            0.48,
            1.75,
            0
        );

        this.rightArm.rotation.z = 0.2;
        this.rightArm.castShadow = true;

        this.godmother.add(this.rightArm);

        // Position her where the camera can actually see her
        this.godmother.position.set(
            -5,
            0,
            1
        );

        // Face toward the camera
        this.godmother.rotation.y = 0;

        this.scene.add(this.godmother);
    }

    setupButton() {

        const button =
            document.getElementById("playButton");

        button.addEventListener(
            "click",
            () => this.startGame()
        );
    }

    startGame() {

        this.finished = true;

        const intro =
            document.getElementById("intro");

        intro.classList.add("hidden");

        setTimeout(() => {
            intro.style.display = "none";
        }, 1500);

        document.getElementById(
            "gameUI"
        ).style.display = "block";
    }

    update(delta) {

        if (this.finished) {
            return;
        }

        this.time += delta;

        // =================================
        // CAMERA
        // =================================

        if (!this.started) {

            this.started = true;

            this.camera.position.set(
                0,
                2.1,
                7
            );
        }

        // Slowly move camera forward
        const progress =
            Math.min(this.time / 4, 1);

        this.camera.position.z =
            7 - progress * 3;

        this.camera.lookAt(
            0,
            1.5,
            0
        );

        // =================================
        // GODMOTHER WALK
        // =================================

        if (this.time >= 0.4 &&
            this.time <= 3.8) {

            const walk =
                this.time - 0.4;

            this.godmother.position.x =
                -5 + walk * 2.7;

            // Walking bounce
            this.godmother.position.y =
                Math.abs(
                    Math.sin(this.time * 8)
                ) * 0.035;

            // Arm swing
            this.leftArm.rotation.z =
                -0.2 +
                Math.sin(this.time * 8) * 0.25;

            this.rightArm.rotation.z =
                0.2 -
                Math.sin(this.time * 8) * 0.25;
        }

        // =================================
        // TITLE
        // =================================

        if (
            this.time > 2.8 &&
            !this.titleShown
        ) {

            this.titleShown = true;

            const title =
                document.getElementById(
                    "title"
                );

            const button =
                document.getElementById(
                    "playButton"
                );

            title.classList.add(
                "visible"
            );

            setTimeout(() => {

                if (!this.finished) {
                    button.classList.add(
                        "visible"
                    );
                }

            }, 650);
        }
    }
}
