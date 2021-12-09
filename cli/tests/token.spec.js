// token.spec.js


process.env.TESTING = true;

const Tokens = require('../services/token');
const testDataFile = './tests/generated-test-data/testfile-tokens.json';
const fs = require('fs');

const Tester = new (function () {

    function beforeEach() {
        fs.writeFileSync(testDataFile, JSON.stringify({}));
        return new Tokens(testDataFile);
    }

    var testCases = this;

    testCases.testThatConstructorDoesNotDeleteFile = function (tokensMod) {
        fs.writeFileSync(testDataFile, JSON.stringify({ 'nodeleteoncreate': 0 }));
        new Tokens(testDataFile);
        const result = fs.readFileSync(testDataFile).toString();
        console.log(result);
        console.log(result !== '{}');
    }

    testCases.test1 = function (tokensMod) {
        const url1 = 'iana.org';
        const url2 = 'foo.example.com';
        const testToken1 = 'this_is_not_a_real_token_for_iana';
        const testToken2 = 'this_is_not_a_real_token_for_foo.example';
        tokensMod.add(url1, testToken1);
        tokensMod.add(url2, testToken2);
        const whitelist = JSON.parse('{"foo.example.com":[]}');
        const tokensToSendObj = tokensMod.getOnlyWhitelisted(whitelist);
        console.log(tokensToSendObj[url1] === undefined);
        console.log(tokensToSendObj[url2] !== undefined);
        console.log(tokensToSendObj);
    }

    testCases.test2 = function (tokensMod) {
        const url1 = 'iana.org';
        const url2 = 'test.com';
        const url3 = 'example.com';
        const testToken1 = 'this_is_not_a_real_token_for_iana';
        const testToken2 = 'this_is_not_a_real_token_for_test';

        tokensMod.add(url1, testToken1);
        tokensMod.add(url2, testToken2);
        const whitelist = JSON.parse('{"test.com":["--hux","--bda","--dfs"], "foo.example.com":[]}');
        const tokensToSendObj = tokensMod.getOnlyWhitelisted(whitelist);
        console.log(tokensToSendObj[url1] === undefined);
        console.log(tokensToSendObj[url2] !== undefined);
        console.log(tokensToSendObj[url3] === undefined);
        console.log(tokensToSendObj);

        const testToken3 = 'this_is_not_a_real_token_for_foo.example';
        tokensMod.add(url3, testToken3);
        const tokensToSendObj2 = tokensMod.getOnlyWhitelisted(whitelist);
        console.log(tokensToSendObj2[url1] === undefined);
        console.log(tokensToSendObj2[url2] !== undefined);
        console.log(tokensToSendObj2[url3] === undefined);
        console.log(tokensToSendObj2);
    }


    testCases.test3 = function (tokensMod) {
        const url1 = 'iana.org';
        const url2 = 'test.com';
        const url3 = 'example.com';
        const testToken1 = 'this_is_not_a_real_token_for_iana';
        const testToken2 = 'this_is_not_a_real_token_for_test';

        tokensMod.add(url1, testToken1);
        tokensMod.add(url2, testToken2);
        const whitelist = JSON.parse('{"test.com":["--hux","--bda","--dfs"], "foo.example.com":[], "example.com":[]}');
        const tokensToSendObj = tokensMod.getOnlyWhitelisted(whitelist);
        console.log(tokensToSendObj[url1] === undefined);
        console.log(tokensToSendObj[url2] !== undefined);
        console.log(tokensToSendObj[url3] === undefined);
        console.log(tokensToSendObj);

        const testToken3 = 'this_is_not_a_real_token_for_foo.example';
        tokensMod.add(url3, testToken3);
        const tokensToSendObj2 = tokensMod.getOnlyWhitelisted(whitelist);
        console.log(tokensToSendObj2[url1] === undefined);
        console.log(tokensToSendObj2[url2] !== undefined);
        console.log(tokensToSendObj2[url3] !== undefined);
        console.log(tokensToSendObj2);
    }



    for (var testCase in testCases) {
        console.log('Running testCase ' + testCase);
        const tokensMod = beforeEach();
        testCases[testCase](tokensMod);
    }
});
