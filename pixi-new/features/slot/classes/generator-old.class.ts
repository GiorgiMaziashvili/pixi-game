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
        this.addEvents();
        this.render();
    }
   
    private render(){
        this.mask.container.addChild(this.reel.container);

        this._container.addChild(
            this.mask.container,
        )
    }

    public spin(){
        console.log('dsadas')
        this.reel.play();
    }

    public stop(prize:any){

    }

    addEvents(){
        window.addEventListener('click', this.spin.bind(this));
    }
}