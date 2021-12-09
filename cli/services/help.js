// help.js

console.log(`
Usage: 
    ./selrun [[-h|--help] | [--start] | [--stop]]

    -h -> Help (this output)
    --start -> start auth server
    --stop -> stop auth server
    --show-urls -> List all Whitelisted URLs and revision URLs
    --add-url -> Whitelist a URL
    --remove-url -> Disable a whitelisted URL
    --edit-url -> Use with --add-revision to add a revision URL
    --edit-url -> Use with --add-token to add a custom token
    --add-revision -> Add a revision URL (the part before the '---' in the URL)
    --add-token -> For non-Google platforms, like Heroku, add a custom token in place of Google Identity Token

    The root domain can be added as follows:
    ./selrun --edit-url URL_PATTERN --add-revision ' '    # note the single quotes
    
    `);
process.exit(0);