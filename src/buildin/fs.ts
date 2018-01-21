const fs = require('fs');
import {TaskManager} from '../manager';
import {Process} from '../process';



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

TaskManager.add('fsu.readText',function (process:Process):void {
    const path = process.data;
    var files = fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            process.end(err,1);
        }
        process.end(data);
    });
});