// args.js

class Args {

    checkedArgs = [];

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
        this.checkedArgs.push(arg);
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

    hasNoMatchingArguments() {
        return this.checkedArgs.reduce((acc, arg, index, arr) => {
            if(this.argsArr.includes(arg))
                acc = false;
            return acc;
        }, true);
    }
}

module.exports = (process.env.TESTING) ? Args : new Args(process.argv);
