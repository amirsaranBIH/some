import { VerticalScrollbar } from "./VerticalScrollbar";
import { HorizontalScrollbar } from "./HorizontalScrollbar";
import { DisplayObject } from './DisplayObject';

declare var createjs;

export class Container extends DisplayObject {
    private innerContainer: Container;
    private children = [];
    private childBounds: any;
    private verticalScrollbar: VerticalScrollbar;
    private horizontalScrollbar: HorizontalScrollbar;
    private backgroundShape: any;

    constructor(x, y, width, height) {
        super();
        this.createjsObject = new createjs.Container();
        this.createjsObject.x = x;
        this.createjsObject.y = y;
        this.createjsObject.width = width;
        this.createjsObject.height = height;
        this.setChildBounds({ x, y, width, height })
    }

    getChildBounds() { return this.childBounds; }
    setChildBounds(bounds) { this.childBounds = bounds; }

    setWidth(width: number) {
        super.setWidth(width);
        this.setBackgroundAndBorder();
    }

    setHeight(height: number) {
        super.setHeight(height);
        this.setBackgroundAndBorder();
    }
    
    getVerticalScrollbar() { return this.verticalScrollbar; }
    getHorizontalScrollbar() { return this.horizontalScrollbar; }

    addChild(child) {
        this.children.push(child);
        this.createjsObject.addChild(child.getCreatejs());
        child.setParent(this);

        this.updateChildBoundsWhenAddingChild(child);
    }

    private updateChildBoundsWhenAddingChild(addedChild) {
        const bounds = this.getChildBounds();
        const acBounds = addedChild.getBounds();

        if (acBounds.x < bounds.x) bounds.x = acBounds.x;
        if (acBounds.y < bounds.y) bounds.y = acBounds.y;
        if (acBounds.x + acBounds.width > bounds.width) bounds.width = acBounds.x + acBounds.width;
        if (acBounds.y + acBounds.height > bounds.height) bounds.height = acBounds.y + acBounds.height;

        this.setChildBounds(bounds);
    }

    addVerticalScrollbar() {
        this.verticalScrollbar = new VerticalScrollbar(this);

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.verticalScrollbar);
        this.innerContainer.setWidth(this.innerContainer.getWidth() - this.verticalScrollbar.getScrollbarSize());
        this.removeScrollOverlapWhenBothScrollsActive();
        this.verticalScrollbar.addContainerToScrollConnections(this.innerContainer);
    }

    addHorizontalScrollbar() {
        this.horizontalScrollbar = new HorizontalScrollbar(this);

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

    setBackgroundColor(backgroundColor: string) {
        super.setBackgroundColor(backgroundColor);
        this.setBackgroundAndBorder();
    }

    setBorder(weight = 1, color = '#000') {
        super.setBorder(weight, color);
        this.setBackgroundAndBorder();
	}

    private setBackgroundAndBorder() {
        if (this.backgroundShape) {
            this.updateBackgroundAndBorder();
        } else {
            this.addBackground();
        }
    }

    private updateBackgroundAndBorder() {
        this.backgroundShape.graphics
            .clear()
            .beginFill(this.backgroundColor)
            .setStrokeStyle(this.borderWeight)
            .beginStroke(this.borderColor)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill()
    }
    
    private addBackground() {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.name = 'background';
        this.updateBackgroundAndBorder();
        this.createjsObject.addChild(this.backgroundShape);
    }
}