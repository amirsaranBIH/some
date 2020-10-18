
import { AbstractPixiObject } from './AbstractPixiObject';

import * as PIXI from 'pixi.js';

export abstract class AbstractGraphics extends AbstractPixiObject {
    private backgroundColor = 0x000000;
    private borderColor = 0x000000;
    private borderWidth = 0;

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.pixiObject = new PIXI.Graphics();
        this.setX(x);
        this.setY(y);
        console.log(this.pixiObject.width, width)
        this.setWidth(width);
        console.log(this.pixiObject.width)
        this.setHeight(height);
    }

    setBackgroundColor(backgroundColor) {
        this.backgroundColor = backgroundColor;
        this.drawbackgroundAndBorder();
    }

    setBorder(color: number, width: number) {
        this.borderColor = color;
        this.borderWidth = width;
        this.drawbackgroundAndBorder();
    }

    private drawbackgroundAndBorder() {
        console.log(this.pixiObject, this.getX(), this.getY(), this.getWidth(), this.getHeight())
        this.pixiObject
            .clear()
            .beginFill(this.backgroundColor)
            .lineStyle(this.borderWidth, this.borderColor, 1, 0)
            .drawRect(this.getX(), this.getY(), this.getWidth(), this.getHeight())
            .endFill();
        console.log(this.pixiObject)
    }
}