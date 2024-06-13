import { Container } from "pixi.js";
import { GeneratorClass } from "./classes/generator";
import { Background } from "./classes/background";

export class VerticalSlot{
    private _container = new Container();
    private bg = new Background();
    private generator = new GeneratorClass({
        reels:3,
        tiles:5,
    });

    constructor(){
        console.log('VerticalSlot')
    }

    get container(){
        this._container.position.set(0,144);
        this.init();
        return this._container;
    }

    init(){
        console.log('nit')
        this.bg.init();
        this.generator.init();
        this.bg.container.addChild(this.generator.container)
        this._container.addChild(
            this.bg.container,
            // this.generator.container
        );
    }
    
    destroy(){
        console.log('destroy VerticalSlot')
    }
}
const number = 50000
Intl.NumberFormat('en-US').format(number)