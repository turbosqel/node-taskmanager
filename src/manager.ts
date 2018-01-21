/**
 * todo ::
 * rework task end workflow
 */

import {Process, ProcessCreator, ProcessConfig, ProcessMediator} from './process';
import Timer = NodeJS.Timer;

const ProcessClass = require('./process');
type ProcessList = {string:ProcessCreator};

export class TaskManager {

    private static _tasks:ProcessList = <ProcessList>{};

    static run(taskName:string, params:any = null , processConfig:ProcessConfig = null ):ProcessMediator {
        // todo task name verify
        const id = TaskManager.getNextProcessId();
        const process:Process = new Process(TaskManager._tasks[taskName], id, params, processConfig);
        TaskManager._start(process);
        return process.mediator;
    }

    static hasProcess(taskName:string):boolean {
        return false;
    }


    //

    private static processIndex:number = -1;
    private static getNextProcessId():number {
        TaskManager.processIndex ++;
        return TaskManager.processIndex;
    }

    //

    static add(taskName:string, processStart:(process:Process)=>void):void {
        TaskManager._tasks[taskName] = new ProcessCreator(processStart);
    }

    // task flow
    private static _taskPending:Process[] = [];
    private static _taskActive:Process[] = [];

    public static taskLimit:number = 10;
    private static _runTimeout:Timer = null;
    private static _start(task:Process) {
        TaskManager._taskPending.push(task);
        TaskManager._taskStartTimeout();
    }

    private static _taskStartTimeout() {
        if(TaskManager._runTimeout === null) {
            TaskManager._runTimeout = setTimeout(() => {
                TaskManager._runTimeout = null;
                TaskManager._taskTrigger();
            },0);
        }
    }

    private static _taskTrigger() {
        if(TaskManager._taskPending.length > 0 && TaskManager._canStartTask() ) {
            const startTask:Process = TaskManager._taskPending.shift();
            TaskManager._taskActive.push(startTask);

            startTask.mediator.onEnd.add( () => {
                TaskManager._taskEnd(startTask);
            });
            startTask.start();
        }
    }

    private static _taskEnd(process:Process) {
        const index = TaskManager._taskActive.indexOf(process);
        if(index !== -1) {
            TaskManager._taskActive.splice(index,1);
        }
        TaskManager._taskStartTimeout();
    }

    private static _canStartTask():boolean {
        return TaskManager.taskLimit > TaskManager._taskActive.length;
    }

}