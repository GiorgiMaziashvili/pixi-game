import { CanvasClass } from "src/pixi/common/classes";

export class MainPromo{
    private canvas = new CanvasClass();

    init(nativeElement?:HTMLCanvasElement){
        this.canvas.init(nativeElement);
    }
}