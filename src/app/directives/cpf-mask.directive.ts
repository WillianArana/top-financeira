import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { isKeyNotNumber, isKeyNumber } from '../helper/number.helper';
import { CpfPipe } from '../pipes/cpf.pipe';

@Directive({
  selector: '[appCpfMask]',
})
export class CpfMaskDirective implements OnInit, AfterContentInit {
  #cpfPipe = new CpfPipe();

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _ngControl: NgControl,
  ) {}

  get control() {
    return this._ngControl.control as AbstractControl;
  }

  get value() {
    return this.control.value;
  }

  set value(value: string) {
    this.control.setValue(value);
  }

  get isValidLength() {
    return this.value?.length < 15;
  }

  public ngOnInit(): void {
    this._elementRef.nativeElement.onkeypress = (event: KeyboardEvent) => {
      if (isKeyNotNumber(event.key) || !this.isValidLength) {
        event.preventDefault();
      }
    };
  }

  public ngAfterContentInit(): void {
    this.addMask();
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (this.isValidLength) {
      if (isKeyNumber(event.key)) {
        this.addMask();
      } else if (event.key === '.') {
        this.addDotIfPossible();
      } else if (event.key === '-') {
        this.addDashIfPossible();
      }
    }
  }

  private addMask(): void {
    setTimeout(() => {
      this.value = this.#cpfPipe.transform(this.value);
    });
  }

  private addDotIfPossible(): void {
    setTimeout(() => {
      const value = this.value;
      if (value) {
        const values = value.split('.');
        const lastIndex = values.length - 1;
        if (values.length < 3 && /^\d{3}$/.test(values[lastIndex])) {
          values[lastIndex] = `${values[lastIndex]}.`;
          this.value = values.join('');
        }
      }
    });
  }

  private addDashIfPossible(): void {
    setTimeout(() => {
      const value = this.value;
      if (
        value &&
        !value.includes('-') &&
        /^\d{3}\.\d{3}\.\d{3}$/.test(value)
      ) {
        this.value = `${value}-`;
      }
    });
  }

  @HostListener('paste', ['$event'])
  public onPaste() {
    setTimeout(() => this.addMask(), 150);
  }
}
