// token.js

const fs = require('fs');
const SECURE_OPTIONS = { mode: 0o600 };
const SELRUN_PATH = `${process.env.HOME}/.selrun/data/`;

class Tokens {

    constructor(dataFile) {
        this.dataFile = dataFile === undefined ? `${SELRUN_PATH}/tokens.json` : dataFile;
        const fs = require('fs');
        if (!fs.existsSync(this.dataFile)) {
            fs.mkdirSync(SELRUN_PATH, { recursive: true });
            fs.writeFileSync(this.dataFile, JSON.stringify({}), SECURE_OPTIONS);
        }
    }

    add(url, token) {
        const data = this.#readData(); console.log(typeof (data))
        //if (!Object.keys(data).includes(url))
        data[url] = {
            value: token,
            age: new Date().getTime()
        };
        //console.log(data);
        this.#writeData(data);
    }

    remove(url) {
        const data = this.#readData(); console.log('url = ' + url)
        delete data[url];
        this.#writeData(data);
    }

    getAll() {
        return this.#readData();
    }

    getOnlyWhitelisted(whitelist) {
        console.log('whitelist = ', whitelist)
        const allTokens = this.getAll();
        //console.log('allTokens = ', allTokens);
        const urlsInWhitelist = Object.keys(whitelist);
        console.log('urlsInWhitelist = ', urlsInWhitelist);
        const urlKeys = Object.keys(allTokens).filter((urlTokenKey) => {
            if (urlsInWhitelist.includes(urlTokenKey))
                return urlTokenKey;
        });
        console.log('urlKeys = ', urlKeys);
        return urlKeys.reduce((acc, url) => {
            acc[url] = {};
            acc[url].value = allTokens[url].value;
            acc[url].age = allTokens[url].age;
            return acc;
        }, {});
    }

    #readData() {
        //this.#validateDataFile();
        return JSON.parse(fs.readFileSync(this.dataFile).toString());
    }

    #writeData(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data), SECURE_OPTIONS);
    }

    #validateDataFile() {
        if (!fs.existsSync(this.dataFile))
            fs.writeFileSync(this.dataFile, JSON.stringify({}), SECURE_OPTIONS);
        // if (fs.existsSync(this.dataFile))
        //     const data = this.#readData();
        // if (!data.urls)
        //     throw new Error('Invalid data format. urls not present.');



    }
}


module.exports = (process.env.TESTING) ? Tokens : new Tokens();
