import { DateValidator } from './date.validator';

describe('DateValidator', () => {
  let validator: DateValidator;

  beforeEach(() => {
    validator = new DateValidator();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should be create', () => {
    expect(validator).toBeTruthy();
  });

  it('should be valid', () => {
    expect(validator.isValid('13/11/2021')).toBe(true);
    expect(validator.isValid('13/11/21')).toBe(true);
    expect(validator.isValid('1699914275581')).toBe(true);
    expect(validator.isValid(new Date().toISOString())).toBe(true);
  });

  it('should be invalid', () => {
    expect(validator.isValid('32/12/2022')).toBe(false);
    expect(validator.isValid('13/15/2022')).toBe(false);
    expect(validator.isValid('abc')).toBe(false);
  });

  describe('getAge', () => {
    it('should be get age', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
      const birthDate = '2000-01-12T02:00:00.000Z';
      const result = validator.getAge(birthDate);
      expect(result).toBe(22);
    });
  });

  describe('minAge', () => {
    it('should be of legal age', () => {
      const birthDate = '01/02/2005';
      const result = validator.minAge(birthDate, 18);
      expect(result).toBe(true);
    });
  });

  describe('maxAge', () => {
    it('should be under 60 years old', () => {
      const birthDate = '01/02/2005';
      const result = validator.maxAge(birthDate, 60);
      expect(result).toBe(true);
    });
  });
});
