This is the CLI tool for Cloud Run for Selenium, which will listen for requests from the Chrome browser extension and respond with Google SDK Auth Identity Tokens, as well as whitelisted revision URLS, which the extension will use to modify requests to the Selenium Cloud Run service.

The CLI tool is also compatible with Heroku.

## Installing

There is no need to install any dependencies. If you have Node.js 14+, then this will execute.

However, you will need to install the browser extension to enable the browser to authenticate against the Cloud Run and/or Heroku services.


## Usage

Run: `./selrun` to see the usage instructions.


## Running tests

This is not using a framework at the moment, so the tests are rudimentary. To run the two spec files individually, do the following:

```
$ node tests/token.spec.js
```

This will output true/false where true means the test passed. 


```
$ node tests/urls.spec.js
```

This will output a series of strings, and you must verify that the correct index is removed.

 
## License 

MIT License