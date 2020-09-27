import { Component } from '@angular/core';
import { Stage } from "./calendar-classes/Stage";
import { Container } from "./calendar-classes/Container";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private sideStage: Stage;
  private mainStage: Stage;

  private sideSectionWidth = 300;
  private topSectionHeight = 150;
  private bottomSectionHeight = 200;

  ngOnInit() {
    this.sideStage = new Stage(0, 0, this.sideSectionWidth, window.innerHeight, 'sideCanvas');
    this.mainStage = new Stage(this.sideSectionWidth, 0, window.innerWidth - this.sideSectionWidth, window.innerHeight, 'mainCanvas');

    this.createSideContainers();
    this.createMainContainers();
    console.log(this.sideStage)
    console.log(this.mainStage)
  }

  private createSideContainers() {
    const toolboxContainer = new Container(0, 0, this.sideStage.getWidth, this.topSectionHeight);
    toolboxContainer.setBackground = 'red';
    toolboxContainer.setName = 'toolbox-container';
    const projectUsersContainer = new Container(0, this.topSectionHeight, this.sideStage.getWidth, this.sideStage.getHeight - this.topSectionHeight - this.bottomSectionHeight);
    projectUsersContainer.setBackground = 'blue';
    projectUsersContainer.setName = 'project-users-container';
    projectUsersContainer.addHorizontalScrollbar();
    const usersContainer = new Container(0, this.sideStage.getHeight - this.bottomSectionHeight, this.sideStage.getWidth, this.bottomSectionHeight);
    usersContainer.setBackground = 'green';
    usersContainer.setName = 'users-container';

    this.sideStage.addChild(projectUsersContainer);
    this.sideStage.addChild(toolboxContainer);
    this.sideStage.addChild(usersContainer);
  }

  private createMainContainers() {
    const calendarDaysContainer = new Container(0, 0, this.mainStage.getWidth, this.topSectionHeight);
    calendarDaysContainer.setBackground = 'purple';
    calendarDaysContainer.setName = 'calendar-days-container';
    const calendarGridContainer = new Container(0, this.topSectionHeight, this.mainStage.getWidth, this.mainStage.getHeight - this.topSectionHeight - this.bottomSectionHeight);
    calendarGridContainer.setBackground = 'yellow';
    calendarGridContainer.setName = 'calendar-grid-container';
    calendarGridContainer.addVerticalScrollbar();
    calendarGridContainer.addHorizontalScrollbar();
    const userStatsContainer = new Container(0, this.mainStage.getHeight - this.bottomSectionHeight, this.mainStage.getWidth, this.bottomSectionHeight);
    userStatsContainer.setBackground = 'brown';
    userStatsContainer.setName = 'user-stats-container';

    this.mainStage.addChild(calendarGridContainer);
    this.mainStage.addChild(calendarDaysContainer);
    this.mainStage.addChild(userStatsContainer);
  }
}
