import { Shape } from "./Shape";
import { Scrollbar } from "./Scrollbar";

export class VerticalScrollbar extends Scrollbar {

    constructor(parentBounds: any) {
        super(parentBounds);

        this.slider.width = this.scrollbarSize;
    }

    setScrollbarSize() {
        this.setX(this.parentBounds.width - this.scrollbarSize);
        this.setY(0);
        this.setWidth(this.scrollbarSize);
        this.setHeight(this.parentBounds.height);
    }

    setScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const y = this.calculateScrollPosition(e);
            this.containerScrollConnections.forEach(conn => conn.setY(y));
        });
    }

    addContainerToScrollConnections(container: Shape) {
        this.containerScrollConnections.push(container);

        let maxHeight = 0;
        this.containerScrollConnections.forEach(c => {
            if (c.getBounds().height > maxHeight) maxHeight = c.getBounds().height;
        });

        this.slider.height = (this.getHeight() / maxHeight) * this.getHeight();
    }

    calculateScrollPosition(e) {
        return -10;
    }
}
