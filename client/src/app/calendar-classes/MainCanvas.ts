import { CanvasApp } from '../calendar-abstract/CanvasApp';
import { Container } from './Container';

export class MainCanvas extends CanvasApp {
    private calendarDaysContainer: Container;
	private calendarGridContainer: Container;
    private userStatsContainer: Container;
    
    constructor(x: number, y: number, width: number, height: number, canvasElementId: string) {
        super(x, y, width, height, canvasElementId);

        this.createCalendarGridContainer();
		this.createCalendarDaysContainer();
		this.createCalendarUserStatsContainer();
    }

    private createCalendarDaysContainer() {
		this.calendarDaysContainer = new Container(0, 0, this.getWidth(), this.topContainerHeight);
		this.calendarDaysContainer.setBackgroundColor(0x555555);
		this.calendarDaysContainer.setName('calendar-days-container');
		this.addChild(this.calendarDaysContainer);
	}

	private createCalendarGridContainer() {
		this.calendarGridContainer = new Container(0, this.topContainerHeight, this.getWidth(), this.getHeight() - this.topContainerHeight - this.bottomContainerHeight);
		this.calendarGridContainer.setBackgroundColor(0x666666);
		this.calendarGridContainer.setName('calendar-grid-container');
		this.addChild(this.calendarGridContainer);
	}

	private createCalendarUserStatsContainer() {
		this.userStatsContainer = new Container(0, this.getHeight() - this.bottomContainerHeight, this.getWidth(), this.bottomContainerHeight);
		this.userStatsContainer.setBackgroundColor(0x222222);
		this.userStatsContainer.setName('user-stats-container');
		this.addChild(this.userStatsContainer);
	}
}