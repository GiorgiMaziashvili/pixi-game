import { Container, Graphics } from "pixi.js"
import { optionsService } from "../services"

export class MaskClass{
    private _contaier = new Container()

    public get container(){
        return this._contaier
    }

    public init(){
        this.renderMask();
    }

    createMask(){
        const { x, y, width, height } = optionsService.options.mask || {};
        
        return new Graphics()
            .clear()
            .rect(x, y, width, height)
            .fill({color:'#fff'})
    }

    renderMask(){
        const mask = this.createMask()
        this._contaier.mask = mask
        this._contaier.addChild(mask)
    }
}