import { AnimatedValue } from "../../utils/AnimatedValue";

export interface IRenderObject {
    id: number,
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: AnimatedValue,
    dy: AnimatedValue,
    dw: number,
    dh: number,
}