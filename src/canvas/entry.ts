import { Tween } from "@tweenjs/tween.js";
import { Application, Container, Graphics } from "pixi.js";

export class Entry {
    private container = new Container();
    private app?: Application;

    constructor(app:Application){
        this.app = app; 
    }

    init(){
        this.app?.stage.addChild(this.container);
        this.test();
    }


    test(){
        const graphics = new Graphics();
        graphics.rect(0, 0, 100, 100).fill({color:'red'});;
        const tween = new Tween(graphics.position);
        tween.to({x: 400, y: 300}, 1000);
        tween.start();
        this.container.addChild(graphics);
    }
}