import { Container, Graphics } from "pixi.js";
import { getSprite } from "src/canvas/utils";

export class GeneratorClass {
    private reelsInfo:any = [];
    private _container = new Container();
    reelsContainer = new Container();
    private tileUnit = 100;
    private symbols = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];

    private readonly REELS = 3;
    private readonly TILES = 5;

    get container(){
        this.init();
        return this._container;
    }

    init(){
        this.generator();
    }

    generator(){
        this._container.addChild(
            new Graphics()
            .rect(window.innerWidth/2 - 422/2 ,0,422,422)
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
                reel:container
            };
            
            this.tiles(index);
            screenContainer.addChild(container);
        })
        screenContainer.position.set(window.innerWidth/2 - screenContainer.width/2 ,0);
        this._container.addChild(screenContainer);
    }

    tiles(parentIndex:number){
        Array.from({length:this.TILES}).map((_,index:number)=> {
            const symbol = this.getSymbol('1');
            symbol.position.set(this.tileUnit * index,0);
            this.reelsInfo[parentIndex].reel.addChild(symbol)
        })
    }

    getSymbol(alias:string){
        return getSprite('slot-symbols',alias);
    }
    watch(){
        
    }
}