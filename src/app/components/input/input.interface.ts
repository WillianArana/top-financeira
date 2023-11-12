import { InputType } from './input.type';

export interface IInput {
  id: string;
  label: string;
  placeholder: string;
  type: InputType;
  isReadOnly: boolean;
  hasError: boolean;
}
