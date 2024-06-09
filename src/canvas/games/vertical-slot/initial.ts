import { Container } from "pixi.js";
import { GeneratorClass } from "./classes/generator";

export class VerticalSlot{
    private _container = new Container();
    private generator = new GeneratorClass();

    constructor(){
        console.log('VerticalSlot')
    }

    get container(){
        this._container.position.set(0,144);
        this.init();
        return this._container;
    }

    init(){
        this._container.addChild(this.generator.container);
    }
    
    destroy(){
        console.log('destroy VerticalSlot')
    }
}