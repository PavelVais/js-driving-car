import {Car} from "@/components/js/Car";
import {Road} from "@/components/js/Road";

export class Game {
    car;
    road;

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.window = 200;

        this.ctx = this.canvas.getContext("2d");
    }

    run() {
        this.road = new Road(this.canvas.width / 2, this.canvas.width * .9, 3);
        this.car = new Car(this.road.getLaneCenter(1), 100, 30, 50);

        this.#animate();
    }

    #animate() {
        this.car.update(this.road.borders);

        this.canvas.height = window.innerHeight;

        this.ctx.save();
        this.ctx.translate(0, -this.car.y + this.canvas.height * 0.7);

        this.road.draw(this.ctx);
        this.car.draw(this.ctx);

        this.ctx.restore();
        requestAnimationFrame(this.#animate.bind(this));
    }
}