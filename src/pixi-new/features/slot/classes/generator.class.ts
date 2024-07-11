import { Container, Graphics } from "pixi.js";
import { Reel } from "./reel.class";
import { optionsService } from "../services";
import { MaskClass } from "./mask.class";

export class Generator{
    private _container = new Container();
    private mask = new MaskClass();
    private reel = new Reel();

    public get container(){
        return this._container;
    }

    public init(){
        this.mask.init();
        this.reel.init();
        this.render();
    }
   
    private render(){
        this._container.addChild(
            this.mask.container,
            this.reel.container
        )
    }
}