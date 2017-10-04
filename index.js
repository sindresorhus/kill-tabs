'use strict';
const fkill = require('fkill');
let psList = require('ps-list');

const processes = {
	chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
	chromium: process.platform === 'darwin' ? 'Chromium Helper' : 'chromium'
};

if (process.platform === 'win32') {
	psList = require('./win');
}

module.exports = opts => {
	opts = opts || {};

	return psList().then(list => {
		if (opts.chromium === false) {
			delete processes.chromium;
		}

		if (opts.chrome === false) {
			delete processes.chrome;
		}

		const pids = list
			.filter(x =>
				Object.keys(processes).some(name => x.cmd.includes(processes[name])) &&
				x.cmd.includes('--type=renderer') &&
				!x.cmd.includes('--extension-process'))
			.map(x => x.pid);

		return fkill(pids, {force: true});
	});
};
