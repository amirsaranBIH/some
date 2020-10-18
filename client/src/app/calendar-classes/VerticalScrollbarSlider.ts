import { AbstractScrollbarSlider } from '../calendar-abstract/AbstractScrollbarSlider';

export class VerticalScrollbarSlider extends AbstractScrollbarSlider {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    onMove(e) {
        return -1;
    }
}