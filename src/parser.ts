import yargs from 'yargs'
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import { LevelFilter } from './LevelFilter';
import { LogLevel } from './Log';
import { LogParser } from './LogParser';
import { JsonSerializer } from './JsonSerializer';

async function getFilesPath(): Promise<{input: string, output: string}> {
	const argv = await yargs(process.argv.slice(2)).argv;

	if (!argv.input || !argv.output) {
		throw new Error('Please provide both input and output files.');
	}

	if (typeof argv.input !== 'string') {
		throw new Error('input should be a file path.');
	}

	if (typeof argv.output !== 'string') {
		throw new Error('output should be a file path.');
	}

	return { input: argv.input, output: argv.output };
}

function handleUncaughtException(error: string): void {
	console.error(error);
	process.exit(1);
}

async function main(): Promise<void> {
	process.on('uncaughtException', handleUncaughtException);
	const { input, output } = await getFilesPath();

	createReadStream(input)
	.pipe(split())
	.pipe(new LevelFilter(LogLevel.ERROR))
	.pipe(new LogParser())
	.pipe(new JsonSerializer())
	.pipe(createWriteStream(output));
}

main();
