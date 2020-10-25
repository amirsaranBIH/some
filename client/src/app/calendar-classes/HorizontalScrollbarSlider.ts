import { AbstractScrollbarSlider } from '../calendar-abstract/AbstractScrollbarSlider';

export class HorizontalScrollbarSlider extends AbstractScrollbarSlider {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.setMovable();
    }

    onMove(e) {
        if ((e.currentTarget.x + e.data.originalEvent.movementX) < 0) return 0;
        if ((e.currentTarget.x + e.currentTarget.width + e.data.originalEvent.movementX) > e.currentTarget.parent.getBounds().width) return 0;
        e.currentTarget.x += e.data.originalEvent.movementX;
        return e.data.originalEvent.movementX;
    }
}