# Betterweb Extension

Show a warning beside links to websites that use bad faith privacy notices.

These are sites claiming to care about privacy while making it deliberately difficult to disable privacy invasion.

[Install the extension](https://chrome.google.com/webstore/detail/betterweb/olklefeopkpepjnllbckpcjakfdiheco)

![Betterweb extension showing warnings beside links in Google SERPs](https://lh3.googleusercontent.com/JWOHV9sNH4c12u5aPEUpKomAWiFB_eComHS2LC0adcwKEK4r8E_2wpqd36DDKTdWzZTvYISwAgw=w640-h400-e365)

## Help us build the database

We're building a database of offending sites. I'll set up a web form soon, but meanwhile feel free to send links to [@shaunchurch](https://twitter.com/shaunchurch) on twitter.

## How to build

Clone the repo, then:

```
$ npm install
$ npm run build
```

Assets will be in `./dist` and a `dist.zip` ready to upload to the Chrome Store will be in the root directory.

## How to develop

Clone the repo, then:

```
$ npm install
$ npm run dev
```

Then go to `brave://extensions/` or `chrome://extensions/` and `Load unpacked`. Select the `./dist` directory. Look for the extension icon in the browser toolbar to confirm it's added.

#### Note on dev command

Only JS files will recompile on save. Images, styles.css, manifest.json changes will not take effect until the command is restarted and changed assets are copied to `./dist`.

## Use Brave

Also, if you're not already, please [consider using Brave as your browser](https://brave.com).
