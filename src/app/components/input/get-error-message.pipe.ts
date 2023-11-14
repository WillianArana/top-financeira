import { Pipe, PipeTransform } from '@angular/core';
import { FormValidations } from '../../form.validation';
import { InputComponent } from './input.component';

@Pipe({
  name: 'getErrorMessage',
})
export class GetErrorMessagePipe implements PipeTransform {
  transform(value: boolean, component: InputComponent): string {
    let errorMessage = '';
    if (value) {
      const control = component.control;
      for (const propertyName in control.errors) {
        if (
          Object.prototype.hasOwnProperty.call(control.errors, propertyName) &&
          control.touched
        ) {
          errorMessage = FormValidations.getErrorMsg(
            component.label,
            propertyName,
            control.errors[propertyName],
          );
          break;
        }
      }
    }
    return errorMessage;
  }
}
