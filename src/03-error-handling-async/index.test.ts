// Uncomment the code below and write your tests
// import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

import {
  MyAwesomeError,
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('test')).resolves.toBe('test');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const error = 'test Error message!';
    expect(() => throwError(error)).toThrowError(error);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrowError(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
