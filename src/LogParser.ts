import { Transform, TransformCallback, TransformOptions } from 'stream';
import { createLog } from './helper';

export class LogParser extends Transform {
	constructor (options: TransformOptions = {}) {
		super({ ...options, objectMode: true });
	}

	_transform (line: string, encoding: BufferEncoding, callback: TransformCallback) {
		const chunks = line.split(' - ');
		const log = createLog(chunks[0], chunks[1], chunks[2]);

		this.push(log);

		callback();
	}
}
