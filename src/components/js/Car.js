import {Controls} from "@/components/js/Controls";
import {Sensor} from "@/components/js/Sensor";

export class Car {
    speed = 0;
    acceleration = 0.2;
    maxSpeed = 3;
    friction = .05;
    angle = 0;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.controls = new Controls();

        this.sensor = new Sensor(this);

    }


    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders);
    }


    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }


        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;

            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }


        // speed cap
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        // speed cap - zpatecka
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        if (this.speed < 0) {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    /**
     *
     * @param {RenderingContext} ctx
     */
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        ctx.fill();

        ctx.restore();

       this.sensor.draw(ctx);
    }
}