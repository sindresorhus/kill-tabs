import process from 'node:process';
import fkill from 'fkill';
import psList from 'ps-list';
import windows from './windows.js';

export default async function killTabs(options = {}) {
	const list = process.platform === 'win32' ? await windows(options) : await psList();

	const processes = {
		chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
		chromeCanary: process.platform === 'darwin' ? 'Chrome Canary Helper' : 'chrome',
		chromium: process.platform === 'darwin' ? 'Chromium Helper' : 'chromium',
		brave: process.platform === 'darwin' ? 'Brave Browser Helper' : 'brave',
		edge: process.platform === 'darwin' ? 'Microsoft Edge Helper' : 'edge',
	};

	if (options.chromium === false) {
		delete processes.chromium;
	}

	if (options.chrome === false) {
		delete processes.chrome;
	}

	if (options.chromeCanary === false) {
		delete processes.chromeCanary;
	}

	if (options.brave === false) {
		delete processes.brave;
	}

	if (options.edge === false) {
		delete processes.edge;
	}

	const pids = list
		.filter(process_ =>
			Object.keys(processes).some(name => process_.cmd.includes(processes[name]))
			&& process_.cmd.includes('--type=renderer')
			&& !process_.cmd.includes('--extension-process'),
		)
		.map(process_ => process_.pid);

	return fkill(pids, {force: true});
}
