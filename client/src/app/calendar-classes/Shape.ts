import { DisplayObject } from './DisplayObject';

declare var createjs;

export class Shape extends DisplayObject {

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.createjsObject = new createjs.Shape();
        this.createjsObject.x = x;
        this.createjsObject.y = y;
        this.createjsObject.width = width;
        this.createjsObject.height = height;
    }

    setWidth(width: number) {
        super.setWidth(width);
        this.updateBackgroundAndBorder();
    }

    setHeight(height: number) {
        super.setHeight(height);
        this.updateBackgroundAndBorder();
    }

    setBackgroundColor(backgroundColor: string) {
        super.setBackgroundColor(backgroundColor);
        this.updateBackgroundAndBorder();
    }

    setBorder(weight = 1, color = '#000') {
        super.setBorder(weight, color);
        this.updateBackgroundAndBorder();
	}

    private updateBackgroundAndBorder() {
        this.createjsObject.graphics
            .clear()
            .beginFill(this.backgroundColor)
            .setStrokeStyle(this.borderWeight)
            .beginStroke(this.borderColor)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill()
    }
}