import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class FormService<DTO = unknown> {
  readonly #submit = new Subject<DTO>();
  readonly #remove = new Subject<void>();

  public submitDto(form: FormGroup | FormArray, createDtoFn: () => DTO): void {
    if (form.valid) {
      const dto = createDtoFn();
      this.#submit.next(dto);
    } else {
      this.checkFormValidations(form);
    }
  }

  private checkFormValidations(form: FormGroup | FormArray): void {
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

  public onSubmitDto(): Observable<DTO> {
    return this.#submit.asObservable();
  }

  public remove(): void {
    this.#remove.next(undefined);
  }

  public onRemove(): Observable<void> {
    return this.#remove.asObservable();
  }
}
