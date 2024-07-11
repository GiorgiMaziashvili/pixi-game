import { Application, Assets } from "pixi.js";
import { BundleClass } from "./bundle.class";
import { bundles } from "../constants/bundles.constant";
import { Animate } from "./animation";

export class CanvasClass {
    private _app = new Application();
    private bundle = new BundleClass();

    get app(){
        return this._app;
    }

    init(
        nativeElement?:HTMLCanvasElement,
        callback?:(app:Application)=>void
    ){
        Assets.init({
            preferences:{preferCreateImageBitmap:false}
        })
        
        this.bundle.load(bundles).then(async () => {
            await this._app.init({
                width:422,
                height:710,
                background:0x000000
            });

            new Animate();
            nativeElement?.appendChild(this._app.canvas);
            callback?.(this._app);
            
            (globalThis as any).__PIXI_APP__ = this._app;
        })
    }
}