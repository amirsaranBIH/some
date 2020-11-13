import { AbstractGraphics } from './AbstractGraphics';
import { AbstractPixiObject } from './AbstractPixiObject';

export abstract class AbstractContainer extends AbstractGraphics {
    protected children = [];

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    addChild(child: AbstractPixiObject) {
        this.pixiObject.addChild(child.getPixiObject());
        child.setParent(this);
        this.children.push(child);
    }
}