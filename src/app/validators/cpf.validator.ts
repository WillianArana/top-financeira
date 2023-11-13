export class CpfValidator {
  isValid(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    if (value.length !== 11) return false;
    if (this.isSequencie(value)) return false;

    const { totalValue, resultValue } = this.startValues(value);
    let calcValue = resultValue;
    calcValue += this.calcDigit(value, 8);
    calcValue += this.calcDigit(value, 9);

    return totalValue === calcValue;
  }

  private isSequencie(value: string): boolean {
    const sequencie = value[0].repeat(value.length);
    return sequencie === value;
  }

  private startValues(value: string): {
    totalValue: number;
    resultValue: number;
  } {
    let totalValue = 0;
    let resultValue = 0;
    for (let i = 0; i < value.length; i++) {
      const digit = Number(value[i]);
      totalValue += digit;
      if (i < 9) {
        resultValue += digit;
      }
    }

    return { totalValue, resultValue };
  }

  private calcDigit(value: string, indexEnd: number): number {
    let total = 0;
    for (let i = indexEnd, j = 2; i > -1; i--, j++) {
      const digit = Number(value[i]);
      total += digit * j;
    }
    const digit = 11 - (total % 11);
    return digit > 9 ? 0 : digit;
  }
}
