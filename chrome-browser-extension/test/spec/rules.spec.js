
(function () {

    function generateTestArrayOfSize(size) {
        const arr = [];
        for (var i = 97; i < size + 97; i++) {
            const chars = String.fromCharCode(i) + String.fromCharCode(i) + String.fromCharCode(i) + '---';
            arr.push(chars);
        }
        return arr;
    }

    // function being tested
    function generateGroups(revisionUrls) {
        return rulesModule.generateGroups(revisionUrls);
    }

    describe('RevisionURL Grouping Tests', () => {
        it('should return only one group for arr.len = 6', function () {
            const arr = generateTestArrayOfSize(6);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(1);
        });

        it('should return only one group for arr.len = 8', function () {
            const arr = generateTestArrayOfSize(8);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(1);
        });

        it('should return only one group for arr.len = 1', function () {
            const arr = generateTestArrayOfSize(1);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(1);
        });

        it('should return two groups for arr.len = 9', function () {
            const arr = generateTestArrayOfSize(9);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(2);
        });

        it('should return two groups for arr.len = 11', function () {
            const arr = generateTestArrayOfSize(11);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(2);
        });

        it('should return two groups for arr.len = 15', function () {
            const arr = generateTestArrayOfSize(15);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(2);
        });

        it('should return two groups for arr.len = 16', function () {
            const arr = generateTestArrayOfSize(16);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(2);
        });

        it('should return two groups for arr.len = 17', function () {
            const arr = generateTestArrayOfSize(17);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(3);
        });

        it('should return two groups for arr.len = 23', function () {
            const arr = generateTestArrayOfSize(23);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(3);
        });

        it('should return two groups for arr.len = 24', function () {
            const arr = generateTestArrayOfSize(24);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(3);
        });

        it('should return two groups for arr.len = 25', function () {
            const arr = generateTestArrayOfSize(25);
            const groups = generateGroups(arr);
            console.log(groups);
            expect(groups.length).toEqual(4);
        });
    });


    describe('Tests for building dynamic rules', function () {

        it('should build a single Dynamic Rule with 6 revision urls', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(6);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('fff---');

            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(1);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---)+test.com');
            expect(rules[0].id).toEqual(1);
        });

        it('should build a single Dynamic Rule with 8 revision urls', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(8);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('hhh---');

            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(1);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---|ggg---|hhh---)+test.com');
            expect(rules[0].id).toEqual(1);
        });


        it('should build two Dynamic Rules for the same url with 8 revision urls and 6 revision urls', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(14);
            //whitelist['example.com'] = generateArray(6);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('hhh---');
            expect(whitelist['test.com']).toContain('ggg---');
            expect(whitelist['test.com']).toContain('nnn---');

            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(2);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---|ggg---|hhh---|iii---|jjj---|kkk---|lll---|mmm---)+test.com');
            expect(rules[0].condition.regexFilter.length).toBeLessThan(112);
            expect(rules[0].id).toEqual(1);
            expect(rules[1].condition.regexFilter).toEqual('.*://(?:nnn---)+test.com');
            expect(rules[1].condition.regexFilter.length).toBeLessThan(112);
            expect(rules[1].id).toEqual(2);
        });

        it('should build three Dynamic Rules for the same url with 8, 8, and 6 revision urls', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(22);
            //whitelist['example.com'] = generateArray(6);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('hhh---');
            expect(whitelist['test.com']).toContain('ggg---');
            expect(whitelist['test.com']).toContain('nnn---');

            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(2);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---|ggg---|hhh---|iii---|jjj---|kkk---|lll---|mmm---)+test.com');
            expect(rules[0].id).toEqual(1);
            expect(rules[1].condition.regexFilter).toEqual('.*://(?:vvv---|uuu---|ttt---|sss---|rrr---|qqq---|ppp---|ooo---|nnn---)+test.com');
            expect(rules[1].id).toEqual(2);
            // expect(rules[2].condition.regexFilter).toEqual('.*://(?:)+test.com');
            // expect(rules[2].id).toEqual(3);
        });

        it('should build three Dynamic Rules for the same url with 8, 6, revision urls and a different url', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(14);
            whitelist['example.com'] = [''];
            //whitelist['example.com'] = generateArray(6);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('hhh---');
            expect(whitelist['test.com']).toContain('ggg---');
            expect(whitelist['test.com']).toContain('nnn---');
            expect(whitelist['example.com'].length).toEqual(1);

            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(3);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---|ggg---|hhh---|iii---|jjj---|kkk---|lll---|mmm---)+test.com');
            expect(rules[0].id).toEqual(1);
            expect(rules[1].condition.regexFilter).toEqual('.*://(?:nnn---)+test.com');
            expect(rules[1].id).toEqual(2);
            expect(rules[2].condition.regexFilter).toEqual('.*://(?:)+example.com');
            expect(rules[2].id).toEqual(3);
        });

        it('should build three Dynamic Rules for the same url with 8, 6, revision urls and a different url and then locate the 2nd one', function () {
            const whitelist = {};
            whitelist['test.com'] = generateTestArrayOfSize(14);
            whitelist['example.com'] = [''];
            //whitelist['example.com'] = generateArray(6);
            console.log(whitelist);
            expect(whitelist['test.com']).toContain('aaa---');
            expect(whitelist['test.com']).toContain('hhh---');
            expect(whitelist['test.com']).toContain('ggg---');
            expect(whitelist['test.com']).toContain('nnn---');
            expect(whitelist['example.com'].length).toEqual(1);
//whitelist['test.com'].push('zzz---')
            const rules = rulesModule.generateDynamicRules(whitelist);
            expect(rules.length).toEqual(3);
            expect(rules[0].condition.regexFilter).toEqual('.*://(?:aaa---|bbb---|ccc---|ddd---|eee---|fff---|ggg---|hhh---|iii---|jjj---|kkk---|lll---|mmm---)+test.com');
            expect(rules[0].id).toEqual(1);
            expect(rules[1].condition.regexFilter).toEqual('.*://(?:nnn---)+test.com');
            expect(rules[1].id).toEqual(2);
            expect(rules[2].condition.regexFilter).toEqual('.*://(?:)+example.com');
            expect(rules[2].id).toEqual(3);

            const tokens = {
                'example.com': { value: 'reallyfake' }
            }
            const dynamicRules = rulesModule.generateDynamicRules(whitelist, 'googletoken');
            console.log(dynamicRules);
            const newRules = dynamicRules.map((rule) => {
                const entries = Object.entries(tokens);
                return entries.map((entry) => {
                    if (rule.condition.regexFilter.includes(entry[0])) {
                        rule.action.requestHeaders[0].value = 'Bearer ' + entry[1].value;
                    }
                    return rule;
                })[0];
            });
            console.log(newRules);
            console.log(newRules[0].action.requestHeaders[0].value);
            console.log(newRules[1].action.requestHeaders[0].value);
            console.log(newRules[2].action.requestHeaders[0].value);
        });
    });

    describe('Tests taking into account max regexFilter length of 111', () => {

        it('should not have regexFilter.length greater than 111', () => {
            const belowBoundary = '.*://(?:qpv---|zoo---|hello---|car---|pavg---|ba---|qa---|gdirew-g---)+abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*';
            const aboveBoundary = '.*://(?:qpv---|zoo---|hello---|car---|pavg---|ba---|qa---|gdirew-gf---)+abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*';
            expect(belowBoundary.length).toEqual(111);
            expect(aboveBoundary.length).toEqual(112);
        })

        xit('should split if regexFilter strings are greater than or equal to boundary length 112', () => {
            const whitelistAbove = {
                'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*': [
                    'qpv---', 'zoo---', 'hello---', 'car---', 'pavg---', 'ba---', 'qa---',
                    'gdireq-gr---'
                ]
            }

            const rulesAbove = rulesModule.generateDynamicRules(whitelistAbove);
            console.log(rulesAbove);
            expect(rulesAbove.length).toEqual(2);
            //expect(rulesAbove[0].condition.regexFilter.length).toEqual(112);
        });

        it('should put all in one group if regexFilter boundary length of 111', () => {
            const whitelistBelow = {
                'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*': [
                    'qpv---', 'zoo---', 'hello---', 'car---', 'pavg---', 'ba---', 'qa---',
                    'gdireq-g---'
                ]
            }

            const rulesBelow = rulesModule.generateDynamicRules(whitelistBelow);
            console.log(rulesBelow);
            expect(rulesBelow.length).toEqual(1);
            expect(rulesBelow[0].condition.regexFilter.length).toEqual(111);
        });

        it('should generate a single group', () => {
            const groups = [{
                revisionUrls: [
                    'qpv---', 'zoo---', 'hello---', 'car---', 'pavg---', 'ba---', 'qa---',
                    'gdireq-gr---', 'qpa---', 'zog---', 'herro---'
                ],
                domain: 'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*'
            }];

            const groupsActual = [{
                revisionUrls: [
                    'qpv---', 'zoo---', 'hello---', 'car---', 'pavg---', 'ba---', 'qa---',
                    'gdireq-gr---', 'qpa---', 'zog---', 'herro---'
                ],
                domain: 'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*'
            }];

            const resultsArr = rulesModule.getRegexs(groupsActual);
            const results = resultsArr.toString();

            groups[0].revisionUrls.forEach((revisionUrl) => {
                expect(results).toContain(revisionUrl);
            });
        });

        it('should handle a bigger group', () => {
            const groups = [{
                revisionUrls: [
                    'alc---', 'froafd---', 'helloworld---', 'cartoon---', 'pavgood---', 'bach---', 'qa---',
                    'gowok---', 'qpa---', 'zog---', 'gwibtadfsf---', 'qwvieht---', 'qputbh---', 'qpo---',
                    'pbo---', 'qob---', 'get---', 'qantum---', 'qwerty---', 'obstr---', 'afjkl---', 'ibt---'
                ],
                domain: 'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*'
            }];

            const groupsActual = [{
                revisionUrls: [
                    'alc---', 'froafd---', 'helloworld---', 'cartoon---', 'pavgood---', 'bach---', 'qa---',
                    'gowok---', 'qpa---', 'zog---', 'gwibtadfsf---', 'qwvieht---', 'qputbh---', 'qpo---',
                    'pbo---', 'qob---', 'get---', 'qantum---', 'qwerty---', 'obstr---', 'afjkl---', 'ibt---'
                ],
                domain: 'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*'
            }];

            const resultsArr = rulesModule.getRegexs(groupsActual);
            expect(resultsArr[0].length).toEqual(4);

            const results = resultsArr.toString();

            groups[0].revisionUrls.forEach((revisionUrl) => {
                console.log(revisionUrl);
                expect(results).toContain(revisionUrl);
            });
        });

        it('should take a whitelist and return the dynamicRules', () => {
            const whitelist = {
                'abcde-fgh-ijkl-mnopqrstuv-wx.a.run.app/*': ['alc---', 'froafd---', 'helloworld---', 'cartoon---', 'pavgood---', 'bach---', 'qa---',
                    'gowok---', 'qpa---', 'zog---', 'gwibtadfsf---', 'qwvieht---', 'qputbh---', 'qpo---',
                    'pbo---', 'qob---', 'get---', 'qantum---', 'qwerty---', 'obstr---', 'afjkl---', 'ibt---'],
                'lmnop-fgh-ijkl-zxcvbnfdfd-wx.a.run.app/*': ['qpv---', 'zoo---', 'hello---', 'car---', 'pavg---', 'ba---', 'qa---',
                    'gdireq-gr---', 'qpa---', 'zog---', 'herro---']
            };





        });
    });

})();