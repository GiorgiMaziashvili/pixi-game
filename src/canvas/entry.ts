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
    }
}