import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { isKeyNotNumber, isKeyNumber } from '../helper/number.helper';

@Directive({
  selector: '[appCpfMask]',
})
export class CpfMaskDirective implements OnInit, AfterContentInit {
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

  get isMasked() {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.value);
  }

  public ngOnInit(): void {
    this._elementRef.nativeElement.onkeypress = (event: KeyboardEvent) => {
      if (isKeyNotNumber(event.key) || this.isMasked) {
        event.preventDefault();
      }
    };
  }

  public ngAfterContentInit(): void {
    this.addMask();
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    const isNotMasked = !this.isMasked;
    if (isNotMasked) {
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
      let value = this.value;
      if (value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        this.value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
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
