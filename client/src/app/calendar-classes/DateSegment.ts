import { AbstractContainer } from '../calendar-abstract/AbstractContainer';
import { IMovable } from '../calendar-interfaces/IMovable';
import { IResizable } from '../calendar-interfaces/IResizable';

export class DateSegment extends AbstractContainer implements IMovable, IResizable {
    private resizeSideClicked = 'none';

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.setResizable();
        this.setMovable();
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
        this.pixiObject.on('mousedown', (e) => {
            const boundX = e.currentTarget.getBounds().x;
            
            if (e.data.global.x < (boundX + 5)) this.resizeSideClicked = 'left';
            if (e.data.global.x > (boundX + this.getWidth() - 5)) this.resizeSideClicked = 'right';

            if (this.resizeSideClicked !== 'none') {
                const onResizeEventHandler = this.onResize.bind(this);

                this.pixiObject.on('mousemove', onResizeEventHandler);
                this.pixiObject.on('mouseup', () => {
                    this.resizeSideClicked = 'none';
                    this.pixiObject.off('mousemove', onResizeEventHandler)
                })
                this.pixiObject.on('mouseupoutside', () => {
                    this.resizeSideClicked = 'none';
                    this.pixiObject.off('mousemove', onResizeEventHandler)
                })
            }
        })
    }

    removeResizable() {
        this.pixiObject.interactive = false;
    }
    
    onResize(e) {
        let newWidth;
        switch (this.resizeSideClicked) {
            case 'left':
                newWidth = this.getWidth() - e.data.originalEvent.movementX;
                if (newWidth < 25) break;
                this.setX(this.getX() + e.data.originalEvent.movementX);
                this.setWidth(newWidth);
                break;
            case 'right':
                newWidth = this.getWidth() + e.data.originalEvent.movementX;
                if (newWidth < 25) break;
                this.setWidth(newWidth);
                break;
            case 'none':
                break;
        }
        this.drawBackgroundAndBorder();

        return e.data.originalEvent.movementX;
    }
}