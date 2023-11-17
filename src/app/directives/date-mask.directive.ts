import { DatePipe } from '@angular/common';
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
  selector: '[appDateMask]',
  providers: [DatePipe],
})
export class DateMaskDirective implements OnInit, AfterContentInit {
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _ngControl: NgControl,
    private readonly _datePipe: DatePipe,
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
    return this.value?.length < 10;
  }

  public ngOnInit(): void {
    this._elementRef.nativeElement.onkeypress = (event: KeyboardEvent) => {
      if (
        event.key !== 'Enter' &&
        (isKeyNotNumber(event.key) || !this.isValidLength)
      ) {
        event.preventDefault();
      }
    };
  }

  public ngAfterContentInit(): void {
    const value = this.value;
    if (value) {
      this.value = this._datePipe.transform(value, 'dd/MM/yyyy') as string;
    }
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (this.isValidLength) {
      if (isKeyNumber(event.key)) {
        this.addMask();
      } else if (event.key === '/') {
        this.addBackslashIfPossible();
      }
    }
  }

  private addMask(): void {
    setTimeout(() => {
      let value = this.value;
      if (value?.split('/').length < 3) {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '$1/$2');
        this.value = value.replace(/(\d{2}\/\d{2})(\d)/, '$1/$2');
      }
    });
  }

  private addBackslashIfPossible(): void {
    setTimeout(() => {
      const value = this.value;
      if (value) {
        const values = value.split('/');
        if (values.length < 3) {
          const lastIndex = values.length - 1;
          values[lastIndex] = `${values[lastIndex]}/`.padStart(3, '0');
          this.value = values.join('/');
        }
      }
    });
  }

  @HostListener('paste', ['$event'])
  public onPaste() {
    setTimeout(() => {
      const value = this.value;
      if (value) {
        const values = value.split('/');
        if (values.length === 1) {
          this.addMask();
        } else {
          this.value = values.map((v) => v.padStart(2, '0')).join('/');
        }
      }
    }, 150);
  }
}
