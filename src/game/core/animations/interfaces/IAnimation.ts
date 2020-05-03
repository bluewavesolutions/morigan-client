import { IAnimationDelta } from "./IAnimationDelta";

export interface IAnimation {
    target: any;
    duration: number;
    handler: () => void;
    onUpdate: (percentageFinished?: number) => void | null;
    lastUpdate: number;
    start: number;
    animationDelta: IAnimationDelta;
    finishResult: { 
        [key: string]: number 
    };
}