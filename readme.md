# kill-tabs [![Build Status](https://travis-ci.org/sindresorhus/kill-tabs.svg?branch=master)](https://travis-ci.org/sindresorhus/kill-tabs)

> Kill all Chrome tabs to improve performance, decrease battery usage, and save memory

I'm a [tab-abuser](https://cloud.githubusercontent.com/assets/170270/8513617/4290e966-2373-11e5-98d1-37560c2498e3.png) and I use this once in a while to prevent Chrome from taking up all system resources.


## CLI

```
$ npm install --global kill-tabs
```

```
$ kill-tabs --help

  Usage
    $ kill-tabs
```


## API

```
$ npm install --save kill-tabs
```

```js
var killTabs = require('kill-tabs');

killTabs(function (err) {
	console.log('Killed tabs');
});
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
