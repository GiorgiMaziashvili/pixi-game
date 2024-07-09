import { Container, Graphics } from "pixi.js";
import { Reel } from "./reel.class";
import { optionsService } from "../services";

export class Generator{
    private _container = new Container();
    private mask = new Graphics();
    private reel = new Reel();

    get container(){
        return this._container;
    }

    init(){
        this.renderMask();
    }

    renderMask(){
        const { mask } = optionsService.options || {};
        const { x, y, width, height } = mask || {};
        
        this.mask.rect(x, y, width, height).fill({color:'#fff'});
        this.container.mask = this.mask
        this.container.addChild(this.mask);
    }

    render(){

    }
}