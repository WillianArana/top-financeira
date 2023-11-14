import { NameValidator } from './name.validator';

describe('NameValidator', () => {
  let validator: NameValidator;

  beforeEach(() => {
    validator = new NameValidator();
  });

  it('should be create', () => {
    expect(validator).toBeTruthy();
  });

  describe('hasLastName', () => {
    it('should have a last name', () => {
      expect(validator.hasLastName('Elisa Lívia Pereira ')).toBe(true);
      expect(validator.hasLastName('Vitor       Ferreira')).toBe(true);
    });

    it('should not have a last name', () => {
      expect(validator.hasLastName('Nathan')).toBe(false);
    });
  });
});
