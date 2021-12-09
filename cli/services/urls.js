// urls.js

const fs = require('fs');
const SELRUN_PATH = `${process.env.HOME}/.selrun/data/`;

class CloudRunUrls {

    constructor(dataFile) {
        this.dataFile = dataFile === undefined ? `${SELRUN_PATH}/data.json` : dataFile;
        const fs = require('fs');
        if (!fs.existsSync(this.dataFile))
            fs.writeFileSync(this.dataFile, JSON.stringify('{}')); // does this need to be {} without quotes?
    }

    add(url) {
        const data = this.#readData();
        if (!Object.keys(data).includes(url))
            data[url] = [];
        //console.log(data);
        this.#writeData(data);
    }

    remove(url) {
        const data = this.#readData(); console.log('url = ' + url)
        delete data[url];
        this.#writeData(data);
    }

    addRevision(url, rev) {
        const data = this.#readData();
        if ((!data[url] || data[url].includes(rev)))
            return;
        data[url].push(rev);
        this.#writeData(data);
    }

    removeRevision(url, rev) {
        const data = this.#readData();
        if ((!data[url] || !data[url].includes(rev)))
            return;
        data[url].splice(data[url].indexOf(rev), 1);
        this.#writeData(data);
    }

    getAll() {
        return this.#readData();
    }

    #readData() {
        //this.#validateDataFile();
        return JSON.parse(fs.readFileSync(this.dataFile).toString());
    }

    #writeData(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data));
    }

    #validateDataFile() {
        if (!fs.existsSync(this.dataFile))
            fs.writeFileSync(this.dataFile, JSON.stringify('{}'));
        // if (fs.existsSync(this.dataFile))
        //     const data = this.#readData();
        // if (!data.urls)
        //     throw new Error('Invalid data format. urls not present.');



    }
}


module.exports = (process.env.TESTING) ? CloudRunUrls : new CloudRunUrls();
