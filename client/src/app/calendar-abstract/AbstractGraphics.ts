
import { AbstractPixiObject } from './AbstractPixiObject';

import * as PIXI from 'pixi.js';

export abstract class AbstractGraphics extends AbstractPixiObject {
    private backgroundColor = 0x000000;
    private borderColor = 0x000000;
    private borderWidth = 0;

    private backgroundImageObject;
    private imagePath: string;

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.pixiObject = new PIXI.Graphics();
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }

    setBackgroundColor(backgroundColor) {
        this.backgroundColor = backgroundColor;
        this.drawBackgroundAndBorder();
    }

    setBorder(color: number, width: number) {
        this.borderColor = color;
        this.borderWidth = width;
        this.drawBackgroundAndBorder();
    }

    setBackgroundImage(imagePath) {
        this.imagePath = imagePath;
        this.drawBackgroundAndBorder();
    }

    protected drawBackgroundAndBorder() {
        this.pixiObject.clear();

        if (this.backgroundColor) {
            this.pixiObject.beginFill(this.backgroundColor);
        }

        this.pixiObject
            .lineStyle(this.borderWidth, this.borderColor, 1, 0)
            .drawRect(0, 0, this.getWidth(), this.getHeight())
            .endFill();

        if (this.imagePath) {
            const texture2 = PIXI.Texture.from(this.imagePath);
            if (this.backgroundImageObject) {
                this.backgroundImageObject.width = this.getWidth();
                this.backgroundImageObject.height = this.getHeight();
            } else {
                this.backgroundImageObject = new PIXI.TilingSprite(texture2, this.getWidth(), this.getHeight());
            }
            this.pixiObject.addChild(this.backgroundImageObject);
        } 
    }
}