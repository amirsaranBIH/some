import { Shape } from "./Shape";

declare var createjs;

export abstract class Scrollbar extends Shape {
    slider: any;
    containerScrollConnections = [];
    parentBounds: any;
    scrollbarSize = 20;
    
    constructor(parentBounds: any) {
        super();
        this.parentBounds = parentBounds;

        this.createjsObject = new createjs.Container();

        this.setBounds(parentBounds);
        this.setScrollbarSize();
        this.setBackgroundColor('red');
        this.createSlider();
    }

    getScrollbarSize() { return this.scrollbarSize; }
    
    setSliderWidth(width) { this.slider.width = width; }
    
    createSlider() {
        this.slider = new createjs.Shape();
        this.slider.graphics.beginFill('black').drawRect(0, 0, 0, 0);
        this.slider.name = 'slider';
        this.createjsObject.addChild(this.slider);
    }
    
    abstract addContainerToScrollConnections(container): void;
    abstract setScrollbarSize(): void;
    abstract setScrollEvent(): void;
    abstract calculateScrollPosition(e): void;
}
