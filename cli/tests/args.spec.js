// args.spec.js

process.env.TESTING = true;

const Args = require('../services/args');

const Tester = new (function () {

    function beforeEach() {

    }

    var testCases = this;

    testCases.checkHelpArg = function () {
        const args = new Args(['-h']);
        if (args.has('-h'))
            console.log('pass');
    }

    testCases.checkForStart = function () {
        const args = new Args(['--start']);
        if (args.has('--start'))
            console.log('pass');
        else
            console.error('FAIL!');
    }

    testCases.checkForAddRevision = function () {
        const args = new Args(['--edit-url', '--add-revision']);
        if (args.has('--add-revision') && args.has('--edit-url'))
            console.log('pass');
        else
            console.error('FAIL!');
    }

    testCases.checkForMissing = function () {
        const args = new Args(['--edit-url', '--add-revision']);
        if (!args.has('--add-revisio'))
            console.log('pass');
        else
            console.error('FAIL!');
    }

    testCases.trueIfNoArgsPresent = function () {
        const args = new Args(['--missing', '--not-valid']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const noMatches = args.hasNoMatchingArguments();
        if (noMatches)
            console.log('pass');
        else 
            console.error('FAIL!');
    }

    testCases.falseIfArgsPresent = function () {
        const args = new Args(['--edit', '--not-valid']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const hasMatches = !args.hasNoMatchingArguments();
        if (hasMatches)
            console.log('pass');
        else 
            console.error('FAIL!');
    }

    testCases.falseIfArgsPresentAgain = function () {
        const args = new Args(['--missing', '--done3', '--not-here']);
        args.has('--edit');
        args.has('--done1');
        args.has('--done2');
        args.has('--done3');
        args.has('--done4');

        const hasMatches = !args.hasNoMatchingArguments();
        if (hasMatches)
            console.log('pass');
        else 
            console.error('FAIL!');
    }



    for (var testCase in testCases) {
        console.log('Running testCase ' + testCase);
        testCases[testCase]();
    }
})();
