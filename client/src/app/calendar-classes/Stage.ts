declare var createjs;

export class Stage {
    private createjsStage: any;
    private children = [];

    constructor(x: number, y: number, width: number, height: number, canvasDomId: string) {
        this.createjsStage = new createjs.Stage(canvasDomId);
        this.createjsStage.canvas.width = width;
        this.createjsStage.canvas.height = height;
        this.createjsStage.canvas.style.left = `${x}px`;
        this.createjsStage.canvas.style.top = `${y}px`;

        this.createTicker();
    }

    getX() { return this.createjsStage.canvas.style.left; }
    setX(x: number) { this.createjsStage.canvas.style.left = `${x}px`; }

    getY() { return this.createjsStage.canvas.style.top; }
    setY(y: number) { this.createjsStage.canvas.style.top = `${y}px`; }
    
    getWidth() { return this.createjsStage.canvas.width; }
    setWidth(width: number) { this.createjsStage.canvas.width = width; }

    getHeight() { return this.createjsStage.canvas.height; }
    setHeight(height: number) { this.createjsStage.canvas.height = height; }

    getName() { return this.createjsStage.name; }
    setName(name: string) { this.createjsStage.name = name; }

    getBounds() { return this.createjsStage.getBounds(); }
    setBounds(bounds) { this.createjsStage.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    getCreatejs() { return this.createjsStage; }

    createTicker() {
        createjs.Ticker.on("tick", this.handleTick.bind(this));
    }

    private handleTick() {
        this.createjsStage.update();
    }

    addChild(child) {
        this.children.push(child);
        this.createjsStage.addChild(child.getCreatejs());
        child.setParent(this);

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