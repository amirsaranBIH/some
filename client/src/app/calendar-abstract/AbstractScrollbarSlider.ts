import { AbstractGraphics } from './AbstractGraphics';
import { IMovable } from '../calendar-interfaces/IMovable';

export abstract class AbstractScrollbarSlider extends AbstractGraphics implements IMovable {
    static scrollbarSliderSize = 20;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    setMovable() {
        this.pixiObject.interactive = true;
        this.pixiObject.on('mousedown', () => {
            this.pixiObject.on('mousemove', this.onMove);
            this.pixiObject.on('mouseup', () => this.pixiObject.off('mousemove', this.onMove))
            this.pixiObject.on('mouseupoutside', () => this.pixiObject.off('mousemove', this.onMove))
        })
    }

    removeMovable() {
        this.pixiObject.interactive = false;
    }

    abstract onMove(e): number;
}