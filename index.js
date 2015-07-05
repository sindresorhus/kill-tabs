'use strict';
var psList = require('ps-list');
var fkill = require('fkill');

module.exports = function (cb) {
	cb = cb || function () {};

	psList(function (err, list) {
		if (err) {
			cb(err);
			return;
		}

		var pids = list.filter(function (x) {
			return x.cmd.indexOf('Chrome Helper') !== -1 &&
				x.cmd.indexOf('--type=renderer') !== -1 &&
				x.cmd.indexOf('--extension-process') === -1;
		}).map(function (x) {
			return x.pid;
		});

		fkill(pids, cb);
	});
};
