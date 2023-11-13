import { CpfValidator } from './cpf.validator';

describe('CpfValidator', () => {
  let validator: CpfValidator;

  beforeEach(() => {
    validator = new CpfValidator();
  });

  it('should be create', () => {
    expect(validator).toBeTruthy();
  });

  it('should be valid', () => {
    expect(validator.isValid('12345678909')).toBe(true);
    expect(validator.isValid('01234567890')).toBe(true);
  });

  it('should be invalid', () => {
    expect(validator.isValid(12345678909 as any)).toBe(false);
    expect(validator.isValid('1234567890')).toBe(false);
    expect(validator.isValid('11122233344')).toBe(false);
    expect(validator.isValid('88888888888')).toBe(false);
  });
});
