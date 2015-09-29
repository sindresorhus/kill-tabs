'use strict';
var childProcess = require('child_process');
var neatCsv = require('neat-csv');
var TEN_MEBIBYTE = 1024 * 1024 * 10;

module.exports = function (opts, cb) {
	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	cb = cb || function () {};

	var cmd = 'wmic process where Caption=\'chrome.exe\' get CommandLine,ProcessId /format:csv';

	childProcess.exec(cmd, {
		maxBuffer: TEN_MEBIBYTE
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
