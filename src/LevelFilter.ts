import { Transform, TransformCallback, TransformOptions } from 'stream';
import { LogLevel } from './Log';

export class LevelFilter extends Transform {
	level: LogLevel;

	constructor (level: LogLevel, options: TransformOptions = {}) {
		super({ ...options, objectMode: true });
		this.level = level;
	}

	_transform (line: string, encoding: BufferEncoding, callback: TransformCallback) {
		const level = line.split(' - ')[1];

		if (level === this.level) {
			this.push(line);
		}

		callback();
	}
}
