declare var createjs;

export abstract class AbstractShape {
    protected createjsObject: any;
    protected name: string;

    constructor(x: number, y: number, width: number, height: number) {
        this.createjsObject = new createjs.Shape();
        this.createjsObject.x = x;
        this.createjsObject.y = y
        this.createjsObject.width = width;
        this.createjsObject.height = height;
    }

    getX(): number { return this.createjsObject.x; };
    getY(): number { return this.createjsObject.y; };
    getWidth(): number { return this.createjsObject.width; };
    getHeight(): number { return this.createjsObject.height; };
    getName(): string { return this.name; };

    setX(x: number): void { this.createjsObject.x = x; };
    setY(y: number): void { this.createjsObject.y = y; };
    setWidth(width: number): void { this.createjsObject.width = width; };
    setHeight(height: number): void { this.createjsObject.height = height; };
    setName(name: string): void { this.name = name; };

    getCreatejs(): any { return this.createjsObject; };
}