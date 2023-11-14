import { InputType } from './input.type';

export interface IInput {
  id: string;
  errorMessage: string;
  hasError: boolean;
  isReadOnly: boolean;
  label: string;
  placeholder: string;
  type: InputType;
}
