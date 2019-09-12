import {Signal} from './signal';

export enum ProcessStatus {
    INITIALIZED,
    STARTED,
    FINISHED,
    DISPOSED,
}

export class Process {
    public mediator:ProcessMediator;
    public status: ProcessStatus;

    constructor(public creator:ProcessCreator, public id:Number, public data:any = null, public config:ProcessConfig = null) {
        this.mediator = new ProcessMediator(this);
        this.status = ProcessStatus.INITIALIZED;
    }

    public start(): void {
        // todo process config options
        if(!this.creator) {
            this.end(null,-1);
            return;
        }
        this.creator.startFunction(this);
        this.status = ProcessStatus.STARTED;
    }

    public progress(progress:any): void {
        this.mediator.onProgress.dispatch(progress);
    }

    public end(data?:any, exitCode:number = 0): void {
        this.mediator.onEnd.dispatch({output:data, exitCode});
        this.status = ProcessStatus.FINISHED;
    }

    public dispose(): void {
        // todo
        this.mediator.dispose();
        this.mediator = null;
        this.status = ProcessStatus.DISPOSED;
    }

}

export class ProcessConfig {

}

export class ProcessMediator {

    // todo input
    // todo abort task
    // todo timeout
    // input test version ::
    public onAppend:Signal<any> = new Signal();

    // output
    public onProgress:Signal<any> = new Signal();
    public onEnd:Signal<{output:any, exitCode:number}> = new Signal();



    constructor(public process:Process) {}

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