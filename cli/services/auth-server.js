// auth-server

const ROOT = './';
const https = require('https');
const fs = require('fs');
const execute = require('../lib/execute').execute;

const options = {
    key: fs.readFileSync(`${ROOT}keys/localhost-key.pem`),
    cert: fs.readFileSync(`${ROOT}keys/localhost.pem`)
};

const AUTH_SERVER_PORT = process.env.AUTH_SERVER_PORT || 34443;

const server = https.createServer(options, function (req, res) {
    // console.log(req.method);
    // console.log(req.headers)
    if (req.url === '/token') {
        res.setHeader('Access-Control-Allow-Origin', 'chrome-extension://fedkdbcjmdcfaakelpighjmjcbnieijd');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        // pre-flight request to make sure client is whitelisted to request a token
        if (req.method === 'OPTIONS') {
            console.log('OPTIONS');
            res.end();
        } else {
            res.setHeader('Content-Type', 'application/json');
            const tokenPromise = execute('gcloud auth print-identity-token');
            const tokensMod = require('./token');
            tokenPromise.then((token) => {
                res.writeHead(200);
                //res.end("{\"token\": \"" + token.trim() + "\"}");
                const urls = require('./urls');
                const whitelist = urls.getAll();
                const responseData = {
                    token: token.trim(),
                    whitelist: whitelist,
                    tokens: tokensMod.getOnlyWhitelisted(whitelist)
                };

                // const urlKeys = Object.keys(responseData.whitelist);
                // const customTokens = tokensMod.getAll().filter((token) => {

                // });
                res.end(JSON.stringify(responseData));
            });
        }
    } else {
        res.writeHead(204);
        res.end();
    }
}).listen(AUTH_SERVER_PORT);

console.log(`Listening on https://localhost:${AUTH_SERVER_PORT}`);
