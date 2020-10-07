import { Shape } from "./Shape";
import { VerticalScrollbar } from "./VerticalScrollbar";
import { HorizontalScrollbar } from "./HorizontalScrollbar";

declare var createjs;

export class Container extends Shape {
    private innerContainer: Container;
    private children = [];
    private verticalScrollbar: VerticalScrollbar;
    private horizontalScrollbar: HorizontalScrollbar;

    constructor(x, y, width, height) {
        super();
        this.createjsObject = new createjs.Container();
        this.createjsObject.x = x;
        this.createjsObject.y = y;
        this.createjsObject.width = width;
        this.createjsObject.height = height;
        this.setBounds({ x, y, width, height });
    }
    
    getVerticalScrollbar() { return this.verticalScrollbar; }
    getHorizontalScrollbar() { return this.horizontalScrollbar; }

    addChild(child) {
        this.children.push(child);
        this.createjsObject.addChild(child.getCreatejs());
        child.setParent(this);

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds();
        const childBounds = child.getBounds();

        if (childBounds.x < bounds.x) bounds.x = childBounds.x;
        if (childBounds.y < bounds.y) bounds.y = childBounds.y;
        if (childBounds.x + childBounds.width > bounds.width) bounds.width = childBounds.x + childBounds.width;
        if (childBounds.y + childBounds.height > bounds.height) bounds.height = childBounds.y + childBounds.height;

        this.setBounds(bounds);
    }

    addVerticalScrollbar() {
        this.verticalScrollbar = new VerticalScrollbar(this.getBounds());

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.verticalScrollbar);
        this.innerContainer.setWidth(this.innerContainer.getWidth() - this.verticalScrollbar.getScrollbarSize());
        this.removeScrollOverlapWhenBothScrollsActive();
        this.verticalScrollbar.addContainerToScrollConnections(this.innerContainer);
    }

    addHorizontalScrollbar() {
        this.horizontalScrollbar = new HorizontalScrollbar(this.getBounds());

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.horizontalScrollbar);
        this.innerContainer.setHeight(this.innerContainer.getHeight() - this.horizontalScrollbar.getScrollbarSize());
        this.removeScrollOverlapWhenBothScrollsActive();
        this.horizontalScrollbar.addContainerToScrollConnections(this.innerContainer);
    }

    private addInnerContainer() {
        this.innerContainer = new Container(0, 0, this.getWidth(), this.getHeight());
        this.innerContainer.setName(`inner-${this.getName()}`);
        this.addChild(this.innerContainer);
    }

    private removeScrollOverlapWhenBothScrollsActive() {
        if (this.verticalScrollbar && this.horizontalScrollbar) {
            this.verticalScrollbar.setHeight(this.verticalScrollbar.getHeight() - this.horizontalScrollbar.getScrollbarSize());
            this.horizontalScrollbar.setWidth(this.horizontalScrollbar.getWidth() - this.verticalScrollbar.getScrollbarSize());
        }
    }
}