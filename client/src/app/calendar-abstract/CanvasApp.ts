import { AbstractContainer } from './AbstractContainer';

import * as PIXI from 'pixi.js';
import { AbstractPixiObject } from './AbstractPixiObject';

export abstract class CanvasApp extends AbstractContainer {
    private canvasElement: HTMLCanvasElement;
    protected canvasApp;

    protected sidebarWidth = 62;
	protected topContainerHeight = 75;
	protected bottomContainerHeight = 150;

    constructor(x: number, y: number, width: number, height: number, canvasElementId: string) {
        super(x, y, width, height);
        this.canvasElement = document.getElementById(canvasElementId) as HTMLCanvasElement;
        this.canvasElement.style.left = `${x}px`;
        this.canvasElement.style.top = `${y}px`;
        this.canvasApp = new PIXI.Application({
			view: this.canvasElement,
			width,
            height
        });
    }

    getStage() { return this.canvasApp.stage; }
    
    addChild(child: AbstractPixiObject) {
        this.canvasApp.stage.addChild(child.getPixiObject());
        child.setParent(this);
        this.children.push(child);
    }

    getWidth() { return this.canvasApp.stage.width; }
    setWidth(width) { this.canvasApp.stage.width = this.width = width; }

    getHeight() { return this.canvasApp.stage.height; }
    setHeight(height) { this.canvasApp.stage.height = this.height = height; }
}