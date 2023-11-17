import {
  AfterContentInit,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import {
  formatNumber,
  isKeyNotNumber,
  isKeyNumber,
} from '../helper/number.helper';

@Directive({
  selector: '[appCurrencyMask]',
})
export class CurrencyMaskDirective implements OnInit, AfterContentInit {
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

  public ngOnInit(): void {
    this._elementRef.nativeElement.onkeypress = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && isKeyNotNumber(event.key)) {
        event.preventDefault();
      }
    };
  }

  public ngAfterContentInit(): void {
    const value = this.value;
    if (value) {
      this.value = formatNumber(value);
    }
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    if (isKeyNumber(event.key)) {
      this.addMask();
    } else if (event.key === ',') {
      this.addCommaIfPossible();
    }
  }

  private addMask(): void {
    setTimeout(() => {
      let value = this.value;
      if (value) {
        value = value.replace(/\D/g, '').toString();
        value = (+value / 100).toFixed(2);
        value = value.replace('.', ',');
        this.value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      }
    });
  }

  private addCommaIfPossible(): void {
    setTimeout(() => {
      const value = this.value;
      if (!value?.includes(',')) {
        this.value = `${value},`;
      }
    });
  }

  @HostListener('paste', ['$event'])
  public onPaste() {
    setTimeout(() => this.ngAfterContentInit(), 150);
  }
}
