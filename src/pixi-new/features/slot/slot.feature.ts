import { Container } from "pixi.js";
import { Background, Generator, Overlay } from "./classes";


export class Slot {
    private _container = new Container();
    private generator = new Generator();
    private background = new Background();
    
    get container() {
        return this._container;
    }

    init(){
        this.generator.init();
        this.background.init();

        this._container.addChild(
            this.background.container,
            this.generator.container
        );
    }
}