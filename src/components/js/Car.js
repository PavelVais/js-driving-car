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
        this.polygon = this.#createPolyagon();
        this.sensor.update(roadBorders);
    }


    #createPolyagon() {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2; //hypot = přepona
        const alpha = Math.atan2(this.width, this.height);

        // Vytvorime 4 body, ktere se dle rotace (angle) transformuji a vzdy delaji obdelnik
        // 1:13:40

        //right top point
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });

        // left top point
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });

        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });


        return points;
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


        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        ctx.fill();

        this.sensor.draw(ctx);
    }
}