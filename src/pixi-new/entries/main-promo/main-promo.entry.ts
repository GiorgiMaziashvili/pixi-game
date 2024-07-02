import { Slot } from "../../features/slot/slot.feature";
import { CanvasClass } from "../../common/classes";

export class MainPromo {
    private canvas = new CanvasClass();
    private slot = new Slot();

    init(nativeElement?:HTMLCanvasElement){
        this.canvas.init(
            nativeElement,
            app => {
                this.slot.init();
                app.stage.addChild(this.slot.container);
            }
        );
    }
}