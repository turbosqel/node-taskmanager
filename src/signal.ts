export class Signal<T> {

    private _:{(T):void}[] = [];

    public add(callback:(T)=>void) {
        this._.push(callback);
        return callback;
    }

    public remove(callback:(T)=>void):boolean {
        const i = this._.indexOf(callback);
        if(i === -1) {
            return false;
        }

        this._.splice(i,1);
        return true;
    }

    public dispatch(data:T) {
        this._.forEach((func)=>{
            func(data);
        });
    }

    public dispose() {
        this._.length = 0;
        this._ = null;
    }

}