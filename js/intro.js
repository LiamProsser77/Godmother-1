import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export class Intro {

    constructor(scene, camera) {

        this.scene = scene;
        this.camera = camera;

        this.finished = false;
        this.time = 0;

        this.createIntro();
    }

    createIntro() {

        // =========================
        // INTRO OVERLAY
        // =========================

        this.overlay = document.createElement("div");

        this.overlay.id = "intro-screen";

        this.overlay.innerHTML = `
            <div id="intro-title">
                GODMOTHER 1
            </div>

            <button id="play-button">
                PLAY
            </button>
        `;

        document.body.appendChild(this.overlay);

        // =========================
        // PLAY BUTTON
        // =========================

        document
            .getElementById("play-button")
            .addEventListener("click", () => {

                this.startGame();

            });
    }

    startGame() {

        this.finished = true;

        this.overlay.style.opacity = "0";

        setTimeout(() => {

            this.overlay.remove();

        }, 1000);

        console.log("Godmother 1 started.");

    }

    update(delta) {

        if (this.finished) {
            return;
        }

        this.time += delta;

        // Slight title movement
        const title =
            document.getElementById("intro-title");

        if (title) {

            const scale =
                1 +
                Math.sin(this.time * 2) * 0.015;

            title.style.transform =
                `translate(-50%, -50%) scale(${scale})`;
        }
    }
}
