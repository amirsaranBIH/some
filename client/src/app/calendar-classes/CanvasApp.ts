import { AbstractContainer } from '../calendar-abstract/AbstractContainer';

import * as PIXI from 'pixi.js';
import { AbstractPixiObject } from '../calendar-abstract/AbstractPixiObject';

export class CanvasApp extends AbstractContainer {
    private canvasElement: HTMLCanvasElement;
    private canvasApp;

    constructor(x: number, y: number, width: number, height: number, canvasElementId: string) {
        super(x, y, width, height);
        this.canvasElement = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this.canvasElement.style.left = `${x}px`;
        this.canvasElement.style.top = `${y}px`;
        this.canvasApp = new PIXI.Application({
			view: this.canvasElement,
			width: width,
            height: height
        });
    }

    getStage() { return this.canvasApp.stage; }
    
    addChild(child: AbstractPixiObject) {
        this.canvasApp.stage.addChild(child.getPixiObject());
        this.childen.push(child);
    }
}