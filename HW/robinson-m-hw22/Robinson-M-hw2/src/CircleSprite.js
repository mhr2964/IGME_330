export default class CircleSprite {
    constructor(ctx, radius, x, y, fillColor, strokeColor, lineWidth) {
        this.ctx = ctx;
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.startx = x;
        this.starty = y;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.lineWidth = lineWidth;
        this.data = [0];
        this.targetIndex = 0;
        Object.seal(this);
    }

    updateTargetIndex(index) {
        this.targetIndex = index;
    }

    updateAudioData(data) {
        this.data = data;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    update(datatype) {
        switch (datatype) {
            case "option-frequency":
                this.x = Math.cos(this.data[this.targetIndex]) * 100 + 400;
                this.y = this.starty;
                break;

            case "option-time-domain":
                this.y = Math.sin(this.data[this.targetIndex]) * 100 + 400;
                this.x = this.startx;
                break;
        }
    }

}