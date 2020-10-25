import { AbstractPixiObject } from '../calendar-abstract/AbstractPixiObject';

import * as PIXI from 'pixi.js';

export class TextRenderer extends AbstractPixiObject {
    constructor(text, fontFamily = 'Arial', fontSize = 24, color = 0x000000) {
        super();

        this.pixiObject = new PIXI.Text(text, {fontFamily, fontSize, fill: color});
    }

    setAlignment(horizontalAlignment = 'left', verticalAlignment = 'top') {
        this.setHorizontalAlignment(horizontalAlignment);
        this.setVerticalAlignment(verticalAlignment);
    }

    private setHorizontalAlignment(alignment) {
        switch (alignment) {
            case 'left':
                this.setX(0);
                break;
            case 'center':
                this.setX((this.getParent().getWidth() / 2) - (this.pixiObject.getBounds().width / 2));
                break;
            case 'right':
                this.setX(this.getParent().getWidth() - this.pixiObject.getBounds().width);
                break;
        }
    }

    private setVerticalAlignment(alignment) {
        switch (alignment) {
            case 'top':
                this.setY(0);
                break;
            case 'center':
                this.setY((this.getParent().getHeight() / 2) - (this.pixiObject.getBounds().height / 2));
                break;
            case 'bottom':
                this.setY(this.getParent().getHeight() - this.pixiObject.getBounds().height);
                break;
        }
    }
}