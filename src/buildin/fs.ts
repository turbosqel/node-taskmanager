const fs = require('fs');
import {TaskManager} from '../manager';
import {Process} from '../process';

/*
    fsu.dir
    path:string
 */


TaskManager.add('fsu.dir',function (process:Process):void {
    const path:any = process.data;
    fs.readdir(path, (err, files) => {
        if(err) {
            process.end(err,1);
            return;
        }
        process.end(files);
    });
});

/*
    fsu.read
    path:string
 */
TaskManager.add('fsu.read',function (process:Process):void {
    const path = process.data;
    fs.readFile(path, (err, data) => {
        if(err) {
            process.end(err,1);
            return;
        }
        process.end(data);
    });
});

/*
    fsu.readText
    path:string
 */
TaskManager.add('fsu.readText',function (process:Process):void {
    const path = process.data;
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            process.end(err,1);
        }
        process.end(data);
    });
});

/*
    fsu.saveText
    { path:string; data:string; }
 */
TaskManager.add('fsu.saveText',function (process:Process):void {
    const saveData:{path:string; data:string;} = process.data;
    fs.writeFile(saveData.path, saveData.data, 'utf8', function (err) {
        if(err) {
            process.end(err,1);
        }
        process.end();
    });
});