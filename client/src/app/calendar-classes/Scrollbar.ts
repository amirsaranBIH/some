declare var createjs;

export class Scrollbar {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private scrollbar: any;
    private slider: any;
    private backgroundShape: any;
    private containerXScrollConnections = [];
    private containerYScrollConnections = [];
    
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.scrollbar = new createjs.Container();
        this.scrollbar.x = this.x;
        this.scrollbar.y = this.y;
        this.scrollbar.width = this.width;
        this.scrollbar.height = this.height;

        this.addBackground('red');
        this.createSlider();
    }

    get getX() { return this.x; }
    get getY() { return this.y; }

    get getWidth() { return this.width; }
    get getHeight() { return this.height; }

    set setX(x) { this.x = x; }
    set setY(y) { this.y = y; }

    set setWidth(width) {
        this.width = width;
        this.scrollbar.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }
    set setHeight(height) {
        this.height = height;
        this.scrollbar.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    set setVerticalScrollbarSize(size) { this.verticalScrollbarSize = size; }
    set setHorizontalScrollbarSize(size) { this.horizontalScrollbarSize = size; }

    get getCreatejs() { return this.scrollbar; }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.width, this.height).endFill();
        this.backgroundShape.name = 'background';
        this.scrollbar.addChild(this.backgroundShape);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.width, this.height).endFill()
    }

    private createSlider() {
        this.slider = new createjs.Shape();
        this.slider.graphics.beginFill('black').drawRect(0, 0, 0, 0);
        this.slider.name = 'slider';
        this.scrollbar.addChild(this.slider);
    }

    addContainerToXScrollConnections(container) {
        this.containerXScrollConnections.push(container);
    }

    addContainerToYScrollConnections(container) {
        this.containerYScrollConnections.push(container);
    }

    setXScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const x = this.calculateXScrollPosition(e);
            this.containerXScrollConnections.forEach(conn => conn.setX = x);
        });
    }

    setYScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const y = this.calculateYScrollPosition(e);
            this.containerYScrollConnections.forEach(conn => conn.setY = y);
        });
    }

    private calculateXScrollPosition(e) {
        return -10;
    }

    private calculateYScrollPosition(e) {
        return -10;
    }
}
