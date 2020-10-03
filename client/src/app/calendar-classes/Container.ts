import { Scrollbar } from "./Scrollbar";

declare var createjs;

export class Container {
    private createjsObject: any;
    private innerContainer: Container;
    private backgroundShape: any;
    private children = [];
    private verticalScrollbar: Scrollbar;
    private horizontalScrollbar: Scrollbar;

    constructor(x, y, width, height) {
        this.createjsObject = new createjs.Container();
        this.createjsObject.x = x;
        this.createjsObject.y = y;
        this.createjsObject.width = width;
        this.createjsObject.height = height;
        this.setBounds({ x, y, width, height });
    }

    getX() { return this.createjsObject.x; }
    setX(x: number) { this.createjsObject.x = x; }

    getY() { return this.createjsObject.y; }
    setY(y: number) { this.createjsObject.y = y; }
    
    getWidth() { return this.createjsObject.width; }
    setWidth(width: number) {
        this.createjsObject.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    getHeight() { return this.createjsObject.height; }
    setHeight(height: number) {
        this.createjsObject.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    getName() { return this.createjsObject.name; }
    setName(name: string) { this.createjsObject.name = name; }

    getBackground() { return this.backgroundShape; }
    setBackground(background: string) {
        if (this.backgroundShape) {
            this.updateBackground(background);
        } else {
            this.addBackground(background);
        }
    }

    getBounds() { return this.createjsObject.getBounds(); }
    setBounds(bounds) { this.createjsObject.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }
    
    getVerticalScrollbar() { return this.verticalScrollbar; }
    getHorizontalScrollbar() { return this.horizontalScrollbar; }

    getCreatejs() { return this.createjsObject; }

    addChild(child) {
        this.children.push(child);
        this.createjsObject.addChild(child.getCreatejs());

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill()
    }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill();
        this.backgroundShape.name = 'background';
        this.createjsObject.addChild(this.backgroundShape);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds();

        if (child.x < bounds.x) bounds.x = child.x;
        if (child.y < bounds.y) bounds.y = child.y;
        if (child.width > bounds.width) bounds.width = child.width;
        if (child.height > bounds.height) bounds.height = child.height;

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
        this.createjsObject.addEventListener(event, eventHandler);
    }
}