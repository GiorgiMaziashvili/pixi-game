import { BundleClass } from "../common/classes/bundle.class";
import { CanvasClass } from "../common/classes/canvas.class";
import { slotBundle } from "../features/fast-slot/constants/bundle.constant";

export class MainEntry{
    private canvas = new CanvasClass();
    private bundle = new BundleClass();

    init(element?:HTMLCanvasElement){
        this.bundle
            .load([
                slotBundle
            ])
            .then(()=>{
                this.canvas.init(element);
            })
    }
}