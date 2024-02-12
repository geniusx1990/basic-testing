// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    doStuffByTimeout(callback, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = './index.ts';
    const mockJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = __dirname + './non_existent_file.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './index.ts';
    const content = 'test';

    jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue(Buffer.from(content));
    expect(await readFileAsynchronously(pathToFile)).toBe(content);
  });
});
