import { Transform, TransformCallback, TransformOptions } from 'stream';
import { Log } from './Log';

export class JsonSerializer extends Transform {
	private isFirst: boolean;

	constructor (options: TransformOptions = {}) {
		super({ ...options, objectMode: true });
		this.isFirst = true;
	}

  private serialize(log: Log): string {
		return JSON.stringify({ ...log, timestamp: log.timestamp.getTime() });
	}

	_transform (log: Log, encoding: BufferEncoding, callback: TransformCallback): void {
    const serializedLog = this.serialize(log);

		if (this.isFirst) {
		  this.push(`[${serializedLog}`);
      this.isFirst = false;
		} else {
      this.push(`,${serializedLog}`);
    }

		callback();
	}

	_flush(callback: TransformCallback): void {
		this.push(']');
		callback();
	}
}
