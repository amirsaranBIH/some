import { Scrollbar } from "./Scrollbar";

declare var createjs;

export class Container {
    private createjsContainer: any;
    private parent: any;
    private innerContainer: Container;
    public backgroundShape: any;
    private backgroundColor: string;
    private backgroundBorderWeight: number;
    private backgroundBorderColor: string;
    private children = [];
    private verticalScrollbar: Scrollbar;
    private horizontalScrollbar: Scrollbar;

    constructor(x, y, width, height) {
        this.createjsContainer = new createjs.Container();
        this.createjsContainer.x = x;
        this.createjsContainer.y = y;
        this.createjsContainer.width = width;
        this.createjsContainer.height = height;
        this.setBounds({ x, y, width, height });
    }

    getX() { return this.createjsContainer.x; }
    setX(x: number) { this.createjsContainer.x = x; }

    getY() { return this.createjsContainer.y; }
    setY(y: number) { this.createjsContainer.y = y; }
    
    getWidth() { return this.createjsContainer.width; }
    setWidth(width: number) {
        this.createjsContainer.width = width;
        if (this.backgroundShape) {
            this.updateBackground();
        }
    }

    getHeight() { return this.createjsContainer.height; }
    setHeight(height: number) {
        this.createjsContainer.height = height;
        if (this.backgroundShape) {
            this.updateBackground();
        }
    }

    getName() { return this.createjsContainer.name; }
    setName(name: string) { this.createjsContainer.name = name; }

    getBackgroundColor() { return this.backgroundColor; }
    setBackgroundColor(backgroundColor: string) {
        this.backgroundColor = backgroundColor;
        this.setBackground();
    }

    getBounds() { return this.createjsContainer.getBounds(); }
    setBounds(bounds) { this.createjsContainer.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }
    
    getVerticalScrollbar() { return this.verticalScrollbar; }
    getHorizontalScrollbar() { return this.horizontalScrollbar; }

    getCreatejs() { return this.createjsContainer; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    addChild(child) {
        this.children.push(child);
        this.createjsContainer.addChild(child.getCreatejs());
        child.setParent(this);

        this.updateBoundsWhenAddingChild(child);
    }

    private setBackground() {
        if (this.backgroundShape) {
            this.updateBackground();
        } else {
            this.addBackground();
        }
    }

    private updateBackground() {
        this.backgroundShape.graphics
            .clear()
            .beginFill(this.backgroundColor)
            .setStrokeStyle(this.backgroundBorderWeight)
            .beginStroke(this.backgroundBorderColor)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill()
    }
    
    private addBackground() {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.name = 'background';
        this.updateBackground();
        this.createjsContainer.addChild(this.backgroundShape);
    }
    
    setBorder(weight, color) {
        this.backgroundBorderWeight = weight;
        this.backgroundBorderColor = color;

        this.setBackground();
	}

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds();
        const childBounds = child.getBounds();

        if (childBounds.x < bounds.x) bounds.x = childBounds.x;
        if (childBounds.y < bounds.y) bounds.y = childBounds.y;
        if (childBounds.width > bounds.width) bounds.width = childBounds.width;
        if (childBounds.height > bounds.height) bounds.height = childBounds.height;

        this.setBounds(bounds);
    }

    addVerticalScrollbar() {
        this.verticalScrollbar = new Scrollbar(this.getBounds(), 'vertical');

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.verticalScrollbar);
        this.innerContainer.setWidth(this.innerContainer.getWidth() - this.verticalScrollbar.getVerticalScrollbarSize());
        this.removeScrollOverlapWhenBothScrollsActive();
        this.verticalScrollbar.addContainerToYScrollConnections(this.innerContainer);
    }

    addHorizontalScrollbar() {
        this.horizontalScrollbar = new Scrollbar(this.getBounds(), 'horizontal');

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.horizontalScrollbar);
        this.innerContainer.setHeight(this.innerContainer.getHeight() - this.horizontalScrollbar.getHorizontalScrollbarSize());
        this.removeScrollOverlapWhenBothScrollsActive();
        this.horizontalScrollbar.addContainerToXScrollConnections(this.innerContainer);
    }

    private addInnerContainer() {
        this.innerContainer = new Container(0, 0, this.getWidth(), this.getHeight());
        this.innerContainer.setName(`inner-${this.getName()}`);
        this.addChild(this.innerContainer);
    }

    private removeScrollOverlapWhenBothScrollsActive() {
        if (this.verticalScrollbar && this.horizontalScrollbar) {
            this.verticalScrollbar.setHeight(this.verticalScrollbar.getHeight() - this.horizontalScrollbar.getHorizontalScrollbarSize());
            this.horizontalScrollbar.setWidth(this.horizontalScrollbar.getWidth() - this.verticalScrollbar.getVerticalScrollbarSize());
        }
    }

    addEvent(event, eventHandler) {
        this.createjsContainer.addEventListener(event, eventHandler);
    }
}