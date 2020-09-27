import { Scrollbar } from "./Scrollbar";

declare var createjs;

export class Container {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private container: any;
    private innerContainer: Container;
    private backgroundShape: any;
    private name: string;
    private children = [];
    private verticalScrollbar: Scrollbar;
    private horizontalScrollbar: Scrollbar;
    private verticalScrollbarSize = 20;
    private horizontalScrollbarSize = 20;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.container = new createjs.Container();
        this.container.x = this.x;
        this.container.y = this.y;
        this.container.width = this.width;
        this.container.height = this.height;
        this.setBounds = { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    get getX() { return this.x; }
    set setX(x: number) { this.x = x; }

    get getY() { return this.y; }
    set setY(y: number) { this.y = y; }
    
    get getWidth() { return this.width; }
    set setWidth(width: number) {
        this.width = width;
        this.container.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    get getHeight() { return this.height; }
    set setHeight(height: number) {
        this.height = height;
        this.container.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    get getName() { return this.name; }
    set setName(name: string) { this.container.name = this.name = name; }

    get getBackground() { return this.backgroundShape; }
    set setBackground(background: string) {
        if (this.backgroundShape) {
            this.updateBackground(background);
        } else {
            this.addBackground(background);
        }
    }

    get getBounds() { return this.container.getBounds(); }
    set setBounds(bounds) { this.container.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }
    
    get getVerticalScrollbar() { return this.verticalScrollbar; }
    get getHorizontalScrollbar() { return this.horizontalScrollbar; }

    get getCreatejs() { return this.container; }

    addChild(child) {
        this.children.push(child);
        this.container.addChild(child.getCreatejs);

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.width, this.height).endFill()
    }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.width, this.height).endFill();
        this.backgroundShape.name = 'background';
        this.container.addChild(this.backgroundShape);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds;

        if (child.x < bounds.x) bounds.x = child.x;
        if (child.y < bounds.y) bounds.y = child.y;
        if (child.width > bounds.width) bounds.width = child.width;
        if (child.height > bounds.height) bounds.height = child.height;

        this.container.setBounds = bounds;
    }

    addVerticalScrollbar() {
        this.verticalScrollbar = new Scrollbar(this.width - this.verticalScrollbarSize, 0, this.verticalScrollbarSize, this.height);

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.verticalScrollbar);
        
        this.innerContainer.setWidth = this.innerContainer.getWidth - this.verticalScrollbarSize;

        this.removeScrollOverlapWhenBothScrollsActive();

        this.verticalScrollbar.addContainerToYScrollConnections(this.innerContainer);
    }

    addHorizontalScrollbar() {
        this.horizontalScrollbar = new Scrollbar(0, this.height - this.horizontalScrollbarSize, this.width, this.horizontalScrollbarSize);

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.addChild(this.horizontalScrollbar);

        this.innerContainer.setHeight = this.innerContainer.getHeight - this.horizontalScrollbarSize;

        this.removeScrollOverlapWhenBothScrollsActive();

        this.horizontalScrollbar.addContainerToXScrollConnections(this.innerContainer);
    }

    private addInnerContainer() {
        this.innerContainer = new Container(0, 0, this.width, this.height);
        this.innerContainer.setName = `inner-${this.name}`;
        this.addChild(this.innerContainer);
    }

    private removeScrollOverlapWhenBothScrollsActive() {
        if (this.verticalScrollbar && this.horizontalScrollbar) {
            this.verticalScrollbar.setHeight = this.verticalScrollbar.getHeight - this.horizontalScrollbarSize;
            this.horizontalScrollbar.setWidth = this.horizontalScrollbar.getWidth - this.verticalScrollbarSize;
        }
    }

    addEvent(event, eventHandler) {
        this.container.addEventListener(event, eventHandler);
    }
}