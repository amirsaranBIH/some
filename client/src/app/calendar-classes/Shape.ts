declare var createjs;

export abstract class Shape {
    createjsObject: any;
    parent: any;
    backgroundShape: any;
    backgroundColor: string;
    borderWeight: number;
    borderColor: string;

    constructor() {}

    getX() { return this.createjsObject.x; }
    setX(x: number) { this.createjsObject.x = x; }

    getY() { return this.createjsObject.y; }
    setY(y: number) { this.createjsObject.y = y; }
    
    getWidth() { return this.createjsObject.width; }
    setWidth(width: number) {
        this.createjsObject.width = width;
        if (this.backgroundShape) this.updateBackground();
    }

    getHeight() { return this.createjsObject.height; }
    setHeight(height: number) {
        this.createjsObject.height = height;
        if (this.backgroundShape) this.updateBackground();
    }

    getName() { return this.createjsObject.name; }
    setName(name: string) { this.createjsObject.name = name; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    getBackgroundColor() { return this.backgroundColor; }
    setBackgroundColor(backgroundColor: string) {
        this.backgroundColor = backgroundColor;
        this.setBackground();
    }

    getPositionAndSize() { return { x: this.getX(), y: this.getY(), width: this.getWidth(), height: this.getHeight() } }
    setPositionAndSize(x, y, width, height) {
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }

    getBounds() { return this.createjsObject.getBounds(); }
    setBounds(bounds) { this.createjsObject.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    getCreatejs() { return this.createjsObject; }

    setBorder(weight = 1, color = '#000') {
        this.borderWeight = weight;
        this.borderColor = color;

        this.setBackground();
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
            .setStrokeStyle(this.borderWeight)
            .beginStroke(this.borderColor)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill()
    }
    
    protected addBackground() {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.name = 'background';
        this.updateBackground();
        this.createjsObject.addChild(this.backgroundShape);
    }

    addEvent(event, eventHandler) {
        this.createjsObject.addEventListener(event, eventHandler);
    }
}