const execFile = require('child_process').execFile;
const spawn = require('child_process').spawn;

function execute(cmd, stdoutEnabled) {
    stdoutEnabled = typeof (stdoutEnabled) === 'undefined' ? false : stdoutEnabled;
    return new Promise((resolve, reject) => {
        const process = executeProcess(cmd, stdoutEnabled);
        process.disableOutput = true;

        if (process.stdout)
            process.stdout.on('data', (output) => {
                process.disableOutput = typeof (process.disableOutput) === 'undefined'
                    ? false
                    : process.disableOutput;
                if (!process.disableOutput)
                    console.log('execute: ' + output);
                resolve(output);
            });

        process.on('close', (code) => {
            if (code !== 0)
                reject(code);
            else
                resolve(code);
        });
    });
}

function executeProcess(cmd, stdoutEnabled) {
    if (stdoutEnabled)
        return spawn(cmd.split(' ')[0], cmd.split(' ').filter((arg, index) => { if (index != 0) return arg; }), { stdio: 'inherit', env: { ...process.env } });
    else
        return execFile(cmd.split(' ')[0], cmd.split(' ').filter((arg, index) => { if (index != 0) return arg; }), { shell: '/bin/bash' });
}

module.exports = {
    execute: execute
}
