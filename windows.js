import {promisify} from 'node:util';
import childProcess from 'node:child_process';
import execall from 'execall';

const TEN_MEBIBYTE = 1024 * 1024 * 10;

export default async function killTabs(options) {
	const browsers = [];

	if (options.chromium) {
		browsers.push('Caption=\'chromium.exe\'');
	}

	if (options.chrome) {
		browsers.push('Caption=\'chrome.exe\'');
	}

	if (options.brave) {
		browsers.push('Caption=\'brave.exe\'');
	}

	if (options.edge) {
		browsers.push('Caption=\'msedge.exe\'');
	}

	const args = ['process', 'where', browsers.join(' or '), 'get','CommandLine,ProcessId', '/format:list'];
	const stdout = await promisify(childProcess.execFile)('wmic', args, {maxBuffer: TEN_MEBIBYTE});

	return execall(/CommandLine=(.+)\s+ProcessId=(\d+)/g, stdout).map(element => ({
		cmd: element.subMatches[0],
		pid: Number.parseInt(element.subMatches[1], 10),
	}));
}
