import { Container, Graphics } from "pixi.js";
import { Reel } from "./reel.class";
import { optionsService } from "../services";
import { MaskClass } from "./mask.class";

export class Generator{
    private _container = new Container();
    

    public get container(){
        return this._container;
    }

    public init(){
       
    }
}