import { Readable } from 'stream';
import { LevelFilter } from '../../src/LevelFilter';
import { LogLevel } from '../../src/Log';

describe('LevelFilter tests', () => {
  it('Should pass only strings with provided level', async () => {
    const instance = new LevelFilter(LogLevel.DEBUG);
    const lines = [
      'test - debug - test',
      'test - warn - test',
    ];
    const result: string[] = [];

    const filteredLines = Readable.from(lines, { objectMode: true })
    .pipe(instance);

    for await (const line of filteredLines) {
      result.push(line);
    }

    expect(result).toEqual([
      lines[0],
    ]);
  });
});
