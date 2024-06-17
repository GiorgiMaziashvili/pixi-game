export class EntryClass{
    private elementRef?: HTMLCanvasElement;

    constructor(elementRef?: HTMLCanvasElement){
        this.elementRef = elementRef;
        console.log('EntryClass');
    }

    init(){
        console.log(this.elementRef)
        console.log('init');
    }
}