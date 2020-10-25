import { Component } from '@angular/core';
import { CanvasApp } from './calendar-classes/CanvasApp';
import { DateSegment } from './calendar-classes/DateSegment';
import { TextRenderer } from './calendar-classes/TextRenderer';

import * as PIXI from 'pixi.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	ngOnInit() {
		const sideCanvas = new CanvasApp(0, 0, 300, window.innerHeight, 'sideCanvas');
		const mainCanvas = new CanvasApp(300, 0, window.innerWidth - 300, window.innerHeight, 'mainCanvas');
		const a = new DateSegment(0, 300, window.innerWidth - 300, 50);

		a.setBackgroundColor(0x0000FF);
		a.setBorder(0x00FF00, 1);

		let text = new TextRenderer('This is a PixiJS text', 'Arial', 25, 0x00FF00);
		a.addChild(text);
		text.setAlignment('center', 'center');
		console.log(a)
		mainCanvas.addChild(a);
	}
}
