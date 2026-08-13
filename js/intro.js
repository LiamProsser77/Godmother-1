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


    // =================================
    // GODMOTHER PLACEHOLDER
    // =================================

    createGodmother() {

        this.godmother =
            new THREE.Group();


        // Body / dress

        const dress =
            new THREE.Mesh(
                new THREE.ConeGeometry(
                    0.65,
                    1.9,
                    24
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x090909
                })
            );

        dress.position.y =
            1;

        dress.castShadow = true;

        this.godmother.add(
            dress
        );


        // Head

        const head =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.28,
                    24,
                    24
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xc7a58d
                })
            );

        head.position.y =
            2.15;

        head.castShadow = true;

        this.godmother.add(
            head
        );


        // Hair

        const hair =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.3,
                    24,
                    24
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x777777
                })
            );

        hair.position.set(
            0,
            2.28,
            -0.02
        );

        hair.scale.set(
            1,
            0.9,
            0.9
        );

        hair.castShadow = true;

        this.godmother.add(
            hair
        );


        // Arms

        const armGeometry =
            new THREE.CylinderGeometry(
                0.09,
                0.11,
                1.2,
                12
            );

        const armMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x0b0b0b
            });


        const leftArm =
            new THREE.Mesh(
                armGeometry,
                armMaterial
            );

        leftArm.position.set(
            -0.5,
            1.25,
            0
        );

        leftArm.rotation.z =
            -0.18;

        this.godmother.add(
            leftArm
        );


        const rightArm =
            new THREE.Mesh(
                armGeometry,
                armMaterial
            );

        rightArm.position.set(
            0.5,
            1.25,
            0
        );

        rightArm.rotation.z =
            0.18;

        this.godmother.add(
            rightArm
        );


        this.godmother.position.set(
            -7,
            0,
            -1
        );


        this.godmother.rotation.y =
            Math.PI / 2;


        this.scene.add(
            this.godmother
        );
    }


    // =================================
    // PLAY BUTTON
    // =================================

    setupButton() {

        const button =
            document.getElementById(
                "playButton"
            );

        button.addEventListener(
            "click",
            () => {

                this.startGame();

            }
        );
    }


    // =================================
    // START GAME
    // =================================

    startGame() {

        this.finished = true;

        const intro =
            document.getElementById(
                "intro"
            );

        intro.classList.add(
            "hidden"
        );

        setTimeout(
            () => {

                intro.style.display =
                    "none";

            },
            1500
        );

        document.getElementById(
            "gameUI"
        ).style.display =
            "block";

        console.log(
            "Godmother 1 gameplay starting..."
        );
    }


    // =================================
    // UPDATE
    // =================================

    update(delta) {

        if (this.finished) {
            return;
        }

        this.time += delta;


        // =================================
        // CAMERA CINEMATIC
        // =================================

        if (!this.started) {

            this.camera.position.set(
                -6,
                2.1,
                6
            );

            this.camera.lookAt(
                -2,
                1.4,
                0
            );

            this.started = true;
        }


        // Slowly move camera

        const cameraProgress =
            Math.min(
                this.time / 7,
                1
            );

        this.camera.position.z =
            6 -
            cameraProgress * 6;

        this.camera.position.x =
            -6 +
            cameraProgress * 2;


        // =================================
        // GODMOTHER WALK
        // =================================

        if (
            this.time > 1 &&
            this.time < 8
        ) {

            this.godmother.position.x =
                -7 +
                (this.time - 1) * 1.15;


            // Simple walking movement

            this.godmother.position.y =
                Math.sin(
                    this.time * 7
                ) * 0.025;


            // Slight arm movement

            const arms =
                this.godmother.children;

            if (arms[3]) {

                arms[3].rotation.z =
                    -0.18 +
                    Math.sin(
                        this.time * 7
                    ) * 0.15;
            }

            if (arms[4]) {

                arms[4].rotation.z =
                    0.18 -
                    Math.sin(
                        this.time * 7
                    ) * 0.15;
            }
        }


        // =================================
        // TITLE
        // =================================

        if (
            this.time > 7 &&
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

            setTimeout(
                () => {

                    button.classList.add(
                        "visible"
                    );

                },
                1300
            );
        }
    }
}
