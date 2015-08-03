'use strict';
var childProcess = require('child_process');
var neatCsv = require('neat-csv');

module.exports = function (opts, cb) {
	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	cb = cb || function () {};

	var cmd = 'wmic process where Caption=\'chrome.exe\' get CommandLine,ProcessId /format:csv';

	childProcess.exec(cmd, {
		maxBuffer: 10 * 1024 * 1024
	}, function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		neatCsv(stdout.trim(), function (err, data) {
			if (err) {
				cb(err);
				return;
			}

			var ret = data.filter(function (x) {
				return x.Node !== undefined;
			}).map(function (x) {
				return {
					cmd: x.CommandLine,
					pid: parseInt(x.ProcessId, 10)
				};
			});

			cb(null, ret);
		});
	});
};
