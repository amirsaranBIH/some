declare var createjs;

export class Scrollbar {
    private createjsScrollbar: any;
    private parent: any;
    private slider: any;
    private backgroundShape: any;
    private containerXScrollConnections = [];
    private containerYScrollConnections = [];

    private axis: string;
    private parentBounds: any;

    private verticalScrollbarSize = 20;
    private horizontalScrollbarSize = 20;
    
    constructor(parentBounds: any, axis: string) {
        this.parentBounds = parentBounds;
        this.axis = axis;

        this.createjsScrollbar = new createjs.Container();

        this.setBounds(parentBounds);
        this.setScrollbarSize();
        this.addBackground('red');
        this.createSlider();
    }

    getX() { return this.createjsScrollbar.x; }
    getY() { return this.createjsScrollbar.y; }

    getWidth() { return this.createjsScrollbar.width; }
    getHeight() { return this.createjsScrollbar.height; }
    
    setX(x) { this.createjsScrollbar.x = x; }
    setY(y) { this.createjsScrollbar.y = y; }

    getVerticalScrollbarSize() { return this.verticalScrollbarSize; }
    getHorizontalScrollbarSize() { return this.horizontalScrollbarSize; }

    setWidth(width) {
        this.createjsScrollbar.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }
    setHeight(height) {
        this.createjsScrollbar.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    getBounds() { return this.createjsScrollbar.getBounds(); }
    setBounds(bounds) { this.createjsScrollbar.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    getCreatejs() { return this.createjsScrollbar; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    private setScrollbarSize() {
        switch (this.axis) {
            case 'vertical':
                this.createjsScrollbar.x = this.parentBounds.width - this.verticalScrollbarSize;
                this.createjsScrollbar.y = 0;
                this.createjsScrollbar.width = this.verticalScrollbarSize;
                this.createjsScrollbar.height = this.parentBounds.height;
                break;
            case 'horizontal':
                this.createjsScrollbar.x = 0;
                this.createjsScrollbar.y = this.parentBounds.height - this.horizontalScrollbarSize;
                this.createjsScrollbar.width = this.parentBounds.width;
                this.createjsScrollbar.height = this.horizontalScrollbarSize;
                break;
        }
    }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill();
        this.backgroundShape.name = 'background';
        this.createjsScrollbar.addChild(this.backgroundShape);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill()
    }

    private createSlider() {
        this.slider = new createjs.Shape();
        this.slider.graphics.beginFill('black').drawRect(0, 0, 0, 0);
        this.slider.name = 'slider';
        this.createjsScrollbar.addChild(this.slider);
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
