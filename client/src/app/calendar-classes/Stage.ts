declare var createjs;

export class Stage {
    private createjsObject: any;
    private children = [];

    constructor(x: number, y: number, width: number, height: number, canvasDomId: string) {
        this.createjsObject = new createjs.Stage(canvasDomId);
        this.createjsObject.canvas.width = width;
        this.createjsObject.canvas.height = height;
        this.createjsObject.canvas.style.left = `${x}px`;
        this.createjsObject.canvas.style.top = `${y}px`;

        this.createTicker();
    }

    getX() { return this.createjsObject.canvas.style.left; }
    setX(x: number) { this.createjsObject.canvas.style.left = `${x}px`; }

    getY() { return this.createjsObject.canvas.style.top; }
    setY(y: number) { this.createjsObject.canvas.style.top = `${y}px`; }
    
    getWidth() { return this.createjsObject.canvas.width; }
    setWidth(width: number) { this.createjsObject.canvas.width = width; }

    getHeight() { return this.createjsObject.canvas.height; }
    setHeight(height: number) { this.createjsObject.canvas.height = height; }

    getName() { return this.createjsObject.name; }
    setName(name: string) { this.createjsObject.name = name; }

    getBounds() { return this.createjsObject.getBounds(); }
    setBounds(bounds) { this.createjsObject.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    getCreatejs() { return this.createjsObject; }

    createTicker() {
        createjs.Ticker.on("tick", this.handleTick.bind(this));
    }

    private handleTick() {
        this.createjsObject.update();
    }

    addChild(child) {
        this.children.push(child);
        this.createjsObject.addChild(child.getCreatejs());

        this.updateBoundsWhenAddingChild(child);
    }

    private updateBoundsWhenAddingChild(child) {
        const bounds = this.getBounds();

        if (child.x < bounds.x) bounds.x = child.x;
        if (child.y < bounds.y) bounds.y = child.y;
        if (child.width > bounds.width) bounds.width = child.width;
        if (child.height > bounds.height) bounds.height = child.height;

        this.setBounds(bounds);
    }
}