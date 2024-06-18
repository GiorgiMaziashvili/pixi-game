import { Application, Assets } from "pixi.js";
import { Generator } from "./generator.class";
import { Animate } from "./animation";
import { BundleClass } from "./bundle.class";
import { bundles } from "../constants/bundles.constant";

export class CanvasClass {
    private _app = new Application();
    private generator = new Generator();
    private bundle = new BundleClass();

    get app(){
        return this._app;
    }

    init(nativeElement?:HTMLCanvasElement){
        this.bundle.load(bundles).then(async(ids:any)=>{
            await this._app.init({
                width:422,
                height:710,
                background:0x000000
            });
            new Animate();
            this.generator.init();
            this._app.stage.addChild(this.generator.container);
            nativeElement?.appendChild(this._app.canvas);
            (globalThis as any).__PIXI_APP__ = this._app;
        })
    }
}