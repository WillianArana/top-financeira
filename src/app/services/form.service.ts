import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class FormService<T = unknown> {
  readonly #submit = new Subject<T>();
  readonly submit$ = this.#submit.asObservable();

  public formGroupSubmit(form: FormGroup | FormArray, cb: () => T): void {
    if (form.valid) {
      this.submit(cb());
    } else {
      this.checkFormValidations(form);
    }
  }

  public submit(data: T): void {
    this.#submit.next(data);
  }

  private checkFormValidations(form: FormGroup | FormArray): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field) as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      const status = control.status;
      const statusChanges = control.statusChanges as EventEmitter<string>;
      statusChanges.emit('CHECK_COMPONENT');
      statusChanges.emit(status);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidations(control);
      }
    });
  }
}
