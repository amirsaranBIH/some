import { AbstractScrollbarSlider } from '../calendar-abstract/AbstractScrollbarSlider';

export class HorizontalScrollbarSlider extends AbstractScrollbarSlider {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    onMove(e) {
        return -1;
    }
}