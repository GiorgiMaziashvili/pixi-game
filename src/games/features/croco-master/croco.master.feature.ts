import { Container } from "pixi.js";
import { ReelCore } from "src/games/shared/cores";
import { GeneratorClass } from "./classes/generator.class";

export class CrocoMaster extends ReelCore{
    private _container = new Container();
    private generator = new GeneratorClass();

    get container(){
        return this._container;
    }

    init(){
        this.generator.init();
        
        this._container.addChild(
            this.generator.container
        );
    }
}