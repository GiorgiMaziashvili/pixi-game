import { CrocoMaster } from "../features";
import { slotBundle } from "../features/croco-master/constants/bundle.constant";
import { canvasService } from "../shared";
import { BundleClass } from "../shared/classes";
import { optionsService } from "../shared/services/options.service";

export class MainEntry {
    private slot = new CrocoMaster();
    private bundle = new BundleClass();
    
    public async once(element?:HTMLCanvasElement){
        await optionsService.once('/assets/slot/options.json');
        this.bundle
            .add(slotBundle)
            .load()
            .then(canvasService.init.bind(canvasService))
            .then(this.init.bind(this, element))
    }

    private init(element?:HTMLCanvasElement){
        const { canvas, stage } = canvasService.app;
        this.slot.init();
        stage.addChild(this.slot.container);
        element?.appendChild(canvas);
    }

    public destroy(){
        this.bundle.destroy();
        canvasService.destroy();
    }
}