const fs = require('fs');
const mkdirp = require('mkdirp');
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
    fsu.mkdir
    path:string
 */
TaskManager.add('fsu.mkdir',function (process:Process):void {
    const path:any = process.data;
    mkdirp(path, function(err) {
        if(err) {
            process.end(err,1);
            return;
        }
        process.end();
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
            return;
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
            return;
        }
        process.end();
    });
});



/*
    fsu.cwd
    { path:string; data:string; }
 */

const cwd:string = process.cwd();
TaskManager.add('fsu.cwd', (process:Process):void => {
    process.end(cwd,0);
});
