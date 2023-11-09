import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputProtocol } from './input.protocol';
import { InputType } from './input.type';

let innerId = 0;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, InputProtocol {
  @Input() id: string;
  @Input() isReadOnly = false;
  @Input() hasError = false;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: InputType = 'text';

  formGroup! : FormGroup;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  public value = '';

   constructor(private fb: FormBuilder) {
    this.id = this.createId();
    console.log('form builder ------------------------------------->\n', fb);

    this.formGroup = this.fb.group({
       // implement the formcontrol
    })
   }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(cb: (value: string) => void): void {
    this.onChange = cb;
  }

  public registerOnTouched(cb: () => void): void {
    this.onTouched = cb;
  }

  public onBlur(): void {
    this.onTouched();
  }

  public createId(): string {
    return `input-id-${++innerId}`;
  }
}
