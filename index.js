'use strict';
var psList = require('ps-list');
var fkill = require('fkill');

var processes = {
	chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
	chromium: 'chromium'
};

if (process.platform === 'win32') {
	psList = require('./win');
}

module.exports = function (opts, cb) {
	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	cb = cb || function () {};

	psList(function (err, list) {
		if (err) {
			cb(err);
			return;
		}

		if (opts.chromium === false) {
			delete processes.chromium;
		}

		if (opts.chrome === false) {
			delete processes.chrome;
		}

		var pids = list.filter(function (x) {
			return Object.keys(processes).some(function (processName) {
				return x.cmd.indexOf(processes[processName]) !== -1;
			}) &&
			x.cmd.indexOf('--type=renderer') !== -1 &&
			x.cmd.indexOf('--extension-process') === -1;
		}).map(function (x) {
			return x.pid;
		});

		fkill(pids, cb);
	});
};
