import { ICustomer } from './interfaces/customer.interface';

export class CustomerDataForm {
  readonly birthDate = { value: '', disabled: false };
  readonly cpf = { value: '', disabled: false };
  readonly createdAt = { value: null, disabled: true };
  readonly email = { value: '', disabled: false };
  readonly monthlyIncome = { value: null, disabled: false };
  readonly name = { value: '', disabled: false };

  static fromCustomer(customer: ICustomer): CustomerDataForm {
    const dataForm = new CustomerDataForm();
    for (const [key, attr] of Object.entries(dataForm)) {
      if (Object.prototype.hasOwnProperty.call(customer, key)) {
        attr.value = (customer as unknown as { [key: string]: string })[key];
      }
    }
    return dataForm;
  }

  public disableCpf(): this {
    this.cpf.disabled = true;
    return this;
  }
}
