export class NameValidator {
  public hasLastName(value: string): boolean {
    return value.trim().split(' ').length !== 1;
  }
}
