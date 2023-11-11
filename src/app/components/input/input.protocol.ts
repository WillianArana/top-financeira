import { InputType } from './input.type';

export interface InputProtocol {
  id: string;
  label: string;
  placeholder: string;
  type: InputType;
  isReadOnly: boolean;
  hasError: boolean;
}
