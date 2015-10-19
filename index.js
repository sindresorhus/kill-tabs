'use strict';
let psList = require('ps-list');
const fkill = require('fkill');

const processes = {
	chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
	chromium: 'chromium'
};

if (process.platform === 'win32') {
	psList = require('./win');
}

module.exports = function (opts) {
	opts = opts || {};

	return psList().then(list => {
		if (opts.chromium === false) {
			delete processes.chromium;
		}

		if (opts.chrome === false) {
			delete processes.chrome;
		}

		const pids = list.filter(x => {
			return Object.keys(processes).some(processName => {
				return x.cmd.indexOf(processes[processName]) !== -1;
			}) &&
			x.cmd.indexOf('--type=renderer') !== -1 &&
			x.cmd.indexOf('--extension-process') === -1;
		}).map(x => {
			return x.pid;
		});

		return fkill(pids);
	});
};
