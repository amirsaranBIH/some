import { Container } from "../calendar-classes/Container";

export interface IStage {
    x: number;
    y: number;
    width: number;
    height: number;
    canvasId: string;
    name: string;
    children: Container[];
}