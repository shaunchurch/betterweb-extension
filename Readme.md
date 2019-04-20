# Betterweb Extension

Show a warning against websites that use bad faith privacy notices. These are sites claiming to care about privacy while making it deliberately difficult to disable privacy invasion.

[Install the extension](https://chrome.google.com/webstore/detail/betterweb/olklefeopkpepjnllbckpcjakfdiheco)

We're building a database of offending sites. I'll set up a web form soon, but meanwhile feel free to send links to [@shaunchurch](https://twitter.com/shaunchurch) on twitter.

## Build

Clone the repo, then:

```
$ npm install
$ npm run build
```

Assets will be in ./dist and a `dist.zip` ready to upload to Chrome will be in the root directory.

## Develop

Clone the repo, then:

```
$ npm install
$ npm run dev
```

Then go to `brave://extensions/` or `chrome://extensions/` and `Load unpacked`. Select the `./dist` directory. Look for the extension icon in the browser toolbar.

#### Note on dev command

Only JS files will recompile on save. Images, styles, manifest.json changes will need to stop and start the dev command to copy assets.
