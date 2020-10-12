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

    getBounds() { return { x: this.createjsStage.x, y: this.createjsStage.y, width: this.createjsStage.width, height: this.createjsStage.height }; }
    setBounds(bounds) { 
        this.createjsStage.x = bounds.x;
        this.createjsStage.y = bounds.y;
        this.createjsStage.width = bounds.width;
        this.createjsStage.height = bounds.height;
    }

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
    }
}