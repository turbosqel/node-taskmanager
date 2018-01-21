const { exec , spawn } = require('child_process');
const TaskManager = require('../manager').TaskManager;
import {Process} from '../process';

interface ExecParams {
    command:string;
    options:any;
}

TaskManager.add('chp.exec',function (process:Process):void {
    const execParam:ExecParams = process.data;

    exec(execParam.command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            process.end(error,1);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        process.end(stdout);
    });
});

interface SpawnParams {
    command:string;
    params:string[];
    options:any;
}

TaskManager.add('chp.spawn',function (process:Process):void {
    const spawnParam:SpawnParams = process.data;

    const ls = spawn(spawnParam.command, spawnParam.params, spawnParam.options);

    process.mediator.onAppend.add((data) => {
        ls.stdin.write(data);
    });

    ls.stdout.on('data', (data) => {
        process.progress(data.toString());
    });

    ls.stderr.on('data', (data) => {
        process.end(data,1);
    });

    ls.on('error', (err) => {
        process.end(err,-1);
    });

    ls.on('close', (code) => {
        process.end(null,code);
    });
});

