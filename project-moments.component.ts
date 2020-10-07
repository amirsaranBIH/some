import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

declare var createjs;

@Component({
	selector: 'app-project-moments',
	templateUrl: './project-moments.component.html',
	styleUrls: ['./project-moments.component.css']
})

export class ProjectMomentsComponent implements OnInit {
	private sideStage: any;
	private calendarDaysStage: any;
	private calendarGridStage: any;
	private calendarUserStatsStage: any;
	
	private sidebarWidth = 62;
	private sideContainerWidth = 300;
	private topContainerHeight = 75;
	private bottomContainerHeight = 150;

	public calendar: any = {};
	public calendarDays = [];
	public dateFormat = 'YYYY-MM-DD'
  	public currentDate = moment();
	public numberOfYearToShow = 3;
	public cellSize = 25;

	constructor() {
		console.log('init');
	}

	ngOnInit() {
		this.calendar = this.generateCalendar();
		console.log(this.calendar)
		this.sideStage = new Stage('sideCanvas', this.sidebarWidth, 0, this.sideContainerWidth, window.innerHeight);
		this.calendarDaysStage = new Stage('calendarDaysCanvas', this.sideContainerWidth + this.sidebarWidth, 0, window.innerWidth - this.sideContainerWidth - this.sidebarWidth, this.topContainerHeight);
		this.calendarGridStage = new Stage('calendarGridCanvas', this.sideContainerWidth + this.sidebarWidth, this.topContainerHeight, window.innerWidth - this.sideContainerWidth - this.sidebarWidth, window.innerHeight - this.topContainerHeight - this.bottomContainerHeight);
		this.calendarUserStatsStage = new Stage('calendarUserStatsCanvas', this.sideContainerWidth + this.sidebarWidth, window.innerHeight - this.bottomContainerHeight, window.innerWidth - this.sideContainerWidth - this.sidebarWidth, this.bottomContainerHeight);

		this.createCalendarDaysStageContainer();
		this.createCalendarGridStageContainer();
		this.createCalendarUserStatsStageContainer();
		this.createSideStageContainers();

		// this.renderCalendarDays();
	}

	private createCalendarDaysStageContainer() {
		const calendarDaysContainer = new Container(0, 0, this.calendarDaysStage.getWidth, this.calendarDaysStage.getHeight, { name: 'calendar-days-container', backgroundColor: '#555' });

		this.calendarDaysStage.getStage.addChild(calendarDaysContainer.getContainer);
	}

	private createCalendarGridStageContainer() {
		const calendarGridContainer = new Container(0, 0, this.calendarGridStage.getWidth, this.calendarGridStage.getHeight, { name: 'calendar-grid-container', backgroundColor: '#666' });
		calendarGridContainer.addVerticalAndHorizontalScrollbar();
		calendarGridContainer.setScrollbarSliderSize();

		this.calendarGridStage.getStage.addChild(calendarGridContainer.getContainer);
	}

	private createCalendarUserStatsStageContainer() {
		const userStatsContainer = new Container(0, 0, this.calendarUserStatsStage.getWidth, this.calendarUserStatsStage.geHeight, { name: 'user-stats-container', backgroundColor: '#222' });

		this.calendarUserStatsStage.getStage.addChild(userStatsContainer.getContainer);
		console.log(this.calendarUserStatsStage)
	}

	private createSideStageContainers() {
		const toolboxContainer = new Container(0, 0, this.sideStage.getWidth, this.sideStage.getWidth, { name: 'toolbox-container', backgroundColor: '#999' });
		const projectUsersContainer = new Container(0, this.topContainerHeight, this.sideStage.getWidth, this.sideStage.getHeight - this.topContainerHeight - this.bottomContainerHeight, { name: 'project-users-container', backgroundColor: '#888' });
		projectUsersContainer.addHorizontalScrollbar();
		projectUsersContainer.setScrollbarSliderSize();
		const  userListContainer = new Container(0, this.sideStage.getHeight - this.bottomContainerHeight, this.sideStage.getWidth, this.bottomContainerHeight, { name: 'user-list-container', backgroundColor: '#444' });

		this.sideStage.getStage.addChild(toolboxContainer.getContainer, projectUsersContainer.getContainer, userListContainer.getContainer);
	}

	generateCalendarDays() {
		const calendar = [];

		let numOfYearsInPast = this.getNumberOfShowingYearsInPast();
		let numOfYearInFuture = this.getNumberOfShowingYearsInFuture();

		for (let i = -numOfYearsInPast; i <= numOfYearInFuture; i++) {
			const currentYear = this.currentDate.year() + i;
			let date = moment(`${currentYear}-01-01`, this.dateFormat);

			const days = [];

			while (date.year() === currentYear) {
				days.push(date.format(this.dateFormat));
				date.add(1, 'days');
			}

			calendar.push(days);
		}

		return calendar;
	  }

	  generateCalendar() {
		const calendar = {};

		let numOfYearsInPast = this.getNumberOfShowingYearsInPast();
		let numOfYearInFuture = this.getNumberOfShowingYearsInFuture();
	
		for (let i = -numOfYearsInPast; i <= numOfYearInFuture; i++) {
			const currentYear = this.currentDate.year() + i;
			let date = moment(`${currentYear}-01-01`, this.dateFormat);
		
			for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
				if (!calendar[currentYear]) {
					calendar[currentYear] = { months: [] };
				}

				calendar[currentYear].months.push({
					monthName: this.currentDate.creationData().locale['_months'][monthIndex],
					weeks: {}
				});
			}
		
			let week = date.week();
			let month = date.month();
		
			while (date.year() === currentYear) {
			  month = date.month();
			  week = date.week();
		
			  const data = {
				date: date.format(this.dateFormat),
				day: date.format('D'),
				isWeekend: date.isoWeekday() === 6 || date.isoWeekday() === 7
			  };
			  
			  date.add(1, 'days');
		
			  if (!calendar[currentYear].months[month].weeks[week]) {
				calendar[currentYear].months[month].weeks[week] = [];
			  }
		
			  calendar[currentYear].months[month].weeks[week].push(data);
			}
		}

		return calendar;
	  }

	//   private renderCalendarDays() {
	// 	  let monthX = 0;
	// 	  let weekX = 0;
	// 	  let dayX = 0;

	// 	  for (let year in this.calendar) {
	// 		this.calendar[year].months.forEach(month => {
	// 			const numOfDaysInMonth = this.getNumberOfDaysInMonth(month);
	// 			const monthBox = new Container(monthX, 0, numOfDaysInMonth * this.cellSize, this.cellSize, { name: `${year}-${month.monthName}`, backgroundColor: '#eee' });
	// 			monthBox.setBorder(1, 'red');
	// 			const monthNumberText = new createjs.Text(`${month.monthName} ${year}`, "15px Arial", "#000");
	// 			monthNumberText.x = (monthBox.getContainer.width / 2) - (monthNumberText.getBounds().width / 2);
	// 			monthNumberText.y = (monthBox.getContainer.height / 2) - (monthNumberText.getBounds().height / 2);
	// 			monthBox.getContainer.addChild(monthNumberText);

	// 			this.calendarDaysContainer.getContainer.addChild(monthBox.getContainer);
	// 			monthX += numOfDaysInMonth * this.cellSize;

	// 			Object.entries(month.weeks).forEach((week: any) => {
	// 				const weekBox = new Container(weekX, this.cellSize, this.cellSize * week[1].length, this.cellSize, { name: `week-${year}-${month.monthName}-${week[0]}`, backgroundColor: '#eee' });
	// 				weekBox.setBorder(1, 'red');
	// 				const weekNumberText = new createjs.Text(week[0], "12px Arial", "#000");
	// 				weekNumberText.x = (weekBox.getContainer.width / 2) - (weekNumberText.getBounds().width / 2);
	// 				weekNumberText.y = (weekBox.getContainer.height / 2) - (weekNumberText.getBounds().height / 2);
	// 				weekBox.getContainer.addChild(weekNumberText);

	// 				this.calendarDaysContainer.getContainer.addChild(weekBox.getContainer);
	// 				weekX += this.cellSize *  week[1].length;

	// 				week[1].forEach(day => {
	// 					const dayBox = new Container(dayX, this.cellSize * 2, this.cellSize, this.cellSize, { name: day.date, backgroundColor: '#eee' });
	// 					dayBox.setBorder(1, 'red');
	// 					const dayNumberText = new createjs.Text(day.day, "12px Arial", "#000");
	// 					dayNumberText.x = (dayBox.getContainer.width / 2) - (dayNumberText.getBounds().width / 2);
	// 					dayNumberText.y = (dayBox.getContainer.height / 2) - (dayNumberText.getBounds().height / 2);
	// 					dayBox.getContainer.addChild(dayNumberText);

	// 					this.calendarDaysContainer.getContainer.addChild(dayBox.getContainer);
	// 					dayX += this.cellSize;
	// 				});
	// 			});
	// 		});
	// 	  }
	//   }

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

class Stage {
	private stage: any;
	private FPS = 60;
	private x: number;
	private y: number;

	constructor(canvas, x, y, width, height) {
		this.stage = new createjs.Stage(canvas);
		
		this.x = x;
		this.y = y;

		this.stage.canvas.width = width;
		this.stage.canvas.height = height;
		this.stage.canvas.style.top = `${this.y}px`;
		this.stage.canvas.style.left = `${this.x}px`;

		this.createTicker();
	}

	get getStage() {
		return this.stage;
	}

	createTicker() {
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		createjs.Ticker.setFPS(this.FPS); 
		createjs.Ticker.addEventListener('tick', this.tick.bind(this));
	}

	tick() {
		this.stage.update();
	}

	get getWidth() {
		return this.stage.canvas.width;
	}

	get getHeight() {
		return this.stage.canvas.height;
	}

	get getX() {
		return this.x;
	}

	get getY() {
		return this.y;
	}
}

class Container {
	private container;
	private backgroundColor = '';
	private scrollbarSize = 20;
	private backgroundShape = null;
	private verticalScrollbar = null;
	private horizontalScrollbar = null; 
	private verticalScrollbarSlider = null;
	private horizontalScrollbarSlider = null;
	private innerContainer = null;

	constructor(x, y, width, height, options = { name: 'no-name', backgroundColor: 'black' }) {
		this.container = new createjs.Container();

		this.container.x = x;
		this.container.y = y;
		this.container.width = width;
		this.container.height = height;

		this.container.name = options.name;
		this.backgroundColor = options.backgroundColor;
		if (this.backgroundColor !== '') {
			this.setBackgroundColor();
		}
	}

	setBackgroundColor() {
		this.backgroundShape = new Rect(0, 0, this.container.width, this.container.height, { name: `${this.container.name}-background`, backgroundColor: this.backgroundColor });
		this.container.addChild(this.backgroundShape.getShape);
	}

	setBorder(size, color) {
		this.backgroundShape.getShape.graphics.setStrokeStyle(size);
		this.backgroundShape.getShape.graphics.beginStroke(color);
		this.backgroundShape.draw();
	}

	addVerticalAndHorizontalScrollbar(connections = []) {
		this.addInnerContainer(true, true);

		this.addVerticalScrollbar(connections, false);
		this.addHorizontalScrollbar(connections, false);
	}

	addVerticalScrollbar(connections = [], addContainer = true) {
		if (addContainer) {
			this.addInnerContainer(true, false);
		}

		const scrollbarHeight = addContainer ? this.container.height : this.container.height - this.scrollbarSize;
		this.verticalScrollbar = new Container(this.container.width - this.scrollbarSize, 0, this.scrollbarSize, scrollbarHeight, { name: 'vertical-scrollbar', backgroundColor: 'white' });

		this.verticalScrollbarSlider = new Scrollbar(0, 0, this.scrollbarSize, 100, { name: 'vertical-scrollbar-inner-slider', backgroundColor: '#111' });

		this.verticalScrollbarSlider.connectContainerWithYScroll(this.innerContainer);
		connections.forEach(conn => {
			this.verticalScrollbarSlider.connectContainerWithYScroll(conn);
		});

		this.verticalScrollbar.getContainer.addChild(this.verticalScrollbarSlider.getShape);

		this.container.addChild(this.verticalScrollbar.getContainer);
	}

	addHorizontalScrollbar(connections = [], addContainer = true) {
		if (addContainer) {
			this.addInnerContainer(false, true);
		}

		const scrollbarWidth = addContainer ? this.container.width : this.container.width - this.scrollbarSize;
		this.horizontalScrollbar = new Container(0, this.container.height - this.scrollbarSize, scrollbarWidth, this.scrollbarSize, { name: 'horizontal-scrollbar', backgroundColor: 'white' });

		this.horizontalScrollbarSlider = new Scrollbar(0, 0, 100, this.scrollbarSize, { name: 'horizontal-scrollbar-inner-slider', backgroundColor: '#111' });
		this.horizontalScrollbarSlider.connectContainerWithXScroll(this.innerContainer);
		connections.forEach(conn => {
			this.verticalScrollbarSlider.connectContainerWithXScroll(conn);
		});

		this.horizontalScrollbar.getContainer.addChild(this.horizontalScrollbarSlider.getShape);

		this.container.addChild(this.horizontalScrollbar.getContainer);
	}

	private addInnerContainer(hasVerticalScrollbar, hasHorizontalScrollbar) {
		let width = this.container.width;
		let height = this.container.height;
		
		if (hasVerticalScrollbar) {
			width = this.container.width - this.scrollbarSize;
		} 
		
		if (hasHorizontalScrollbar) {
			height = this.container.height - this.scrollbarSize;
		}

		this.innerContainer = new Container(0, 0, width, height, { name: `inner-${this.container.name}`, backgroundColor: '' });
		this.container.addChild(this.innerContainer.getContainer);
	}

	setHeight(height) {
		this.container.height = height;
		if (this.innerContainer) {
			this.container.getChildByName(`${this.container.name}-background`).height = height;
		}
	}

	setWidth(width) {
		this.container.width = width;
		if (this.innerContainer) {
			this.container.getChildByName(`${this.container.name}-background`).width = width;
		}
	}

	setScrollbarSliderSize() {
		if (this.verticalScrollbar) this.setVerticalScrollbarSize();
		if (this.horizontalScrollbar) this.setHorizontalScrollbarSize();
	}

	private setVerticalScrollbarSize() {
		const slider = this.verticalScrollbarSlider.getShape;

		let height = (this.innerContainer.getContainer.height / this.getVerticalScrollbarHeightBounds()) * this.innerContainer.getContainer.height;
		slider.height = height;
		slider.graphics.command.h = height;
	}
	
	private setHorizontalScrollbarSize() {
		const slider = this.horizontalScrollbarSlider.getShape;
		
		console.log(this.horizontalScrollbarSlider.getShape, this.innerContainer.getContainer.width, this.container,  this.getHorizontalScrollbarWidthBounds())
		let width = (this.innerContainer.getContainer.width / this.getHorizontalScrollbarWidthBounds()) * this.innerContainer.getContainer.width;
		slider.width = width;
		slider.graphics.command.w = width;
	}

	getVerticalScrollbarHeightBounds() {
		let maxHeight = this.innerContainer.getContainer.height;

		this.horizontalScrollbarSlider.yConnections.forEach(conn => {
			const bounds = conn.getContainer.getBounds();
			if (bounds && bounds.height > maxHeight) maxHeight = bounds;
		});

		return maxHeight;
	}

	getHorizontalScrollbarWidthBounds() {
		let maxWidth = this.innerContainer.getContainer.width;
		console.log(this.horizontalScrollbarSlider.xConnections)
		this.horizontalScrollbarSlider.xConnections.forEach(conn => {
			const bounds = conn.getContainer.getBounds();
			if (bounds && bounds.width > maxWidth) maxWidth = bounds;
		});

		return maxWidth;
	}

	get getInnerContainer() {
		return this.innerContainer;
	}

	get getContainer() {
		return this.container;
	}
}

class Shape {
	protected shape: any;
	protected x: number;
	protected y: number;
	protected width: number;
	protected height: number;

	constructor(x, y, width, height, options = { name: 'no-name', backgroundColor: 'black' }) {
		this.shape = new createjs.Shape();

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.shape.name = options.name;
		this.shape.graphics.beginFill(options.backgroundColor);
	}

	setMouseMoveWithBoundaries() {
		this.addPressmoveEvent((e) => { this.moveXWithBoundaries(e); this.moveYWithBoundaries(e) });
	}

	setMouseMoveXWithBoundaries() {
		this.addPressmoveEvent((e) => this.moveXWithBoundaries(e));
	}

	setMouseMoveYWithBoundaries() {
		this.addPressmoveEvent((e) => this.moveYWithBoundaries(e));
	}

	protected moveXWithBoundaries(e) {
		if ((e.target.x + e.nativeEvent.movementX) < 0) {
			e.target.x = 0;
			return e.target.x;
		}

		if ((e.target.x + e.nativeEvent.movementX + e.target.graphics.command.w) > e.target.parent.width) {
			e.target.x = e.target.parent.width - e.target.graphics.command.w;
			return e.target.x;
		}

		e.target.x += e.nativeEvent.movementX;
		return e.target.x;
	}

	protected moveYWithBoundaries(e) {
		if ((e.target.y + e.nativeEvent.movementY) < 0) {
			e.target.y = 0;
			return e.target.y;
		}

		if ((e.target.y + e.nativeEvent.movementY + e.target.graphics.command.h) > e.target.parent.height) {
			e.target.y = e.target.parent.height - e.target.graphics.command.h;
			return e.target.y;
		}

		e.target.y += e.nativeEvent.movementY;
		return e.target.y;
	}

	protected addPressmoveEvent(eventHandler) {
		this.shape.addEventListener('pressmove', eventHandler);
	}

	get getShape() {
		return this.shape;
	}
}

class Rect extends Shape {
	constructor(x, y, width, height, options = { name: 'no-name', backgroundColor: 'black' }) {
		super(x, y, width, height, options);
		this.draw();
	}
	
	draw() {
		this.shape.graphics.drawRect(this.x, this.y, this.width, this.height);
	}
}

class Scrollbar extends Rect {
	private xConnections = [];
	private yConnections = [];

	constructor(x, y, width, height, options = { name: 'no-name', backgroundColor: 'black' }) {
		super(x, y, width, height, options);
	}

	connectContainerWithXScroll(container) {
		this.xConnections.push(container);

		this.xConnections.forEach(conn => {
			this.addPressmoveEvent((e) => { conn.getContainer.x = -(this.moveXWithBoundaries(e)) });
		});
	} 
	
	connectContainerWithYScroll(container) {
		this.yConnections.push(container);

		this.yConnections.forEach(conn => {
			this.addPressmoveEvent((e) => { conn.getContainer.y = -(this.moveYWithBoundaries(e)) });
		});
	}
}
