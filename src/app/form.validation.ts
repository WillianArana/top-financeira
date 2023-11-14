import { UntypedFormControl } from '@angular/forms';
import { CpfValidator } from './validators/cpf.validator';
import { DateValidator } from './validators/date.validator';
import { NameValidator } from './validators/name.validator';

export class FormValidations {
  static #cpfValidator = new CpfValidator();
  static #dateValidator = new DateValidator();
  static #nameValidator = new NameValidator();

  static getErrorMsg(
    _: string,
    validatorName: string,
    validatorValue: { [key: string]: string },
  ): string {
    const config: { [key: string]: string } = {
      required: `campo obrigatório`,
      minlength: `precisa ter no mínimo ${validatorValue['requiredLength']} caractere(s)`,
      maxlength: `precisa ter no máximo ${validatorValue['requiredLength']} caractere(s)`,
      min: `o valor mínimo permitido é ${validatorValue['min']}`,
      cpfInvalid: `CPF inválido`,
      dateInvalid: `data inválido`,
      lastNameInvalid: `percisa ter nome e sobrenome`,
      minAgeInvalid: `idade mínima permitida é ${validatorValue} ${
        Number(validatorValue) > 1 ? 'anos' : 'ano'
      }`,
      maxAgeInvalid: `idade máxima permitida é ${validatorValue} ${
        Number(validatorValue) > 1 ? 'anos' : 'ano'
      }`,
    };

    return config[validatorName];
  }

  static cpf(control: UntypedFormControl): object | null {
    const value = control.value?.replace(/[^\d]+/g, '');
    return value && !FormValidations.#cpfValidator.isValid(value)
      ? { cpfInvalid: true }
      : null;
  }

  static date(control: UntypedFormControl): object | null {
    const value = control.value?.trim();
    return value && !FormValidations.#dateValidator.isValid(value)
      ? { dateInvalid: true }
      : null;
  }

  static minAge(min: number): (control: UntypedFormControl) => object | null {
    return (control: UntypedFormControl) => {
      const value = control.value?.trim();
      return value && !FormValidations.#dateValidator.minAge(value, min)
        ? { minAgeInvalid: min }
        : null;
    };
  }

  static maxAge(max: number): (control: UntypedFormControl) => object | null {
    return (control: UntypedFormControl) => {
      const value = control.value?.trim();
      return value && !FormValidations.#dateValidator.maxAge(value, max)
        ? { maxAgeInvalid: max }
        : null;
    };
  }

  static lastName(control: UntypedFormControl): object | null {
    const value = control.value?.trim();
    return value && !FormValidations.#nameValidator.hasLastName(value)
      ? { lastNameInvalid: true }
      : null;
  }
}
