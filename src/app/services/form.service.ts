import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'any',
})
export class FormService {
  public onSubmit(form: FormGroup | FormArray, cb: () => void) {
    if (form.valid) {
      cb();
    } else {
      this.checkFormValidations(form);
    }
  }

  private checkFormValidations(form: FormGroup | FormArray) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field) as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      const status = control.status;
      (control.statusChanges as EventEmitter<string>).emit('CHECK_COMPONENT');
      (control.statusChanges as EventEmitter<string>).emit(status);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidations(control);
      }
    });
  }
}
