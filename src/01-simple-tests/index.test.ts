// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const sum = simpleCalculator({ a: 200, b: 200, action: Action.Add });
    expect(sum).toBe(400);
  });

  test('should subtract two numbers', () => {
    const substract = simpleCalculator({
      a: 500,
      b: 200,
      action: Action.Subtract,
    });
    expect(substract).toBe(300);
  });

  test('should multiply two numbers', () => {
    const muliply = simpleCalculator({ a: 2, b: 3, action: Action.Multiply });
    expect(muliply).toBe(6);
  });

  test('should divide two numbers', () => {
    const divide = simpleCalculator({ a: 6, b: 3, action: Action.Divide });
    expect(divide).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const exponentieate = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(exponentieate).toBe(8);
  });

  test('should return null for invalid action', () => {
    const invalid = simpleCalculator({
      a: 6,
      b: 3,
      action: 'Action.invalidAction',
    });
    expect(invalid).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const invalidArg = simpleCalculator({
      a: 6,
      b: 'a',
      action: Action.Add,
    });
    expect(invalidArg).toBe(null);
  });
});
