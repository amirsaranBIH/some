import { Component } from '@angular/core';
import { AbstractScrollbarSlider } from './calendar-abstract/AbstractScrollbarSlider';
import { CanvasApp } from './calendar-classes/CanvasApp';
import { DateSegment } from './calendar-classes/DateSegment';

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
		a.setBorder(0x00FF00, 1)
		mainCanvas.addChild(a);
	}
}
