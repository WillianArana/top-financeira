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
export class InputComponent implements OnInit, OnDestroy, ControlValueAccessor {
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

  constructor(@Inject(Injector) private readonly _injector: Injector) {}

  public ngOnInit(): void {
    this.setControl();
  }

  private setControl(): void {
    const injectedControl = this._injector.get(NgControl);
    if (this.isNgModel(injectedControl)) {
      this.setControlNgModel(injectedControl);
    } else if (this.isFormControlName(injectedControl)) {
      this.setControlFormControlName(injectedControl);
    } else {
      this.control = (injectedControl as FormControlDirective).form;
    }
    this.setConfigControl();
  }

  public isNgModel(
    injectedControl: NgControl | FormControlName,
  ): injectedControl is NgControl {
    return injectedControl.constructor === NgModel;
  }

  private setControlNgModel(injectedControl: NgControl): void {
    const { control, update } = injectedControl as NgModel;
    this.control = control;
    this.control.valueChanges
      .pipe(
        tap((value: unknown) => update.emit(value)),
        takeUntil(this.destroyed$),
      )
      .subscribe();
  }

  private setConfigControl(): void {
    this.setIsReadOnly(this.control.status);
    this.control.statusChanges
      .pipe(distinctUntilChanged(), skip(1), takeUntil(this.destroyed$))
      .subscribe((status) => {
        this.setIsReadOnly(status);
        this.setHasError(status);
      });
  }

  public isFormControlName(
    injectedControl: NgControl | FormControlName,
  ): injectedControl is FormControlName {
    return injectedControl.constructor === FormControlName;
  }

  private setControlFormControlName(injectedControl: FormControlName): void {
    const formGroupDirective = this._injector.get(FormGroupDirective);
    this.control = formGroupDirective.getControl(injectedControl);
  }

  private setIsReadOnly(status: FormControlStatus): void {
    this.isReadOnly = status === 'DISABLED';
  }

  setHasError(status: FormControlStatus = this.control.status): void {
    this.hasError = false;
    setTimeout(() => {
      this.hasError = status === 'INVALID';
    }, 10);
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
    this.setHasError(this.control.status);
  }

  public createId(): string {
    return `input-id-${++innerId}`;
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
