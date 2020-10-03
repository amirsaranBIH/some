declare var createjs;

export class Scrollbar {
    private axis: string;
    private parentBounds: any;
    
    private createjsObject: any;
    private slider: any;
    private backgroundShape: any;
    private containerXScrollConnections = [];
    private containerYScrollConnections = [];

    private verticalScrollbarSize = 20;
    private horizontalScrollbarSize = 20;
    
    constructor(parentBounds: any, axis: string) {
        this.parentBounds = parentBounds;
        this.axis = axis;

        this.createjsObject = new createjs.Container();

        this.setScrollbarSize();
        this.addBackground('red');
        this.createSlider();
    }

    getX() { return this.createjsObject.x; }
    getY() { return this.createjsObject.y; }

    getWidth() { return this.createjsObject.width; }
    getHeight() { return this.createjsObject.height; }
    
    setX(x) { this.createjsObject.x = x; }
    setY(y) { this.createjsObject.y = y; }

    getVerticalScrollbarSize() { return this.verticalScrollbarSize; }
    getHorizontalScrollbarSize() { return this.horizontalScrollbarSize; }

    setWidth(width) {
        this.createjsObject.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }
    setHeight(height) {
        this.createjsObject.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    getCreatejs() { return this.createjsObject; }

    private setScrollbarSize() {
        switch (this.axis) {
            case 'vertical':
                this.createjsObject.x = this.parentBounds.width - this.verticalScrollbarSize;
                this.createjsObject.y = 0;
                this.createjsObject.width = this.verticalScrollbarSize;
                this.createjsObject.height = this.parentBounds.height;
                break;
            case 'horizontal':
                this.createjsObject.x = 0;
                this.createjsObject.y = this.parentBounds.height - this.horizontalScrollbarSize;
                this.createjsObject.width = this.parentBounds.width;
                this.createjsObject.height = this.horizontalScrollbarSize;
                break;
        }
    }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill();
        this.backgroundShape.name = 'background';
        this.createjsObject.addChild(this.backgroundShape);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill()
    }

    private createSlider() {
        this.slider = new createjs.Shape();
        this.slider.graphics.beginFill('black').drawRect(0, 0, 0, 0);
        this.slider.name = 'slider';
        this.createjsObject.addChild(this.slider);
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
            this.containerXScrollConnections.forEach(conn => conn.setX(x));
        });
    }

    setYScrollEvent() {
        this.slider.addEventListener('mousemove', (e) => {
            const y = this.calculateYScrollPosition(e);
            this.containerYScrollConnections.forEach(conn => conn.setY(y));
        });
    }

    private calculateXScrollPosition(e) {
        return -10;
    }

    private calculateYScrollPosition(e) {
        return -10;
    }
}
