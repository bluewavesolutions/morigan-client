export class AnimatedValue {
    private value: number;
    private newValue: number;
    private isAnimated: boolean = true;
    private startTime: number = null;

    constructor(value: number) {
        this.value = value;
        this.newValue = value;
    }

    public reset(to: number) {
        if (this.value != to || this.newValue != to) {
            this.value = to;
            this.newValue = to;
            this.startTime = null;
        }
    }

    public change(to: number) {
        if(this.newValue != to) {
            this.newValue = to;
            this.startTime = null;
        }
    }

    public currentValue() : number {
        return this.value;
    }

    public isAlreadyAnimated(): boolean {
        return this.isAnimated;
    }

    public updateOnRedner(time: number) {
        if (this.value === this.newValue) {
            this.isAnimated = true;

            return;
        }

        if (this.startTime === null) {
            this.startTime = time;
            this.isAnimated = false;
        }

        var deltaTime = (time - this.startTime) / 1000.0;

        var current = this.value + (((this.newValue - this.value) * deltaTime));
        this.value = current;

        if(Math.abs(this.value - this.newValue) <= 0) {
            this.isAnimated = true;
            this.value = this.newValue;
        }

        if (deltaTime >= 1) {
            this.isAnimated = true;
            this.value = this.newValue;
        }
    }
}