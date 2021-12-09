importScripts('regexFilter.js');
importScripts('rules.js');

// background.js
(async function () {

    const TOKEN_MAX_AGE_BEFORE_REFRESH = 1200000;
    const REFRESH_PERIOD = parseInt(TOKEN_MAX_AGE_BEFORE_REFRESH / 60000) + 1;

    chrome.alarms.getAll().then((alarms) => {
        alarms.forEach((alarm) => {
            console.log(alarm);
        })
    })

    chrome.alarms.create('periodic_token_refresh', {
        periodInMinutes: REFRESH_PERIOD
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
        triggers[alarm.name]();
    });

    const triggers = {};

    triggers['periodic_token_refresh'] = () => {
        chrome.storage.local.get(['token', 'badgeProps', 'whitelist'], async (storage) => {
            if (storage.badgeProps.text === 'ON') {
                if (weShouldRequestNewToken(storage.token)) {
                    // get new token and update dynamic rule
                    const newToken = await requestIdentityToken();
                    await updateAuthorizationDynamicRule({ token: newToken, whitelist: storage.whitelist, tokens: storage.tokens });
                }
            }
        });
    }

    // invoked when extension is installed/reloaded
    chrome.runtime.onInstalled.addListener(() => {
        console.log('onInstalled');
        disableAuthServices();
    });

    // invoked when browser starts
    chrome.runtime.onStartup.addListener(() => {
        console.log('onStartup');
        disableAuthServices();
    });


    chrome.action.onClicked.addListener(function (tab) {
        chrome.storage.local.get(['badgeProps'], (storage) => {
            const newBadgeProps = toggleBadgeProps(storage.badgeProps);
            //console.log(newBadgeProps);
            if (newBadgeProps.text === 'ON')
                enableAuthServices();
            else
                disableAuthServices();
        });
    });


    async function updateAuthorizationDynamicRule(ruleData) {
        //console.log('add identity token to dynamic rule using token ' + token.value)
        const dynamicRules = generateDynamicRules(ruleData);
        const ruleIds = dynamicRules.map((rule) => {
            return rule.id;
        });
        chrome.storage.local.set({ 'ruleIds': ruleIds });
        return chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: ruleIds, addRules: dynamicRules
        }).then(() => { });
    }

    function generateDynamicRules(ruleData) {
        const dynamicRules = rulesModule.generateDynamicRules(ruleData.whitelist, ruleData.token.value);
        return dynamicRules.map((rule) => {
            const entries = Object.entries(ruleData.tokens);
            return entries.map((entry) => {
                if (rule.condition.regexFilter.includes(entry[0])) {
                    rule.action.requestHeaders[0].value = 'Bearer ' + entry[1].value;
                }
                return rule;
            })[0];
        })
    }


    function storeWhitelistedUrls(whitelist) {
        console.log('Storing whitelisted urls: ' + whitelist);
        chrome.storage.local.set({ 'whitelist': whitelist });
    }


    async function requestIdentityToken() {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:34443/token')
                .then(
                    function (response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }
                        // Examine the text in the response
                        response.json().then(function (data) {
                            const token = { value: data.token, createdTime: new Date().getTime() };
                            storeIdentityToken(token);
                            storeWhitelistedUrls(data.whitelist);
                            storePlatformTokens(data.tokens);
                            setStateToOn();
                            const storage = { token: token, whitelist: data.whitelist, tokens: data.tokens };
                            resolve(storage);
                        });
                    }
                ).catch(function (err) {
                    if (err.message === 'Failed to fetch') {
                        notifyUserOfCLIError();
                    } else {
                        console.error('Fetch Error :-S', err);
                    }
                    setStateToOff();
                    disableIdentityTokenInRequestHeaders();
                    reject(err);
                });
        });
    }


    function storeIdentityToken(token) {
        chrome.storage.local.set({ 'token': token });
    }

    function storePlatformTokens(tokens) {
        chrome.storage.local.set({ 'tokens': tokens });
    }

    function setStateToOff() {
        chrome.action.setBadgeText({ text: 'OFF' });
        chrome.action.setBadgeBackgroundColor({ color: 'red' });
        chrome.storage.local.set({ 'badgeProps': { 'text': 'OFF', 'color': 'red' } });
    }

    function setStateToOn() {
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.action.setBadgeBackgroundColor({ color: 'green' });
        chrome.storage.local.set({ 'badgeProps': { 'text': 'ON', 'color': 'green' } });
    }

    function notifyUserOfCLIError() {
        chrome.notifications.create({
            message: 'CLI is not running. Run `./selrun --start`, and click the Cloud Run for Selenium icon to reconnect.',
            type: 'basic',
            iconUrl: '/images/logo.jpg',
            title: 'CLI Error'
        }, () => { });
    }


    function enableAuthServices() {
        setStateToOn();
        enableIdentityTokenInRequestHeaders();
    }

    function enableIdentityTokenInRequestHeaders() {
        chrome.storage.local.get(['token', 'whitelist', 'tokens'], async (storage) => {
            if (/*true || */ weShouldRequestNewToken(storage.token)) {
                const freshData = await requestIdentityToken();
                await updateAuthorizationDynamicRule(freshData);
            } else {
                await updateAuthorizationDynamicRule(storage);
            }
        });
    }


    function disableAuthServices() {
        setStateToOff();
        disableIdentityTokenInRequestHeaders();
    }

    function disableIdentityTokenInRequestHeaders() {
        chrome.storage.local.get(['ruleIds'], (storage) => {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: storage.ruleIds
            }).then(() => { });
        });
    }


    function toggleBadgeProps(badgeProps) {
        if ((badgeProps.text === 'OFF' && badgeProps.color === 'red') || (badgeProps.text === 'CLI Offline'))
            return { text: 'ON', color: 'green' };
        else
            return { text: 'OFF', color: 'red' };
    }


    function weShouldRequestNewToken(token) {
        return token === undefined || new Date().getTime() - token.createdTime > TOKEN_MAX_AGE_BEFORE_REFRESH - 5000;
    }
})();
