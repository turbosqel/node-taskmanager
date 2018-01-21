// quick tests
const TaskManager = require( '../src/run').TaskManager;
const path = require('path');


TaskManager.run('fsu.dir', './').onEnd.add((result) => {
    console.log('directory listing test:',result.output)
});

TaskManager.run('fsu.readText', './package.json').onEnd.add((result) => {
    console.log('read package.json content:',result.output);
});

TaskManager.run('fsu.read', new Date().getTime().toString()).onEnd.add((result) => {
    console.log('error reading file:',result);
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