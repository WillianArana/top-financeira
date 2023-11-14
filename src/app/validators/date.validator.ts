import { convertToDate } from '../helper/date.helper';

export class DateValidator {
  public isValid(value: string): boolean {
    const date = convertToDate(value);
    return !(!(date instanceof Date) || isNaN(date.getTime()));
  }

  public minAge(value: string, min: number): boolean {
    const age = this.getAge(value);
    return age >= min;
  }

  public getAge(value: string): number {
    const date = convertToDate(value);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    today.setFullYear(today.getFullYear() - age);
    if (date > today) {
      age--;
    }
    return age;
  }

  public maxAge(value: string, max: number): boolean {
    const age = this.getAge(value);
    return age <= max;
  }
}
