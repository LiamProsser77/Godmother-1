import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export class Collision {

    constructor() {

        this.walls = [];

        this.playerRadius = 0.35;

        this.createWalls();

    }


    // =====================================
    // CREATE COLLISION WALLS
    // =====================================

    createWalls() {

        // =================================
        // OUTER WALLS
        // =================================

        this.addWall(
            0,
            2,
            -9,
            18,
            4
        );

        this.addWall(
            -9,
            2,
            0,
            0.3,
            18
        );

        this.addWall(
            9,
            2,
            0,
            0.3,
            18
        );


        // =================================
        // FRONT WALL
        // =================================

        this.addWall(
            -6,
            2,
            9,
            6,
            0.3
        );

        this.addWall(
            6,
            2,
            9,
            6,
            0.3
        );


        // =================================
        // KITCHEN / LIVING DIVIDER
        // =================================

        this.addWall(
            -4,
            2,
            3,
            0.25,
            6
        );


        // =================================
        // GUEST BEDROOM WALL
        // =================================

        this.addWall(
            -4.5,
            2,
            -4,
            9,
            0.25
        );


        // =================================
        // MABEL BEDROOM WALL
        // =================================

        this.addWall(
            4.5,
            2,
            -4,
            9,
            0.25
        );

    }


    // =====================================
    // ADD WALL
    // =====================================

    addWall(
        x,
        y,
        z,
        width,
        depth
    ) {

        this.walls.push({

            minX:
                x -
                width / 2,

            maxX:
                x +
                width / 2,

            minZ:
                z -
                depth / 2,

            maxZ:
                z +
                depth / 2

        });

    }


    // =====================================
    // CHECK POSITION
    // =====================================

    canMoveTo(
        x,
        z
    ) {

        for (
            const wall of this.walls
        ) {

            const minX =
                wall.minX -
                this.playerRadius;

            const maxX =
                wall.maxX +
                this.playerRadius;

            const minZ =
                wall.minZ -
                this.playerRadius;

            const maxZ =
                wall.maxZ +
                this.playerRadius;


            if (
                x >= minX &&
                x <= maxX &&
                z >= minZ &&
                z <= maxZ
            ) {

                return false;

            }

        }


        // =================================
        // HOUSE BOUNDARIES
        // =================================

        if (
            x < -8.5 ||
            x > 8.5 ||
            z < -8.5 ||
            z > 8.5
        ) {

            return false;

        }


        return true;

    }

}
