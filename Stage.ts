export class Stage {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    
    private stage: any;
    private canvasDomId: string;
    private name: string;

    constructor(x, y, width, height, canvasDomId) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasDomId = canvasDomId;

        this.stage = new createjs.Stage();
    }
}