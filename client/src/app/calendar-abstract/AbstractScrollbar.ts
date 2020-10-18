import { AbstractContainer } from './AbstractContainer';

export abstract class AbstractScrollbar extends AbstractContainer {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }
}