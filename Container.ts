export class Container {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private container: any;
    private innerContainer: any;
    private background: string;
    private name: string;
    private children: any[];
    private verticalScrollbar;
    private horizontalScrollbar;
    private verticalScrollbarSize = 20;
    private horizontalScrollbarSize = 20;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.container = new createjs.Container();
        this.container.setBounds(this.x, this.y, this.width, this.height);
    }

    get getX() { return this.x; }
    set setX(x) { this.x = x; }

    get getY() { return this.y; }
    set setY(y) { this.y = y; }
    
    get getWidth() { return this.width; }
    set setWidth(width) { this.width = width; }

    get getHeight() { return this.height; }
    set setHeight(height) { this.height = height; }

    get getName() { return this.name; }
    set setName(name) { this.container.name = this.name = name; }

    get getBackground() { return this.background; }
    set setBackground(background) { this.background = background; }

    get getBounds() { return this.container.getBounds(); }
    set setBounds(bounds) { this.container.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }
    
    get getVerticalScrollbar() { return this.verticalScrollbar; }
    get getHorizontalScrollbar() { return this.horizontalScrollbar; }

    addChild(child) {
        this.children.push(child);
        this.container.addChild(child);

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds;

        if (child.x < bounds.x) bounds.x = child.x;
        if (child.y < bounds.y) bounds.y = child.y;
        if (child.width > bounds.width) bounds.width = child.width;
        if (child.height > bounds.height) bounds.height = child.height;

        this.container.setBounds = bounds;
    }

    private addVerticalScrollbar() {
        this.verticalScrollbar = new Scrollbar(this.width - this.verticalScrollbarSize, 0, this.verticalScrollbarSize, this.height);

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.innerContainer.setWidth = this.innerContainer.getWidth - this.verticalScrollbarSize;

        this.verticalScrollbar.addContainerToYScrollConnections(this.innerContainer);
    }

    private addHorizontalScrollbar() {
        this.horizontalScrollbar = new Scrollbar(this.width - this.horizontalScrollbarSize, 0, this.horizontalScrollbarSize, this.height);

        if (!this.innerContainer) {
            this.addInnerContainer();
        }

        this.innerContainer.setHeight = this.innerContainer.getHeight - this.horizontalScrollbarSize;

        this.horizontalScrollbar.addContainerToXScrollConnections(this.innerContainer);
    }

    private addInnerContainer() {
        this.innerContainer = new Container(0, 0, this.width, this.height);
    }
}

class Scrollbar {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private scrollbar: any;
    private slider: any;
    private containerXScrollConnections = [];
    private containerYScrollConnections = [];

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.scrollbar = new createjs.Container();
        this.slider = new createjs.Shape(0, 0, this.width, this.height);
    }

    get getX() { return this.x; }
    get getY() { return this.y; }

    get getWidth() { return this.width; }
    get getHeight() { return this.height; }

    set setX(x) { this.x = x; }
    set setY(y) { this.y = y; }

    set setWidth(width) { this.width = width; }
    set setHeight(height) { this.height = height; }

    addContainerToXScrollConnections(container) {
        this.containerXScrollConnections.push(container);
    }

    addContainerToYScrollConnections(container) {
        this.containerYScrollConnections.push(container);
    }

    setXScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const x = this.calculateXScrollPosition(e);
            this.containerXScrollConnections.forEach(conn => conn.setX = x);
        });
    }

    setYScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const y = this.calculateYScrollPosition(e);
            this.containerYScrollConnections.forEach(conn => conn.setY = y);
        });
    }

    private calculateXScrollPosition(e) {
        return -10;
    }

    private calculateYScrollPosition(e) {
        return -10;
    }
}
