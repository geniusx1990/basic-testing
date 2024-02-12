// Uncomment the code below and write your tests
import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    const withdraw = balance + 200;

    expect(() => account.withdraw(withdraw)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 20;
    const acc1 = getBankAccount(balance);
    const acc2 = getBankAccount(balance + balance);

    expect(() => acc1.transfer(40, acc2)).toThrowError(
      new InsufficientFundsError(balance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);

    expect(() => account.transfer(50, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const balance = 22;
    const account = getBankAccount(balance);
    account.deposit(balance);
    expect(account.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    const accountA = getBankAccount(100);
    accountA.withdraw(10);
    expect(accountA.getBalance()).toBe(90);
  });

  test('should transfer money', () => {
    const balance = 10;
    const acc1 = getBankAccount(balance);
    const acc2 = getBankAccount(balance * balance);
    acc1.transfer(balance, acc2);

    expect(acc1.getBalance()).toBe(0);
    expect(acc2.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 11;
    const accountA = getBankAccount(balance);
    expect(typeof (await accountA.fetchBalance())).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const newBalance = 150;
    const accountA = getBankAccount(initialBalance);
    accountA.fetchBalance = jest.fn().mockResolvedValue(newBalance);
    await accountA.synchronizeBalance();

    expect(accountA.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const accountA = getBankAccount(initialBalance);
    accountA.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(accountA.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
