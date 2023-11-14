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
    if (isKeyNumber(event.key) && !this.isMasked) {
      this.addMask();
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

  @HostListener('paste', ['$event'])
  public onPaste() {
    setTimeout(() => this.addMask(), 150);
  }
}
