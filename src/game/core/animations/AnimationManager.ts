import { IAnimationDelta } from "./interfaces/IAnimationDelta";
import { IAnimation } from "./interfaces/IAnimation";

export class AnimationManager {
    private currentAnimations: IAnimation[] = [];

    public animateTo = (target: any,
        params: { [key: string]: number },
        duration: number,
        onUpdate: (percentageFinished?: number) => void
    ): Promise<void> => {
        const animationDelta = {};

        for (let key in params) {
            if (target.hasOwnProperty(key) === false) {
                throw new Error(`Target does not have property "${key}"!`);
            }

          animationDelta[key] = params[key] - target[key];
        }

        return this.animate(target, animationDelta, duration, onUpdate);
    }

    public animate = (target: any,
        animationDelta: IAnimationDelta,
        duration: number,
        onUpdate: (percentageFinished?: number) => void
    ): Promise<void> => {
        return new Promise(resolve => {
            const finishResult = this.generateFinishResult(target, animationDelta);

            const animation: IAnimation = {
                target, duration, animationDelta, finishResult,
                onUpdate: onUpdate,
                lastUpdate: performance.now(),
                start: performance.now(),
                handler: () => {
                    const animationIndex = this.currentAnimations.indexOf(animation);
                    this.currentAnimations.splice(animationIndex, 1);

                    resolve();
                }
            };

            this.currentAnimations.push(animation);
        });
    }

    public generateFinishResult = (target: any, animationDelta: IAnimationDelta) => {
        const result = {};

        Object.keys(animationDelta).forEach((key: string) => {
            result[key] = target[key] + animationDelta[key];
        });

        return result;
    };

    public updateAnimation = (
        target: any,
        params: { [key: string]: number },
        duration: number
    ) => {
        for (let animation of this.currentAnimations) {
            if (animation.target === target) {
                const animationDelta = {};

                for (let key in params) {
                    if (!target.hasOwnProperty(key)) {
                        throw new Error(`Target does not have property "${key}"!`);
                    }

                    animationDelta[key] = params[key] - target[key];
                }

                animation.animationDelta = animationDelta;
                animation.start = performance.now();
                animation.duration = duration;
                animation.lastUpdate = performance.now();
                const finishResult = this.generateFinishResult(target, animation.animationDelta);
                animation.finishResult = finishResult;

                return;
            }
        }
    }

    public update = (time: number) => {
        for (let animation of this.currentAnimations) {
            const timeDelta = time - animation.lastUpdate;
            animation.lastUpdate = time;

            for (let key in animation.animationDelta) {
                const paramDelta = timeDelta / animation.duration;
                animation.target[key] += paramDelta * animation.animationDelta[key];
            }

            if (time >= animation.start + animation.duration) {
                Object.assign(animation.target, animation.finishResult);
                animation.handler();

                return;
            }

            if (animation.onUpdate !== null) {
                animation.onUpdate((time - animation.start) / animation.duration);
            }
        }
    }
}