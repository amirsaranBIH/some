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

  private toolboxContainer: Container;
  private projectUsersContainer: Container;
  private usersContainer: Container;
  private calendarDaysContainer: Container;
  private calendarGridContainer: Container;
  private userStatsContainer: Container;

  private sideSectionWidth = 300;
  private topSectionHeight = 150;
  private bottomSectionHeight = 200;

  ngOnInit() {
    this.sideStage = new Stage(0, 0, this.sideSectionWidth, window.innerHeight, 'sideCanvas');
    this.mainStage = new Stage(this.sideSectionWidth, 0, window.innerWidth - this.sideSectionWidth, window.innerHeight, 'mainCanvas');

    this.createSideContainers();
    this.createMainContainers();
  }

  private createSideContainers() {
    this.toolboxContainer = new Container(0, 0, this.sideStage.getWidth(), this.topSectionHeight);
    this.toolboxContainer.setBackground('red');
    this.toolboxContainer.setName('toolbox-container');

    this.projectUsersContainer = new Container(0, this.topSectionHeight, this.sideStage.getWidth(), this.sideStage.getHeight() - this.topSectionHeight - this.bottomSectionHeight);
    this.projectUsersContainer.setBackground('blue');
    this.projectUsersContainer.setName('project-users-container');
    this.projectUsersContainer.addHorizontalScrollbar();

    this.usersContainer = new Container(0, this.sideStage.getHeight() - this.bottomSectionHeight, this.sideStage.getWidth(), this.bottomSectionHeight);
    this.usersContainer.setBackground('green');
    this.usersContainer.setName('users-container');

    this.sideStage.addChild(this.projectUsersContainer);
    this.sideStage.addChild(this.toolboxContainer);
    this.sideStage.addChild(this.usersContainer);
  }

  private createMainContainers() {
    this.calendarDaysContainer = new Container(0, 0, this.mainStage.getWidth(), this.topSectionHeight);
    this.calendarDaysContainer.setBackground('purple');
    this.calendarDaysContainer.setName('calendar-days-container');

    this.calendarGridContainer = new Container(0, this.topSectionHeight, this.mainStage.getWidth(), this.mainStage.getHeight() - this.topSectionHeight - this.bottomSectionHeight);
    this.calendarGridContainer.setBackground('yellow');
    this.calendarGridContainer.setName('calendar-grid-container');
    this.calendarGridContainer.addVerticalScrollbar();
    this.calendarGridContainer.addHorizontalScrollbar();
    this.calendarGridContainer.getVerticalScrollbar().addContainerToYScrollConnections(this.calendarDaysContainer);
    this.calendarGridContainer.getHorizontalScrollbar().addContainerToXScrollConnections(this.projectUsersContainer);
    
    this.userStatsContainer = new Container(0, this.mainStage.getHeight() - this.bottomSectionHeight, this.mainStage.getWidth(), this.bottomSectionHeight);
    this.userStatsContainer.setBackground('brown');
    this.userStatsContainer.setName('user-stats-container');

    this.mainStage.addChild(this.calendarGridContainer);
    this.mainStage.addChild(this.calendarDaysContainer);
    this.mainStage.addChild(this.userStatsContainer);
  }
}
