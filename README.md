

## CLI Tool

The extension and the CLI tool communicate with each other. The CLI tool obtains auth tokens from Google's SDK or from a local data file and makes that information available to the extension. The extension then creates a series of declarativeNetRequest rules to add the auth tokens to requests to URLS whitelisted from the CLI tool.

### Whitelisting a Heroku URL

To whitelist a secure service running on Heroku, run the following command:

```
$ ./selrun --add-url my-secure-cloud-service.herokuapp.com
```

To add the ACCESS_TOKEN, copy it from your Heroku Config Vars and replace the variable below with the token:

```
$ ./selrun

### Start the CLI Webserver

In order for the browser extension to retrieve a 

For usage information, change to the CLI directory, and run `./selrun`.




## Installing the browser extension

- In Chrome, or any Chromium browser which supports Chrome Extensions, navigate to `browser://extensions` in the address bar.
- On the right side, enable "Developer mode".
- On the top right, click "Load unpacked extension"
- In the file dialog box, select the chrome-browser-extension folder from this repository.

The extension's auth mechanism is off by default. To enable it, click the extension icon in the top right of the browser. The banner text will change from OFF to ON.
