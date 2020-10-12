import { DisplayObject } from './DisplayObject';

declare var createjs;

export class DisplayText extends DisplayObject {
    private textValue = '';
    private size = 10;
    private font = 'Arial';
    private color = 'black';


    constructor(textValue, size, color) {
        super();
        this.size = size;
        this.color = color;

        this.createjsObject = new createjs.Text();
        this.createjsObject.text = textValue;
        this.createjsObject.font = `${size}px ${this.font}`;
        this.createjsObject.color = color;
    }

    setAlignment(alignment) {
        switch(alignment) {
            case 'center':
                const textBounds = this.createjsObject.getBounds();
                this.setX((this.parent.getWidth() / 2) - (textBounds.width / 2));
                this.setY((this.parent.getHeight() / 2) - (textBounds.height / 2));
                break;
            default: 
                console.error('invalid alignment suplied')
        }
    }
}
