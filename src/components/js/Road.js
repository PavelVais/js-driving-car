import {lerp} from "@/components/js/Utils";

export class Road {

    constructor(x, width, laneCount = 3) {
        this.laneCount = laneCount;
        this.x = x;
        this.width = width;


        this.left = x - width / 2;
        this.right = x + width / 2;


        const infinity = 1000000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + laneIndex * laneWidth;
    }

    /**
     *
     * @param {RenderingContext} ctx
     */
    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(this.left, this.right, i / this.laneCount);
            ctx.restore();
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]); // čáry zmizí, nevím proč.
                ctx.setLineDash([]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.closePath();
            ctx.stroke();
        }


    }
}

