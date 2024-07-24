import { Slot } from "../../features/slot/slot.feature";
import { CanvasClass } from "../../common/classes";
import { optionsService } from "src/pixi-new/features/slot/services/options.service";
import { Application } from "pixi.js";

export class MainPromo {
    private canvas = new CanvasClass();
    private slot = new Slot();

    init(nativeElement?:HTMLCanvasElement){
        this.canvas.init(
            nativeElement,
            app => this.initConfig(app)
        );
    }

    initConfig(app:Application){
        optionsService
            .get('/assets/slot/options.json')
            .then(()=>{
                this.slot.init();
                app.stage.addChild(this.slot.container);
            })
    }
}