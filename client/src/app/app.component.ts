import { Component } from '@angular/core';
import { CanvasApp } from './calendar-abstract/CanvasApp';
import { SideCanvas } from './calendar-classes/SideCanvas';
import { MainCanvas } from './calendar-classes/MainCanvas';
import { DateSegment } from './calendar-classes/DateSegment';
import { Container } from './calendar-classes/Container';
import { TextRenderer } from './calendar-classes/TextRenderer';

import * as PIXI from 'pixi.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	private sideCanvas: SideCanvas;
	private mainCanvas: MainCanvas;

	public calendar: any = {};
	public calendarDays = [];
	public dateFormat = 'YYYY-MM-DD'
  	// public currentDate = moment();
	public numberOfYearToShow = 3;
	public cellSize = 25;

	ngOnInit() {
		this.sideCanvas = new SideCanvas(0, 0, 300, window.innerHeight, 'sideCanvas');
		this.mainCanvas = new MainCanvas(300, 0, window.innerWidth - 300, window.innerHeight, 'mainCanvas');
		this.sideCanvas.setBackgroundColor(0x00FF00)
		console.log(this.sideCanvas)
		console.log(this.sideCanvas.getPixiObject())
		this.sideCanvas.onResizeRightAlsoResize(this.mainCanvas);

		const a = new DateSegment(0, 300, window.innerWidth - 300, 50);

		a.setBackgroundColor(0x0000FF);
		a.setBorder(0x00FF00, 1);

		let text = new TextRenderer('This is a PixiJS text', 'Arial', 25, 0x00FF00);
		const b = new Container(0, 0, 200, 50);
		// b.addChild(text);
		// text.setAlignment('right', 'center');
		b.setBackgroundColor(0x010101)
		a.addChild(b);
		// console.log(a)
		this.mainCanvas.addChild(a);
	}

	// generateCalendarDays() {
	// 	const calendar = [];

	// 	let numOfYearsInPast = this.getNumberOfShowingYearsInPast();
	// 	let numOfYearInFuture = this.getNumberOfShowingYearsInFuture();

	// 	for (let i = -numOfYearsInPast; i <= numOfYearInFuture; i++) {
	// 		const currentYear = this.currentDate.year() + i;
	// 		let date = moment(`${currentYear}-01-01`, this.dateFormat);

	// 		const days = [];

	// 		while (date.year() === currentYear) {
	// 			days.push(date.format(this.dateFormat));
	// 			date.add(1, 'days');
	// 		}

	// 		calendar.push(days);
	// 	}

	// 	return calendar;
	// }

	//   generateCalendar() {
	// 	const calendar = {};

	// 	let numOfYearsInPast = this.getNumberOfShowingYearsInPast();
	// 	let numOfYearInFuture = this.getNumberOfShowingYearsInFuture();
	
	// 	for (let i = -numOfYearsInPast; i <= numOfYearInFuture; i++) {
	// 		const currentYear = this.currentDate.year() + i;
	// 		let date = moment(`${currentYear}-01-01`, this.dateFormat);
		
	// 		for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
	// 			if (!calendar[currentYear]) {
	// 				calendar[currentYear] = { months: [] };
	// 			}

	// 			calendar[currentYear].months.push({
	// 				monthName: this.currentDate.creationData().locale['_months'][monthIndex],
	// 				weeks: {}
	// 			});
	// 		}
		
	// 		let week = date.week();
	// 		let month = date.month();
		
	// 		while (date.year() === currentYear) {
	// 		  month = date.month();
	// 		  week = date.week();
		
	// 		  const data = {
	// 			date: date.format(this.dateFormat),
	// 			day: date.format('D'),
	// 			isWeekend: date.isoWeekday() === 6 || date.isoWeekday() === 7
	// 		  };
			  
	// 		  date.add(1, 'days');
		
	// 		  if (!calendar[currentYear].months[month].weeks[week]) {
	// 			calendar[currentYear].months[month].weeks[week] = [];
	// 		  }
		
	// 		  calendar[currentYear].months[month].weeks[week].push(data);
	// 		}
	// 	}

	// 	return calendar;
	// }

	private getNumberOfDaysInMonth(month) {
		return (Object.values(month.weeks).reduce((total, week: any) => total += week.length, 0) as number);
	}

	private getNumberOfShowingYearsInPast() {
		if (this.numberOfYearToShow % 2 === 0) {
			return Math.floor((this.numberOfYearToShow - 1) / 2);
		} else {
			return (this.numberOfYearToShow - 1) / 2;
		}
	}

	private getNumberOfShowingYearsInFuture() {
		if (this.numberOfYearToShow % 2 === 0) {
			return Math.ceil((this.numberOfYearToShow - 1) / 2);
		} else {
			return (this.numberOfYearToShow - 1) / 2;
		}
	}
}
