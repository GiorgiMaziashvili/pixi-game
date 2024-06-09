import { Application, Assets } from "pixi.js";
import { bundle } from "src/canvas/constants/bundle";
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
            .then(async ()=>{
                await this._app.init({
                    width:window.innerWidth,
                    height:710,
                    background:'black',
                });
                new Animate();
                (globalThis as any).__PIXI_APP__ = this.app;
                nativeElement.appendChild(this._app.canvas);
                this._app.stage.addChild(this.verticalSlot.container);
            })
    }
}