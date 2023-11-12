import {
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormControlStatus,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import {
  ReplaySubject,
  distinctUntilChanged,
  skip,
  takeUntil,
  tap,
} from 'rxjs';
import { IInput } from './input.interface';
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
      multi: true,
    },
  ],
})
export class InputComponent
  implements OnInit, OnDestroy, ControlValueAccessor, IInput
{
  @Input() id = this.createId();
  @Input() isReadOnly = false;
  @Input() hasError = false;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: InputType = 'text';

  control!: FormControl;
  value: unknown = '';

  private readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor(@Inject(Injector) private injector: Injector) {}

  public ngOnInit(): void {
    this.setControl();
  }

  private setControl(): void {
    const injectedControl = this.injector.get(NgControl);
    const hasNotSetControl =
      !this.setControlIfIsNgModel(injectedControl) &&
      !this.setControlIfIsFormControlName(injectedControl);
    if (hasNotSetControl) {
      this.control = (injectedControl as FormControlDirective)
        .form as FormControl;
    }
  }

  private setControlIfIsNgModel(
    injectedControl: NgControl | FormControlName,
  ): injectedControl is NgControl {
    const isNgModel = injectedControl.constructor === NgModel;
    if (isNgModel) {
      const { control, update } = injectedControl as NgModel;
      this.control = control;
      this.control.valueChanges
        .pipe(
          tap((value: unknown) => update.emit(value)),
          takeUntil(this.destroyed$),
        )
        .subscribe();
    }
    return isNgModel;
  }

  private setControlIfIsFormControlName(
    injectedControl: NgControl | FormControlName,
  ): injectedControl is FormControlName {
    const isFormControlName = injectedControl.constructor === FormControlName;
    if (isFormControlName) {
      this.control = this.injector
        .get(FormGroupDirective)
        .getControl(injectedControl as FormControlName);
      this.setIsDisabled(this.control.status);
      this.control.statusChanges
        .pipe(distinctUntilChanged(), skip(1), takeUntil(this.destroyed$))
        .subscribe((status) => {
          this.setIsDisabled(status);
          this.setIsInvalid(status);
        });
    }
    return isFormControlName;
  }

  private setIsDisabled(status: FormControlStatus): void {
    this.isReadOnly = status === 'DISABLED';
  }

  private setIsInvalid(status: FormControlStatus): void {
    this.hasError = status === 'INVALID';
  }

  public writeValue(value: unknown): void {
    this.value = value;
  }

  public registerOnChange(cb: (value: unknown) => void): void {
    this.onChange = cb;
  }

  public registerOnTouched(cb: () => void): void {
    this.onTouched = cb;
  }

  public onChangeTimeout(value: unknown): void {
    setTimeout(() => this.onChange(value));
  }

  public onBlur(): void {
    this.onTouched();
    this.setIsInvalid(this.control.status);
  }

  public createId(): string {
    return `input-id-${++innerId}`;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
