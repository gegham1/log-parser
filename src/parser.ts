import yargs from 'yargs';

export async function getFilesPath(): Promise<{input: string, output: string}> {
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

async function main(): Promise<void> {
	const { input, output } = await getFilesPath();
  console.log(input, output);
}

main();
