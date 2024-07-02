export class DoubleClick {
    private clicks = 0;
    private isDoubleClick = false;

    handlePlay(callback: (doubleClick?:boolean) => void){
        let timer:string | number | ReturnType<typeof setTimeout> | undefined | any;
        this.clicks++;
        if(this.clicks === 1) {
            timer = setTimeout(() =>  {
                callback(this.isDoubleClick);
                this.isDoubleClick = false;
            }, 300);
            this.clicks = 0;
        } else {
            clearTimeout(timer);  
            this.isDoubleClick = true;
            this.clicks = 0;
        }
    }
}