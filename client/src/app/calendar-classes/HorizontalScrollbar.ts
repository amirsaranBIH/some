import { AbstractScrollbar } from '../calendar-abstract/AbstractScrollbar';
import { AbstractScrollbarSlider } from '../calendar-abstract/AbstractScrollbarSlider';
import { HorizontalScrollbarSlider } from './HorizontalScrollbarSlider';

export class HorizontalScrollbar extends AbstractScrollbar {
    slider: HorizontalScrollbarSlider;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);

        this.slider = new HorizontalScrollbarSlider(0, 0, this.getWidth() - 1000, AbstractScrollbarSlider.scrollbarSliderSize);
        this.slider.setName('horizontal-scrollbar-slider');
        this.slider.setBackgroundColor(0x00FF00);
        this.addChild(this.slider);
    }
}