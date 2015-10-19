'use strict';
const childProcess = require('child_process');
const neatCsv = require('neat-csv');
const pify = require('pify');
const TEN_MEBIBYTE = 1024 * 1024 * 10;

module.exports = opts => {
	opts = opts || {};

	const cmd = `wmic process where Caption='chrome.exe' get CommandLine,ProcessId /format:csv`;

	return pify(childProcess.exec)(cmd, {maxBuffer: TEN_MEBIBYTE}).then(
		stdout => pify(neatCsv)(stdout.trim()).then(
			data => data
				.filter(x => x.Node !== undefined)
				.map(x => ({cmd: x.CommandLine, pid: parseInt(x.ProcessId, 10)}))
		)
	);
};
