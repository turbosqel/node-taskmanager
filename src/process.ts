import {Signal} from './signal';

export class Process {
    public mediator:ProcessMediator;

    constructor(public creator:ProcessCreator, public id:Number, public data:any = null, public config:ProcessConfig = null) {
        this.mediator = new ProcessMediator(this);
    }

    public start():void {
        // todo process config options
        if(!this.creator) {
            this.end(null,-1);
            return;
        }
        this.creator.startFunction(this);
    }

    public progress(progress:any):void {
        this.mediator.onProgress.dispatch(progress);
    }

    public end(data?:any, exitCode:number = 0):void {
        this.mediator.onEnd.dispatch({output:data, exitCode});
    }

    public dispose() {
        // todo
    }

}

export class ProcessConfig {

}

export class ProcessMediator {

    // todo input
    // todo abort task
    // input test version ::
    public onAppend:Signal<any> = new Signal();

    // output
    public onProgress:Signal<any> = new Signal();
    public onEnd:Signal<{output:any, exitCode:number}> = new Signal();



    constructor(private process:Process) {

    }

    public append(data):void {
        this.onAppend.dispatch(data);
    }

    public dispose() {
        // todo
    }
}


export class ProcessCreator {

    constructor(public startFunction:(processStart:Process)=>void) {

    }
}