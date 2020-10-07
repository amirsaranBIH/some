import { Component } from '@angular/core';
import { Stage } from "./calendar-classes/Stage";
import { Container } from "./calendar-classes/Container";
import { DisplayText } from "./calendar-classes/DisplayText";
import * as moment from 'moment';

declare var createjs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private sideStage: Stage;
  private mainStage: Stage;

  private toolboxContainer: Container;
  private projectUsersContainer: Container;
  private usersContainer: Container;
  private calendarDaysContainer: Container;
  private calendarGridContainer: Container;
  private userStatsContainer: Container;

  private sideSectionWidth = 300;
  private topSectionHeight = 75;
  private bottomSectionHeight = 200;

  public calendar: any = {};
	public calendarDays = [];
	public dateFormat = 'YYYY-MM-DD'
  public currentDate = moment();
	public numberOfYearToShow = 2;
	public cellSize = 25;

  ngOnInit() {
    this.sideStage = new Stage(0, 0, this.sideSectionWidth, window.innerHeight, 'sideCanvas');
    this.mainStage = new Stage(this.sideSectionWidth, 0, window.innerWidth - this.sideSectionWidth, window.innerHeight, 'mainCanvas');

    this.createSideContainers();
    this.createMainContainers();
    this.calendar = this.generateCalendar();
    this.renderCalendarDays();
  }

  private createSideContainers() {
    this.toolboxContainer = new Container(0, 0, this.sideStage.getWidth(), this.topSectionHeight);
    this.toolboxContainer.setBackgroundColor('red');
    this.toolboxContainer.setName('toolbox-container');

    this.projectUsersContainer = new Container(0, this.topSectionHeight, this.sideStage.getWidth(), this.sideStage.getHeight() - this.topSectionHeight - this.bottomSectionHeight);
    this.projectUsersContainer.setBackgroundColor('blue');
    this.projectUsersContainer.setName('project-users-container');
    this.projectUsersContainer.addHorizontalScrollbar();

    this.usersContainer = new Container(0, this.sideStage.getHeight() - this.bottomSectionHeight, this.sideStage.getWidth(), this.bottomSectionHeight);
    this.usersContainer.setBackgroundColor('green');
    this.usersContainer.setName('users-container');

    this.sideStage.addChild(this.projectUsersContainer);
    this.sideStage.addChild(this.toolboxContainer);
    this.sideStage.addChild(this.usersContainer);
  }

  private createMainContainers() {
    this.calendarDaysContainer = new Container(0, 0, this.mainStage.getWidth(), this.topSectionHeight);
    this.calendarDaysContainer.setBackgroundColor('purple');
    this.calendarDaysContainer.setName('calendar-days-container');

    this.calendarGridContainer = new Container(0, this.topSectionHeight, this.mainStage.getWidth(), this.mainStage.getHeight() - this.topSectionHeight - this.bottomSectionHeight);
    this.calendarGridContainer.setBackgroundColor('yellow');
    this.calendarGridContainer.setName('calendar-grid-container');
    this.calendarGridContainer.addVerticalScrollbar();
    this.calendarGridContainer.addHorizontalScrollbar();
    this.calendarGridContainer.getVerticalScrollbar().addContainerToYScrollConnections(this.calendarDaysContainer);
    this.calendarGridContainer.getHorizontalScrollbar().addContainerToXScrollConnections(this.projectUsersContainer);
    
    this.userStatsContainer = new Container(0, this.mainStage.getHeight() - this.bottomSectionHeight, this.mainStage.getWidth(), this.bottomSectionHeight);
    this.userStatsContainer.setBackgroundColor('brown');
    this.userStatsContainer.setName('user-stats-container');

    this.mainStage.addChild(this.calendarGridContainer);
    this.mainStage.addChild(this.calendarDaysContainer);
    this.mainStage.addChild(this.userStatsContainer);
  }

  private generateCalendarDays() {
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

  private generateCalendar() {
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

  private renderCalendarDays() {
    let monthX = 0;
    let weekX = 0;
    let dayX = 0;

    for (let year in this.calendar) {
    this.calendar[year].months.forEach(month => {
      const numOfDaysInMonth = this.getNumberOfDaysInMonth(month);
      
      const monthBox = new Container(monthX, 0, numOfDaysInMonth * this.cellSize, this.cellSize);
      monthBox.setBorder(1, 'red');
      monthBox.setBackgroundColor('#eee');
      monthBox.setName(`${year}-${month.monthName}`);
      
      const monthNumberText = new DisplayText(`${month.monthName} ${year}`, 15, '#000');
      monthBox.addChild(monthNumberText);
      monthNumberText.setAlignment('center');

      this.calendarDaysContainer.addChild(monthBox);
      monthX += numOfDaysInMonth * this.cellSize;

      Object.entries(month.weeks).forEach((week: any) => {
        const weekBox = new Container(weekX, this.cellSize, this.cellSize * week[1].length, this.cellSize);
        weekBox.setBackgroundColor('#eee');
        weekBox.setBorder(1, 'red');
        weekBox.setName(`week-${year}-${month.monthName}-${week[0]}`);
        
        const weekNumberText = new DisplayText(week[0], 12, '#000');
        weekBox.addChild(weekNumberText);
        weekNumberText.setAlignment('center');

        this.calendarDaysContainer.addChild(weekBox);
        weekX += this.cellSize *  week[1].length;

        week[1].forEach(day => {
          const dayBox = new Container(dayX, this.cellSize * 2, this.cellSize, this.cellSize);
          dayBox.setBackgroundColor('#eee');
          dayBox.setBorder(1, 'red');
          dayBox.setName(day.date);
          
          const dayNumberText = new DisplayText(day.day, 12, '#000');
          dayBox.addChild(dayNumberText);
          dayNumberText.setAlignment('center');

          this.calendarDaysContainer.addChild(dayBox);
          dayX += this.cellSize;
        });
      });
    });
    }
  }

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
