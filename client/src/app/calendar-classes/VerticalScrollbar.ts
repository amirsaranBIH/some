import { AbstractScrollbar } from '../calendar-abstract/AbstractScrollbar';
import { AbstractScrollbarSlider } from '../calendar-abstract/AbstractScrollbarSlider';
import { VerticalScrollbarSlider } from './VerticalScrollbarSlider';

export class VerticalScrollbar extends AbstractScrollbar {
    slider: VerticalScrollbarSlider;
    
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);

        this.slider = new VerticalScrollbarSlider(0, 0, AbstractScrollbarSlider.scrollbarSliderSize, this.getHeight());
        this.slider.setName('vertical-scrollbar-slider');
        this.slider.setBackgroundColor(0x00FF00);
        this.addChild(this.slider);
    }
}