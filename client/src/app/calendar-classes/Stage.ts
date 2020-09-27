declare var createjs;

export class Stage {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private stage: any;
    private children = [];
    private canvasDomId: string;
    private name: string;

    constructor(x: number, y: number, width: number, height: number, canvasDomId: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasDomId = canvasDomId;

        this.stage = new createjs.Stage(this.canvasDomId);
        this.stage.canvas.width = this.width;
        this.stage.canvas.height = this.height;
        this.stage.canvas.style.left = `${this.x}px`;
        this.stage.canvas.style.top = `${this.y}px`;

        this.createTicker();
    }

    get getX() { return this.x; }
    set setX(x: number) { this.x = x; }

    get getY() { return this.y; }
    set setY(y: number) { this.y = y; }
    
    get getWidth() { return this.width; }
    set setWidth(width: number) { this.width = width; }

    get getHeight() { return this.height; }
    set setHeight(height: number) { this.height = height; }

    get getName() { return this.name; }
    set setName(name: string) { this.stage.name = this.name = name; }

    get getBounds() { return this.stage.getBounds(); }
    set setBounds(bounds) { this.stage.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    get getCreatejs() { return this.stage; }

    createTicker() {
        createjs.Ticker.on("tick", this.handleTick.bind(this));
    }

    private handleTick() {
        this.stage.update();
    }

    addChild(child) {
        this.children.push(child);
        this.stage.addChild(child.getCreatejs);

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds;

        if (child.x < bounds.x) bounds.x = child.x;
        if (child.y < bounds.y) bounds.y = child.y;
        if (child.width > bounds.width) bounds.width = child.width;
        if (child.height > bounds.height) bounds.height = child.height;

        this.stage.setBounds = bounds;
    }
}