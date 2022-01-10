// rules.js


const rulesModule = new (function () {
    const public = this;


    // public.generateDynamicRulesPlatform = function (tokens, startIndexOffset) {
    //     startIndexOffset = startIndexOffset === undefined ? 0 : startIndexOffset;
    //     const urls = Object.keys(tokens);
    //     return urls.reduce((acc, url, index) => {
    //         acc.push(new DynamicRule()
    //             .setId(index + 1 + startIndexOffset)
    //             .setToken(tokens[url].value)
    //             .setRegexFilter(`.*://(?:)+${url}`)
    //             .generate());
    //     }, []);
    // }

    // public.enerateDynamicRules = function (whitelist, tokenValue) {
    //     const domains = Object.keys(whitelist);

    //     const rulesArray = domains.reduce((acc, domain, index, arr) => {
    //         public.generateGroups(whitelist[domain]).forEach((elem) => {
    //             acc.push({
    //                 domain: domain,
    //                 revisionUrls: elem
    //             });
    //         });
    //         return acc;
    //     }, []);

    //     return rulesArray.map((group, index, arr) => {
    //         if (group.revisionUrls.length === 0)
    //             group.revisionUrls.push('');
    //         return new DynamicRule()
    //             .setId(index + 1)
    //             .setToken(tokenValue)
    //             .setRegexFilter(RegexFilterBuilder.generateRegex(group.revisionUrls, group.domain))
    //             .generate();

    //     });
    // }

    public.generateDynamicRules = function (whitelist, tokenValue) {
        const domains = Object.keys(whitelist);
        console.log(whitelist)
        const rulesArray = domains.reduce((acc, domain, index, arr) => {
            acc.push({
                domain: domain,
                revisionUrls: Object.assign([], whitelist[domain])
            });
            return acc;
        }, []);
        console.log(rulesArray)
        const resultsArr = public.getRegexs(rulesArray);

        var id = 1;
        return resultsArr.reduce((acc, regexArr) => {
            regexArr.forEach((regex) => {
                acc.push(new DynamicRule()
                    .setId(id++)
                    .setToken(tokenValue)
                    .setRegexFilter(regex)
                    .generate());
            });
            return acc;
        }, []);
    }

    public.getRegexs = (groups) => {
        return groups.reduce((acc, group) => {
            acc.push(getRegexsFromSingleGroup(group));
            return acc;
        }, []);
    }

    function getRegexsFromSingleGroup(group) {
        var recheckArr = [];
        const origArray = group.revisionUrls;
        const finalRegexs = [];
        var count = 0;
        const result = getSmallRegex(origArray, group.domain, finalRegexs);
        console.log(result);
        return result;

        function getSmallRegex(origArray, domain, finalRegexs) {
            const regex = RegexFilterBuilder.generateRegex(origArray, domain);
            console.log('regex.len = ' + regex.length);
            if (count++ > 10000) {
                console.log('exceeded count... prevent unlimited looping...');
                return;

            } else if (regex.length >= 112) {
                console.log('length outside of range');
                recheckArr.push(origArray.pop());
                console.log(origArray);
                console.log(recheckArr);
                //const smallerRegex = RegexFilterBuilder.generateRegex(origArray, domain);
                return getSmallRegex(origArray, domain, finalRegexs);
            } else if (recheckArr.length === 0 || origArray === recheckArr) {
                console.log('recheckArr empty...');
                finalRegexs.push(regex);
                return finalRegexs; //getSmallRegex(recheckArr, domain, finalRegexs);
            } else if (regex.length < 112) {
                console.log('length within range...');
                finalRegexs.push(regex);
                const newOrigArray = Object.assign([], recheckArr);
                recheckArr = [];
                return getSmallRegex(newOrigArray, domain, finalRegexs);;
            } else {
                console.log('inside else...');
                return finalRegexs;
            }
        }

    }

    function DynamicRule() {
        //rule.action.requestHeaders[0].value; -> the token
        //condition.regexFilter; -> the filter regex

        this.setId = function (_id) {
            this.id = _id;
            return this;
        }
        this.setToken = function (_token) {
            this.token = _token;
            return this;
        }
        this.setRegexFilter = function (_regexFilter) {
            this.regexFilter = _regexFilter;
            return this;
        }
        this.generate = function () {
            return {
                "id": this.id,
                "priority": 1,
                "action": {
                    "type": "modifyHeaders",
                    "requestHeaders": [
                        {
                            "header": "Authorization",
                            "operation": "set",
                            "value": "Bearer " + this.token
                        }
                    ]
                },
                "condition": {
                    "regexFilter": this.regexFilter,
                    "resourceTypes": [
                        "main_frame", "script", "sub_frame", "websocket", "stylesheet", "image", "font", "xmlhttprequest", "media", "font"
                    ]
                }
            };
        }
    };

    public.generateGroups = function (revisionUrls) {
        return revisionUrls.reduce((acc, revUrl, index, arr) => {
            var i = Math.floor(index / 8);
            if (acc[i] === undefined)
                acc.push([]);
            acc[i].push(revUrl);
            return acc;
        }, [[]]);
    }
})();