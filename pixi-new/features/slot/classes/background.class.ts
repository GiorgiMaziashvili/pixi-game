import { Assets, Container, Sprite } from "pixi.js";

export class Background{
    private _container = new Container();

    get container(){
        return this._container;
    }

    init(){
        this.render();
    }

    render(){
        const bg = new Sprite(Assets.get('bg'));
        bg.width = 422;
        bg.height = 710;
        
        this._container.addChild(bg);
    }
}