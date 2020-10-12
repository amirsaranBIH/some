import { Scrollbar } from "./Scrollbar";
import { DisplayObject } from './DisplayObject';

export class VerticalScrollbar extends Scrollbar {

    constructor(parent: DisplayObject) {
        super(parent);

        this.slider.setHeight(this.scrollbarSize);
    }

    setScrollbarSize() {
        this.setX(this.parent.getWidth() - this.scrollbarSize);
        this.setY(0);
        this.setWidth(this.scrollbarSize);
        this.setHeight(this.parent.getHeight());
    }

    setScrollEvent() {
        this.slider.removeEvent('mousemove', this.onMouseMoveEventHanlder);
        this.slider.addEvent('mousemove', this.onMouseMoveEventHanlder);
    }

    onMouseMoveEventHanlder(e) {
        const y = this.calculateScrollPosition(e);
        this.containerScrollConnections.forEach(conn => conn.setY(y));
    }

    addContainerToScrollConnections(container: DisplayObject) {
        this.containerScrollConnections.push(container);

        let maxHeight = 0;
        this.containerScrollConnections.forEach(c => {
            if (c.getBounds().height > maxHeight) maxHeight = c.getBounds().height;
        });

        this.slider.setWidth((this.getHeight() / maxHeight) * this.getHeight());
    }

    calculateScrollPosition(e) {
        return -10;
    }
}
