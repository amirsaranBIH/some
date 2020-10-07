declare var createjs;

export class DisplayText {
    private createjsText: any;
    private parent: any;
    private backgroundShape: any;

    private textValue = '';
    private size = 10;
    private font = 'Arial';
    private color = 'black';


    constructor(textValue, size, color) {
        this.size = size;
        this.color = color;

        this.createjsText = new createjs.Text();
        this.createjsText.text = textValue;
        this.createjsText.font = `${size}px ${this.font}`;
        this.createjsText.color = color;
    }

    getX() { return this.createjsText.x; }
    getY() { return this.createjsText.y; }

    getWidth() { return this.createjsText.width; }
    getHeight() { return this.createjsText.height; }

    setX(x) { this.createjsText.x = x; }
    setY(y) { this.createjsText.y = y; }

    setWidth(width) {
        this.createjsText.width = width;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }
    setHeight(height) {
        this.createjsText.height = height;
        if (this.backgroundShape) {
            this.updateBackground(this.backgroundShape.graphics.instructions[2].style);
        }
    }

    getBounds() { return this.createjsText.getBounds(); }
    setBounds(bounds) { this.createjsText.setBounds(bounds.x, bounds.y, bounds.width, bounds.height); }

    getCreatejs() { return this.createjsText; }

    getParent() { return this.parent; }
    setParent(parent) { return this.parent = parent; }

    setAlignment(alignment) {
        switch(alignment) {
            case 'center':
                const textBounds = this.getBounds();
                this.setX((this.parent.getWidth() / 2) - (textBounds.width / 2));
                this.setY((this.parent.getHeight() / 2) - (textBounds.height / 2));
                break;
            default: 
                console.log('invalid alignment suplied')
        }
    }

    private addBackground(background: string) {
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill();
        this.backgroundShape.name = 'background';
        this.createjsText.addChild(this.backgroundShape);
    }

    private updateBackground(background: string) {
        this.backgroundShape.graphics.clear().beginFill(background).drawRect(0, 0, this.getWidth(), this.getHeight()).endFill()
    }
}
