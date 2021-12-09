// regexFilter.js

const RegexFilterBuilder = {

    generateRegex(revisionUrls, domain) {
        return revisionUrls.reduce((acc, url, index, arr) => {
            if (index === arr.length - 1)
                return acc + url + ')+';
            if (index === 1)
                return acc + url + '|';
            else
                return acc + url + '|';
        }, '.*:\/\/(?:').concat(domain);
    }
}