// args.js

class Args {

    constructor(argsArr) {
        if (argsArr === undefined)
            throw new Error('Must pass process.argv to the Args constructor...');
        this.argsArr = argsArr;
        //const instance = new Args();
    }

    getHelpArgument(argsArr) {
        return argsArr.includes('-h') || argsArr.includes('--help') || process.argv.length <= 2;
    }

    has(arg) {
        return this.argsArr.includes(arg);
    }

    get(arg) {
        return this.#argsValue(this.argsArr, arg, arg, '');
    }

    #argsValue(argsArr, shortForm, longForm, defaultValue) {
        return argsArr.reduce((acc, elem, index, array) => {
            if ((array[index - 1] === shortForm || array[index - 1] === longForm))
                acc = elem;
            return acc;
        }, defaultValue);
    }
}

module.exports = (process.env.TESTING) ? Args : new Args(process.argv);
