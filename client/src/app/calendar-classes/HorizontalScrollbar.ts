import { Shape } from "./Shape";
import { Scrollbar } from "./Scrollbar";

export class HorizontalScrollbar extends Scrollbar {

    constructor(parentBounds: any) {
        super(parentBounds);

        this.slider.height = this.scrollbarSize;
    }

    setScrollbarSize() {
        this.setX(0);
        this.setY(this.parentBounds.height - this.scrollbarSize);
        this.setWidth(this.parentBounds.width);
        this.setHeight(this.scrollbarSize);
    }

    setScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const x = this.calculateScrollPosition(e);
            this.containerScrollConnections.forEach(conn => conn.setX(x));
        });
    }

    addContainerToScrollConnections(container: Shape) {
        this.containerScrollConnections.push(container);
        
        let maxWidth = 0;
        this.containerScrollConnections.forEach(c => {
            if (c.getBounds().width > maxWidth) maxWidth = c.getBounds().width;
        });
        console.log(this.containerScrollConnections, maxWidth, this.getWidth(), (this.getWidth() / maxWidth) * this.getWidth())

        this.slider.width = (this.getWidth() / maxWidth) * this.getWidth();
        console.log(this.slider)
    }

    calculateScrollPosition(e) {
        return 10;
    }
}
