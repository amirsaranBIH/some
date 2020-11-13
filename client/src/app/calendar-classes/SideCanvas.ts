import { CanvasApp } from '../calendar-abstract/CanvasApp';
import { IResizable } from '../calendar-interfaces/IResizable';
import { Container } from './Container';

export class SideCanvas extends CanvasApp implements IResizable {
    private toolboxContainer: Container;
	private projectUsersContainer: Container;
    private userListContainer: Container;

    private onResizeRightConnection: CanvasApp;
    
    constructor(x: number, y: number, width: number, height: number, canvasElementId: string) {
        super(x, y, width, height, canvasElementId);
        
		this.createProjectUsersContainer();
		this.createUserListContainer();
        this.createToolboxContainer();
        this.setResizable();
    }

    setResizable() {
        this.canvasApp.stage.interactive = true;
        this.canvasApp.stage.on('mousedown', (e) => {
            if (e.data.global.x > (e.currentTarget.getBounds().x + this.getWidth() - 5)) {
                const onResizeEventHandler = this.onResize.bind(this);

                this.canvasApp.stage.on('mousemove', onResizeEventHandler);
                this.canvasApp.stage.on('mouseup', () => {
                    this.canvasApp.stage.off('mousemove', onResizeEventHandler);
                });
                this.canvasApp.stage.on('mouseupoutside', () => {
                    this.canvasApp.stage.off('mousemove', onResizeEventHandler);
                });
            }
        })
    }

    removeResizable() {
        this.canvasApp.stage.interactive = false;
    }
    
    onResize(e) {
        let newWidth = this.getWidth() + e.data.originalEvent.movementX;
        console.log(newWidth);
        if (newWidth < 25) return e.data.originalEvent.movementX;
        this.setWidth(newWidth);
        this.onResizeRightConnection.setX(newWidth);
        this.onResizeRightConnection.setWidth(-newWidth);
        this.drawBackgroundAndBorder();
        return e.data.originalEvent.movementX;
    }

    private createToolboxContainer() {
		this.toolboxContainer = new Container(0, 0, this.getWidth(), this.topContainerHeight);
		this.toolboxContainer.setBackgroundColor(0x999999);
		this.toolboxContainer.setName('toolbox-container');
		this.addChild(this.toolboxContainer);
	}

	private createProjectUsersContainer() {
		this.projectUsersContainer = new Container(0, this.topContainerHeight, this.getWidth(), this.getHeight() - this.topContainerHeight - this.bottomContainerHeight);
		this.projectUsersContainer.setBackgroundColor(0x888888);
		this.projectUsersContainer.setName('project-users-container');
		this.addChild(this.projectUsersContainer);
	}

	private createUserListContainer() {
		this.userListContainer = new Container(0, this.getHeight() - this.bottomContainerHeight, this.getWidth(), this.bottomContainerHeight);
		this.userListContainer.setBackgroundColor(0x444444);
		this.userListContainer.setName('user-list-container');
		this.addChild(this.userListContainer);
    }
    
    onResizeRightAlsoResize(canvasApp: CanvasApp) {
        this.onResizeRightConnection = canvasApp;
    }
}