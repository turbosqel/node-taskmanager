const { exec , spawn } = require('child_process');
const TaskManager = require('../manager').TaskManager;
import {Process} from '../process';
/*
    todo document spawn process communication
 */

interface ExecParams {
    command:string;
    options:any;
}

/*
    chp.exec
    ExecParams
 */
TaskManager.add('chp.exec', function (process:Process):void {
    const execParam:ExecParams = process.data;

    if(!execParam) {
        process.end('no process details',-1);
        return;
    }

    if(!execParam.command) {
        process.end('no process command',-1);
        return;
    }

    exec(execParam.command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            process.end(error,1);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        process.end(stderr + stdout);
    });
});

interface SpawnParams {
    command:string;
    params:string[];
    options:any;
}

/*
    chp.spawn
    SpawnParams:{
        command:string;
        params:string[];
        options:any;
    }
 */
TaskManager.add('chp.spawn',function (process:Process):void {
    const spawnParam:SpawnParams = process.data;

    if(!spawnParam) {
        process.end('no process details',-1);
        return;
    }

    if(!spawnParam.command) {
        process.end('no process command',-1);
        return;
    }

    const ls = spawn(spawnParam.command, spawnParam.params, spawnParam.options);

    process.mediator.onAppend.add((data) => {
        ls.stdin.write(data);
    });

    ls.stdout.on('data', (data) => {
        process.progress(data.toString());
    });

    ls.stderr.on('data', (data) => {
        process.progress(data.toString());
    });

    ls.on('error', (err) => {
        process.end(err,1);
    });

    ls.on('close', (code) => {
        process.end(null,code);
    });
});

