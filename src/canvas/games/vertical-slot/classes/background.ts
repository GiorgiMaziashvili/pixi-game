import { Group, Tween } from "@tweenjs/tween.js";
import { Assets, Container, DisplacementFilter, Sprite } from "pixi.js";
import { getSprite } from "src/canvas/utils";

export class Background{
    container = new Container();
    filter:any

    init(){
        this.create();
        // this.createFilter();
    }

    create(){
        const bg = new Sprite(Assets.get('background'));
        bg.anchor.set(0.5);
        bg.position.set(window.innerWidth/2,window.innerHeight/2 -144);
        bg.width = window.innerWidth;
        bg.height = window.innerHeight;
        this.container.addChild(bg);
        this.shake();
    }


    createFilter(){
        const sprite = new Sprite(Assets.get('displace'));
        const displaceFilter = new DisplacementFilter({sprite});
        sprite.anchor.set(0.5);
        sprite.width = window.innerWidth
        sprite.height = window.innerHeight
        sprite.position.set(window.innerWidth/2,window.innerHeight/2 -144);
        this.filter = displaceFilter;
        this.container.addChild(sprite);
        this.container.filters = [this.filter];

        const tween = new Tween({scale:1,alpha:1})
        tween.to({scale:3,alpha:[1,0,1]},1000)
        .onUpdate((props,prgoress) => {
            sprite.scale.set(props.scale);
            this.container.tint = 0xffffff;
        })
        // .delay(200)
        .yoyo(true)
        .repeat(Infinity)
        // .start()
        this.container.scale.set(1.05);
    }
    shake() {
        // this.container
        const tween = new Tween({x:0})
        tween.to({x:[2,-4,1,-3,5,-3,3,-4]},450)
        .onUpdate((props) => {
            this.container.x = props.x;
        })
        .yoyo(true)
        .repeat(Infinity)
        // .start()
    }
}