import { AbstractContainer } from '../calendar-abstract/AbstractContainer';
import { IMovable } from '../calendar-interfaces/IMovable';
import { IResizable } from '../calendar-interfaces/IResizable';

export class DateSegment extends AbstractContainer implements IMovable, IResizable {
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

    onMove(e) {
        return 1;
    }

    setResizable() {
        this.pixiObject.interactive = true;
        this.pixiObject.on('mousedown', () => {
            this.pixiObject.on('mousemove', this.onMove);
            this.pixiObject.on('mouseup', () => this.pixiObject.off('mousemove', this.onMove))
            this.pixiObject.on('mouseupoutside', () => this.pixiObject.off('mousemove', this.onMove))
        })
    }

    removeResizable() {
        this.pixiObject.interactive = false;
    }

    onResize(e) {
        return -1;
    }
}