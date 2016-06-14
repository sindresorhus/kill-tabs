# kill-tabs [![Build Status](https://travis-ci.org/sindresorhus/kill-tabs.svg?branch=master)](https://travis-ci.org/sindresorhus/kill-tabs)

> Kill all Chrome tabs to improve performance, decrease battery usage, and save memory

*Works on macOS, Linux, Windows.*

I'm a [tab-abuser](https://cloud.githubusercontent.com/assets/170270/8513617/4290e966-2373-11e5-98d1-37560c2498e3.png) and I use this once in a while to prevent Chrome from taking up all system resources.

When you run `kill-tabs` the Chrome tab processes are killed, which means they will no longer take up system resources, but they will still be in your Chrome window, just as crashed. When you want one back you just reload the tab.


## CLI

```
$ npm install --global kill-tabs
```

```
$ kill-tabs --help

  Usage
    $ kill-tabs

  Options
    --no-chromium  Don't kill tabs in Chromium
    --no-chrome    Don't kill tabs in Chrome
```


## API

```
$ npm install --save kill-tabs
```

```js
const killTabs = require('kill-tabs');

killTabs().then(() => {
	console.log('Killed tabs');
});
```


## Tip

You can use the [Reload All Tabs](https://chrome.google.com/webstore/detail/reload-all-tabs/lgpdljdpanfecnpindkbnikegohoobci) Chrome extension to easily reload all the tabs.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
