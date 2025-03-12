class ControlsService{
    private _playing = false;
    private _paused = false;

    play(){
        console.log('play');
    }
    
    pause() {
        console.log('paused');
    }

    stop() {
        console.log('paused');
    }

    resume() {
        console.log('paused');
    }

    setResult(){
        console.log('result');
    }
}

export const constrolService = new ControlsService(); 