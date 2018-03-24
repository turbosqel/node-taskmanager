// quick tests
const TaskManager = require( '../dist/run').Task;
const path = require('path');

TaskManager.run('fsu.cwd').onEnd.add((result) => {
    console.log('directory :',result.output);
});

TaskManager.run('fsu.dir', './').onEnd.add((result) => {
    console.log('directory listing test:',result.output)
});

TaskManager.run('fsu.readText', './package.json').onEnd.add((result) => {
    console.log('read package.json content:',result.output);
});

TaskManager.run('fsu.readText', './package.json').onEnd.add((result) => {
    console.log('read package.json content:',result.output);
});

TaskManager.run('fsu.read', new Date().getTime().toString()).onEnd.add((result) => {
    console.log('error reading file:',result);
});

TaskManager.run('fsu.mkdir', './test-folder/').onEnd.add((result) => {
    console.log('dir created');
});

TaskManager.run('fsu.saveText', {path:'./test-folder/test.txt', data:'test text'}).onEnd.add((result) => {
    console.log('save test.txt file:',result);
});

TaskManager.run('chp.exec', {command:'node -v'}).onEnd.add((result) => {
    console.log('exec test:',result);
});

TaskManager.run('chp.exec', {command:'npm i'}).onEnd.add((result) => {
    console.log('exec test:',result);
});





const processPath = path.join(__dirname);
const spawnTestProcess = TaskManager.run('chp.spawn', {command:'cmd.exe' , params:['/c','spawntest.bat'], options:{cwd:processPath} });
spawnTestProcess.onProgress.add((data) => {
    console.log('spawn progress:',data,':end');
    if(data.indexOf('Type option:') !== -1){
        spawnTestProcess.append('2');
    }
    if(data.indexOf('. . .') !== -1) {
        spawnTestProcess.append('\n');
    }
});
spawnTestProcess.onEnd.add((result) => {
    console.log('spawn end:',result);
});

/*
const npmTestPath = path.join(__dirname , '../');
const spawnTestProcess = TaskManager.run('chp.spawn', {command:'cmd.exe' , params:['/c','npm','i'], options:{cwd:npmTestPath} });
spawnTestProcess.onProgress.add((data) => {
    console.log('spawn progress:',data);
});
spawnTestProcess.onEnd.add((result) => {
    console.log('spawn end:',result);
});*/