import { CanvasClass } from "src/pixi/common/classes";

export class MainPromo{
    private canvas = new CanvasClass();

    init(nativeElement?:HTMLCanvasElement){
        this.canvas.init(nativeElement);
    }
}



// config.setPrizes();
// config.setReels();
// config.play();
// config.setResult();
// config.onComplete();