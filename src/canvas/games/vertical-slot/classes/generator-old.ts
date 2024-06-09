import { Easing, Tween } from "@tweenjs/tween.js";
import { Container, Graphics } from "pixi.js";
import { getSprite } from "src/canvas/utils";

export class GeneratorClass {
    private reelsInfo:any = [];
    private _container = new Container();
    reelsContainer = new Container();
    private tileUnit = 100;
    

    private readonly REELS = 3;
    private readonly TILES = 5;

    get container(){
        this.init();
        return this._container;
    }

    init(){
        this.generator();
        this.play();
    }

    generator(){
        this._container.addChild(
            new Graphics()
            .rect(window.innerWidth/2 - 422/2 ,0,422,300)
            .fill({color:'gray'})
        );
        this.reels();
    }

    reels(){
        const screenContainer = new Container();
        Array.from({length:this.REELS}).map((_,index:number)=>{
            const container = new Container();
            container.position.set(0,this.tileUnit * index);
            
            this.reelsInfo[index] = {
                reel:container,
                symbols:[],
            };
            
            this.tiles(index);
            screenContainer.addChild(container);
        })
        screenContainer.position.set(window.innerWidth/2 - screenContainer.width/2 ,0);
        this._container.addChild(screenContainer);
    }

    tiles(parentIndex:number){
        Array.from({length:this.TILES}).map((_,index:number)=> {
            const reel = this.reelsInfo[parentIndex];
            const symbol = this.getSymbol('1');
            symbol.position.set(this.tileUnit * index,0);
            reel.reel.addChild(symbol);
            reel.symbols.push(symbol);
        })
    }

    getSymbol(alias:string){
        return getSprite('slot-symbols',alias);
    }

    play(){
        for (let i = 0; i < this.reelsInfo.length; i++) {
            const element = this.reelsInfo[i];
            const direction = (i === 1) ? -1 : 1;  // Reverse direction for the second reel
            for (let j = 0; j < element.symbols.length; j++) {
                const symbol = element.symbols[j];
                const startPosition = symbol.position.x;
                const endPosition = startPosition + 10 * direction;

                const tween:any = new Tween({ x: startPosition })
                    .to({ x: endPosition }, 2000)  // Duration in milliseconds
                    .easing(Easing.Linear.None)
                    .onUpdate((prop) => {
                        symbol.position.x = this.lerp(startPosition, endPosition, prop.x);
                    })
                    .onComplete(() => {
                        if (i === this.REELS - 1 && j === element.symbols.length - 1) {
                            console.log('Animation complete');
                        }
                    });

                tween.start();
            }
        }
    }
    lerp(start:any, end:any, t:any) {
        return start * (1 - t) + end * t;
    }
}