// rules.js


const rulesModule = new (function () {
    const public = this;


    public.generateDynamicRulesPlatform = function (tokens, startIndexOffset) {
        startIndexOffset = startIndexOffset === undefined ? 0 : startIndexOffset;
        const urls = Object.keys(tokens);
        return urls.reduce((acc, url, index) => {
            acc.push(new DynamicRule()
                .setId(index + 1 + startIndexOffset)
                .setToken(tokens[url].value)
                .setRegexFilter(`.*://(?:)+${url}`)
                .generate());
        }, []);
    }

    public.generateDynamicRules = function (whitelist, tokenValue) {
        const domains = Object.keys(whitelist);

        const rulesArray = domains.reduce((acc, domain, index, arr) => {
            public.generateGroups(whitelist[domain]).forEach((elem) => {
                acc.push({
                    domain: domain,
                    revisionUrls: elem
                });
            });
            return acc;
        }, []);

        return rulesArray.map((group, index, arr) => {
            if (group.revisionUrls.length === 0)
                group.revisionUrls.push('');
            return new DynamicRule()
                .setId(index + 1)
                .setToken(tokenValue)
                .setRegexFilter(RegexFilterBuilder.generateRegex(group.revisionUrls, group.domain))
                .generate();

        });
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