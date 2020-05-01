import { AnimatedValue } from "../../../core/AnimatedValue";

export interface ICharacter {
    AccountId: string;
    Id: number;
    MapId: number;
    Nick: string;
    Outfit: string;
    PositionX: number;
    PositionY: number;
    MapPositionX: number;
    MapPositionY: number;
    SessionToken: string;
    AnimatedMapPositionX: AnimatedValue;
    AnimatedMapPositionY: AnimatedValue;
    AnimatedPositionX: AnimatedValue;
    AnimatedPositionY: AnimatedValue;
    CameraLock: {
        Top: boolean,
        Left: boolean,
        Right: boolean,
        Bottom: boolean
    }
}