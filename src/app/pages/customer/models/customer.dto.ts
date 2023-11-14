import { convertToDate } from 'src/app/helper/date.helper';

export class CustomerDto {
  birthDate: string;
  cpf?: string;
  email: string;
  monthlyIncome: number;
  name: string;

  constructor(data: { [key: string]: string }) {
    this.name = data['name'].trim();
    this.email = data['email'].trim();

    const cpf = data['cpf'];
    if (cpf) {
      this.cpf = cpf.trim().replace(/\D/g, '');
    } else {
      delete this.cpf;
    }

    this.monthlyIncome = +data['monthlyIncome']
      .replace(/\./g, '')
      .replace(',', '.');

    this.birthDate = convertToDate(data['birthDate']).toISOString();
  }
}
