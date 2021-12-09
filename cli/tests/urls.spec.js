// urls.spec.js

process.env.TESTING = true;

const CloudRunUrls = require('../services/urls');
const testDataFile = './tests/generated-test-data/testfile.json';
const fs = require('fs');

const Tester = new (function () {

    function beforeEach() {
        fs.writeFileSync(testDataFile, JSON.stringify({}));
        return new CloudRunUrls(testDataFile);
    }

    var testCases = this;

    testCases.test1 = function (urls) {
        const url1 = 'test.com';
        urls.add(url1);
        urls.addRevision(url1, '--hux');
        urls.addRevision(url1, '--bda');
        urls.addRevision(url1, '--dfs');
        console.log(urls.getAll());
        console.log('remove --hux');
        urls.removeRevision(url1, '--hux');
        console.log(urls.getAll());
        const result = urls.getAll();
    }

    testCases.test2 = function (urls) {
        const url1 = 'test.com';
        urls.add(url1);
        urls.addRevision(url1, '--hux');
        urls.addRevision(url1, '--bda');
        urls.addRevision(url1, '--dfs');
        console.log(urls.getAll());
        console.log('remove --bda');
        urls.removeRevision(url1, '--bda');
        console.log(urls.getAll());
        const result = urls.getAll();
    }

    testCases.test3 = function (urls) {
        const url1 = 'test.com';
        urls.add(url1);
        urls.addRevision(url1, '--hux');
        urls.addRevision(url1, '--bda');
        urls.addRevision(url1, '--dfs');
        console.log(urls.getAll());
        console.log('remove --dfs');
        urls.removeRevision(url1, '--dfs');
        console.log(urls.getAll());
        const result = urls.getAll();
    }

    testCases.test4 = function (urls) {
        const url1 = 'test.com';
        urls.add(url1);
        urls.addRevision(url1, '--hux');
        urls.addRevision(url1, '--bda');
        urls.addRevision(url1, '--dfs');
        console.log(urls.getAll());
        console.log('remove --dff, which does not exist');
        urls.removeRevision(url1, '--dff');
        console.log(urls.getAll());
        const result = urls.getAll();
    }

    testCases.test5 = function (urls) {
        const url1 = 'test.com';
        urls.add(url1);
        console.log(urls.getAll());
        const result = urls.getAll();
    }

    for (var testCase in testCases) {
        console.log('Running testCase ' + testCase);
        const urls = beforeEach();
        testCases[testCase](urls);
    }
});
