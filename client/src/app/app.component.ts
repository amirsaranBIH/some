import { Component } from '@angular/core';
import { AbstractScrollbarSlider } from './calendar-abstract/AbstractScrollbarSlider';
import { CanvasApp } from './calendar-classes/CanvasApp';
import { HorizontalScrollbar } from './calendar-classes/HorizontalScrollbar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	ngOnInit() {
		const sideCanvas = new CanvasApp(0, 0, 300, window.innerHeight, 'sideCanvas');
		const mainCanvas = new CanvasApp(300, 0, window.innerWidth - 300, window.innerHeight, 'mainCanvas');
		const a = new HorizontalScrollbar(0, 0, window.innerWidth - 300, AbstractScrollbarSlider.scrollbarSliderSize);
		a.setBackgroundColor(0xFF0000);
		mainCanvas.addChild(a);
		console.log(mainCanvas, mainCanvas.getStage(), a);
	}
}
