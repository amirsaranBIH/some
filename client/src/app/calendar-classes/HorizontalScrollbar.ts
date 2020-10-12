import { Scrollbar } from "./Scrollbar";
import { DisplayObject } from './DisplayObject';

export class HorizontalScrollbar extends Scrollbar {

    constructor(parent: DisplayObject) {
        super(parent);

        this.slider.setHeight(this.scrollbarSize);
    }

    setScrollbarSize() {
        this.setX(0);
        this.setY(this.parent.getHeight() - this.scrollbarSize);
        this.setWidth(this.parent.getWidth());
        this.setHeight(this.scrollbarSize);
    }

    setScrollEvent() {
        // this.slider.removeEvent('mousemove', this.onMouseMoveEventHanlder.bind(this));
        this.slider.getCreatejs().addEventListener('mousemove', (e) => { console.log(e); this.onMouseMoveEventHanlder(e)});
        console.log(this.slider);
    }

    onMouseMoveEventHanlder(e) {
        console.log(e)
        const x = this.calculateScrollPosition(e);
        this.containerScrollConnections.forEach(conn => conn.setX(x));
    }

    addContainerToScrollConnections(container) {
        this.containerScrollConnections.push(container);
        
        let maxWidth = 0;
        this.containerScrollConnections.forEach(c => {
            if (c.getChildBounds().width > maxWidth) maxWidth = c.getChildBounds().width;
        });

        this.slider.setWidth((this.getWidth() / maxWidth) * this.getWidth());

        this.setScrollEvent();
    }

    calculateScrollPosition(e) {
        console.log(e)
        return 10;
    }
}
