
import { DisplayObject } from './DisplayObject';
import { Shape } from "./Shape";

declare var createjs;

export abstract class Scrollbar extends DisplayObject {
    backgroundShape: any;
    slider: Shape;
    containerScrollConnections = [];
    scrollbarSize = 20;
    
    constructor(parent: DisplayObject) {
        super();
        this.createjsObject = new createjs.Container();

        this.setParent(parent);
        this.setScrollbarSize();
        this.setBackgroundColor('red');
        this.createSlider();
    }

    getScrollbarSize() { return this.scrollbarSize; }
    
    createSlider() {
        this.slider = new Shape(0, 0, 0, 0);
        this.slider.setBackgroundColor('black');
        this.slider.setName('slider');
        this.createjsObject.addChild(this.slider.getCreatejs());
    }

    setWidth(width: number) {
        super.setWidth(width);
        this.setBackgroundAndBorder();
    }

    setHeight(height: number) {
        super.setHeight(height);
        this.setBackgroundAndBorder();
    }

    setBackgroundColor(backgroundColor: string) {
        super.setBackgroundColor(backgroundColor);
        this.setBackgroundAndBorder();
    }

    setBorder(weight = 1, color = '#000') {
        super.setBorder(weight, color);
        this.setBackgroundAndBorder();
	}

    private setBackgroundAndBorder() {
        if (this.backgroundShape) {
            this.updateBackgroundAndBorder();
        } else {
            this.addBackground();
        }
    }

    private updateBackgroundAndBorder() {
        this.backgroundShape.graphics
            .clear()
            .beginFill(this.backgroundColor)
            .setStrokeStyle(this.borderWeight)
            .beginStroke(this.borderColor)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill()
    }
    
    private addBackground() {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.name = 'background';
        this.updateBackgroundAndBorder();
        this.createjsObject.addChild(this.backgroundShape);
    }

    abstract addContainerToScrollConnections(container): void;
    abstract setScrollbarSize(): void;
    abstract setScrollEvent(): void;
    abstract calculateScrollPosition(e): void;
}
