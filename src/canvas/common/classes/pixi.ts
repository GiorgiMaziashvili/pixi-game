import { Application } from "pixi.js";
import { AssetsBase } from "../base";
import { Animate } from "./animation";
import { VerticalSlot } from "src/canvas/games/vertical-slot/initial";

export class PixiClass extends AssetsBase{
    private _app = new Application();
    private verticalSlot = new VerticalSlot();
    get app(){
        return this._app;
    }

    init(nativeElement: any){
        this.loadBundle()
            .then(async (ids:any)=>{
                console.log(ids)
                await this._app.init({
                    width:window.innerWidth,
                    height:710,
                    background:'transparent',
                });
                new Animate();
                (globalThis as any).__PIXI_APP__ = this.app;
                nativeElement.appendChild(this._app.canvas);
                this._app.stage.addChild(this.verticalSlot.container);
            })
    }
}