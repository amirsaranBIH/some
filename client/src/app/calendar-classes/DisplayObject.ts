declare var createjs;

export abstract class DisplayObject {
    createjsObject: any;
    parent: any;

    backgroundColor: string;
    borderWeight: number;
    borderColor: string;

    constructor() {}

    getX() { return this.createjsObject.x; }
    setX(x: number) { this.createjsObject.x = x; }

    getY() { return this.createjsObject.y; }
    setY(y: number) { this.createjsObject.y = y; }
    
    getWidth() { return this.createjsObject.width; }
    setWidth(width: number) { this.createjsObject.width = width; }

    getHeight() { return this.createjsObject.height; }
    setHeight(height: number) { this.createjsObject.height = height; }

    getName() { return this.createjsObject.name; }
    setName(name: string) { this.createjsObject.name = name; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    getBounds() { return { x: this.createjsObject.x, y: this.createjsObject.y, width: this.createjsObject.width, height: this.createjsObject.height }; }
    setBounds(bounds) { 
        this.createjsObject.x = bounds.x;
        this.createjsObject.y = bounds.y;
        this.createjsObject.width = bounds.width;
        this.createjsObject.height = bounds.height;
    }

    getCreatejs() { return this.createjsObject; }

    addEvent(event, eventHandler) { this.createjsObject.addEventListener(event, eventHandler); }
    removeEvent(event, eventHandler) { this.createjsObject.removeEventListener(event, eventHandler); }

    getBackgroundColor() { return this.backgroundColor; }
    setBackgroundColor(backgroundColor: string) { this.backgroundColor = backgroundColor; }

    getBorder() { return { weight: this.borderWeight, color: this.borderColor }; }
    setBorder(weight = 1, color = '#000') { this.borderWeight = weight; this.borderColor = color; }
}