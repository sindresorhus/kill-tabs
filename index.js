'use strict';
var psList = require('ps-list');
var fkill = require('fkill');
var processName = process.platform === 'darwin' ? 'Chrome Helper' : 'chrome';

if (process.platform === 'win32') {
	psList = require('./win');
}

module.exports = function (cb) {
	cb = cb || function () {};

	psList(function (err, list) {
		if (err) {
			cb(err);
			return;
		}

		var pids = list.filter(function (x) {
			return x.cmd.indexOf(processName) !== -1 &&
				x.cmd.indexOf('--type=renderer') !== -1 &&
				x.cmd.indexOf('--extension-process') === -1;
		}).map(function (x) {
			return x.pid;
		});

		fkill(pids, cb);
	});
};
