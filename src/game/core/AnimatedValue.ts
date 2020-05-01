export class AnimatedValue {
    private value: number;
    private newValue: number;
    private isAnimated: boolean = true;
    private timeForDelta: number = 0;

    constructor(value: number) {
        this.value = value;
        this.newValue = value;
    }

    public reset(to: number) {
        this.value = to;
        this.newValue = to;
    }

    public change(to: number) {
        this.newValue = to;
    }

    public currentValue() : number {
        return this.value;
    }

    public isAlreadyAnimated(): boolean {
        return this.isAnimated;
    }

    public updateOnRedner(time: number) {
        var deltaTime = Math.abs(time - this.timeForDelta) / 333.0
        this.timeForDelta = time;

        var distance = this.newValue - this.value;

        const speed = 50;

        if (Math.abs(distance) <= speed / 10) {
            this.isAnimated = true;
            this.value = this.newValue;
            return;
        }
    
        if(distance < 0) {
            this.value -= Math.round(speed * deltaTime);
        } else {
            this.value += Math.round(speed * deltaTime);
        }

        this.isAnimated = false;
    }
}