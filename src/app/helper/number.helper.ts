export const isKeyNumber = (
  value: unknown,
): value is '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' =>
  /^[0-9]*$/.test(`${value}`);

export const isKeyNotNumber = (value: unknown) => !isKeyNumber(value);

export const isNumber = (value: string | number): value is number =>
  !isNaN(Number(value));

export const formatNumber = (value: number | string) =>
  isNumber(value)
    ? new Intl.NumberFormat('pt-br', { minimumFractionDigits: 2 }).format(value)
    : value;
