export abstract class AbstractPixiObject {
    pixiObject: any;
    parent: any;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor() { }

    getX() { return this.x; }
    setX(x: number) { this.x = x; }

    getY() { return this.y; }
    setY(y: number) { this.y = y; }

    getWidth() { return this.width; }
    setWidth(width: number) { this.width = width; }

    getHeight() { return this.height; }
    setHeight(height: number) { this.height = height; }

    getName() { return this.pixiObject.name; }
    setName(name: string) { this.pixiObject.name = name; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    getPixiObject() { return this.pixiObject; }

    addEvent(event, eventHandler) { this.pixiObject.on(event, eventHandler); }
    removeEvent(event, eventHandler) { this.pixiObject.removeEventListener(event, eventHandler); }
}